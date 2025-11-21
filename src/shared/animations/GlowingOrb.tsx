"use client";

import { useEffect, useState } from "react";

interface GlowingOrbProps {
  delay?: number;
  duration?: number;
  size?: "sm" | "md" | "lg" | "xl";
  color?: "green" | "blue" | "purple" | "pink";
}

const sizes = {
  sm: "w-32 h-32",
  md: "w-48 h-48",
  lg: "w-64 h-64",
  xl: "w-96 h-96",
};

const colors = {
  green: "bg-primary/20",
  blue: "bg-blue-500/20",
  purple: "bg-purple-500/20",
  pink: "bg-pink-500/20",
};

export function GlowingOrb({ delay = 0, duration = 10, size = "lg", color = "green" }: GlowingOrbProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const animate = () => {
      const x = Math.sin(Date.now() / (duration * 100)) * 100;
      const y = Math.cos(Date.now() / (duration * 150)) * 50;
      setPosition({ x, y });
      requestAnimationFrame(animate);
    };

    const timer = setTimeout(() => {
      animate();
    }, delay);

    return () => clearTimeout(timer);
  }, [delay, duration]);

  return (
    <div
      className={`absolute ${sizes[size]} ${colors[color]} rounded-full blur-3xl pointer-events-none animate-pulse-slow`}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        transition: "transform 0.5s ease-out",
      }}
    />
  );
}

