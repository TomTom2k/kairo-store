"use client";

import { useEffect, useState } from "react";
import { Leaf } from "lucide-react";

// Generate random values once on mount to avoid hydration mismatch
const generateLeafData = () => {
  return [...Array(20)].map(() => ({
    left: Math.random() * 100,
    top: Math.random() * 100,
    delay: Math.random() * 5,
    duration: 5 + Math.random() * 10,
    size: 20 + Math.random() * 40,
    rotation: Math.random() * 360,
  }));
};

export function FloatingLeaves() {
  const [mounted, setMounted] = useState(false);
  const [leaves, setLeaves] = useState<ReturnType<typeof generateLeafData>>([]);

  useEffect(() => {
    setLeaves(generateLeafData());
    setMounted(true);
  }, []);

  // Don't render anything on server to avoid hydration mismatch
  if (!mounted) {
    return null;
  }

  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      {leaves.map((leaf, i) => (
        <div
          key={i}
          className="absolute animate-float opacity-20"
          style={{
            left: `${leaf.left}%`,
            top: `${leaf.top}%`,
            animationDelay: `${leaf.delay}s`,
            animationDuration: `${leaf.duration}s`,
          }}
        >
          <Leaf
            className="text-primary"
            size={leaf.size}
            style={{
              transform: `rotate(${leaf.rotation}deg)`,
            }}
          />
        </div>
      ))}
    </div>
  );
}
