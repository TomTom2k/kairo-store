import { Sparkles } from "lucide-react";
import {
  FloatingLeaves,
  GlowingOrb,
  WaveBackground,
} from "@/shared/animations";
import { HeroButtons } from "./HeroButtons";

// Server Component - Tốt cho SEO
export function Hero() {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-background via-accent/20 to-background pt-24 pb-16 md:pt-32 md:pb-20"
      aria-label="Hero section - Giới thiệu về Kairo Plants"
    >
      {/* Simplified animated backgrounds */}
      <WaveBackground />

      {/* Reduced glowing orbs */}
      <GlowingOrb size="lg" color="green" delay={0} duration={15} />

      {/* Floating animated leaves */}
      <FloatingLeaves />

      {/* Content - Server Rendered cho SEO */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Badge - Animated Entry */}
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass-button animate-bounce-in-up">
            <Sparkles
              className="w-5 h-5 text-primary animate-pulse"
              aria-hidden="true"
            />
            <span className="text-sm font-semibold text-primary">
              Cây xanh mới - Giảm 20%
            </span>
          </div>

          {/* Main heading - Clean & Bold with Stagger */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
            <span
              className="block text-foreground mb-2 animate-slide-in-left-fade"
              style={{ animationDelay: "0.1s" }}
            >
              Mang Thiên Nhiên
            </span>
            <span
              className="block gradient-animate bg-clip-text text-transparent animate-slide-in-right-fade"
              style={{
                animationDelay: "0.2s",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Vào Không Gian Sống
            </span>
          </h1>

          {/* Decorative divider - Elegant & Interactive */}
          <div
            className="flex items-center justify-center gap-3 py-4 animate-fade-in"
            style={{ animationDelay: "0.15s" }}
          >
            <div className="h-[2px] w-12 bg-gradient-to-r from-transparent via-primary/30 to-primary/60 rounded-full transition-all duration-500 hover:w-20 hover:via-primary/60 hover:to-primary" />
            <div className="w-2 h-2 rounded-full bg-primary/40 animate-pulse" />
            <div className="h-[2px] w-12 bg-gradient-to-l from-transparent via-primary/30 to-primary/60 rounded-full transition-all duration-500 hover:w-20 hover:via-primary/60 hover:to-primary" />
          </div>

          {/* Description - SEO optimized with Scale Animation */}
          <p
            className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed animate-fade-in-scale glass-card rounded-2xl p-6 md:p-8"
            style={{ animationDelay: "0.25s" }}
          >
            Khám phá bộ sưu tập{" "}
            <strong className="text-primary">cây xanh tuyệt đẹp</strong> của
            chúng tôi. Từ{" "}
            <em className="text-primary-light">cây cảnh văn phòng</em> đến{" "}
            <em className="text-primary-light">cây trang trí nội thất</em>,
            chúng tôi có tất cả những gì bạn cần để tạo nên một ốc đảo xanh mát
            mắt trong không gian sống của bạn.
          </p>

          {/* CTA Buttons with Bounce Animation */}
          <div
            className="animate-bounce-in-up"
            style={{ animationDelay: "0.35s" }}
          >
            <HeroButtons />
          </div>

          {/* Stats - With Individual Animations */}
          <div className="grid grid-cols-3 gap-4 md:gap-8 pt-8 max-w-2xl mx-auto">
            <div
              className="space-y-2 glass-card rounded-xl p-4 md:p-6 animate-zoom-in-bounce hover:scale-105 transition-transform cursor-default"
              style={{ animationDelay: "0.4s" }}
              itemScope
              itemType="https://schema.org/Offer"
            >
              <div
                className="text-2xl md:text-3xl font-bold text-primary animate-pulse-subtle"
                itemProp="itemOffered"
              >
                50+
              </div>
              <div className="text-xs md:text-sm text-muted-foreground">
                Loại Cây
              </div>
            </div>
            <div
              className="space-y-2 glass-card rounded-xl p-4 md:p-6 animate-zoom-in-bounce hover:scale-105 transition-transform cursor-default"
              style={{ animationDelay: "0.5s" }}
            >
              <div className="text-2xl md:text-3xl font-bold text-primary animate-pulse-subtle">
                500
              </div>
              <div className="text-xs md:text-sm text-muted-foreground">
                Khách Hàng
              </div>
            </div>
            <div
              className="space-y-2 glass-card rounded-xl p-4 md:p-6 animate-zoom-in-bounce hover:scale-105 transition-transform cursor-default"
              style={{ animationDelay: "0.6s" }}
            >
              <div className="text-2xl md:text-3xl font-bold text-primary animate-pulse-subtle">
                98%
              </div>
              <div className="text-xs md:text-sm text-muted-foreground">
                Hài Lòng
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator - Simplified */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce hidden md:block"
        aria-label="Scroll down"
      >
        <div className="w-6 h-10 border-2 border-primary/40 rounded-full flex items-start justify-center p-2 glass">
          <div className="w-1.5 h-3 bg-primary rounded-full animate-scroll-indicator" />
        </div>
      </div>
    </section>
  );
}
