"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/shared/ui";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import Link from "next/link";
import { generateSlug } from "@/lib/utils/slug.utils";
import { Category } from "@/lib/adapters/category.adapter";

interface CategoryFormProps {
  initialData?: Category;
  isEditing?: boolean;
}

export function CategoryForm({
  initialData,
  isEditing = false,
}: CategoryFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [name, setName] = useState(initialData?.name || "");
  const [slug, setSlug] = useState(initialData?.slug || "");
  const [description, setDescription] = useState(
    initialData?.description || ""
  );
  const [iconName, setIconName] = useState(initialData?.iconName || "");
  const [color, setColor] = useState(initialData?.color || "");
  const [bgColor, setBgColor] = useState(initialData?.bgColor || "");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const url = isEditing
        ? `/api/categories/${initialData!.id}`
        : "/api/categories";
      const method = isEditing ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          slug: slug || generateSlug(name),
          description,
          iconName,
          color,
          bgColor,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || "Failed to save category");
      }

      router.push("/admin/categories");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-2xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/categories">
            <Button variant="ghost" size="icon" type="button">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold">
              {isEditing ? "Chỉnh Sửa Danh Mục" : "Thêm Danh Mục Mới"}
            </h1>
            <p className="text-muted-foreground">
              {isEditing
                ? `Cập nhật thông tin cho ${initialData?.name}`
                : "Điền thông tin để tạo danh mục mới"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/admin/categories">
            <Button variant="outline" type="button">
              Hủy
            </Button>
          </Link>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Đang lưu...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Lưu Danh Mục
              </>
            )}
          </Button>
        </div>
      </div>

      {error && (
        <div className="bg-destructive/10 text-destructive p-4 rounded-lg border border-destructive/20">
          {error}
        </div>
      )}

      <div className="bg-card p-6 rounded-lg border border-border space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">Tên danh mục</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 bg-background rounded-md border border-input focus:outline-none focus:ring-2 focus:ring-primary/50"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Slug</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder={generateSlug(name)}
              className="flex-1 px-4 py-2 bg-background rounded-md border border-input focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
            <Button
              type="button"
              variant="outline"
              onClick={() => setSlug(generateSlug(name))}
              disabled={!name}
            >
              Auto Generate
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Mô tả</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="w-full px-4 py-2 bg-background rounded-md border border-input focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Icon Name (Lucide)</label>
            <input
              type="text"
              value={iconName}
              onChange={(e) => setIconName(e.target.value)}
              placeholder="e.g., Leaf, Home"
              className="w-full px-4 py-2 bg-background rounded-md border border-input focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Background Color Class
            </label>
            <input
              type="text"
              value={bgColor}
              onChange={(e) => setBgColor(e.target.value)}
              placeholder="e.g., bg-green-50"
              className="w-full px-4 py-2 bg-background rounded-md border border-input focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Gradient Color Class</label>
          <input
            type="text"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            placeholder="e.g., from-green-400 to-green-600"
            className="w-full px-4 py-2 bg-background rounded-md border border-input focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
      </div>
    </form>
  );
}
