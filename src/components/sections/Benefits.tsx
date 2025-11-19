import { BenefitCard } from "@/components/interactive/BenefitCard";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { ParallaxSection } from "@/components/animations/ParallaxSection";

const benefits = [
  {
    id: 1,
    iconName: "Truck" as const,
    title: "Giao Hàng Miễn Phí",
    description: "Miễn phí vận chuyển cho đơn hàng trên 500.000đ trong nội thành",
    gradient: "from-blue-400 to-blue-600",
  },
  {
    id: 2,
    iconName: "Shield" as const,
    title: "Bảo Hành 30 Ngày",
    description: "Đổi trả miễn phí trong 30 ngày nếu cây không phát triển tốt",
    gradient: "from-primary to-primary-dark",
  },
  {
    id: 3,
    iconName: "Droplets" as const,
    title: "Hướng Dẫn Chăm Sóc",
    description: "Tài liệu hướng dẫn chi tiết và hỗ trợ tư vấn miễn phí trọn đời",
    gradient: "from-cyan-400 to-cyan-600",
  },
  {
    id: 4,
    iconName: "Heart" as const,
    title: "Chất Lượng Cao",
    description: "Cây xanh được chọn lọc kỹ càng, đảm bảo khỏe mạnh và đẹp",
    gradient: "from-rose-400 to-rose-600",
  },
];

// Server Component
export function Benefits() {
  return (
    <section 
      className="relative py-16 md:py-20 bg-background overflow-hidden"
      aria-labelledby="benefits-heading"
    >
      {/* Decorative background với parallax */}
      <div className="absolute inset-0 bg-gradient-to-b from-accent/20 via-transparent to-accent/20 pointer-events-none" aria-hidden="true" />
      <ParallaxSection speed={0.8} className="absolute top-20 left-20 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
      <ParallaxSection speed={0.6} className="absolute bottom-20 right-10 w-64 h-64 bg-primary-light/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header với parallax layers */}
        <div className="text-center space-y-4 mb-12">
          <ParallaxSection speed={0.7}>
            <ScrollReveal>
              <span className="inline-block px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm font-semibold text-primary">
                Cam Kết Của Chúng Tôi
              </span>
            </ScrollReveal>
          </ParallaxSection>

          <ParallaxSection speed={0.5}>
            <ScrollReveal>
              <h2 id="benefits-heading" className="text-4xl md:text-5xl font-bold tracking-tight">
                <span className="gradient-animate bg-clip-text text-transparent">
                  Tại Sao Chọn Chúng Tôi?
                </span>
              </h2>
            </ScrollReveal>
          </ParallaxSection>

          <ParallaxSection speed={0.3}>
            <ScrollReveal>
              <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Chúng tôi cam kết mang đến trải nghiệm mua sắm tốt nhất với dịch vụ chuyên nghiệp
              </p>
            </ScrollReveal>
          </ParallaxSection>
        </div>

        {/* Benefits Grid với parallax stagger */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <ParallaxSection 
              key={benefit.id} 
              speed={0.2 + (index * 0.05)}
            >
              <ScrollReveal delay={index * 100}>
                <BenefitCard benefit={benefit} index={index} />
              </ScrollReveal>
            </ParallaxSection>
          ))}
        </div>
      </div>
    </section>
  );
}
