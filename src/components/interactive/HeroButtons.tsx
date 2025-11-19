"use client";

import { Button } from "@/components/ui/button";
import { ShoppingCart, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { MagneticButton } from "@/components/animations/MagneticButton";

// Client Component - Chỉ phần interactive
export function HeroButtons() {
  const router = useRouter();

  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-delayed-2">
      <MagneticButton strength={0.4}>
        <Button
          size="lg"
          onClick={() => router.push("/san-pham")}
          className="group relative overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 backdrop-blur-sm bg-gradient-to-r from-primary to-primary-light border-0 px-8 py-6 text-lg"
          aria-label="Mua cây xanh ngay"
        >
          {/* Animated shine effect */}
          <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
          
          <span className="relative z-10 flex items-center gap-2">
            <ShoppingCart className="w-5 h-5 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300" />
            <span className="font-bold">Mua Ngay</span>
            <Sparkles className="w-4 h-4 animate-pulse" />
          </span>
          
          {/* Glow effect */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl bg-gradient-to-r from-primary/50 to-primary-light/50 -z-10" />
        </Button>
      </MagneticButton>

      <MagneticButton strength={0.4}>
        <Button
          size="lg"
          variant="outline"
          onClick={() => router.push("/bo-suu-tap")}
          className="group relative overflow-hidden border-2 border-primary/30 hover:border-primary transition-all duration-500 backdrop-blur-sm bg-background/30 hover:bg-accent/50 px-8 py-6 text-lg hover-lift"
          aria-label="Xem bộ sưu tập cây xanh"
        >
          <span className="relative z-10 flex items-center gap-2 font-semibold">
            Xem Bộ Sưu Tập
            <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
          </span>
          
          {/* Hover background */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary-light/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
        </Button>
      </MagneticButton>
    </div>
  );
}
