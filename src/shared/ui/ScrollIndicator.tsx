"use client";

import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";

export function ScrollIndicator() {
  const [currentSection, setCurrentSection] = useState(0);
  const [totalSections, setTotalSections] = useState(0);

  useEffect(() => {
    const sections = document.querySelectorAll('section');
    setTotalSections(sections.length);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Array.from(sections).indexOf(entry.target as HTMLElement);
            setCurrentSection(index);
          }
        });
      },
      { threshold: 0.5 }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const scrollToNext = () => {
    const sections = document.querySelectorAll('section');
    const nextSection = sections[currentSection + 1];
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (currentSection >= totalSections - 1) return null;

  return (
    <button
      onClick={scrollToNext}
      className="fixed bottom-8 right-8 z-40 p-4 rounded-full bg-primary text-primary-foreground shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 animate-bounce backdrop-blur-sm border-2 border-primary-light"
      aria-label="Scroll to next section"
    >
      <ChevronDown className="w-6 h-6 animate-pulse" />
    </button>
  );
}

