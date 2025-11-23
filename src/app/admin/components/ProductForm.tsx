"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/shared/ui";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import Link from "next/link";
import { JsonImportModal } from "./JsonImportModal";
import { useQueryClient } from "@tanstack/react-query";
import { productKeys } from "@/hooks/useProducts";
import type { Product } from "@/lib/adapters/product.adapter";
import { ImageUpload } from "@/shared/components/ImageUpload";
import { RichTextEditor } from "@/shared/components/RichTextEditor";
import { generateSlug } from "@/lib/utils/slug.utils";

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
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<{ id: number; name: string }[]>(
    []
  );
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/categories");
        const result = await response.json();
        if (result.success) {
          setCategories(result.data);
        }
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      }
    };
    fetchCategories();
  }, []);

  const handleImport = (data: any) => {
    if (data.name) setName(data.name);
    if (data.category) setCategory(data.category);
    if (data.price_estimate) {
      // Remove non-numeric characters except dot/comma if needed, but simple parsing for now
      const price = data.price_estimate.toString().replace(/[^0-9]/g, "");
      setPriceValue(price);
    }
    if (data.description) setDescription(data.description);

    if (data.care_instructions) {
      if (data.care_instructions.light)
        setCareLight(data.care_instructions.light);
      if (data.care_instructions.water)
        setCareWater(data.care_instructions.water);
      if (data.care_instructions.temperature)
        setCareTemperature(data.care_instructions.temperature);
      if (data.care_instructions.fertilizer)
        setCareFertilizer(data.care_instructions.fertilizer);
    }

    if (data.seo) {
      if (data.seo.meta_title) setMetaTitle(data.seo.meta_title);
      if (data.seo.meta_description)
        setMetaDescription(data.seo.meta_description);
      if (data.seo.keywords) setKeywords(data.seo.keywords);
      if (data.seo.slug) setSlug(data.seo.slug);
    }
  };

  // Form states
  const [name, setName] = useState(initialData?.name || "");
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

  // SEO states
  const [metaTitle, setMetaTitle] = useState(initialData?.metaTitle || "");
  const [metaDescription, setMetaDescription] = useState(
    initialData?.metaDescription || ""
  );
  const [keywords, setKeywords] = useState(initialData?.keywords || "");
  const [slug, setSlug] = useState(initialData?.slug || "");
  const [video, setVideo] = useState(initialData?.video || "");

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
        meta_title: metaTitle || null,
        meta_description: metaDescription || null,
        keywords: keywords || null,
        slug: slug || null,
        video: video || null,
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
          <Button
            type="button"
            variant="outline"
            onClick={() => setIsImportModalOpen(true)}
            className="mr-2"
          >
            Import JSON
          </Button>
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

      <JsonImportModal
        isOpen={isImportModalOpen}
        onClose={() => setIsImportModalOpen(false)}
        onImport={handleImport}
      />

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
              <RichTextEditor
                value={description}
                onChange={setDescription}
                placeholder="Mô tả chi tiết về sản phẩm..."
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

            <div className="pt-4 border-t border-border">
              <label className="text-sm font-medium mb-2 block">
                Video URL (Youtube, Vimeo...)
              </label>
              <input
                type="text"
                value={video}
                onChange={(e) => setVideo(e.target.value)}
                placeholder="https://www.youtube.com/watch?v=..."
                className="w-full px-4 py-2 bg-background rounded-md border border-input focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
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

          <div className="bg-card p-6 rounded-lg border border-border space-y-6">
            <h3 className="font-semibold text-lg">SEO & Marketing</h3>
            <p className="text-sm text-muted-foreground">
              Tối ưu hóa hiển thị trên công cụ tìm kiếm
            </p>

            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <label className="text-sm font-medium">Meta Title</label>
                  <span
                    className={`text-xs ${
                      metaTitle.length > 60
                        ? "text-destructive"
                        : "text-muted-foreground"
                    }`}
                  >
                    {metaTitle.length}/60
                  </span>
                </div>
                <input
                  type="text"
                  value={metaTitle}
                  onChange={(e) => setMetaTitle(e.target.value)}
                  placeholder={name || "Tiêu đề sản phẩm"}
                  className="w-full px-4 py-2 bg-background rounded-md border border-input focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <label className="text-sm font-medium">
                    Meta Description
                  </label>
                  <span
                    className={`text-xs ${
                      metaDescription.length > 160
                        ? "text-destructive"
                        : "text-muted-foreground"
                    }`}
                  >
                    {metaDescription.length}/160
                  </span>
                </div>
                <textarea
                  value={metaDescription}
                  onChange={(e) => setMetaDescription(e.target.value)}
                  rows={3}
                  placeholder={
                    description
                      ? description.replace(/<[^>]*>?/gm, "").substring(0, 160)
                      : "Mô tả ngắn gọn về sản phẩm..."
                  }
                  className="w-full px-4 py-2 bg-background rounded-md border border-input focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Keywords (phân cách bằng dấu phẩy)
                </label>
                <input
                  type="text"
                  value={keywords}
                  onChange={(e) => setKeywords(e.target.value)}
                  placeholder="cây cảnh, cây trong nhà, quà tặng..."
                  className="w-full px-4 py-2 bg-background rounded-md border border-input focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">URL Slug</label>
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

              {/* SEO Preview */}
              <div className="mt-6 p-4 bg-muted/30 rounded-lg border border-border">
                <h4 className="text-sm font-medium mb-3">
                  Google Search Preview
                </h4>
                <div className="bg-white p-4 rounded shadow-sm max-w-[600px]">
                  <div className="text-[#1a0dab] text-xl cursor-pointer hover:underline truncate">
                    {metaTitle || name || "Tiêu đề sản phẩm"}
                  </div>
                  <div className="text-[#006621] text-sm truncate">
                    kairo-store.com/products/
                    {slug || generateSlug(name) || "ten-san-pham"}
                  </div>
                  <div className="text-[#545454] text-sm line-clamp-2">
                    {metaDescription ||
                      (description
                        ? description.replace(/<[^>]*>?/gm, "")
                        : "Mô tả sản phẩm sẽ hiển thị ở đây...")}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          <div className="bg-card p-6 rounded-lg border border-border space-y-4">
            <h3 className="font-semibold text-lg">Giá & Kho</h3>

            <div className="space-y-2">
              <label className="text-sm font-medium">Giá (VNĐ)</label>
              <input
                type="number"
                value={priceValue}
                onChange={(e) => setPriceValue(e.target.value)}
                placeholder="150000"
                className="w-full px-4 py-2 bg-background rounded-md border border-input focus:outline-none focus:ring-2 focus:ring-primary/50"
                required
              />
              <p className="text-xs text-muted-foreground">
                Giá sẽ tự động format khi hiển thị (VD: 150.000 ₫)
              </p>
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
                <option value="">Chọn danh mục</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
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
