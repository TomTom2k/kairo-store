import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui";
import { Package, ShoppingBag, Users, DollarSign } from "lucide-react";

export default function AdminDashboard() {
  // Mock stats for now
  const stats = [
    {
      title: "Tổng Doanh Thu",
      value: "15.200.000 ₫",
      change: "+12%",
      icon: DollarSign,
    },
    {
      title: "Đơn Hàng",
      value: "24",
      change: "+4",
      icon: ShoppingBag,
    },
    {
      title: "Sản Phẩm",
      value: "36",
      change: "+2",
      icon: Package,
    },
    {
      title: "Khách Hàng",
      value: "18",
      change: "+3",
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
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-500 font-medium">
                  {stat.change}
                </span>{" "}
                so với tháng trước
              </p>
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
