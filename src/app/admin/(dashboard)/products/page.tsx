"use client";

import { useState } from "react";
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  CheckSquare,
  Square,
} from "lucide-react";
import { Button } from "@/shared/ui";
import { useProducts } from "@/hooks/useProducts";
import { useQueryClient } from "@tanstack/react-query";
import { productKeys } from "@/hooks/useProducts";
import Link from "next/link";

export default function AdminProductsPage() {
  const { data: products = [], isLoading } = useProducts();
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [showBulkDeleteConfirm, setShowBulkDeleteConfirm] = useState(false);
  const queryClient = useQueryClient();

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = async (id: number) => {
    setIsDeleting(true);
    try {
      const response = await fetch(`/api/products/${id}`, {
        method: "DELETE",
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || "Failed to delete product");
      }

      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: productKeys.all });
      setDeleteId(null);
    } catch (error) {
      console.error("Error deleting product:", error);
      alert(
        error instanceof Error ? error.message : "Failed to delete product"
      );
    } finally {
      setIsDeleting(false);
    }
  };

  const handleBulkDelete = async () => {
    setIsDeleting(true);
    try {
      const deletePromises = selectedIds.map((id) =>
        fetch(`/api/products/${id}`, { method: "DELETE" })
      );

      const responses = await Promise.all(deletePromises);
      const failed = responses.filter((r) => !r.ok);

      if (failed.length > 0) {
        throw new Error(`Failed to delete ${failed.length} products`);
      }

      queryClient.invalidateQueries({ queryKey: productKeys.all });
      setSelectedIds([]);
      setShowBulkDeleteConfirm(false);
    } catch (error) {
      console.error("Error bulk deleting:", error);
      alert(
        error instanceof Error ? error.message : "Failed to delete products"
      );
    } finally {
      setIsDeleting(false);
    }
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === filteredProducts.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredProducts.map((p) => p.id));
    }
  };

  const toggleSelect = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const getQuantityColor = (quantity: number) => {
    if (quantity === 0)
      return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
    if (quantity < 10)
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
    return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Quản Lý Sản Phẩm</h1>
          <p className="text-muted-foreground">
            Quản lý danh sách sản phẩm của cửa hàng
          </p>
        </div>
        <Link href="/admin/products/new">
          <Button className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Thêm Sản Phẩm
          </Button>
        </Link>
      </div>

      {/* Toolbar */}
      <div className="flex items-center gap-4 bg-card p-4 rounded-lg border border-border">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Tìm kiếm sản phẩm..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-background rounded-md border border-input focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
        {selectedIds.length > 0 && (
          <Button
            variant="destructive"
            onClick={() => setShowBulkDeleteConfirm(true)}
            className="gap-2"
          >
            <Trash2 className="w-4 h-4" />
            Xóa {selectedIds.length} sản phẩm
          </Button>
        )}
      </div>

      {/* Products Table */}
      <div className="bg-card rounded-lg border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="px-6 py-4 text-left">
                  <button
                    onClick={toggleSelectAll}
                    className="flex items-center justify-center w-5 h-5 rounded border-2 border-muted-foreground/30 hover:border-primary transition-colors"
                  >
                    {selectedIds.length === filteredProducts.length &&
                    filteredProducts.length > 0 ? (
                      <CheckSquare className="w-5 h-5 text-primary" />
                    ) : (
                      <Square className="w-5 h-5 text-muted-foreground/30" />
                    )}
                  </button>
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">
                  Sản Phẩm
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">
                  Danh Mục
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">
                  Slug
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">
                  Giá
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">
                  Số Lượng
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
                    colSpan={6}
                    className="px-6 py-8 text-center text-muted-foreground"
                  >
                    Đang tải dữ liệu...
                  </td>
                </tr>
              ) : filteredProducts.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-8 text-center text-muted-foreground"
                  >
                    Không tìm thấy sản phẩm nào
                  </td>
                </tr>
              ) : (
                filteredProducts.map((product) => (
                  <tr
                    key={product.id}
                    className="hover:bg-muted/50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <button
                        onClick={() => toggleSelect(product.id)}
                        className="flex items-center justify-center w-5 h-5 rounded border-2 border-muted-foreground/30 hover:border-primary transition-colors"
                      >
                        {selectedIds.includes(product.id) ? (
                          <CheckSquare className="w-5 h-5 text-primary" />
                        ) : (
                          <Square className="w-5 h-5 text-muted-foreground/30" />
                        )}
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-md bg-muted overflow-hidden relative">
                          <img
                            src={product.images?.[0] || "/placeholder.jpg"}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-medium">{product.name}</p>
                          <p className="text-xs text-muted-foreground">
                            ID: {product.id}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm">{product.category}</td>
                    <td className="px-6 py-4 text-sm max-w-[200px] truncate">
                      <Link
                        href={`/products/${product.slug || product.id}`}
                        target="_blank"
                        className="text-primary hover:underline"
                      >
                        {product.slug || "-"}
                      </Link>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium">
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(product.priceValue)}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getQuantityColor(
                          product.quantity
                        )}`}
                      >
                        {product.quantity} cây
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link href={`/admin/products/${product.id}/edit`}>
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
                          onClick={() => setDeleteId(product.id)}
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
            {/* Header with Icon */}
            <div className="p-6 pb-4">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                  <Trash2 className="w-6 h-6 text-red-600 dark:text-red-400" />
                </div>
                <div className="flex-1 pt-1">
                  <h3 className="text-lg font-semibold text-foreground mb-1">
                    Xác nhận xóa sản phẩm
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Bạn có chắc chắn muốn xóa sản phẩm này? Hành động này không
                    thể hoàn tác và sẽ xóa vĩnh viễn sản phẩm khỏi hệ thống.
                  </p>
                </div>
              </div>
            </div>

            {/* Actions */}
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

      {/* Bulk Delete Confirmation Dialog */}
      {showBulkDeleteConfirm && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200"
          onClick={() => !isDeleting && setShowBulkDeleteConfirm(false)}
        >
          <div
            className="bg-card rounded-xl border border-border shadow-2xl max-w-md w-full animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header with Icon */}
            <div className="p-6 pb-4">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                  <Trash2 className="w-6 h-6 text-red-600 dark:text-red-400" />
                </div>
                <div className="flex-1 pt-1">
                  <h3 className="text-lg font-semibold text-foreground mb-1">
                    Xác nhận xóa {selectedIds.length} sản phẩm
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Bạn có chắc chắn muốn xóa {selectedIds.length} sản phẩm đã
                    chọn? Hành động này không thể hoàn tác và sẽ xóa vĩnh viễn
                    các sản phẩm khỏi hệ thống.
                  </p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="px-6 py-4 bg-muted/30 rounded-b-xl flex items-center justify-end gap-3">
              <Button
                variant="ghost"
                onClick={() => setShowBulkDeleteConfirm(false)}
                disabled={isDeleting}
                className="min-w-[80px]"
              >
                Hủy
              </Button>
              <Button
                variant="destructive"
                onClick={handleBulkDelete}
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
                    Xóa {selectedIds.length} sản phẩm
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
