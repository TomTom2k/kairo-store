"use client";

import { DiscountForm } from "../../components/DiscountForm";
import { useDiscounts, useUpdateDiscount } from "@/hooks/useDiscounts";
import { useRouter, useParams } from "next/navigation";
import { useState } from "react";
import type { Discount } from "@/app/api/discounts/route";

export default function EditDiscountPage() {
  const router = useRouter();
  const params = useParams();
  const discountId = parseInt(params.id as string);

  const { data: discounts = [], isLoading } = useDiscounts();
  const updateDiscount = useUpdateDiscount();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const discount = discounts.find((d) => d.id === discountId);

  const handleSubmit = async (data: Partial<Discount>) => {
    setIsSubmitting(true);
    try {
      await updateDiscount.mutateAsync({ id: discountId, updates: data });
      router.push("/admin/discounts");
    } catch (error) {
      console.error("Error updating discount:", error);
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Đang tải...</p>
        </div>
      </div>
    );
  }

  if (!discount) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <p className="text-lg font-semibold mb-2">
            Không tìm thấy mã giảm giá
          </p>
          <p className="text-muted-foreground">
            Mã giảm giá không tồn tại hoặc đã bị xóa
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Chỉnh Sửa Mã Giảm Giá</h1>
        <p className="text-muted-foreground">
          Cập nhật thông tin mã giảm giá:{" "}
          <span className="font-mono font-bold text-primary">
            {discount.code}
          </span>
        </p>
      </div>

      <DiscountForm
        initialData={discount}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}
