"use client";

import { Card } from "@/shared/ui";
import { Flower, Home, Leaf, Palmtree, Sprout, TreePine } from "lucide-react";
import { useRouter } from "next/navigation";

// Map icon names to components trong client component
const iconMap = {
  Home,
  Leaf,
  Sprout,
  TreePine,
  Flower,
  Palmtree,
} as const;

type IconName = keyof typeof iconMap;

interface Category {
  id: number;
  name: string;
  slug: string;
  iconName?: string | null;
  count?: string;
  description?: string | null;
  color?: string | null;
  bgColor?: string | null;
}

export function CategoryCard({
  category,
  index,
}: {
  category: Category;
  index: number;
}) {
  const router = useRouter();
  // Cast iconName to IconName if valid, otherwise default to Leaf
  const Icon =
    category.iconName && category.iconName in iconMap
      ? iconMap[category.iconName as IconName]
      : Leaf;

  // Rotate through different animations for visual variety
  const animations = [
    "animate-pop-in",
    "animate-zoom-in-bounce",
    "animate-swing-in",
    "animate-bounce-in-up",
    "animate-slide-in-bottom",
    "animate-fade-in-scale",
  ];

  const animationClass = animations[index % animations.length];

  return (
    <Card
      onClick={() =>
        router.push(`/categories?category=${encodeURIComponent(category.name)}`)
      }
      className={`group relative overflow-hidden cursor-pointer border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 glass-card ${animationClass}`}
      style={{ animationDelay: `${index * 0.15}s` }}
      role="button"
      tabIndex={0}
      aria-label={`Xem danh mục ${category.name}`}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          router.push(
            `/categories?category=${encodeURIComponent(category.name)}`
          );
        }
      }}
    >
      <div className="p-6 flex flex-col items-center text-center space-y-4">
        {/* Icon with 3D effect */}
        <div
          className={`relative w-20 h-20 rounded-2xl bg-gradient-to-br ${
            category.color || "from-primary/20 to-primary/40"
          } flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-6`}
          style={{
            transform: "perspective(500px) translateZ(20px)",
          }}
          aria-hidden="true"
        >
          <Icon className="w-10 h-10 text-white animate-pulse-subtle" />

          {/* Glow effect */}
          <div
            className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${
              category.color || "from-primary/20 to-primary/40"
            } opacity-0 group-hover:opacity-50 blur-xl transition-opacity duration-300`}
          />
        </div>

        {/* Text */}
        <div className="space-y-1">
          <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
            {category.name}
          </h3>
          {category.count && (
            <p className="text-sm text-muted-foreground">{category.count}</p>
          )}
        </div>

        {/* Hover arrow */}
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-primary text-sm font-medium">
          Xem thêm →
        </div>
      </div>

      {/* Animated background circles */}
      <div
        className="absolute -top-10 -right-10 w-32 h-32 bg-primary/5 rounded-full group-hover:scale-150 transition-transform duration-500"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-10 -left-10 w-32 h-32 bg-primary/5 rounded-full group-hover:scale-150 transition-transform duration-500 delay-75"
        aria-hidden="true"
      />
    </Card>
  );
}
