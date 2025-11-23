import type { Product as SupabaseProduct } from "@/lib/supabase/types";
import { formatPrice } from "@/lib/utils/price";

/**
 * Component-friendly Product interface (camelCase)
 * This is what components expect
 */
export interface Product {
  id: number;
  name: string;
  price: string; // Formatted price for display (generated from priceValue)
  priceValue: number; // Actual price value for calculations
  rating: number;
  images: string[];
  description: string;
  badge: string | null;
  category: string;
  quantity: number;
  stock: string;
  careLight?: string | null;
  careWater?: string | null;
  careTemperature?: string | null;
  careFertilizer?: string | null;
  metaTitle?: string | null;
  metaDescription?: string | null;
  keywords?: string | null;
  slug?: string | null;
  video?: string | null;
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
    price: formatPrice(supabaseProduct.price_value), // Generate from price_value
    priceValue: supabaseProduct.price_value,
    rating: supabaseProduct.rating,
    images: supabaseProduct.images,
    description: supabaseProduct.description,
    badge: supabaseProduct.badge,
    category: supabaseProduct.category,
    quantity: supabaseProduct.quantity,
    stock:
      supabaseProduct.stock ||
      (supabaseProduct.quantity > 0 ? "Còn hàng" : "Hết hàng"),
    careLight: supabaseProduct.care_light,
    careWater: supabaseProduct.care_water,
    careTemperature: supabaseProduct.care_temperature,
    careFertilizer: supabaseProduct.care_fertilizer,
    metaTitle: supabaseProduct.meta_title,
    metaDescription: supabaseProduct.meta_description,
    keywords: supabaseProduct.keywords,
    slug: supabaseProduct.slug,
    video: supabaseProduct.video,
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
  product: Partial<Product>
): Partial<Omit<SupabaseProduct, "created_at" | "updated_at">> {
  return {
    id: product.id,
    name: product.name,
    price_value: product.priceValue,
    rating: product.rating,
    images: product.images,
    description: product.description,
    badge: product.badge,
    category: product.category,
    quantity: product.quantity,
    care_light: product.careLight,
    care_water: product.careWater,
    care_temperature: product.careTemperature,
    care_fertilizer: product.careFertilizer,
    meta_title: product.metaTitle,
    meta_description: product.metaDescription,
    keywords: product.keywords,
    slug: product.slug,
  };
}
