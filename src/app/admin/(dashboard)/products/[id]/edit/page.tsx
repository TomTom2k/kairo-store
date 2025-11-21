"use client";

import { useEffect, useState } from "react";
import { useParams, notFound } from "next/navigation";
import { ProductForm } from "../../../../components/ProductForm";
import type { Product } from "@/lib/adapters/product.adapter";

export default function EditProductPage() {
  const params = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productId = parseInt(params.id as string);

        if (isNaN(productId)) {
          notFound();
          return;
        }

        const response = await fetch(`/api/products/${productId}`);
        const result = await response.json();

        if (!response.ok || !result.success) {
          if (response.status === 404) {
            notFound();
            return;
          }
          throw new Error(result.error || "Failed to fetch product");
        }

        setProduct(result.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [params.id]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Đang tải dữ liệu...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <p className="text-destructive mb-2">Lỗi: {error}</p>
          <p className="text-muted-foreground">Vui lòng thử lại sau</p>
        </div>
      </div>
    );
  }

  if (!product) {
    notFound();
    return null;
  }

  return <ProductForm initialData={product} isEditing />;
}
