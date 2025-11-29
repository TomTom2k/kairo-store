"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  ProductFilters,
  ProductGrid,
  ProductSort,
  type SortOption,
} from "@/features/categories";
import { Filter, Search } from "lucide-react";
import { Button } from "@/shared/ui";
import type { Product } from "@/lib/adapters/product.adapter";

interface CategoriesContentProps {
  products: Product[];
}

export function CategoriesContent({ products }: CategoriesContentProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Initialize filter states from URL params
  const [selectedCategories, setSelectedCategories] = useState<string[]>(() => {
    const categoryParam = searchParams.get("category");
    // Support multiple categories separated by comma
    return categoryParam ? categoryParam.split(",").filter(Boolean) : [];
  });
  const [priceRange, setPriceRange] = useState<[number, number]>(() => {
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    return [
      minPrice ? parseInt(minPrice) : 0,
      maxPrice ? parseInt(maxPrice) : 1000000,
    ];
  });
  const [sortOption, setSortOption] = useState<SortOption>(() => {
    const sort = searchParams.get("sort");
    return (sort as SortOption) || "default";
  });
  const [searchQuery, setSearchQuery] = useState<string>(() => {
    return searchParams.get("q") || "";
  });
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();

    // Support multiple categories separated by comma
    if (selectedCategories.length > 0) {
      params.set("category", selectedCategories.join(","));
    }
    if (priceRange[0] !== 0) params.set("minPrice", priceRange[0].toString());
    if (priceRange[1] !== 1000000)
      params.set("maxPrice", priceRange[1].toString());
    if (sortOption !== "default") params.set("sort", sortOption);
    if (searchQuery) params.set("q", searchQuery);

    const newUrl = params.toString() ? `?${params.toString()}` : "/categories";
    router.replace(newUrl, { scroll: false });
  }, [selectedCategories, priceRange, sortOption, searchQuery, router]);

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = [...products];

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query)
      );
    }

    // Filter by category
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((product) =>
        selectedCategories.includes(product.category)
      );
    }

    // Filter by price range
    filtered = filtered.filter(
      (product) =>
        product.priceValue >= priceRange[0] &&
        product.priceValue <= priceRange[1]
    );

    // Sort products
    switch (sortOption) {
      case "price-asc":
        filtered.sort((a, b) => a.priceValue - b.priceValue);
        break;
      case "price-desc":
        filtered.sort((a, b) => b.priceValue - a.priceValue);
        break;
      case "rating-desc":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "name-asc":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        filtered.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        // Keep default order
        break;
    }

    return filtered;
  }, [products, searchQuery, selectedCategories, priceRange, sortOption]);

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategories([]);
    setPriceRange([0, 1000000]);
    setSortOption("default");
  };

  return (
    <>
      {/* Mobile Toolbar */}
      <div className="lg:hidden mb-6 space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Tìm kiếm sản phẩm..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 glass rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          />
        </div>
        {/* Filter and Sort */}
        <div className="sticky top-28 flex items-center justify-between gap-2">
          <Button
            onClick={() => setIsMobileFilterOpen(true)}
            className="flex items-center gap-2"
            variant="outline"
          >
            <Filter className="w-4 h-4" />
            Bộ Lọc
          </Button>
          <ProductSort value={sortOption} onChange={setSortOption} />
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Desktop Filters Sidebar */}
        <aside className="hidden lg:block">
          <div className="sticky top-28 h-fit">
            <ProductFilters
              selectedCategories={selectedCategories}
              onCategoryChange={setSelectedCategories}
              priceRange={priceRange}
              onPriceRangeChange={setPriceRange}
              onReset={handleResetFilters}
            />
          </div>
        </aside>

        {/* Products Grid */}
        <div className="lg:col-span-3">
          {/* Desktop Toolbar */}
          <div className="hidden lg:flex justify-between items-center gap-4 mb-6">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Tìm kiếm sản phẩm..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 glass rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              />
            </div>
            {/* Sort */}
            <ProductSort value={sortOption} onChange={setSortOption} />
          </div>

          <ProductGrid products={filteredAndSortedProducts} viewMode="grid" />
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      {isMobileFilterOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden animate-fade-in"
            onClick={() => setIsMobileFilterOpen(false)}
          />

          {/* Drawer */}
          <div className="fixed inset-y-0 left-0 w-80 max-w-[85vw] glass border-r border-border z-50 lg:hidden animate-slide-in-left overflow-y-auto">
            <div className="p-6">
              <ProductFilters
                selectedCategories={selectedCategories}
                onCategoryChange={setSelectedCategories}
                priceRange={priceRange}
                onPriceRangeChange={setPriceRange}
                onReset={handleResetFilters}
                isMobile={true}
                onClose={() => setIsMobileFilterOpen(false)}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
}
