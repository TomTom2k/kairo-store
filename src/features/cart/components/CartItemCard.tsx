"use client";

import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import { CartItem } from "@/api/types";
import { Button } from "@/shared/ui";
import { useCartStore } from "@/store/useCartStore";
import { useState } from "react";

interface CartItemCardProps {
  item: CartItem;
}

export function CartItemCard({ item }: CartItemCardProps) {
  const { updateQuantity, removeItem } = useCartStore();
  const [isRemoving, setIsRemoving] = useState(false);

  const handleQuantityChange = (delta: number) => {
    const newQuantity = item.quantity + delta;
    if (newQuantity >= 1 && newQuantity <= 99) {
      updateQuantity(item.id, newQuantity);
    }
  };

  const handleRemove = () => {
    setIsRemoving(true);
    setTimeout(() => {
      removeItem(item.id);
    }, 300);
  };

  const subtotal = item.product.priceValue * item.quantity;

  return (
    <div
      className={`glass rounded-xl p-4 md:p-6 transition-all duration-300 ${
        isRemoving ? "opacity-0 scale-95" : "opacity-100 scale-100"
      }`}
    >
      <div className="flex gap-4 md:gap-6">
        {/* Product Image */}
        <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-lg overflow-hidden flex-shrink-0">
          <Image
            src={item.product.images[0]}
            alt={item.product.name}
            fill
            className="object-cover"
          />
        </div>

        {/* Product Info */}
        <div className="flex-1 min-w-0">
          <div className="flex justify-between gap-4">
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-lg mb-1 truncate">
                {item.product.name}
              </h3>
              <p className="text-sm text-muted-foreground mb-2">
                {item.product.category}
              </p>
              <p className="text-primary font-bold text-lg">
                {item.product.price}
              </p>
            </div>

            {/* Remove Button - Desktop */}
            <button
              onClick={handleRemove}
              className="hidden md:flex items-center justify-center w-10 h-10 rounded-lg hover:bg-red-500/10 text-red-500 transition-colors"
              aria-label="Xóa sản phẩm"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>

          {/* Quantity Controls & Subtotal */}
          <div className="flex items-center justify-between mt-4 gap-4">
            {/* Quantity Selector */}
            <div className="flex items-center glass rounded-lg">
              <button
                onClick={() => handleQuantityChange(-1)}
                disabled={item.quantity <= 1}
                className="p-2 hover:bg-primary/10 transition-colors rounded-l-lg disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Giảm số lượng"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="px-4 py-2 font-semibold min-w-[50px] text-center">
                {item.quantity}
              </span>
              <button
                onClick={() => handleQuantityChange(1)}
                disabled={item.quantity >= 99}
                className="p-2 hover:bg-primary/10 transition-colors rounded-r-lg disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Tăng số lượng"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* Subtotal */}
            <div className="text-right">
              <p className="text-xs text-muted-foreground mb-1">Tạm tính</p>
              <p className="font-bold text-lg text-primary">
                {subtotal.toLocaleString("vi-VN")}đ
              </p>
            </div>
          </div>

          {/* Remove Button - Mobile */}
          <button
            onClick={handleRemove}
            className="md:hidden flex items-center gap-2 mt-3 text-red-500 text-sm hover:underline"
            aria-label="Xóa sản phẩm"
          >
            <Trash2 className="w-4 h-4" />
            Xóa sản phẩm
          </button>
        </div>
      </div>
    </div>
  );
}
