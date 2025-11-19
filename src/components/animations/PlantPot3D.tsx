"use client";

import { Leaf } from "lucide-react";

// Client Component - 3D animation effects
export function PlantPot3D() {
  return (
    <div className="absolute bottom-0 right-10 w-96 h-96 animate-float-slow pointer-events-none hidden lg:block" aria-hidden="true">
      <div className="relative w-full h-full">
        {/* Plant pot with 3D effect */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-64 animate-bounce-slow">
          <div
            className="w-full h-full rounded-t-3xl bg-gradient-to-b from-plant-earth to-plant-primary/80 shadow-2xl"
            style={{
              transform: "perspective(500px) rotateX(5deg)",
            }}
          >
            {/* Plant leaves with 3D rotation */}
            <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-32 h-32 animate-sway">
              <Leaf
                className="text-primary drop-shadow-2xl"
                size={120}
                strokeWidth={1.5}
                style={{
                  filter: "drop-shadow(0 10px 20px rgba(0, 100, 0, 0.3))",
                }}
              />
            </div>
            <div
              className="absolute -top-16 left-8 w-24 h-24 animate-sway-delayed"
              style={{ animationDelay: "0.5s" }}
            >
              <Leaf
                className="text-primary/80 drop-shadow-xl"
                size={90}
                strokeWidth={1.5}
                style={{
                  transform: "rotate(-30deg)",
                  filter: "drop-shadow(0 8px 15px rgba(0, 100, 0, 0.2))",
                }}
              />
            </div>
            <div
              className="absolute -top-12 right-8 w-24 h-24 animate-sway-delayed"
              style={{ animationDelay: "1s" }}
            >
              <Leaf
                className="text-primary/70 drop-shadow-xl"
                size={80}
                strokeWidth={1.5}
                style={{
                  transform: "rotate(30deg)",
                  filter: "drop-shadow(0 8px 15px rgba(0, 100, 0, 0.2))",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

