"use client";

import { useEffect, useState } from "react";

export function ParallaxBackground() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Parallax background layers */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-accent/40 via-accent/20 to-transparent pointer-events-none"
        style={{
          transform: `translateY(${scrollY * 0.5}px)`,
        }}
      />
      
      {/* Floating circles với parallax */}
      <div
        className="absolute top-20 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none"
        style={{
          transform: `translate(${scrollY * 0.2}px, ${scrollY * 0.3}px)`,
        }}
      />
      <div
        className="absolute top-40 right-20 w-96 h-96 bg-primary-light/5 rounded-full blur-3xl pointer-events-none"
        style={{
          transform: `translate(${-scrollY * 0.15}px, ${scrollY * 0.25}px)`,
        }}
      />
      <div
        className="absolute bottom-20 left-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl pointer-events-none"
        style={{
          transform: `translate(${scrollY * 0.1}px, ${-scrollY * 0.2}px)`,
        }}
      />
    </>
  );
}

