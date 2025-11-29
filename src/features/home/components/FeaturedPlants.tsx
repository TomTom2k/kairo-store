import { PlantCard } from "@/shared/components/cards";
import { ScrollReveal, ParallaxSection } from "@/shared/animations";
import Link from "next/link";
import { getProducts } from "@/api/services/products.service";
import {
  adaptSupabaseProducts,
  type Product,
} from "@/lib/adapters/product.adapter";

// Server Component - Content được render server-side cho SEO
export async function FeaturedPlants() {
  // Lấy sản phẩm từ database, lấy 4 sản phẩm đầu tiên
  let plants: Product[] = [];
  try {
    const allProducts = await getProducts();
    const adaptedProducts = adaptSupabaseProducts(allProducts);
    plants = adaptedProducts.slice(0, 4);
  } catch (error) {
    console.error("Error fetching featured plants:", error);
    // Nếu có lỗi, trả về mảng rỗng để component vẫn render được
    plants = [];
  }
  return (
    <section
      className="relative py-16 md:py-20 bg-background overflow-hidden"
      aria-labelledby="featured-plants-heading"
      itemScope
      itemType="https://schema.org/ItemList"
    >
      {/* Parallax background decorations */}
      <div
        className="absolute top-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-40 left-20 w-80 h-80 bg-primary-light/5 rounded-full blur-3xl"
        aria-hidden="true"
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header với parallax layers */}
        <div className="text-center space-y-4 mb-12">
          <ParallaxSection speed={0.7}>
            <ScrollReveal>
              <span className="inline-block px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm font-semibold text-primary">
                Sản Phẩm Nổi Bật
              </span>
            </ScrollReveal>
          </ParallaxSection>

          <ParallaxSection speed={0.5}>
            <ScrollReveal>
              <h2
                id="featured-plants-heading"
                className="text-4xl md:text-5xl font-bold tracking-tight scroll-mt-24"
                itemProp="name"
              >
                <span className="gradient-animate bg-clip-text text-transparent">
                  Cây Xanh Được Yêu Thích
                </span>
              </h2>
            </ScrollReveal>
          </ParallaxSection>

          <ParallaxSection speed={0.3}>
            <ScrollReveal>
              <p
                className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed"
                itemProp="description"
              >
                Những loại cây được chọn lọc kỹ càng, phù hợp với mọi không gian
                sống
              </p>
            </ScrollReveal>
          </ParallaxSection>
        </div>

        {/* Plants Grid với parallax stagger */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 mb-8">
          {plants.map((plant, index) => (
            <ParallaxSection key={plant.id} speed={0.2 + index * 0.05}>
              <ScrollReveal delay={index * 100}>
                <article
                  itemScope
                  itemType="https://schema.org/Product"
                  itemProp="itemListElement"
                >
                  <meta itemProp="position" content={String(index + 1)} />
                  <PlantCard plant={plant} index={index} />
                </article>
              </ScrollReveal>
            </ParallaxSection>
          ))}
        </div>

        {/* View All Button */}
        <ParallaxSection speed={0.15}>
          <ScrollReveal delay={400}>
            <div className="text-center">
              <Link
                href="/categories"
                className="inline-flex items-center justify-center h-12 rounded-full px-8 border-2 border-primary bg-background hover:bg-primary hover:text-primary-foreground transition-all duration-300 font-semibold shadow-lg hover:shadow-2xl hover:scale-105"
                aria-label="Xem tất cả sản phẩm cây xanh"
              >
                Xem Tất Cả Sản Phẩm
                <span className="ml-2 transition-transform group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </div>
          </ScrollReveal>
        </ParallaxSection>
      </div>
    </section>
  );
}
