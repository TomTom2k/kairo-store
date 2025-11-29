"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/shared/ui";
import { Toast } from "@/shared/components/Toast";
import {
  ArrowLeft,
  Package,
  User,
  MapPin,
  Phone,
  Mail,
  Calendar,
  CreditCard,
} from "lucide-react";
import Link from "next/link";
import { useOrder, useUpdateOrderStatus } from "@/hooks/useOrders";
import { OrderStatus } from "@/api/types";

const statusOptions = [
  { value: OrderStatus.PENDING, label: "Chờ xác nhận" },
  { value: OrderStatus.CONFIRMED, label: "Đã xác nhận" },
  { value: OrderStatus.PROCESSING, label: "Đang xử lý" },
  { value: OrderStatus.SHIPPING, label: "Đang giao hàng" },
  { value: OrderStatus.DELIVERED, label: "Đã giao hàng" },
  { value: OrderStatus.CANCELLED, label: "Đã hủy" },
];

export default function AdminOrderDetailPage() {
  const params = useParams();
  const router = useRouter();
  const orderId = params?.id as string;
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);

  const { data: order, isLoading } = useOrder(orderId);
  const updateStatusMutation = useUpdateOrderStatus();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-bold">Không tìm thấy đơn hàng</h2>
        <Link href="/admin/orders">
          <Button className="mt-4" variant="outline">
            Quay lại danh sách
          </Button>
        </Link>
      </div>
    );
  }

  const handleStatusChange = async (newStatus: string) => {
    try {
      await updateStatusMutation.mutateAsync({ id: orderId, status: newStatus });
      const statusLabel = statusOptions.find((opt) => opt.value === newStatus)?.label || newStatus;
      setToastMessage(`Đã cập nhật trạng thái đơn hàng thành "${statusLabel}"`);
      setShowToast(true);
    } catch (error) {
      setToastMessage("Có lỗi xảy ra khi cập nhật trạng thái đơn hàng");
      setShowToast(true);
    }
  };

  return (
    <>
      <Toast
        message={toastMessage}
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />
      <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/orders">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              Đơn Hàng #{order.id.slice(0, 8)}
              <span className="text-sm font-normal text-muted-foreground">
                ({new Date(order.createdAt).toLocaleString("vi-VN")})
              </span>
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Trạng thái:</span>
          <select
            value={order.status}
            onChange={(e) => handleStatusChange(e.target.value)}
            disabled={updateStatusMutation.isPending}
            className="px-3 py-2 bg-background rounded-md border border-input focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content - Order Items */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-card rounded-lg border border-border overflow-hidden">
            <div className="p-6 border-b border-border">
              <h3 className="font-semibold flex items-center gap-2">
                <Package className="w-5 h-5 text-primary" />
                Sản Phẩm ({order.items.length})
              </h3>
            </div>
            <div className="divide-y divide-border">
              {order.items.map((item) => (
                <div key={item.id} className="p-6 flex gap-4">
                  <div className="w-20 h-20 bg-muted rounded-md overflow-hidden flex-shrink-0">
                    <img
                      src={item.productImage}
                      alt={item.productName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">{item.productName}</h4>
                        <p className="text-sm text-muted-foreground">
                          Đơn giá:{" "}
                          {new Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }).format(item.price)}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">
                          {new Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }).format(item.total)}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          x{item.quantity}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-6 bg-muted/30 border-t border-border space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Tạm tính</span>
                <span>
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(order.totalAmount)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Phí vận chuyển</span>
                <span>0 ₫</span>
              </div>
              <div className="flex justify-between font-bold text-lg pt-2 border-t border-border/50">
                <span>Tổng cộng</span>
                <span className="text-primary">
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(order.totalAmount)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar - Customer Info */}
        <div className="space-y-6">
          <div className="bg-card rounded-lg border border-border p-6 space-y-6">
            <h3 className="font-semibold flex items-center gap-2 border-b border-border pb-4">
              <User className="w-5 h-5 text-primary" />
              Thông Tin Khách Hàng
            </h3>

            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Họ tên</p>
                <p className="font-medium">{order.customerName}</p>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-muted-foreground mt-1" />
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Email</p>
                  <p className="font-medium break-all">{order.customerEmail}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-muted-foreground mt-1" />
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    Số điện thoại
                  </p>
                  <p className="font-medium">{order.customerPhone}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-muted-foreground mt-1" />
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    Địa chỉ giao hàng
                  </p>
                  <p className="font-medium">{order.customerAddress}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-lg border border-border p-6 space-y-6">
            <h3 className="font-semibold flex items-center gap-2 border-b border-border pb-4">
              <CreditCard className="w-5 h-5 text-primary" />
              Thanh Toán
            </h3>

            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">
                  Phương thức
                </p>
                <p className="font-medium">Thanh toán khi nhận hàng (COD)</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">
                  Trạng thái thanh toán
                </p>
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    order.status === OrderStatus.DELIVERED
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {order.status === OrderStatus.DELIVERED
                    ? "Đã thanh toán"
                    : "Chưa thanh toán"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
