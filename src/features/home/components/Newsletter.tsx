import { NewsletterForm } from "@/shared/components/forms";
import { Mail, Sparkles } from "lucide-react";
import { ScrollReveal, ParallaxSection } from "@/shared/animations";

// Server Component với semantic HTML
export function Newsletter() {
  return (
    <section 
      className="relative py-16 md:py-20 bg-accent/30 overflow-hidden"
      aria-labelledby="newsletter-heading"
    >
      {/* Background elements */}
      <div className="absolute top-10 right-10 w-80 h-80 bg-primary/10 rounded-full blur-3xl" aria-hidden="true" />
      <div className="absolute bottom-10 left-10 w-64 h-64 bg-primary-light/10 rounded-full blur-3xl" aria-hidden="true" />

      <div className="container mx-auto px-4 relative z-10">
        <ScrollReveal>
          <article className="relative overflow-hidden border-2 border-primary/20 shadow-2xl rounded-3xl backdrop-blur-lg bg-gradient-to-br from-card/80 via-card/60 to-card/80">
            {/* Background gradient animation */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-primary-light/10 to-primary/10 animate-gradient-x" aria-hidden="true" />
            
            <div className="relative z-10 p-8 md:p-12">
              <div className="max-w-2xl mx-auto text-center space-y-6">
                {/* Icon */}
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 animate-pulse-subtle backdrop-blur-sm border-2 border-primary/30" aria-hidden="true">
                  <Mail className="w-8 h-8 text-primary" />
                </div>

                {/* Heading */}
                <h2 id="newsletter-heading" className="text-3xl md:text-4xl font-bold tracking-tight scroll-mt-24">
                  <span className="gradient-animate bg-clip-text text-transparent">
                    Đăng Ký Nhận Tin Mới
                  </span>
                </h2>
                
                {/* Description */}
                <p className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
                  Nhận ngay <strong className="text-primary">mã giảm giá 10%</strong> cho đơn hàng đầu tiên và cập nhật về các sản phẩm mới
                </p>

                {/* Email form - Client Component */}
                <NewsletterForm />

                {/* Benefits list */}
                <div className="flex flex-wrap justify-center gap-4 pt-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Sparkles className="w-4 h-4 text-primary" />
                    <span>Tips chăm sóc</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Sparkles className="w-4 h-4 text-primary" />
                    <span>Ưu đãi độc quyền</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Sparkles className="w-4 h-4 text-primary" />
                    <span>Sản phẩm mới</span>
                  </div>
                </div>

                {/* Privacy note */}
                <p className="text-xs text-muted-foreground">
                  Hủy đăng ký bất cứ lúc nào
                </p>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-primary/5 rounded-full blur-3xl animate-pulse-slow" aria-hidden="true" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary-light/5 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: "1s" }} aria-hidden="true" />
          </article>
        </ScrollReveal>
      </div>
    </section>
  );
}
