"use client";

import { Button } from "@/shared/ui";
import { Leaf, Menu, Search, ShoppingCart, User } from "lucide-react";
import Link from "next/link";

import { useState } from "react";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 z-50 w-full border-b border-white/20 glass">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="flex items-center justify-center w-10 h-10 rounded-full glass-button group-hover:scale-110 transition-all duration-300 group-hover:rotate-12">
              <Leaf className="w-6 h-6 text-primary drop-shadow-lg" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary via-primary-light to-primary bg-clip-text text-transparent drop-shadow-sm">
              Kairo Plants
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">
              Trang Chủ
            </Link>
              <Link href="/categories" className="text-sm font-medium hover:text-primary transition-colors">
              Danh Mục
            </Link>
            <Link href="/about" className="text-sm font-medium hover:text-primary transition-colors">
              Về Chúng Tôi
            </Link>
            <Link href="/contact" className="text-sm font-medium hover:text-primary transition-colors">
              Liên Hệ
             </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="relative glass hover:scale-110 border-0">
              <Search className="w-5 h-5" />
            </Button>
            
            <Button variant="ghost" size="icon" className="relative glass hover:scale-110 border-0">
              <User className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="relative glass hover:scale-110 border-0">
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full glass-button text-[10px] font-bold text-primary animate-pulse-subtle">
                3
              </span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 space-y-2 border-t border-white/10 animate-fade-in">
            <a href="#" className="block px-4 py-2 text-sm font-medium glass rounded-xl transition-all hover:scale-[1.02]">
              Trang Chủ
            </a>
            <a href="#" className="block px-4 py-2 text-sm font-medium glass rounded-xl transition-all hover:scale-[1.02]">
              Sản Phẩm
            </a>
            <a href="#" className="block px-4 py-2 text-sm font-medium glass rounded-xl transition-all hover:scale-[1.02]">
              Danh Mục
            </a>
            <a href="#" className="block px-4 py-2 text-sm font-medium glass rounded-xl transition-all hover:scale-[1.02]">
              Về Chúng Tôi
            </a>
            <a href="#" className="block px-4 py-2 text-sm font-medium glass rounded-xl transition-all hover:scale-[1.02]">
              Liên Hệ
            </a>
          </nav>
        )}
      </div>
    </header>
  );
}
