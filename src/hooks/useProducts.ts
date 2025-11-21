import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getProducts,
  getProductById,
  getProductsByCategory,
  searchProducts,
  getRelatedProducts,
} from "@/api/services/products.service";
import {
  adaptSupabaseProducts,
  adaptSupabaseProduct,
} from "@/lib/adapters/product.adapter";
import type { Product } from "@/lib/adapters/product.adapter";

// Query keys
export const productKeys = {
  all: ["products"] as const,
  lists: () => [...productKeys.all, "list"] as const,
  list: (filters: string) => [...productKeys.lists(), { filters }] as const,
  details: () => [...productKeys.all, "detail"] as const,
  detail: (id: number) => [...productKeys.details(), id] as const,
  category: (category: string) =>
    [...productKeys.all, "category", category] as const,
  related: (id: number, category: string) =>
    [...productKeys.all, "related", id, category] as const,
};

/**
 * Hook to fetch all products
 */
export function useProducts() {
  return useQuery({
    queryKey: productKeys.lists(),
    queryFn: async () => {
      const supabaseProducts = await getProducts();
      return adaptSupabaseProducts(supabaseProducts);
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

/**
 * Hook to fetch a single product by ID
 */
export function useProduct(id: number) {
  return useQuery({
    queryKey: productKeys.detail(id),
    queryFn: async () => {
      const supabaseProduct = await getProductById(id);
      return supabaseProduct ? adaptSupabaseProduct(supabaseProduct) : null;
    },
    enabled: !!id, // Only run if id is provided
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

/**
 * Hook to fetch products by category
 */
export function useProductsByCategory(category: string) {
  return useQuery({
    queryKey: productKeys.category(category),
    queryFn: async () => {
      const supabaseProducts = await getProductsByCategory(category);
      return adaptSupabaseProducts(supabaseProducts);
    },
    enabled: !!category,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

/**
 * Hook to search products
 */
export function useSearchProducts(query: string) {
  return useQuery({
    queryKey: [...productKeys.all, "search", query],
    queryFn: async () => {
      const supabaseProducts = await searchProducts(query);
      return adaptSupabaseProducts(supabaseProducts);
    },
    enabled: query.length > 0,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
}

/**
 * Hook to fetch related products
 */
export function useRelatedProducts(
  productId: number,
  category: string,
  limit?: number
) {
  return useQuery({
    queryKey: productKeys.related(productId, category),
    queryFn: async () => {
      const supabaseProducts = await getRelatedProducts(
        productId,
        category,
        limit
      );
      return adaptSupabaseProducts(supabaseProducts);
    },
    enabled: !!productId && !!category,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
