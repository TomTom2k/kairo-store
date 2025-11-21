import { supabase } from "@/lib/supabase/client";
import { ProductSchema, type Product } from "@/lib/supabase/types";
import { z } from "zod";

/**
 * Fetch all products from Supabase
 */
export async function getProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching products:", error);
    throw new Error(`Failed to fetch products: ${error.message}`);
  }

  // Validate response data
  return z.array(ProductSchema).parse(data);
}

/**
 * Fetch a single product by ID
 */
export async function getProductById(id: number): Promise<Product | null> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      // Not found
      return null;
    }
    console.error("Error fetching product:", error);
    throw new Error(`Failed to fetch product: ${error.message}`);
  }

  // Validate response data
  return ProductSchema.parse(data);
}

/**
 * Fetch products by category
 */
export async function getProductsByCategory(
  category: string
): Promise<Product[]> {
  // If category is "Tất Cả", return all products
  if (category === "Tất Cả") {
    return getProducts();
  }

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("category", category)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching products by category:", error);
    throw new Error(`Failed to fetch products: ${error.message}`);
  }

  // Validate response data
  return z.array(ProductSchema).parse(data);
}

/**
 * Search products by name or description
 */
export async function searchProducts(query: string): Promise<Product[]> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .or(`name.ilike.%${query}%,description.ilike.%${query}%`)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error searching products:", error);
    throw new Error(`Failed to search products: ${error.message}`);
  }

  // Validate response data
  return z.array(ProductSchema).parse(data);
}

/**
 * Get related products (same category, excluding current product)
 */
export async function getRelatedProducts(
  productId: number,
  category: string,
  limit: number = 4
): Promise<Product[]> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("category", category)
    .neq("id", productId)
    .limit(limit);

  if (error) {
    console.error("Error fetching related products:", error);
    throw new Error(`Failed to fetch related products: ${error.message}`);
  }

  // Validate response data
  return z.array(ProductSchema).parse(data);
}

/**
 * Create a new product
 */
export async function createProduct(
  product: Omit<Product, "id" | "created_at" | "updated_at">
): Promise<Product> {
  const { data, error } = await supabase
    .from("products")
    .insert(product)
    .select()
    .single();

  if (error) {
    console.error("Error creating product:", error);
    throw new Error(`Failed to create product: ${error.message}`);
  }

  return ProductSchema.parse(data);
}

/**
 * Update an existing product
 */
export async function updateProduct(
  id: number,
  updates: Partial<Omit<Product, "id" | "created_at" | "updated_at">>
): Promise<Product> {
  const { data, error } = await supabase
    .from("products")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Error updating product:", error);
    throw new Error(`Failed to update product: ${error.message}`);
  }

  return ProductSchema.parse(data);
}

/**
 * Delete a product
 */
export async function deleteProduct(id: number): Promise<void> {
  const { error } = await supabase.from("products").delete().eq("id", id);

  if (error) {
    console.error("Error deleting product:", error);
    throw new Error(`Failed to delete product: ${error.message}`);
  }
}
