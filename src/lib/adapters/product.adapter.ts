import type { Product as SupabaseProduct } from "@/lib/supabase/types";

/**
 * Component-friendly Product interface (camelCase)
 * This is what components expect
 */
export interface Product {
  id: number;
  name: string;
  price: string;
  priceValue: number;
  rating: number;
  image: string;
  description: string;
  badge: string | null;
  category: string;
  quantity: number;
}

/**
 * Convert Supabase Product (snake_case) to Component Product (camelCase)
 */
export function adaptSupabaseProduct(
  supabaseProduct: SupabaseProduct
): Product {
  return {
    id: supabaseProduct.id,
    name: supabaseProduct.name,
    price: supabaseProduct.price,
    priceValue: supabaseProduct.price_value,
    rating: supabaseProduct.rating,
    image: supabaseProduct.image,
    description: supabaseProduct.description,
    badge: supabaseProduct.badge,
    category: supabaseProduct.category,
    quantity: supabaseProduct.quantity,
  };
}

/**
 * Convert array of Supabase Products to Component Products
 */
export function adaptSupabaseProducts(
  supabaseProducts: SupabaseProduct[]
): Product[] {
  return supabaseProducts.map(adaptSupabaseProduct);
}

/**
 * Convert Component Product (camelCase) to Supabase Product (snake_case)
 */
export function toSupabaseProduct(
  product: Product
): Omit<SupabaseProduct, "created_at" | "updated_at"> {
  return {
    id: product.id,
    name: product.name,
    price: product.price,
    price_value: product.priceValue,
    rating: product.rating,
    image: product.image,
    description: product.description,
    badge: product.badge,
    category: product.category,
    quantity: product.quantity,
  };
}
