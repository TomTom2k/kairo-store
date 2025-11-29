import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { supabaseAdmin } from "@/lib/supabase/server";
import { getAdminById } from "@/api/services/admin-auth.service";

/**
 * Check if the request has a valid admin session
 */
async function checkAdminAuth(): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const adminSession = cookieStore.get("admin_session");

    if (!adminSession?.value) {
      return false;
    }

    // Verify that admin user exists and is active
    const adminUser = await getAdminById(adminSession.value);
    return !!adminUser;
  } catch (error) {
    console.error("Error checking admin auth:", error);
    return false;
  }
}

/**
 * GET /api/admin/stats
 * Get dashboard statistics
 */
export async function GET(request: NextRequest) {
  // Check authentication
  const isAuthenticated = await checkAdminAuth();

  if (!isAuthenticated) {
    return NextResponse.json(
      { success: false, error: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    // Get total products count
    const { count: productsCount, error: productsError } = await supabaseAdmin
      .from("products")
      .select("*", { count: "exact", head: true });

    if (productsError) throw productsError;

    // Get total orders count and revenue
    const query1 = supabaseAdmin.from("orders");
    // @ts-ignore - Supabase type inference issue with orders table
    const { data: ordersData, error: ordersError } = await query1
      .select("total");

    const orders = ordersData as { total: number }[] | null;

    if (ordersError) throw ordersError;

    const ordersCount = orders?.length || 0;
    const totalRevenue =
      orders?.reduce((sum, order) => sum + (order.total || 0), 0) || 0;

    // Get unique customers count (from orders)
    const query2 = supabaseAdmin.from("orders");
    // @ts-ignore - Supabase type inference issue with orders table
    const { data: uniqueCustomersData, error: customersError } = await query2
      .select("customer_email")
      .not("customer_email", "is", null);

    const uniqueCustomers = uniqueCustomersData as { customer_email: string }[] | null;

    if (customersError) throw customersError;

    const customersCount = new Set(
      uniqueCustomers?.map((o) => o.customer_email)
    ).size;

    // Get low stock products count (quantity < 10)
    const { count: lowStockCount, error: lowStockError } = await supabaseAdmin
      .from("products")
      .select("*", { count: "exact", head: true })
      .lt("quantity", 10);

    if (lowStockError) throw lowStockError;

    return NextResponse.json({
      success: true,
      data: {
        totalRevenue,
        ordersCount,
        productsCount: productsCount || 0,
        customersCount,
        lowStockCount: lowStockCount || 0,
      },
    });
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to fetch stats",
      },
      { status: 500 }
    );
  }
}
