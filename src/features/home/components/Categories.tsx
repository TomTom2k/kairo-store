import { CategoryCard } from "@/shared/components/cards";
import { ScrollReveal, ParallaxSection } from "@/shared/animations";
import { Leaf } from "lucide-react";
import { getCategories } from "@/api/services/categories.service";

// Server Component cho SEO
export async function Categories() {
  const categories = await getCategories();

  return (
    <section
      className="relative py-16 md:py-20 bg-accent/30 overflow-hidden"
      aria-labelledby="categories-heading"
      itemScope
      itemType="https://schema.org/ItemList"
    >
      {/* Decorative leaves */}
      <div className="absolute top-10 left-10 opacity-5" aria-hidden="true">
        <Leaf
          className="w-48 h-48 text-primary"
          style={{ transform: "rotate(45deg)" }}
        />
      </div>
      <div className="absolute bottom-10 right-10 opacity-5" aria-hidden="true">
        <Leaf
          className="w-40 h-40 text-primary"
          style={{ transform: "rotate(-30deg)" }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header với parallax layers */}
        <div className="text-center space-y-4 mb-12">
          <ParallaxSection speed={0.7}>
            <ScrollReveal>
              <span className="inline-block px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm font-semibold text-primary">
                Khám Phá
              </span>
            </ScrollReveal>
          </ParallaxSection>

          <ParallaxSection speed={0.5}>
            <ScrollReveal>
              <h2
                id="categories-heading"
                className="text-4xl md:text-5xl font-bold tracking-tight scroll-mt-24"
                itemProp="name"
              >
                Danh Mục Sản Phẩm
              </h2>
            </ScrollReveal>
          </ParallaxSection>

          <ParallaxSection speed={0.3}>
            <ScrollReveal>
              <p
                className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed"
                itemProp="description"
              >
                Tìm kiếm cây xanh phù hợp với không gian và phong cách của bạn
              </p>
            </ScrollReveal>
          </ParallaxSection>
        </div>

        {/* Categories Grid với parallax */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category, index) => (
            <ParallaxSection key={category.id} speed={0.2 + index * 0.03}>
              <ScrollReveal delay={index * 50}>
                <article
                  itemScope
                  itemType="https://schema.org/Category"
                  itemProp="itemListElement"
                >
                  <meta itemProp="position" content={String(index + 1)} />
                  <meta itemProp="name" content={category.name} />
                  <meta
                    itemProp="description"
                    content={category.description || ""}
                  />
                  <CategoryCard category={category} index={index} />
                </article>
              </ScrollReveal>
            </ParallaxSection>
          ))}
        </div>
      </div>
    </section>
  );
}
