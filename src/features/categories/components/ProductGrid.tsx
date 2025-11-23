import { PlantCard } from "@/shared/components/cards";
import { ScrollReveal, ParallaxSection } from "@/shared/animations";
import { Product } from "@/lib/adapters/product.adapter";
import { Leaf } from "lucide-react";

interface ProductGridProps {
  products: Product[];
  viewMode?: "grid" | "list";
}

export function ProductGrid({ products, viewMode = "grid" }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-24 h-24 rounded-full glass flex items-center justify-center mb-6 animate-bounce-slow">
          <Leaf className="w-12 h-12 text-muted-foreground" />
        </div>
        <h3 className="text-2xl font-semibold mb-2">Không tìm thấy sản phẩm</h3>
        <p className="text-muted-foreground max-w-md">
          Không có sản phẩm nào phù hợp với bộ lọc của bạn. Hãy thử điều chỉnh
          bộ lọc hoặc xóa bộ lọc để xem tất cả sản phẩm.
        </p>
      </div>
    );
  }

  return (
    <div
      className={
        viewMode === "grid"
          ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          : "flex flex-col gap-6"
      }
    >
      {products.map((product, index) => (
        <ParallaxSection key={product.id} speed={0.2 + (index % 3) * 0.05}>
          <ScrollReveal delay={index * 50}>
            <article
              itemScope
              itemType="https://schema.org/Product"
              className={viewMode === "list" ? "max-w-2xl" : ""}
            >
              <PlantCard plant={product} index={index} />
            </article>
          </ScrollReveal>
        </ParallaxSection>
      ))}
    </div>
  );
}
