"use client";

import { Filter, X } from "lucide-react";
import { Button } from "@/shared/ui";
import { useState, useEffect } from "react";

interface Category {
  id: number;
  name: string;
}

interface ProductFiltersProps {
  selectedCategories: string[];
  onCategoryChange: (categories: string[]) => void;
  priceRange: [number, number];
  onPriceRangeChange: (range: [number, number]) => void;
  onReset: () => void;
  isMobile?: boolean;
  onClose?: () => void;
}

export function ProductFilters({
  selectedCategories,
  onCategoryChange,
  priceRange,
  onPriceRangeChange,
  onReset,
  isMobile = false,
  onClose,
}: ProductFiltersProps) {
  const [localPriceRange, setLocalPriceRange] =
    useState<[number, number]>(priceRange);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/categories");
        const result = await response.json();
        if (result.success) {
          setCategories(result.data);
        }
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      }
    };
    fetchCategories();
  }, []);

  const handleCategoryToggle = (category: string) => {
    if (category === "Tất Cả") {
      onCategoryChange([]);
    } else {
      if (selectedCategories.includes(category)) {
        onCategoryChange(selectedCategories.filter((c) => c !== category));
      } else {
        onCategoryChange([...selectedCategories, category]);
      }
    }
  };

  const handlePriceChange = (index: 0 | 1, value: number) => {
    const newRange: [number, number] = [...localPriceRange];
    newRange[index] = value;
    setLocalPriceRange(newRange);
  };

  const applyPriceRange = () => {
    onPriceRangeChange(localPriceRange);
  };

  return (
    <div className="glass rounded-xl p-6 max-h-[calc(100vh-8rem)] overflow-y-auto custom-scrollbar">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold">Bộ Lọc</h3>
        </div>
        {isMobile && onClose && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            aria-label="Đóng bộ lọc"
          >
            <X className="w-5 h-5" />
          </Button>
        )}
      </div>

      {/* Categories */}
      <div className="mb-6">
        <h4 className="font-semibold mb-3 text-sm text-muted-foreground uppercase tracking-wide">
          Danh Mục
        </h4>
        <div className="space-y-2">
          <label className="flex items-center gap-2 cursor-pointer group">
            <input
              type="checkbox"
              checked={selectedCategories.length === 0}
              onChange={() => handleCategoryToggle("Tất Cả")}
              className="w-4 h-4 rounded border-2 border-primary/30 text-primary focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer"
            />
            <span className="text-sm group-hover:text-primary transition-colors">
              Tất Cả
            </span>
          </label>
          {categories.map((category) => {
            const isSelected = selectedCategories.includes(category.name);

            return (
              <label
                key={category.id}
                className="flex items-center gap-2 cursor-pointer group"
              >
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => handleCategoryToggle(category.name)}
                  className="w-4 h-4 rounded border-2 border-primary/30 text-primary focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer"
                />
                <span className="text-sm group-hover:text-primary transition-colors">
                  {category.name}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Price Range */}
      <div className="mb-6 pb-6 border-b border-border/50">
        <h4 className="font-semibold mb-3 text-sm text-muted-foreground uppercase tracking-wide">
          Khoảng Giá
        </h4>
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <input
              type="number"
              value={localPriceRange[0]}
              onChange={(e) => handlePriceChange(0, Number(e.target.value))}
              placeholder="Từ"
              className="w-full px-3 py-2 glass rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
            <span className="text-muted-foreground">-</span>
            <input
              type="number"
              value={localPriceRange[1]}
              onChange={(e) => handlePriceChange(1, Number(e.target.value))}
              placeholder="Đến"
              className="w-full px-3 py-2 glass rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
          <Button
            onClick={applyPriceRange}
            size="sm"
            className="w-full"
            variant="outline"
          >
            Áp Dụng
          </Button>
        </div>
      </div>

      {/* Reset Button */}
      <Button
        onClick={onReset}
        variant="outline"
        className="w-full border-2 hover:bg-destructive/10 hover:border-destructive hover:text-destructive transition-all duration-300"
      >
        Xóa Bộ Lọc
      </Button>
    </div>
  );
}
