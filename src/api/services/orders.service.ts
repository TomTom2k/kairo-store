import { supabase } from "@/lib/supabase/client";
import {
  adaptAdminOrders,
  adaptAdminOrder,
  type AdminOrder,
} from "@/lib/adapters/order.adapter";

/**
 * Fetch all orders with their items and product details
 */
export async function getOrders(): Promise<AdminOrder[]> {
  const { data, error } = await supabase
    .from("orders")
    .select(
      `
			*,
			order_items (
				id,
				quantity,
				price,
				product:products (
					id,
					name,
					images
				)
			)
		`
    )
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching orders:", error);
    throw new Error(`Failed to fetch orders: ${error.message}`);
  }

  return adaptAdminOrders(data);
}

/**
 * Fetch a single order by ID
 */
export async function getOrderById(id: string): Promise<AdminOrder | null> {
  const { data, error } = await supabase
    .from("orders")
    .select(
      `
			*,
			order_items (
				id,
				quantity,
				price,
				product:products (
					id,
					name,
					images
				)
			)
		`
    )
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching order:", error);
    throw new Error(`Failed to fetch order: ${error.message}`);
  }

  return adaptAdminOrder(data);
}

/**
 * Update order status via API route
 */
export async function updateOrderStatus(
  id: string,
  status: string
): Promise<void> {
  const response = await fetch(`/api/orders/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status }),
  });

  const result = await response.json();

  if (!result.success) {
    throw new Error(result.error || "Failed to update order status");
  }
}
