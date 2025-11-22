"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui";
import { Package, ShoppingBag, Users, DollarSign } from "lucide-react";
import { useEffect, useState } from "react";

interface DashboardStats {
  totalRevenue: number;
  ordersCount: number;
  productsCount: number;
  customersCount: number;
  lowStockCount: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch("/api/admin/stats");
      const result = await response.json();

      if (result.success) {
        setStats(result.data);
      }
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const statsCards = [
    {
      title: "Tổng Doanh Thu",
      value: stats
        ? new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(stats.totalRevenue)
        : "0 ₫",
      change: "+12% so với tháng trước",
      icon: DollarSign,
    },
    {
      title: "Đơn Hàng",
      value: stats ? stats.ordersCount.toString() : "0",
      change: "+4 so với tháng trước",
      icon: ShoppingBag,
    },
    {
      title: "Sản Phẩm",
      value: stats ? stats.productsCount.toString() : "0",
      change: stats
        ? `${stats.lowStockCount} sản phẩm sắp hết`
        : "0 sản phẩm sắp hết",
      icon: Package,
    },
    {
      title: "Khách Hàng",
      value: stats ? stats.customersCount.toString() : "0",
      change: "+3 so với tháng trước",
      icon: Users,
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Tổng Quan</h1>
        <p className="text-muted-foreground">Chào mừng trở lại, Admin!</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {isLoading
          ? // Loading skeleton
            Array.from({ length: 4 }).map((_, index) => (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div className="h-4 w-24 bg-muted animate-pulse rounded" />
                  <div className="h-4 w-4 bg-muted animate-pulse rounded" />
                </CardHeader>
                <CardContent>
                  <div className="h-8 w-32 bg-muted animate-pulse rounded mb-2" />
                  <div className="h-3 w-40 bg-muted animate-pulse rounded" />
                </CardContent>
              </Card>
            ))
          : statsCards.map((stat, index) => (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {stat.title}
                  </CardTitle>
                  <stat.icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground">{stat.change}</p>
                </CardContent>
              </Card>
            ))}
      </div>

      {/* Recent Activity Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Đơn Hàng Gần Đây</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm">Chưa có dữ liệu</p>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Sản Phẩm Bán Chạy</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm">Chưa có dữ liệu</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
