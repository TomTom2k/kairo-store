"use client";

import { Suspense } from "react";
import { Header, Footer } from "@/shared/layout";
import { ScrollIndicator } from "@/shared/ui";
import { Breadcrumbs, CategoryHeader } from "@/features/categories";
import { useProducts } from "@/hooks/useProducts";
import { Loader2 } from "lucide-react";
import { CategoriesContent } from "./CategoriesContent";

export default function CategoriesPage() {
  // Fetch products from Supabase
  const { data: products = [], isLoading, error } = useProducts();

  return (
    <div className="min-h-screen">
      <Header />

      <main className="container mx-auto px-4 pt-28 pb-16">
        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[{ label: "Danh Mục Sản Phẩm", href: "/categories" }]}
        />

        {/* Page Header */}
        <CategoryHeader
          title="Danh Mục Sản Phẩm"
          productCount={products.length}
        />

        {/* Content wrapped in Suspense */}
        <Suspense
          fallback={
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          }
        >
          <CategoriesContent products={products} />
        </Suspense>
      </main>

      <Footer />
      <ScrollIndicator />
    </div>
  );
}
