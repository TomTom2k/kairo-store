"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Button,
} from "@/shared/ui";
import { ShoppingCart, Star, Sparkles, Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { TiltCard, ShimmerEffect } from "@/shared/animations";
import { useCartStore } from "@/store/useCartStore";
import { Toast } from "@/shared/components/Toast";
import { useAverageRating } from "@/hooks/useReviews";
import type { Product } from "@/lib/adapters/product.adapter";

export function PlantCard({ plant, index }: { plant: Product; index: number }) {
  const { addItem } = useCartStore();
  const [isAdding, setIsAdding] = useState(false);
  const [showToast, setShowToast] = useState(false);

  // Get average rating from reviews
  const { data: averageRating = 0, isLoading: isLoadingRating } =
    useAverageRating(plant.id);

  // Use rating from reviews if available, otherwise fallback to 0
  const displayRating = averageRating > 0 ? averageRating : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation
    e.stopPropagation(); // Stop event bubbling

    setIsAdding(true);
    addItem(plant, 1); // Add 1 item to cart
    setShowToast(true); // Show toast notification

    setTimeout(() => setIsAdding(false), 1000);
  };

  // Different animations for variety
  const animations = [
    "animate-bounce-in-up",
    "animate-slide-in-left-fade",
    "animate-slide-in-right-fade",
    "animate-zoom-in-bounce",
    "animate-fade-in-scale",
    "animate-flip-in",
  ];

  const animationClass = animations[index % animations.length];
  const animationDelay = (index % 3) * 0.1;
  const productLink = plant.slug
    ? `/products/${plant.slug}`
    : `/products/${plant.id}`;

  return (
    <>
      <TiltCard intensity={10}>
        <Link href={productLink} className="block">
          <Card
            className={`group relative overflow-hidden border-2 hover:border-primary/50 transition-all duration-500 hover:shadow-2xl glass-card ${animationClass}`}
            style={{ animationDelay: `${animationDelay}s` }}
          >
            {/* Schema.org markup */}
            <meta itemProp="name" content={plant.name} />
            <meta itemProp="description" content={plant.description} />
            <meta itemProp="category" content={plant.category} />

            <div
              itemProp="offers"
              itemScope
              itemType="https://schema.org/Offer"
            >
              <meta itemProp="price" content={String(plant.priceValue)} />
              <meta itemProp="priceCurrency" content="VND" />
              <meta
                itemProp="availability"
                content="https://schema.org/InStock"
              />
            </div>

            {displayRating > 0 && (
              <div
                itemProp="aggregateRating"
                itemScope
                itemType="https://schema.org/AggregateRating"
              >
                <meta itemProp="ratingValue" content={String(displayRating)} />
                <meta itemProp="bestRating" content="5" />
              </div>
            )}

            {/* Shimmer effect on hover */}
            <ShimmerEffect className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />

            {/* Badge */}
            {plant.badge && (
              <div className="absolute top-4 left-4 z-20 px-3 py-1 bg-gradient-to-r from-primary to-primary-light text-primary-foreground text-xs font-semibold rounded-full shadow-lg animate-bounce-in backdrop-blur-sm">
                <span className="flex items-center gap-1">
                  <Sparkles className="w-3 h-3 animate-pulse" />
                  {plant.badge}
                </span>
              </div>
            )}

            {/* Image Container với multiple effects */}
            <div className="relative h-64 overflow-hidden bg-gradient-to-br from-accent/20 to-primary/5">
              <Image
                src={plant.images?.[0] || "/placeholder.jpg"}
                alt={`${plant.name} - ${plant.description}`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                className="object-cover group-hover:scale-110 group-hover:rotate-2 transition-all duration-700 ease-out"
                itemProp="image"
                loading={index < 2 ? "eager" : "lazy"}
                priority={index < 2}
              />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Quick view text */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                <span className="px-4 py-2 bg-primary text-primary-foreground rounded-full text-sm font-semibold shadow-lg animate-scale-in">
                  Xem Chi Tiết
                </span>
              </div>
            </div>

            <CardHeader className="relative">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl group-hover:text-primary transition-colors duration-300">
                  {plant.name}
                </CardTitle>
                {!isLoadingRating && displayRating > 0 && (
                  <div className="flex items-center gap-1 bg-primary/10 px-2 py-1 rounded-full animate-scale-in">
                    <Star
                      className="w-4 h-4 fill-primary text-primary animate-pulse-subtle"
                      aria-hidden="true"
                    />
                    <span className="text-sm font-semibold text-primary">
                      {displayRating.toFixed(1)}
                    </span>
                  </div>
                )}
                {!isLoadingRating && displayRating === 0 && (
                  <div className="flex items-center gap-1 bg-muted/50 px-2 py-1 rounded-full">
                    <Star
                      className="w-4 h-4 text-muted-foreground"
                      aria-hidden="true"
                    />
                    <span className="text-xs text-muted-foreground">-</span>
                  </div>
                )}
              </div>
              <CardDescription className="group-hover:text-foreground transition-colors line-clamp-2">
                {plant.description.replace(/<[^>]*>/g, "").substring(0, 100)}
                ...
              </CardDescription>
            </CardHeader>

            <CardContent>
              <div className="text-2xl font-bold bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent animate-gradient">
                {plant.price}
              </div>
            </CardContent>

            <CardFooter className="gap-2">
              <Button
                className={`flex-1 group/btn relative overflow-hidden transition-all duration-300 ${
                  isAdding ? "bg-green-500" : ""
                }`}
                variant="outline"
                onClick={handleAddToCart}
                aria-label={`Thêm ${plant.name} vào giỏ hàng`}
              >
                <ShoppingCart
                  className={`w-4 h-4 mr-2 transition-transform duration-300 ${
                    isAdding ? "animate-bounce-in" : "group-hover/btn:scale-110"
                  }`}
                />
                <span className="relative z-10">
                  {isAdding ? "Đã Thêm!" : "Thêm Vào Giỏ"}
                </span>

                {/* Animated background */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary-light/20 translate-x-[-100%] group-hover/btn:translate-x-0 transition-transform duration-300" />
              </Button>
            </CardFooter>

            {/* Glow effect on hover */}
            <div className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl bg-gradient-to-r from-primary/20 to-primary-light/20" />
          </Card>
        </Link>
      </TiltCard>

      {/* Toast Notification - Outside TiltCard for proper fixed positioning */}
      <Toast
        message="Đã thêm 1 sản phẩm vào giỏ hàng!"
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />
    </>
  );
}
