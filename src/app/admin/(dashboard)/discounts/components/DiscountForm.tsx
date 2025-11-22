"use client";

import { useState } from "react";
import { Button } from "@/shared/ui";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { Discount } from "@/app/api/discounts/route";

interface DiscountFormProps {
  initialData?: Partial<Discount>;
  onSubmit: (data: Partial<Discount>) => Promise<void>;
  isSubmitting: boolean;
}

export function DiscountForm({
  initialData,
  onSubmit,
  isSubmitting,
}: DiscountFormProps) {
  const router = useRouter();
  const [code, setCode] = useState(initialData?.code || "");
  const [type, setType] = useState<"percentage" | "fixed">(
    initialData?.type || "percentage"
  );
  const [value, setValue] = useState(initialData?.value?.toString() || "");
  const [minOrderValue, setMinOrderValue] = useState(
    initialData?.minOrderValue?.toString() || "0"
  );
  const [maxDiscountAmount, setMaxDiscountAmount] = useState(
    initialData?.maxDiscountAmount?.toString() || ""
  );
  const [usageLimit, setUsageLimit] = useState(
    initialData?.usageLimit?.toString() || ""
  );
  const [validFrom, setValidFrom] = useState(
    initialData?.validFrom
      ? new Date(initialData.validFrom).toISOString().slice(0, 16)
      : ""
  );
  const [validTo, setValidTo] = useState(
    initialData?.validTo
      ? new Date(initialData.validTo).toISOString().slice(0, 16)
      : ""
  );
  const [isActive, setIsActive] = useState(initialData?.isActive !== false);
  const [description, setDescription] = useState(
    initialData?.description || ""
  );
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      // Validation
      if (!code.trim()) {
        throw new Error("Vui lòng nhập mã giảm giá");
      }

      if (!value || parseFloat(value) <= 0) {
        throw new Error("Giá trị giảm giá phải lớn hơn 0");
      }

      if (type === "percentage" && parseFloat(value) > 100) {
        throw new Error("Phần trăm giảm giá không được vượt quá 100%");
      }

      const formData: Partial<Discount> = {
        code: code.toUpperCase().trim(),
        type,
        value: parseFloat(value),
        minOrderValue: parseFloat(minOrderValue) || 0,
        maxDiscountAmount: maxDiscountAmount
          ? parseFloat(maxDiscountAmount)
          : null,
        usageLimit: usageLimit ? parseInt(usageLimit) : null,
        validFrom: validFrom || null,
        validTo: validTo || null,
        isActive,
        description: description.trim() || null,
      };

      await onSubmit(formData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Có lỗi xảy ra");
    }
  };

  const generateCode = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let code = "";
    for (let i = 0; i < 8; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCode(code);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-400 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Code */}
          <div className="bg-card p-6 rounded-lg border border-border space-y-4">
            <h3 className="font-semibold text-lg">Thông Tin Mã</h3>

            <div>
              <label className="block text-sm font-medium mb-2">
                Mã Giảm Giá <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value.toUpperCase())}
                  placeholder="VD: SUMMER2024"
                  className="flex-1 px-4 py-2 bg-background rounded-md border border-input focus:outline-none focus:ring-2 focus:ring-primary/50"
                  required
                />
                <Button type="button" variant="outline" onClick={generateCode}>
                  Tạo Tự Động
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Mã sẽ tự động chuyển thành chữ in hoa
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Mô Tả</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Mô tả về mã giảm giá..."
                rows={3}
                className="w-full px-4 py-2 bg-background rounded-md border border-input focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="isActive"
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
                className="w-4 h-4 rounded border-input"
              />
              <label htmlFor="isActive" className="text-sm font-medium">
                Kích hoạt mã giảm giá
              </label>
            </div>
          </div>

          {/* Discount Value */}
          <div className="bg-card p-6 rounded-lg border border-border space-y-4">
            <h3 className="font-semibold text-lg">Giá Trị Giảm</h3>

            <div>
              <label className="block text-sm font-medium mb-2">
                Loại Giảm Giá <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setType("percentage")}
                  className={`px-4 py-3 rounded-lg border-2 transition-all ${
                    type === "percentage"
                      ? "border-primary bg-primary/10 text-primary font-medium"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  Phần Trăm (%)
                </button>
                <button
                  type="button"
                  onClick={() => setType("fixed")}
                  className={`px-4 py-3 rounded-lg border-2 transition-all ${
                    type === "fixed"
                      ? "border-primary bg-primary/10 text-primary font-medium"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  Số Tiền Cố Định (₫)
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Giá Trị <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder={type === "percentage" ? "10" : "50000"}
                  min="0"
                  max={type === "percentage" ? "100" : undefined}
                  step={type === "percentage" ? "1" : "1000"}
                  className="w-full px-4 py-2 pr-12 bg-background rounded-md border border-input focus:outline-none focus:ring-2 focus:ring-primary/50"
                  required
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                  {type === "percentage" ? "%" : "₫"}
                </span>
              </div>
            </div>

            {type === "percentage" && (
              <div>
                <label className="block text-sm font-medium mb-2">
                  Giảm Tối Đa (₫)
                </label>
                <input
                  type="number"
                  value={maxDiscountAmount}
                  onChange={(e) => setMaxDiscountAmount(e.target.value)}
                  placeholder="50000"
                  min="0"
                  step="1000"
                  className="w-full px-4 py-2 bg-background rounded-md border border-input focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Để trống nếu không giới hạn
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Conditions */}
          <div className="bg-card p-6 rounded-lg border border-border space-y-4">
            <h3 className="font-semibold text-lg">Điều Kiện</h3>

            <div>
              <label className="block text-sm font-medium mb-2">
                Giá Trị Đơn Hàng Tối Thiểu (₫)
              </label>
              <input
                type="number"
                value={minOrderValue}
                onChange={(e) => setMinOrderValue(e.target.value)}
                placeholder="0"
                min="0"
                step="1000"
                className="w-full px-4 py-2 bg-background rounded-md border border-input focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Giới Hạn Số Lượt Sử Dụng
              </label>
              <input
                type="number"
                value={usageLimit}
                onChange={(e) => setUsageLimit(e.target.value)}
                placeholder="100"
                min="0"
                className="w-full px-4 py-2 bg-background rounded-md border border-input focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Để trống nếu không giới hạn
              </p>
            </div>
          </div>

          {/* Valid Period */}
          <div className="bg-card p-6 rounded-lg border border-border space-y-4">
            <h3 className="font-semibold text-lg">Thời Hạn</h3>

            <div>
              <label className="block text-sm font-medium mb-2">Bắt Đầu</label>
              <input
                type="datetime-local"
                value={validFrom}
                onChange={(e) => setValidFrom(e.target.value)}
                className="w-full px-4 py-2 bg-background rounded-md border border-input focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Kết Thúc</label>
              <input
                type="datetime-local"
                value={validTo}
                onChange={(e) => setValidTo(e.target.value)}
                className="w-full px-4 py-2 bg-background rounded-md border border-input focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>

            <p className="text-xs text-muted-foreground">
              Để trống nếu không giới hạn thời gian
            </p>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between pt-6 border-t border-border">
        <Link href="/admin/discounts">
          <Button type="button" variant="ghost" className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Quay Lại
          </Button>
        </Link>

        <Button type="submit" disabled={isSubmitting} className="gap-2">
          {isSubmitting ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Đang lưu...
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              Lưu Mã Giảm Giá
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
