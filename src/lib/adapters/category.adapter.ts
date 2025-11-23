import { z } from "zod";

export const CategorySchema = z.object({
  id: z.number(),
  name: z.string(),
  slug: z.string(),
  description: z.string().nullable().optional(),
  iconName: z.string().nullable().optional(),
  color: z.string().nullable().optional(),
  bgColor: z.string().nullable().optional(),
  createdAt: z.string().optional(),
});

export type Category = z.infer<typeof CategorySchema>;

export function adaptSupabaseCategory(supabaseCategory: any): Category {
  return {
    id: supabaseCategory.id,
    name: supabaseCategory.name,
    slug: supabaseCategory.slug,
    description: supabaseCategory.description,
    iconName: supabaseCategory.icon_name,
    color: supabaseCategory.color,
    bgColor: supabaseCategory.bg_color,
    createdAt: supabaseCategory.created_at,
  };
}
