import { supabase } from "@/lib/supabase/client";
import {
  ReviewSchema,
  CreateReviewSchema,
  type Review,
  type CreateReview,
} from "@/lib/supabase/types";
import { z } from "zod";

/**
 * Fetch all reviews for a specific product
 */
export async function getReviewsByProductId(
  productId: number
): Promise<Review[]> {
  const { data, error } = await supabase
    .from("reviews")
    .select("*")
    .eq("product_id", productId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching reviews:", error);
    throw new Error(`Failed to fetch reviews: ${error.message}`);
  }

  // Validate response data
  return z.array(ReviewSchema).parse(data);
}

/**
 * Create a new review
 */
export async function createReview(review: CreateReview): Promise<Review> {
  // Validate input
  const validatedReview = CreateReviewSchema.parse(review);

  const { data, error } = await supabase
    .from("reviews")
    .insert(validatedReview)
    .select()
    .single();

  if (error) {
    console.error("Error creating review:", error);
    throw new Error(`Failed to create review: ${error.message}`);
  }

  // Validate response data
  return ReviewSchema.parse(data);
}

/**
 * Get average rating for a product
 */
export async function getAverageRating(productId: number): Promise<number> {
  const { data, error } = await supabase
    .from("reviews")
    .select("rating")
    .eq("product_id", productId);

  if (error) {
    console.error("Error fetching ratings:", error);
    throw new Error(`Failed to fetch ratings: ${error.message}`);
  }

  if (!data || data.length === 0) {
    return 0;
  }

  const sum = data.reduce((acc, review) => acc + review.rating, 0);
  return Math.round((sum / data.length) * 10) / 10; // Round to 1 decimal
}

/**
 * Get review count for a product
 */
export async function getReviewCount(productId: number): Promise<number> {
  const { count, error } = await supabase
    .from("reviews")
    .select("*", { count: "exact", head: true })
    .eq("product_id", productId);

  if (error) {
    console.error("Error fetching review count:", error);
    throw new Error(`Failed to fetch review count: ${error.message}`);
  }

  return count || 0;
}
