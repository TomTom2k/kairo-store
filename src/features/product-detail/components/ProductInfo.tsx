"use client";

import { useState } from "react";
import {
  Star,
  Minus,
  Plus,
  ShoppingCart,
  Heart,
  Share2,
  Check,
} from "lucide-react";
import { Button } from "@/shared/ui";
import { useCartStore } from "@/store/useCartStore";
import { Product } from "@/api/types";
import { Toast } from "@/shared/components/Toast";
import { useAverageRating } from "@/hooks/useReviews";

interface ProductInfoProps {
  product: Product;
}

export function ProductInfo({ product }: ProductInfoProps) {
  const { addItem } = useCartStore();
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [showAddToCartToast, setShowAddToCartToast] = useState(false);

  // Get average rating from reviews
  const { data: averageRating = 0, isLoading: isLoadingRating } =
    useAverageRating(product.id);

  const handleQuantityChange = (delta: number) => {
    setQuantity((prev) => Math.max(1, Math.min(99, prev + delta)));
  };

  const handleAddToCart = () => {
    setIsAdding(true);

    // Add to cart via Zustand store
    addItem(product, quantity);

    // Show toast notification
    setShowAddToCartToast(true);

    // Show success feedback
    setTimeout(() => {
      setIsAdding(false);
      // Reset quantity after adding
      setQuantity(1);
    }, 600);
  };

  const handleCopyLink = async () => {
    try {
      const productUrl = `${window.location.origin}/products/${
        product.slug || product.id
      }`;
      await navigator.clipboard.writeText(productUrl);
      setIsCopied(true);
      setShowToast(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="space-y-6">
      {/* Category & Badge */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="px-3 py-1 rounded-full glass text-xs font-medium">
          {product.category}
        </span>
        {product.badge && (
          <span className="px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-semibold">
            {product.badge}
          </span>
        )}
      </div>

      {/* Product Name */}
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
        <span className="bg-gradient-to-r from-primary via-primary-light to-primary bg-clip-text text-transparent">
          {product.name}
        </span>
      </h1>

      {/* Rating & Stock */}
      <div className="flex items-center gap-4 flex-wrap">
        {!isLoadingRating && averageRating > 0 && (
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-5 h-5 ${
                  i < Math.floor(averageRating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300"
                }`}
              />
            ))}
            <span className="ml-2 text-sm text-muted-foreground">
              ({averageRating.toFixed(1)})
            </span>
          </div>
        )}
        {!isLoadingRating && averageRating === 0 && (
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className="w-5 h-5 text-gray-300"
              />
            ))}
            <span className="ml-2 text-sm text-muted-foreground">
              (Chưa có đánh giá)
            </span>
          </div>
        )}
        <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-600 text-sm font-medium">
          {product.stock}
        </span>
      </div>

      {/* Price */}
      <div className="py-4 border-y border-border">
        <p className="text-4xl font-bold text-primary">{product.price}</p>
      </div>

      {/* Description */}
      {/* Description */}
      <div
        className="text-muted-foreground leading-relaxed prose prose-sm max-w-none"
        dangerouslySetInnerHTML={{ __html: product.description }}
      />

      {/* Quantity Selector */}
      <div className="space-y-3">
        <label className="text-sm font-medium">Số lượng</label>
        <div className="flex items-center gap-3">
          <div className="flex items-center glass rounded-lg">
            <button
              onClick={() => handleQuantityChange(-1)}
              className="p-3 hover:bg-primary/10 transition-colors rounded-l-lg"
              aria-label="Giảm số lượng"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="px-6 py-3 font-semibold min-w-[60px] text-center">
              {quantity}
            </span>
            <button
              onClick={() => handleQuantityChange(1)}
              className="p-3 hover:bg-primary/10 transition-colors rounded-r-lg"
              aria-label="Tăng số lượng"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <Button
          onClick={handleAddToCart}
          disabled={isAdding}
          className={`flex-1 flex items-center justify-center gap-2 py-6 text-base font-semibold group/btn relative overflow-hidden ${
            isAdding ? "bg-green-600 hover:bg-green-600" : ""
          }`}
          size="lg"
        >
          {isAdding ? (
            <>
              <Check className="w-5 h-5 animate-bounce-in" />
              Đã Thêm!
            </>
          ) : (
            <>
              <ShoppingCart className="w-5 h-5 group-hover/btn:scale-110 transition-transform" />
              Thêm Vào Giỏ
            </>
          )}
        </Button>
        <Button
          variant="outline"
          size="lg"
          onClick={() => setIsFavorite(!isFavorite)}
          className={`p-6 ${isFavorite ? "text-red-500" : ""}`}
          aria-label="Yêu thích"
        >
          <Heart className={`w-5 h-5 ${isFavorite ? "fill-current" : ""}`} />
        </Button>
        <Button
          variant="outline"
          size="lg"
          onClick={handleCopyLink}
          className={`p-6 ${
            isCopied ? "bg-green-600 hover:bg-green-600 text-white" : ""
          }`}
          aria-label="Chia sẻ"
        >
          {isCopied ? (
            <Check className="w-5 h-5 animate-bounce-in" />
          ) : (
            <Share2 className="w-5 h-5" />
          )}
        </Button>
      </div>

      {/* Additional Info */}
      <div className="glass rounded-lg p-4 space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Giao hàng:</span>
          <span className="font-medium">Miễn phí toàn quốc</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Bảo hành:</span>
          <span className="font-medium">7 ngày đổi trả</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Thời gian giao:</span>
          <span className="font-medium">2-3 ngày</span>
        </div>
      </div>

      {/* Toast Notification - Copy Link */}
      <Toast
        message="Đã copy link sản phẩm!"
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />

      {/* Toast Notification - Add to Cart */}
      <Toast
        message={`Đã thêm ${quantity} sản phẩm vào giỏ hàng!`}
        isVisible={showAddToCartToast}
        onClose={() => setShowAddToCartToast(false)}
      />
    </div>
  );
}
