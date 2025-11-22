import { Star } from "lucide-react";
import Image from "next/image";
import { PlantCard } from "@/shared/components/cards";
import { ScrollReveal, ParallaxSection } from "@/shared/animations";
import Link from "next/link";

const plants = [
  {
    id: 1,
    name: "Monstera Deliciosa",
    price: "599.000đ",
    priceValue: 599000,
    rating: 4.8,
    images: [
      "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=600&h=600&fit=crop",
    ],
    description: "Cây lý tưởng cho không gian trong nhà, dễ chăm sóc",
    badge: "Bán Chạy",
    category: "Cây Trong Nhà",
    quantity: 15,
  },
  {
    id: 2,
    name: "Cây Trầu Bà",
    price: "299.000đ",
    priceValue: 299000,
    rating: 4.9,
    images: [
      "https://images.unsplash.com/photo-1597704374039-6e6d7f42c0b5?w=600&h=600&fit=crop",
    ],
    description: "Dễ chăm sóc, phù hợp người mới bắt đầu trồng cây",
    badge: "Giảm 20%",
    category: "Cây Văn Phòng",
    quantity: 23,
  },
  {
    id: 3,
    name: "Cây Đa Búp Đỏ",
    price: "450.000đ",
    priceValue: 450000,
    rating: 4.7,
    images: [
      "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=600&h=600&fit=crop",
    ],
    description: "Mang lại may mắn và tài lộc cho gia đình",
    badge: "Mới",
    category: "Cây Phong Thủy",
    quantity: 18,
  },
  {
    id: 4,
    name: "Cây Lưỡi Hổ",
    price: "199.000đ",
    priceValue: 199000,
    rating: 4.6,
    images: [
      "https://images.unsplash.com/photo-1593691509543-c55fb32d8de5?w=600&h=600&fit=crop",
    ],
    description: "Lọc không khí hiệu quả, phù hợp phòng ngủ",
    badge: null,
    category: "Cây Lọc Không Khí",
    quantity: 30,
  },
];

// Server Component - Content được render server-side cho SEO
export function FeaturedPlants() {
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
