import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase/client";

/**
 * GET /api/admin/stats
 * Get dashboard statistics
 */
export async function GET() {
  try {
    // Get total products count
    const { count: productsCount, error: productsError } = await supabase
      .from("products")
      .select("*", { count: "exact", head: true });

    if (productsError) throw productsError;

    // Get total orders count and revenue
    const { data: orders, error: ordersError } = await supabase
      .from("orders")
      .select("total");

    if (ordersError) throw ordersError;

    const ordersCount = orders?.length || 0;
    const totalRevenue =
      orders?.reduce((sum, order) => sum + (order.total || 0), 0) || 0;

    // Get unique customers count (from orders)
    const { data: uniqueCustomers, error: customersError } = await supabase
      .from("orders")
      .select("customer_email")
      .not("customer_email", "is", null);

    if (customersError) throw customersError;

    const customersCount = new Set(
      uniqueCustomers?.map((o) => o.customer_email)
    ).size;

    // Get low stock products count (quantity < 10)
    const { count: lowStockCount, error: lowStockError } = await supabase
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
