import { z } from "zod";

// Zod Schemas for runtime validation
export const ProductSchema = z.object({
  id: z.number(),
  name: z.string(),
  price_value: z.number(),
  rating: z.number().min(0).max(5),
  images: z.array(z.string().url()).min(1),
  description: z.string(),
  badge: z.string().nullable(),
  category: z.string(),
  quantity: z.number().int().min(0),
  stock: z.string(),
  care_light: z.string().nullable().optional(),
  care_water: z.string().nullable().optional(),
  care_temperature: z.string().nullable().optional(),
  care_fertilizer: z.string().nullable().optional(),
  meta_title: z.string().nullable().optional(),
  meta_description: z.string().nullable().optional(),
  keywords: z.string().nullable().optional(),
  slug: z.string().nullable().optional(),
  video: z.string().nullable().optional(),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
});

export const ReviewSchema = z.object({
  id: z.string().uuid(),
  product_id: z.number(),
  rating: z.number().min(1).max(5),
  comment: z.string().min(1),
  name: z.string().min(1),
  created_at: z.string(),
});

export const CreateReviewSchema = z.object({
  product_id: z.number(),
  rating: z.number().min(1).max(5),
  comment: z.string().min(1),
  name: z.string().min(1),
});

export const OrderSchema = z.object({
  id: z.string().uuid(),
  customer_name: z.string(),
  customer_email: z.string().email(),
  customer_phone: z.string(),
  customer_address: z.string(),
  total_amount: z.number(),
  status: z.string(),
  created_at: z.string(),
});

export const CreateOrderSchema = z.object({
  customer_name: z.string().min(1),
  customer_email: z.string().email(),
  customer_phone: z.string().min(1),
  customer_address: z.string().min(1),
  total_amount: z.number().positive(),
  items: z.array(
    z.object({
      product_id: z.number(),
      quantity: z.number().positive(),
      price: z.number().positive(),
    })
  ),
});

// TypeScript types derived from Zod schemas
export type Product = z.infer<typeof ProductSchema>;
export type Review = z.infer<typeof ReviewSchema>;
export type CreateReview = z.infer<typeof CreateReviewSchema>;
export type Order = z.infer<typeof OrderSchema>;
export type CreateOrder = z.infer<typeof CreateOrderSchema>;

export type CreateProduct = Omit<Product, "id" | "created_at" | "updated_at">;
export type UpdateProduct = Partial<CreateProduct>;

// Database types for Supabase
export type Database = {
  public: {
    Tables: {
      products: {
        Row: Product;
        Insert: Omit<Product, "id" | "created_at" | "updated_at">;
        Update: Partial<Omit<Product, "id" | "created_at" | "updated_at">>;
      };
      reviews: {
        Row: Review;
        Insert: Omit<Review, "id" | "created_at">;
        Update: Partial<Omit<Review, "id" | "created_at">>;
      };
      orders: {
        Row: Order;
        Insert: Omit<Order, "id" | "created_at">;
        Update: Partial<Omit<Order, "id" | "created_at">>;
      };
      order_items: {
        Row: {
          id: string;
          order_id: string;
          product_id: number;
          quantity: number;
          price: number;
        };
        Insert: {
          order_id: string;
          product_id: number;
          quantity: number;
          price: number;
        };
        Update: Partial<{
          order_id: string;
          product_id: number;
          quantity: number;
          price: number;
        }>;
      };
      admin_users: {
        Row: {
          id: string;
          username: string;
          password_hash: string;
          email: string | null;
          is_active: boolean;
          last_login_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          username: string;
          password_hash: string;
          email?: string | null;
          is_active?: boolean;
        };
        Update: Partial<{
          username: string;
          password_hash: string;
          email: string | null;
          is_active: boolean;
          last_login_at: string | null;
        }>;
      };
      password_reset_tokens: {
        Row: {
          id: string;
          admin_user_id: string;
          token: string;
          expires_at: string;
          used: boolean;
          created_at: string;
        };
        Insert: {
          admin_user_id: string;
          token: string;
          expires_at: string;
          used?: boolean;
        };
        Update: Partial<{
          token: string;
          expires_at: string;
          used: boolean;
        }>;
      };
    };
  };
};
