"use client";

import { DiscountForm } from "../components/DiscountForm";
import { useCreateDiscount } from "@/hooks/useDiscounts";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Discount } from "@/app/api/discounts/route";

export default function NewDiscountPage() {
  const router = useRouter();
  const createDiscount = useCreateDiscount();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: Partial<Discount>) => {
    setIsSubmitting(true);
    try {
      await createDiscount.mutateAsync(data);
      router.push("/admin/discounts");
    } catch (error) {
      console.error("Error creating discount:", error);
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Tạo Mã Giảm Giá Mới</h1>
        <p className="text-muted-foreground">
          Tạo mã giảm giá hoặc voucher cho khách hàng
        </p>
      </div>

      <DiscountForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
    </div>
  );
}
