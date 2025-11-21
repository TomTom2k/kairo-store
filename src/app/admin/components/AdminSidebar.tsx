"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Settings,
  LogOut,
  Store,
} from "lucide-react";
import { logoutAdmin } from "@/app/actions/auth";

const menuItems = [
  {
    title: "Tổng Quan",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Sản Phẩm",
    href: "/admin/products",
    icon: Package,
  },
  {
    title: "Đơn Hàng",
    href: "/admin/orders",
    icon: ShoppingBag,
  },
  {
    title: "Cài Đặt",
    href: "/admin/settings",
    icon: Settings,
  },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-card border-r border-border h-screen sticky top-0 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-border">
        <Link
          href="/admin"
          className="flex items-center gap-2 font-bold text-xl text-primary"
        >
          <Store className="w-6 h-6" />
          <span>Kairo Admin</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.title}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer Actions */}
      <div className="p-4 border-t border-border">
        <button
          onClick={async () => {
            await logoutAdmin();
            window.location.href = "/admin/login";
          }}
          className="flex w-full items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors text-left"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Đăng Xuất</span>
        </button>
      </div>
    </aside>
  );
}
