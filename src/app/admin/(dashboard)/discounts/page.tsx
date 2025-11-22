"use client";

import { useState } from "react";
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  Tag,
  Calendar,
  Users,
} from "lucide-react";
import { Button } from "@/shared/ui";
import { useDiscounts, useDeleteDiscount } from "@/hooks/useDiscounts";
import Link from "next/link";
import type { Discount } from "@/app/api/discounts/route";

export default function AdminDiscountsPage() {
  const { data: discounts = [], isLoading } = useDiscounts();
  const deleteDiscount = useDeleteDiscount();
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const filteredDiscounts = discounts.filter((discount) =>
    discount.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = async (id: number) => {
    setIsDeleting(true);
    try {
      await deleteDiscount.mutateAsync(id);
      setDeleteId(null);
    } catch (error) {
      console.error("Error deleting discount:", error);
      alert(
        error instanceof Error ? error.message : "Failed to delete discount"
      );
    } finally {
      setIsDeleting(false);
    }
  };

  const getStatusBadge = (discount: Discount) => {
    if (!discount.isActive) {
      return (
        <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300">
          Vô hiệu
        </span>
      );
    }

    const now = new Date();
    const validTo = discount.validTo ? new Date(discount.validTo) : null;

    if (validTo && validTo < now) {
      return (
        <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">
          Hết hạn
        </span>
      );
    }

    if (discount.usageLimit && discount.usedCount >= discount.usageLimit) {
      return (
        <span className="px-2 py-1 text-xs rounded-full bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400">
          Hết lượt
        </span>
      );
    }

    return (
      <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
        Hoạt động
      </span>
    );
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "Không giới hạn";
    return new Date(dateString).toLocaleDateString("vi-VN");
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Quản Lý Mã Giảm Giá</h1>
          <p className="text-muted-foreground">
            Tạo và quản lý các mã giảm giá, voucher
          </p>
        </div>
        <Link href="/admin/discounts/new">
          <Button className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Tạo Mã Giảm Giá
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-card p-6 rounded-lg border border-border">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-primary/10 rounded-lg">
              <Tag className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Tổng Mã</p>
              <p className="text-2xl font-bold">{discounts.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-card p-6 rounded-lg border border-border">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-green-500/10 rounded-lg">
              <Calendar className="w-6 h-6 text-green-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Đang Hoạt Động</p>
              <p className="text-2xl font-bold">
                {discounts.filter((d) => d.isActive).length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-card p-6 rounded-lg border border-border">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-500/10 rounded-lg">
              <Users className="w-6 h-6 text-blue-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Lượt Sử Dụng</p>
              <p className="text-2xl font-bold">
                {discounts.reduce((sum, d) => sum + d.usedCount, 0)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex items-center gap-4 bg-card p-4 rounded-lg border border-border">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Tìm kiếm mã giảm giá..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-background rounded-md border border-input focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
      </div>

      {/* Discounts Table */}
      <div className="bg-card rounded-lg border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">
                  Mã
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">
                  Loại & Giá Trị
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">
                  Điều Kiện
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">
                  Sử Dụng
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">
                  Thời Hạn
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">
                  Trạng Thái
                </th>
                <th className="px-6 py-4 text-right text-sm font-medium text-muted-foreground">
                  Thao Tác
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {isLoading ? (
                <tr>
                  <td
                    colSpan={7}
                    className="px-6 py-8 text-center text-muted-foreground"
                  >
                    Đang tải dữ liệu...
                  </td>
                </tr>
              ) : filteredDiscounts.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="px-6 py-8 text-center text-muted-foreground"
                  >
                    Không tìm thấy mã giảm giá nào
                  </td>
                </tr>
              ) : (
                filteredDiscounts.map((discount) => (
                  <tr
                    key={discount.id}
                    className="hover:bg-muted/50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-mono font-bold text-primary">
                          {discount.code}
                        </p>
                        {discount.description && (
                          <p className="text-xs text-muted-foreground mt-1">
                            {discount.description}
                          </p>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium">
                          {discount.type === "percentage"
                            ? `${discount.value}%`
                            : `${discount.value.toLocaleString("vi-VN")}₫`}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {discount.type === "percentage"
                            ? "Phần trăm"
                            : "Số tiền cố định"}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <div className="space-y-1">
                        <p>
                          Tối thiểu:{" "}
                          {discount.minOrderValue.toLocaleString("vi-VN")}₫
                        </p>
                        {discount.maxDiscountAmount && (
                          <p className="text-xs text-muted-foreground">
                            Tối đa:{" "}
                            {discount.maxDiscountAmount.toLocaleString("vi-VN")}
                            ₫
                          </p>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm">
                        {discount.usedCount}
                        {discount.usageLimit
                          ? ` / ${discount.usageLimit}`
                          : " / ∞"}
                      </p>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <div className="space-y-1">
                        <p>{formatDate(discount.validFrom)}</p>
                        <p className="text-xs text-muted-foreground">
                          → {formatDate(discount.validTo)}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4">{getStatusBadge(discount)}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link href={`/admin/discounts/${discount.id}/edit`}>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 hover:bg-primary/10 hover:text-primary transition-colors"
                          >
                            <Pencil className="w-4 h-4" />
                          </Button>
                        </Link>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/50 dark:hover:text-red-400 transition-colors"
                          onClick={() => setDeleteId(discount.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      {deleteId !== null && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200"
          onClick={() => !isDeleting && setDeleteId(null)}
        >
          <div
            className="bg-card rounded-xl border border-border shadow-2xl max-w-md w-full animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 pb-4">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                  <Trash2 className="w-6 h-6 text-red-600 dark:text-red-400" />
                </div>
                <div className="flex-1 pt-1">
                  <h3 className="text-lg font-semibold text-foreground mb-1">
                    Xác nhận xóa mã giảm giá
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Bạn có chắc chắn muốn xóa mã giảm giá này? Hành động này
                    không thể hoàn tác.
                  </p>
                </div>
              </div>
            </div>

            <div className="px-6 py-4 bg-muted/30 rounded-b-xl flex items-center justify-end gap-3">
              <Button
                variant="ghost"
                onClick={() => setDeleteId(null)}
                disabled={isDeleting}
                className="min-w-[80px]"
              >
                Hủy
              </Button>
              <Button
                variant="destructive"
                onClick={() => handleDelete(deleteId)}
                disabled={isDeleting}
                className="min-w-[80px] gap-2"
              >
                {isDeleting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Đang xóa...
                  </>
                ) : (
                  <>
                    <Trash2 className="w-4 h-4" />
                    Xóa
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
