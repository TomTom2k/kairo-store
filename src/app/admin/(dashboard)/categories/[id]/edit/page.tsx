"use client";

import { useEffect, useState, use } from "react";
import { CategoryForm } from "@/app/admin/components/CategoryForm";
import { Category } from "@/lib/adapters/category.adapter";
import { Loader2 } from "lucide-react";

export default function EditCategoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [category, setCategory] = useState<Category | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await fetch(`/api/categories/${id}`);
        const result = await response.json();
        if (result.success) {
          setCategory(result.data);
        } else {
          throw new Error(result.error);
        }
      } catch (err) {
        setError("Failed to load category");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategory();
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !category) {
    return (
      <div className="text-destructive text-center p-8">
        {error || "Category not found"}
      </div>
    );
  }

  return <CategoryForm initialData={category} isEditing />;
}
