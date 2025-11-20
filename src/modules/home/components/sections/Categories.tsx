import { CategoryCard } from "@/modules/shared";
import { ScrollReveal, ParallaxSection } from "@/modules/shared";
import { Leaf } from "lucide-react";

// Chỉ truyền data, không truyền icon components
const categories = [
  {
    id: 1,
    name: "Cây Văn Phòng",
    slug: "cay-van-phong",
    iconName: "Home" as const,
    count: "120+ loại",
    description: "Cây xanh lý tưởng cho không gian làm việc, dễ chăm sóc",
    color: "from-emerald-400 to-emerald-600",
    bgColor: "bg-emerald-50",
  },
  {
    id: 2,
    name: "Cây Cảnh",
    slug: "cay-canh",
    iconName: "Leaf" as const,
    count: "85+ loại",
    description: "Cây trang trí đẹp mắt, tạo điểm nhấn cho không gian",
    color: "from-green-400 to-green-600",
    bgColor: "bg-green-50",
  },
  {
    id: 3,
    name: "Cây Trong Nhà",
    slug: "cay-trong-nha",
    iconName: "Sprout" as const,
    count: "150+ loại",
    description: "Phù hợp môi trường trong nhà, lọc không khí tốt",
    color: "from-lime-400 to-lime-600",
    bgColor: "bg-lime-50",
  },
  {
    id: 4,
    name: "Cây Ngoài Trời",
    slug: "cay-ngoai-troi",
    iconName: "TreePine" as const,
    count: "95+ loại",
    description: "Cây chịu nắng, chịu mưa, phù hợp sân vườn",
    color: "from-teal-400 to-teal-600",
    bgColor: "bg-teal-50",
  },
  {
    id: 5,
    name: "Cây Sen Đá",
    slug: "cay-sen-da",
    iconName: "Flower" as const,
    count: "60+ loại",
    description: "Cây mini xinh xắn, dễ chăm sóc, ít tốn nước",
    color: "from-cyan-400 to-cyan-600",
    bgColor: "bg-cyan-50",
  },
  {
    id: 6,
    name: "Cây Nhiệt Đới",
    slug: "cay-nhiet-doi",
    iconName: "Palmtree" as const,
    count: "40+ loại",
    description: "Cây nhiệt đới độc đáo, tạo không gian xanh mát",
    color: "from-emerald-500 to-emerald-700",
    bgColor: "bg-emerald-50",
  },
];

// Server Component cho SEO
export function Categories() {
  return (
    <section 
      className="relative py-16 md:py-20 bg-accent/30 overflow-hidden"
      aria-labelledby="categories-heading"
      itemScope
      itemType="https://schema.org/ItemList"
    >
      {/* Parallax decorative leaves */}
      <ParallaxSection speed={0.9} className="absolute top-10 left-10 opacity-5">
        <Leaf className="w-48 h-48 text-primary" style={{ transform: "rotate(45deg)" }} />
      </ParallaxSection>
      <ParallaxSection speed={0.7} className="absolute bottom-10 right-10 opacity-5">
        <Leaf className="w-40 h-40 text-primary" style={{ transform: "rotate(-30deg)" }} />
      </ParallaxSection>

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
              <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed" itemProp="description">
                Tìm kiếm cây xanh phù hợp với không gian và phong cách của bạn
              </p>
            </ScrollReveal>
          </ParallaxSection>
        </div>

        {/* Categories Grid với parallax */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category, index) => (
            <ParallaxSection 
              key={category.id} 
              speed={0.2 + (index * 0.03)}
            >
              <ScrollReveal delay={index * 50}>
                <article
                  itemScope
                  itemType="https://schema.org/Category"
                  itemProp="itemListElement"
                >
                  <meta itemProp="position" content={String(index + 1)} />
                  <meta itemProp="name" content={category.name} />
                  <meta itemProp="description" content={category.description} />
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
