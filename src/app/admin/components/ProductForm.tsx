"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/shared/ui";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import Link from "next/link";
import { useQueryClient } from "@tanstack/react-query";
import { productKeys } from "@/hooks/useProducts";
import type { Product } from "@/lib/adapters/product.adapter";
import { ImageUpload } from "@/shared/components/ImageUpload";

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
  const [images, setImages] = useState<string[]>(initialData?.images || []);
  const [description, setDescription] = useState(
    initialData?.description || ""
  );
  const [quantity, setQuantity] = useState(
    initialData?.quantity?.toString() || "0"
  );
  const [badge, setBadge] = useState(initialData?.badge || "");

  // Care instruction states
  const [careLight, setCareLight] = useState(initialData?.careLight || "");
  const [careWater, setCareWater] = useState(initialData?.careWater || "");
  const [careTemperature, setCareTemperature] = useState(
    initialData?.careTemperature || ""
  );
  const [careFertilizer, setCareFertilizer] = useState(
    initialData?.careFertilizer || ""
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      if (images.length === 0) {
        throw new Error("Vui lòng thêm ít nhất một hình ảnh");
      }

      const productData = {
        name,
        price,
        price_value: parseInt(priceValue),
        rating: initialData?.rating || 0,
        images: images,
        description,
        category,
        quantity: parseInt(quantity),
        badge: badge || null,
        care_light: careLight || null,
        care_water: careWater || null,
        care_temperature: careTemperature || null,
        care_fertilizer: careFertilizer || null,
      };

      const url = isEditing
        ? `/api/products/${initialData!.id}`
        : "/api/products";
      const method = isEditing ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || "Failed to save product");
      }

      // Invalidate queries and redirect
      queryClient.invalidateQueries({ queryKey: productKeys.all });
      router.push("/admin/products");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsSubmitting(false);
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
            <p className="text-sm text-muted-foreground">
              Upload ảnh sản phẩm (ảnh đầu tiên sẽ là ảnh chính)
            </p>

            <ImageUpload
              images={images}
              onImagesChange={setImages}
              maxImages={10}
            />
          </div>

          <div className="bg-card p-6 rounded-lg border border-border space-y-4">
            <h3 className="font-semibold text-lg">Hướng Dẫn Chăm Sóc</h3>
            <p className="text-sm text-muted-foreground">
              Tùy chỉnh hướng dẫn chăm sóc cho sản phẩm này
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2">
                  <span>☀️</span>
                  Ánh Sáng
                </label>
                <textarea
                  value={careLight}
                  onChange={(e) => setCareLight(e.target.value)}
                  rows={3}
                  placeholder="Ví dụ: Ánh sáng gián tiếp, tránh ánh nắng trực tiếp"
                  className="w-full px-4 py-2 bg-background rounded-md border border-input focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2">
                  <span>💧</span>
                  Tưới Nước
                </label>
                <textarea
                  value={careWater}
                  onChange={(e) => setCareWater(e.target.value)}
                  rows={3}
                  placeholder="Ví dụ: Tưới 2-3 lần/tuần, giữ đất ẩm"
                  className="w-full px-4 py-2 bg-background rounded-md border border-input focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2">
                  <span>🌡️</span>
                  Nhiệt Độ
                </label>
                <textarea
                  value={careTemperature}
                  onChange={(e) => setCareTemperature(e.target.value)}
                  rows={3}
                  placeholder="Ví dụ: 18-25°C"
                  className="w-full px-4 py-2 bg-background rounded-md border border-input focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2">
                  <span>🌱</span>
                  Bón Phân
                </label>
                <textarea
                  value={careFertilizer}
                  onChange={(e) => setCareFertilizer(e.target.value)}
                  rows={3}
                  placeholder="Ví dụ: Bón phân 1 lần/tháng vào mùa sinh trưởng"
                  className="w-full px-4 py-2 bg-background rounded-md border border-input focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
            </div>
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
              <label className="text-sm font-medium">Số lượng tồn kho</label>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                min="0"
                placeholder="0"
                className="w-full px-4 py-2 bg-background rounded-md border border-input focus:outline-none focus:ring-2 focus:ring-primary/50"
                required
              />
              <p className="text-xs text-muted-foreground">
                Nhập số lượng sản phẩm có sẵn trong kho
              </p>
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
