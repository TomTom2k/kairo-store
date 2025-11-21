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
					image
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
					image
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
 * Update order status
 */
export async function updateOrderStatus(
  id: string,
  status: string
): Promise<void> {
  const { error } = await supabase
    .from("orders")
    .update({ status })
    .eq("id", id);

  if (error) {
    console.error("Error updating order status:", error);
    throw new Error(`Failed to update order status: ${error.message}`);
  }
}
