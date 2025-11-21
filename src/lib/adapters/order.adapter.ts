import type { Order as SupabaseOrder, Database } from "@/lib/supabase/types";
import { OrderStatus } from "@/api/types";

// Define a type that includes items for the order
export type OrderWithItems = SupabaseOrder & {
  items: {
    id: string;
    quantity: number;
    price: number;
    product: {
      id: number;
      name: string;
      image: string;
    } | null;
  }[];
};

export interface AdminOrder {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerAddress: string;
  totalAmount: number;
  status: OrderStatus;
  createdAt: Date;
  items: {
    id: string;
    productId: number;
    productName: string;
    productImage: string;
    quantity: number;
    price: number;
    total: number;
  }[];
}

/**
 * Convert Supabase Order to Admin Order format
 */
export function adaptAdminOrder(supabaseOrder: any): AdminOrder {
  return {
    id: supabaseOrder.id,
    customerName: supabaseOrder.customer_name,
    customerEmail: supabaseOrder.customer_email,
    customerPhone: supabaseOrder.customer_phone,
    customerAddress: supabaseOrder.customer_address,
    totalAmount: supabaseOrder.total_amount,
    status: supabaseOrder.status as OrderStatus,
    createdAt: new Date(supabaseOrder.created_at),
    items:
      supabaseOrder.order_items?.map((item: any) => ({
        id: item.id,
        productId: item.product?.id || 0,
        productName: item.product?.name || "Unknown Product",
        productImage: item.product?.image || "",
        quantity: item.quantity,
        price: item.price,
        total: item.price * item.quantity,
      })) || [],
  };
}

/**
 * Convert array of Supabase Orders to Admin Orders
 */
export function adaptAdminOrders(supabaseOrders: any[]): AdminOrder[] {
  return supabaseOrders.map(adaptAdminOrder);
}
