"use client";

import { useEffect, useRef, useState } from "react";

interface ParallaxSectionProps {
  children: React.ReactNode;
  speed?: number; // 0.1 - 1.0, càng lớn càng chậm (reversed for more dramatic effect)
  className?: string;
}

export function ParallaxSection({ children, speed = 0.5, className = "" }: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      
      const rect = ref.current.getBoundingClientRect();
      const scrolled = window.scrollY;
      const elementTop = rect.top + scrolled;
      const windowHeight = window.innerHeight;
      
      // Calculate parallax offset
      // Increased multiplier for more dramatic effect
      if (scrolled + windowHeight > elementTop && scrolled < elementTop + rect.height + windowHeight) {
        // Use negative offset for elements to move up slower than scroll
        // Higher speed = slower movement (more dramatic parallax)
        const parallax = -(scrolled - elementTop + windowHeight) * speed * 0.5;
        setOffset(parallax);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial call
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, [speed]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        transform: `translateY(${offset}px)`,
        willChange: "transform",
      }}
    >
      {children}
    </div>
  );
}
