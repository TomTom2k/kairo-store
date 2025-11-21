"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
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
import { useProduct, useRelatedProducts } from "@/hooks/useProducts";
import { useReviews, useCreateReview } from "@/hooks/useReviews";

export default function ProductPage() {
  const params = useParams();
  const productId = params?.id ? parseInt(params.id as string) : 0;

  const [showToast, setShowToast] = useState(false);

  // Fetch product data
  const { data: product, isLoading: isProductLoading } = useProduct(productId);

  // Fetch reviews
  const { data: reviews = [] } = useReviews(productId);

  // Create review mutation
  const createReviewMutation = useCreateReview();

  // Fetch related products
  const { data: relatedProducts = [] } = useRelatedProducts(
    productId,
    product?.category || "",
    4
  );

  const handleReviewSubmit = async (reviewData: {
    rating: number;
    comment: string;
    name: string;
  }) => {
    try {
      await createReviewMutation.mutateAsync({
        product_id: productId,
        ...reviewData,
      });
      setShowToast(true);
    } catch (error) {
      console.error("Failed to submit review:", error);
      // Could add error toast here
    }
  };

  // Loading state
  if (isProductLoading) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="container mx-auto px-4 pt-28 pb-16">
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="text-lg text-muted-foreground">
                Đang tải sản phẩm...
              </p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Product not found
  if (!product) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="container mx-auto px-4 pt-28 pb-16">
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center space-y-4">
              <h1 className="text-4xl font-bold">Không tìm thấy sản phẩm</h1>
              <p className="text-muted-foreground">
                Sản phẩm bạn đang tìm kiếm không tồn tại.
              </p>
              <a
                href="/categories"
                className="inline-block px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                Quay lại danh mục
              </a>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />

      <main className="container mx-auto px-4 pt-28 pb-16">
        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[
            { label: "Danh Mục", href: "/categories" },
            { label: product.category, href: "/categories" },
            { label: product.name, href: `/products/${product.id}` },
          ]}
        />

        {/* Product Detail Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mt-8">
          {/* Left: Image Gallery */}
          <ProductImageGallery
            productName={product.name}
            images={product.images}
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
