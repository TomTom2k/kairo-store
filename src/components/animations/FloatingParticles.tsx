"use client";

import { Sparkles, Star } from "lucide-react";

export function FloatingParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Sparkles */}
      {[...Array(15)].map((_, i) => (
        <div
          key={`sparkle-${i}`}
          className="absolute animate-float-particle"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${3 + Math.random() * 4}s`,
          }}
        >
          <Sparkles
            className="text-primary/30"
            size={8 + Math.random() * 12}
          />
        </div>
      ))}
      
      {/* Stars */}
      {[...Array(10)].map((_, i) => (
        <div
          key={`star-${i}`}
          className="absolute animate-twinkle"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
          }}
        >
          <Star
            className="text-primary/20 fill-primary/20"
            size={6 + Math.random() * 8}
          />
        </div>
      ))}
    </div>
  );
}

