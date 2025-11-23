"use client";

import { useState } from "react";
import { Header, Footer } from "@/shared/layout";
import { ScrollIndicator } from "@/shared/ui";
import { Breadcrumbs } from "@/features/categories";
import {
  ProductImageGallery,
  ProductInfo,
  ProductTabs,
  RelatedProducts,
  WriteReview,
  ReviewList,
} from "@/features/product-detail";
import { Toast } from "@/shared/components/Toast";
import { useRelatedProducts } from "@/hooks/useProducts";
import { useReviews, useCreateReview } from "@/hooks/useReviews";
import type { Product } from "@/lib/adapters/product.adapter";

interface ProductDetailClientProps {
  product: Product;
}

export function ProductDetailClient({ product }: ProductDetailClientProps) {
  const [showToast, setShowToast] = useState(false);

  // Fetch reviews
  const { data: reviews = [] } = useReviews(product.id);

  // Create review mutation
  const createReviewMutation = useCreateReview();

  // Fetch related products
  const { data: relatedProducts = [] } = useRelatedProducts(
    product.id,
    product.category || "",
    4
  );

  const handleReviewSubmit = async (reviewData: {
    rating: number;
    comment: string;
    name: string;
  }) => {
    try {
      await createReviewMutation.mutateAsync({
        product_id: product.id,
        ...reviewData,
      });
      setShowToast(true);
    } catch (error) {
      console.error("Failed to submit review:", error);
    }
  };

  return (
    <div className="min-h-screen">
      <Header />

      <main className="container mx-auto px-4 pt-28 pb-16">
        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[
            { label: "Danh Mục", href: "/categories" },
            {
              label: product.category,
              href: `/categories?category=${product.category}`,
            },
            {
              label: product.name,
              href: `/products/${product.slug || product.id}`,
            },
          ]}
        />

        {/* Product Detail Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mt-8">
          {/* Left: Image Gallery */}
          <ProductImageGallery
            productName={product.name}
            images={product.images}
            video={product.video}
          />

          {/* Right: Product Info */}
          <ProductInfo product={product} />
        </div>

        {/* Product Tabs */}
        <div className="mt-16">
          <ProductTabs
            description={product.description}
            category={product.category}
            careLight={product.careLight}
            careWater={product.careWater}
            careTemperature={product.careTemperature}
            careFertilizer={product.careFertilizer}
          />
        </div>

        {/* Reviews Section */}
        <div className="mt-16 space-y-8">
          <h2 className="text-2xl font-bold">Đánh Giá Sản Phẩm</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Write Review */}
            <WriteReview
              productId={product.id}
              onSubmit={handleReviewSubmit}
              isSubmitting={createReviewMutation.isPending}
            />

            {/* Review List */}
            <div>
              <h3 className="text-lg font-semibold mb-4">
                Đánh giá từ khách hàng ({reviews.length})
              </h3>
              <ReviewList reviews={reviews} />
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <RelatedProducts
            products={relatedProducts}
            currentProductId={product.id}
          />
        </div>
      </main>

      <Footer />
      <ScrollIndicator />

      {/* Toast Notification */}
      <Toast
        message="Cảm ơn bạn đã đánh giá sản phẩm!"
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />
    </div>
  );
}
