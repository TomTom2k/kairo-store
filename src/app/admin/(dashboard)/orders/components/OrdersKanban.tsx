"use client";

import { useState } from "react";
import { Eye, Package } from "lucide-react";
import { Button } from "@/shared/ui";
import Link from "next/link";
import { OrderStatus } from "@/api/types";
import type { AdminOrder } from "@/lib/adapters/order.adapter";

const statusColors: Record<string, string> = {
  [OrderStatus.PENDING]: "bg-yellow-100 text-yellow-800 border-yellow-300",
  [OrderStatus.PROCESSING]: "bg-purple-100 text-purple-800 border-purple-300",
  [OrderStatus.SHIPPING]: "bg-indigo-100 text-indigo-800 border-indigo-300",
  [OrderStatus.DELIVERED]: "bg-green-100 text-green-800 border-green-300",
  [OrderStatus.CANCELLED]: "bg-red-100 text-red-800 border-red-300",
};

const statusLabels: Record<string, string> = {
  [OrderStatus.PENDING]: "Chờ Xác Nhận",
  [OrderStatus.PROCESSING]: "Đang Xử Lý",
  [OrderStatus.SHIPPING]: "Đang Giao Hàng",
  [OrderStatus.DELIVERED]: "Đã Giao Hàng",
  [OrderStatus.CANCELLED]: "Đã Hủy",
};

const kanbanColumns = [
  { status: OrderStatus.PENDING, label: statusLabels[OrderStatus.PENDING] },
  { status: OrderStatus.PROCESSING, label: statusLabels[OrderStatus.PROCESSING] },
  { status: OrderStatus.SHIPPING, label: statusLabels[OrderStatus.SHIPPING] },
  { status: OrderStatus.DELIVERED, label: statusLabels[OrderStatus.DELIVERED] },
  { status: OrderStatus.CANCELLED, label: statusLabels[OrderStatus.CANCELLED] },
];

interface OrdersKanbanProps {
  orders: AdminOrder[];
  onStatusChange: (orderId: string, newStatus: string) => Promise<void>;
  isLoading?: boolean;
}

export function OrdersKanban({
  orders,
  onStatusChange,
  isLoading = false,
}: OrdersKanbanProps) {
  const [draggedOrder, setDraggedOrder] = useState<string | null>(null);
  const [targetStatus, setTargetStatus] = useState<string | null>(null);

  const ordersByStatus = kanbanColumns.reduce((acc, column) => {
    acc[column.status] = orders.filter((order) => order.status === column.status);
    return acc;
  }, {} as Record<string, AdminOrder[]>);

  const handleDragStart = (orderId: string) => {
    setDraggedOrder(orderId);
  };

  const handleDragOver = (e: React.DragEvent, status: string) => {
    e.preventDefault();
    setTargetStatus(status);
  };

  const handleDragLeave = () => {
    setTargetStatus(null);
  };

  const handleDrop = async (e: React.DragEvent, targetStatus: string) => {
    e.preventDefault();
    if (draggedOrder && draggedOrder !== targetStatus) {
      await onStatusChange(draggedOrder, targetStatus);
    }
    setDraggedOrder(null);
    setTargetStatus(null);
  };

  const handleStatusClick = async (orderId: string, currentStatus: string) => {
    const currentIndex = kanbanColumns.findIndex((col) => col.status === currentStatus);
    const nextIndex = (currentIndex + 1) % kanbanColumns.length;
    const nextStatus = kanbanColumns[nextIndex].status;
    await onStatusChange(orderId, nextStatus);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex gap-4 overflow-x-auto pb-4 min-h-[600px]">
      {kanbanColumns.map((column) => {
        const columnOrders = ordersByStatus[column.status] || [];
        const isTarget = targetStatus === column.status;

        return (
          <div
            key={column.status}
            className={`flex-shrink-0 w-80 bg-muted/30 rounded-lg p-4 border-2 transition-colors ${
              isTarget
                ? "border-primary border-dashed"
                : "border-border"
            }`}
            onDragOver={(e) => handleDragOver(e, column.status)}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, column.status)}
          >
            {/* Column Header */}
            <div
              className={`mb-4 p-3 rounded-lg border ${statusColors[column.status]}`}
            >
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-sm">{column.label}</h3>
                <span className="text-xs font-medium bg-white/50 px-2 py-0.5 rounded-full">
                  {columnOrders.length}
                </span>
              </div>
            </div>

            {/* Orders List */}
            <div className="space-y-3 max-h-[calc(100vh-300px)] overflow-y-auto custom-scrollbar">
              {columnOrders.length === 0 ? (
                <div className="text-center py-8 text-sm text-muted-foreground">
                  Không có đơn hàng
                </div>
              ) : (
                columnOrders.map((order) => (
                  <div
                    key={order.id}
                    draggable
                    onDragStart={() => handleDragStart(order.id)}
                    className={`bg-card rounded-lg border border-border p-4 cursor-move hover:shadow-md transition-all ${
                      draggedOrder === order.id ? "opacity-50" : ""
                    }`}
                  >
                    {/* Order Header */}
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="font-semibold text-sm">
                          #{order.id.slice(0, 8)}
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          {new Date(order.createdAt).toLocaleDateString("vi-VN")}
                        </div>
                      </div>
                      <Link href={`/admin/orders/${order.id}`}>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Eye className="w-3 h-3" />
                        </Button>
                      </Link>
                    </div>

                    {/* Customer Info */}
                    <div className="mb-3">
                      <div className="text-sm font-medium">{order.customerName}</div>
                      <div className="text-xs text-muted-foreground">
                        {order.customerPhone}
                      </div>
                    </div>

                    {/* Order Items */}
                    <div className="mb-3 space-y-1">
                      {order.items.slice(0, 2).map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center gap-2 text-xs"
                        >
                          <Package className="w-3 h-3 text-muted-foreground" />
                          <span className="flex-1 truncate">{item.productName}</span>
                          <span className="text-muted-foreground">x{item.quantity}</span>
                        </div>
                      ))}
                      {order.items.length > 2 && (
                        <div className="text-xs text-muted-foreground">
                          +{order.items.length - 2} sản phẩm khác
                        </div>
                      )}
                    </div>

                    {/* Total Amount */}
                    <div className="flex items-center justify-between pt-3 border-t border-border">
                      <span className="text-xs text-muted-foreground">Tổng cộng</span>
                      <span className="font-semibold text-sm">
                        {new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(order.totalAmount)}
                      </span>
                    </div>

                    {/* Quick Action Button */}
                    <div className="mt-3">
                      <button
                        onClick={() => handleStatusClick(order.id, order.status)}
                        className="w-full text-xs py-1.5 px-3 rounded-md bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                      >
                        Chuyển trạng thái
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

