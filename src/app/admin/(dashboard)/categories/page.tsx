"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/shared/ui";
import { Plus, Edit, Trash2, Loader2 } from "lucide-react";
import { Category } from "@/lib/adapters/category.adapter";

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const fetchCategories = async () => {
    try {
      const response = await fetch("/api/categories");
      const result = await response.json();
      if (result.success) {
        setCategories(result.data);
      } else {
        throw new Error(result.error);
      }
    } catch (err) {
      setError("Failed to load categories");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Bạn có chắc chắn muốn xóa danh mục này?")) return;

    setDeletingId(id);
    try {
      const response = await fetch(`/api/categories/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setCategories(categories.filter((c) => c.id !== id));
      } else {
        alert("Failed to delete category");
      }
    } catch (err) {
      console.error("Error deleting category:", err);
      alert("An error occurred while deleting");
    } finally {
      setDeletingId(null);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-destructive p-8">
        <p>{error}</p>
        <Button onClick={fetchCategories} variant="outline" className="mt-4">
          Thử lại
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Danh Mục</h1>
          <p className="text-muted-foreground mt-2">
            Quản lý danh mục sản phẩm của cửa hàng
          </p>
        </div>
        <Link href="/admin/categories/new">
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            Thêm Danh Mục
          </Button>
        </Link>
      </div>

      <div className="bg-card rounded-lg border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="text-left p-4 font-medium text-muted-foreground">
                  ID
                </th>
                <th className="text-left p-4 font-medium text-muted-foreground">
                  Tên Danh Mục
                </th>
                <th className="text-left p-4 font-medium text-muted-foreground">
                  Slug
                </th>
                <th className="text-left p-4 font-medium text-muted-foreground">
                  Mô Tả
                </th>
                <th className="text-right p-4 font-medium text-muted-foreground">
                  Thao Tác
                </th>
              </tr>
            </thead>
            <tbody>
              {categories.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="p-8 text-center text-muted-foreground"
                  >
                    Chưa có danh mục nào. Hãy tạo danh mục mới!
                  </td>
                </tr>
              ) : (
                categories.map((category) => (
                  <tr
                    key={category.id}
                    className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors"
                  >
                    <td className="p-4 text-sm">{category.id}</td>
                    <td className="p-4 font-medium">{category.name}</td>
                    <td className="p-4 text-sm text-muted-foreground font-mono">
                      {category.slug}
                    </td>
                    <td className="p-4 text-sm text-muted-foreground max-w-xs truncate">
                      {category.description}
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link href={`/admin/categories/${category.id}/edit`}>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                        </Link>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                          onClick={() => handleDelete(category.id)}
                          disabled={deletingId === category.id}
                        >
                          {deletingId === category.id ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <Trash2 className="w-4 h-4" />
                          )}
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
