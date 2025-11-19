"use client";

import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  variant?: "default" | "strong" | "subtle";
  hover?: boolean;
}

export function GlassCard({ 
  children, 
  className, 
  variant = "default",
  hover = true 
}: GlassCardProps) {
  const baseClass = "rounded-2xl transition-all duration-300";
  
  const variantClasses = {
    default: "glass-card",
    strong: "glass-strong",
    subtle: "glass",
  };

  const hoverClass = hover ? "hover:scale-[1.02] hover:shadow-2xl" : "";

  return (
    <div className={cn(
      baseClass,
      variantClasses[variant],
      hoverClass,
      className
    )}>
      {children}
    </div>
  );
}

