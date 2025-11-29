import { supabase } from "@/lib/supabase/client";
import {
  Category,
  adaptSupabaseCategory,
} from "@/lib/adapters/category.adapter";

export async function getCategories(): Promise<Category[]> {
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("id", { ascending: true });

  if (error) {
    console.error("Error fetching categories:", error);
    throw new Error(error.message);
  }

  return data.map(adaptSupabaseCategory);
}

export async function getCategoryById(id: number): Promise<Category | null> {
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    if (error.code === "PGRST116") return null; // Not found
    console.error("Error fetching category:", error);
    throw new Error(error.message);
  }

  return adaptSupabaseCategory(data);
}

export async function createCategory(
  category: Omit<Category, "id" | "createdAt">
): Promise<Category> {
  const query = supabase.from("categories");
  const { data, error } = await query
    // @ts-ignore - Supabase type inference issue with categories table
    .insert({
      name: category.name,
      slug: category.slug,
      description: category.description,
      icon_name: category.iconName,
      color: category.color,
      bg_color: category.bgColor,
    })
    .select()
    .single();

  if (error) {
    console.error("Error creating category:", error);
    throw new Error(error.message);
  }

  return adaptSupabaseCategory(data);
}

export async function updateCategory(
  id: number,
  updates: Partial<Category>
): Promise<Category> {
  const dbUpdates: any = {};
  if (updates.name !== undefined) dbUpdates.name = updates.name;
  if (updates.slug !== undefined) dbUpdates.slug = updates.slug;
  if (updates.description !== undefined)
    dbUpdates.description = updates.description;
  if (updates.iconName !== undefined) dbUpdates.icon_name = updates.iconName;
  if (updates.color !== undefined) dbUpdates.color = updates.color;
  if (updates.bgColor !== undefined) dbUpdates.bg_color = updates.bgColor;

  const query = supabase.from("categories");
  const { data, error } = await query
    // @ts-ignore - Supabase type inference issue with categories table
    .update(dbUpdates)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Error updating category:", error);
    throw new Error(error.message);
  }

  return adaptSupabaseCategory(data);
}

export async function deleteCategory(id: number): Promise<void> {
  const { error } = await supabase.from("categories").delete().eq("id", id);

  if (error) {
    console.error("Error deleting category:", error);
    throw new Error(error.message);
  }
}
