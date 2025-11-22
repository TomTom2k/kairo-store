"use client";

import { useState } from "react";
import { Button } from "@/shared/ui";
import { Tag, X, CheckCircle2 } from "lucide-react";
import { useValidateDiscount } from "@/hooks/useDiscounts";

interface VoucherInputProps {
  orderTotal: number;
  onDiscountApplied: (discount: {
    discountId: number;
    code: string;
    discountAmount: number;
    finalTotal: number;
  }) => void;
  onDiscountRemoved: () => void;
}

export function VoucherInput({
  orderTotal,
  onDiscountApplied,
  onDiscountRemoved,
}: VoucherInputProps) {
  const [code, setCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState<{
    code: string;
    discountAmount: number;
  } | null>(null);
  const [error, setError] = useState("");

  const validateDiscount = useValidateDiscount();

  const handleApply = async () => {
    if (!code.trim()) {
      setError("Vui lòng nhập mã giảm giá");
      return;
    }

    setError("");

    try {
      const result = await validateDiscount.mutateAsync({
        code: code.trim(),
        orderTotal,
      });

      setAppliedDiscount({
        code: result.code,
        discountAmount: result.discountAmount,
      });

      onDiscountApplied(result);
      setCode("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Mã giảm giá không hợp lệ");
    }
  };

  const handleRemove = () => {
    setAppliedDiscount(null);
    setError("");
    setCode("");
    onDiscountRemoved();
  };

  if (appliedDiscount) {
    return (
      <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3 flex-1">
            <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-green-800 dark:text-green-300">
                Mã giảm giá đã áp dụng
              </p>
              <p className="text-xs text-green-600 dark:text-green-400 mt-1 font-mono font-bold">
                {appliedDiscount.code}
              </p>
              <p className="text-sm text-green-700 dark:text-green-300 mt-1">
                Giảm{" "}
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(appliedDiscount.discountAmount)}
              </p>
            </div>
          </div>
          <button
            onClick={handleRemove}
            className="text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-200 transition-colors flex-shrink-0"
            aria-label="Xóa mã giảm giá"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            value={code}
            onChange={(e) => {
              setCode(e.target.value.toUpperCase());
              setError("");
            }}
            placeholder="Nhập mã giảm giá..."
            className="w-full pl-10 pr-4 py-2 bg-background rounded-md border border-input focus:outline-none focus:ring-2 focus:ring-primary/50 uppercase font-mono"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleApply();
              }
            }}
          />
        </div>
        <Button
          type="button"
          onClick={handleApply}
          disabled={validateDiscount.isPending || !code.trim()}
          className="px-6"
        >
          {validateDiscount.isPending ? "Đang kiểm tra..." : "Áp dụng"}
        </Button>
      </div>

      {error && (
        <p className="text-sm text-red-600 dark:text-red-400 flex items-center gap-2">
          <X className="w-4 h-4" />
          {error}
        </p>
      )}
    </div>
  );
}
