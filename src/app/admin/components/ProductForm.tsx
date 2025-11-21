"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/shared/ui";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import Link from "next/link";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProduct, updateProduct } from "@/api/services/products.service";
import { productKeys } from "@/hooks/useProducts";
import { toSupabaseProduct } from "@/lib/adapters/product.adapter";
import type { Product } from "@/lib/adapters/product.adapter";

interface ProductFormProps {
  initialData?: Product;
  isEditing?: boolean;
}

export function ProductForm({
  initialData,
  isEditing = false,
}: ProductFormProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Form states
  const [name, setName] = useState(initialData?.name || "");
  const [price, setPrice] = useState(initialData?.price || "");
  const [priceValue, setPriceValue] = useState(
    initialData?.priceValue?.toString() || ""
  );
  const [category, setCategory] = useState(
    initialData?.category || "Cây Trong Nhà"
  );
  const [image, setImage] = useState(initialData?.image || "");
  const [description, setDescription] = useState(
    initialData?.description || ""
  );
  const [stock, setStock] = useState(initialData?.stock || "Còn hàng");
  const [inStock, setInStock] = useState(initialData?.inStock ?? true);
  const [badge, setBadge] = useState(initialData?.badge || "");

  const createMutation = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: productKeys.all });
      router.push("/admin/products");
      router.refresh();
    },
    onError: (err: Error) => {
      setError(err.message);
      setIsSubmitting(false);
    },
  });

  const updateMutation = useMutation({
    mutationFn: (data: any) => updateProduct(initialData!.id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: productKeys.all });
      router.push("/admin/products");
      router.refresh();
    },
    onError: (err: Error) => {
      setError(err.message);
      setIsSubmitting(false);
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const productData = {
        name,
        price,
        price_value: parseInt(priceValue),
        rating: initialData?.rating || 0,
        image,
        description,
        category,
        stock,
        in_stock: inStock,
        badge: badge || null,
      };

      if (isEditing && initialData) {
        await updateMutation.mutateAsync(productData);
      } else {
        await createMutation.mutateAsync(productData);
      }
    } catch (err) {
      // Error handled in mutation callbacks
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/products">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold">
              {isEditing ? "Chỉnh Sửa Sản Phẩm" : "Thêm Sản Phẩm Mới"}
            </h1>
            <p className="text-muted-foreground">
              {isEditing
                ? `Cập nhật thông tin cho ${initialData?.name}`
                : "Điền thông tin để tạo sản phẩm mới"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/admin/products">
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
                Lưu Sản Phẩm
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Info */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-card p-6 rounded-lg border border-border space-y-4">
            <h3 className="font-semibold text-lg">Thông Tin Cơ Bản</h3>

            <div className="space-y-2">
              <label className="text-sm font-medium">Tên sản phẩm</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 bg-background rounded-md border border-input focus:outline-none focus:ring-2 focus:ring-primary/50"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Mô tả</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={5}
                className="w-full px-4 py-2 bg-background rounded-md border border-input focus:outline-none focus:ring-2 focus:ring-primary/50"
                required
              />
            </div>
          </div>

          <div className="bg-card p-6 rounded-lg border border-border space-y-4">
            <h3 className="font-semibold text-lg">Hình Ảnh</h3>
            <div className="space-y-2">
              <label className="text-sm font-medium">URL Hình ảnh</label>
              <input
                type="url"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="https://example.com/image.jpg"
                className="w-full px-4 py-2 bg-background rounded-md border border-input focus:outline-none focus:ring-2 focus:ring-primary/50"
                required
              />
            </div>
            {image && (
              <div className="mt-4 aspect-video relative rounded-lg overflow-hidden border border-border bg-muted">
                <img
                  src={image}
                  alt="Preview"
                  className="w-full h-full object-contain"
                />
              </div>
            )}
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          <div className="bg-card p-6 rounded-lg border border-border space-y-4">
            <h3 className="font-semibold text-lg">Giá & Kho</h3>

            <div className="space-y-2">
              <label className="text-sm font-medium">Giá hiển thị</label>
              <input
                type="text"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="150.000 ₫"
                className="w-full px-4 py-2 bg-background rounded-md border border-input focus:outline-none focus:ring-2 focus:ring-primary/50"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Giá trị (VNĐ)</label>
              <input
                type="number"
                value={priceValue}
                onChange={(e) => setPriceValue(e.target.value)}
                placeholder="150000"
                className="w-full px-4 py-2 bg-background rounded-md border border-input focus:outline-none focus:ring-2 focus:ring-primary/50"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Tình trạng kho</label>
              <select
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                className="w-full px-4 py-2 bg-background rounded-md border border-input focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                <option value="Còn hàng">Còn hàng</option>
                <option value="Hết hàng">Hết hàng</option>
                <option value="Sắp về">Sắp về</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="inStock"
                checked={inStock}
                onChange={(e) => setInStock(e.target.checked)}
                className="w-4 h-4 rounded border-input text-primary focus:ring-primary"
              />
              <label htmlFor="inStock" className="text-sm font-medium">
                Đang kinh doanh
              </label>
            </div>
          </div>

          <div className="bg-card p-6 rounded-lg border border-border space-y-4">
            <h3 className="font-semibold text-lg">Phân Loại</h3>

            <div className="space-y-2">
              <label className="text-sm font-medium">Danh mục</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2 bg-background rounded-md border border-input focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                <option value="Cây Trong Nhà">Cây Trong Nhà</option>
                <option value="Cây Ngoài Trời">Cây Ngoài Trời</option>
                <option value="Chậu Cây">Chậu Cây</option>
                <option value="Phụ Kiện">Phụ Kiện</option>
                <option value="Đất & Phân Bón">Đất & Phân Bón</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Badge (Optional)</label>
              <input
                type="text"
                value={badge}
                onChange={(e) => setBadge(e.target.value)}
                placeholder="Mới, Hot, Sale..."
                className="w-full px-4 py-2 bg-background rounded-md border border-input focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
