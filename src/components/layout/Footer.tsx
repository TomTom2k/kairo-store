"use client";

import { Button } from "@/components/ui/button";
import { Facebook, Instagram, Leaf, Mail, MapPin, Phone, Twitter, Youtube } from "lucide-react";

export function Footer() {
  return (
    <footer className="glass-strong border-t border-white/20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
                <Leaf className="w-6 h-6 text-primary" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
                Kairo Plants
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Mang thiên nhiên vào không gian sống của bạn. 
              Chúng tôi cung cấp những loại cây xanh chất lượng cao 
              với dịch vụ chăm sóc khách hàng tận tâm.
            </p>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="glass hover:scale-110 transition-all">
                <Facebook className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="glass hover:scale-110 transition-all">
                <Instagram className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="glass hover:scale-110 transition-all">
                <Twitter className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="glass hover:scale-110 transition-all">
                <Youtube className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Liên Kết</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Về Chúng Tôi
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Sản Phẩm
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Hướng Dẫn Chăm Sóc
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Liên Hệ
                </a>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Hỗ Trợ</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Chính Sách Đổi Trả
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Vận Chuyển
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Thanh Toán
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Điều Khoản Sử Dụng
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Chính Sách Bảo Mật
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Liên Hệ</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-sm text-muted-foreground">
                  123 Đường ABC, Quận XYZ, TP. Hồ Chí Minh
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-sm text-muted-foreground">
                  +84 123 456 789
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-sm text-muted-foreground">
                  hello@kairoplants.com
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t text-center">
          <p className="text-sm text-muted-foreground">
            © 2025 Kairo Plants. Tất cả quyền được bảo lưu.
          </p>
        </div>
      </div>
    </footer>
  );
}

