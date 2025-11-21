"use client";

import { useParams } from "next/navigation";
import { ProductForm } from "../../../../components/ProductForm";
import { useProduct } from "@/hooks/useProducts";
import { Loader2 } from "lucide-react";

export default function EditProductPage() {
  const params = useParams();
  const productId = params?.id ? parseInt(params.id as string) : 0;
  const { data: product, isLoading } = useProduct(productId);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-bold">Không tìm thấy sản phẩm</h2>
      </div>
    );
  }

  return <ProductForm initialData={product} isEditing />;
}
