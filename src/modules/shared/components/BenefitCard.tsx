"use client";

import { Card, CardContent } from "@/modules/shared";
import { Droplets, Heart, Shield, Truck } from "lucide-react";

// Map icon names to components trong client component
const iconMap = {
  Truck,
  Shield,
  Droplets,
  Heart,
} as const;

type IconName = keyof typeof iconMap;

interface Benefit {
  id: number;
  iconName: IconName;
  title: string;
  description: string;
  gradient: string;
}

export function BenefitCard({ benefit, index }: { benefit: Benefit; index: number }) {
  const Icon = iconMap[benefit.iconName];

  // Different animations for each benefit card
  const animations = [
    'animate-slide-in-bottom',
    'animate-flip-in',
    'animate-bounce-in-up',
    'animate-zoom-in-bounce',
  ];
  
  const animationClass = animations[index % animations.length];

  return (
    <article
      className={`group relative overflow-hidden border-2 hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 glass-card rounded-lg ${animationClass}`}
      style={{ animationDelay: `${index * 0.2}s` }}
    >
      <Card className="border-0 bg-transparent">
        <CardContent className="p-8 space-y-4">
          {/* Icon with 3D effect and rotation */}
          <div className="relative inline-block">
            <div
              className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${benefit.gradient} flex items-center justify-center shadow-lg group-hover:shadow-2xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-12`}
              style={{
                transform: "perspective(500px) translateZ(30px)",
              }}
              aria-hidden="true"
            >
              <Icon className="w-8 h-8 text-white group-hover:scale-125 transition-transform duration-500" />
              
              {/* Glow effect */}
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${benefit.gradient} opacity-0 group-hover:opacity-70 blur-2xl transition-opacity duration-500 -z-10`} />
            </div>
            
            {/* Animated ring */}
            <div className={`absolute inset-0 rounded-2xl border-2 border-primary/20 group-hover:scale-150 group-hover:opacity-0 transition-all duration-500`} aria-hidden="true" />
          </div>

          {/* Text content */}
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
              {benefit.title}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {benefit.description}
            </p>
          </div>

          {/* Animated background gradient */}
          <div className={`absolute inset-0 bg-gradient-to-br ${benefit.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 -z-10`} aria-hidden="true" />
        </CardContent>
      </Card>
    </article>
  );
}

