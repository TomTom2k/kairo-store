import type { Review as SupabaseReview } from "@/lib/supabase/types";

/**
 * Component-friendly Review interface
 */
export interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  createdAt: Date;
  productId: number;
}

/**
 * Convert Supabase Review (snake_case) to Component Review (camelCase)
 */
export function adaptSupabaseReview(supabaseReview: SupabaseReview): Review {
  return {
    id: supabaseReview.id,
    name: supabaseReview.name,
    rating: supabaseReview.rating,
    comment: supabaseReview.comment,
    createdAt: new Date(supabaseReview.created_at),
    productId: supabaseReview.product_id,
  };
}

/**
 * Convert array of Supabase Reviews to Component Reviews
 */
export function adaptSupabaseReviews(
  supabaseReviews: SupabaseReview[]
): Review[] {
  return supabaseReviews.map(adaptSupabaseReview);
}
