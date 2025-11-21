import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getReviewsByProductId,
  createReview as createReviewApi,
  getAverageRating,
  getReviewCount,
} from "@/api/services/reviews.service";
import type { Review, CreateReview } from "@/lib/supabase/types";
import { productKeys } from "./useProducts";

// Query keys
export const reviewKeys = {
  all: ["reviews"] as const,
  lists: () => [...reviewKeys.all, "list"] as const,
  list: (productId: number) => [...reviewKeys.lists(), productId] as const,
  rating: (productId: number) =>
    [...reviewKeys.all, "rating", productId] as const,
  count: (productId: number) =>
    [...reviewKeys.all, "count", productId] as const,
};

/**
 * Hook to fetch reviews for a product
 */
export function useReviews(productId: number) {
  return useQuery({
    queryKey: reviewKeys.list(productId),
    queryFn: () => getReviewsByProductId(productId),
    enabled: !!productId,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
}

/**
 * Hook to get average rating for a product
 */
export function useAverageRating(productId: number) {
  return useQuery({
    queryKey: reviewKeys.rating(productId),
    queryFn: () => getAverageRating(productId),
    enabled: !!productId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

/**
 * Hook to get review count for a product
 */
export function useReviewCount(productId: number) {
  return useQuery({
    queryKey: reviewKeys.count(productId),
    queryFn: () => getReviewCount(productId),
    enabled: !!productId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

/**
 * Hook to create a new review
 */
export function useCreateReview() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (review: CreateReview) => createReviewApi(review),
    onSuccess: (newReview) => {
      // Invalidate and refetch reviews for this product
      queryClient.invalidateQueries({
        queryKey: reviewKeys.list(newReview.product_id),
      });

      // Invalidate rating and count
      queryClient.invalidateQueries({
        queryKey: reviewKeys.rating(newReview.product_id),
      });
      queryClient.invalidateQueries({
        queryKey: reviewKeys.count(newReview.product_id),
      });

      // Optionally update product rating
      queryClient.invalidateQueries({
        queryKey: productKeys.detail(newReview.product_id),
      });
    },
  });
}
