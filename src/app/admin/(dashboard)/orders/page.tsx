'use client';

import { useState, useMemo } from 'react';
import { Search, Eye, Filter, X, LayoutGrid, Table2 } from 'lucide-react';
import { Button } from '@/shared/ui';
import { Toast } from '@/shared/components/Toast';
import { useOrders, useUpdateOrderStatus } from '@/hooks/useOrders';
import { OrdersKanban } from './components/OrdersKanban';
import Link from 'next/link';
import { OrderStatus } from '@/api/types';

const statusColors: Record<string, string> = {
	[OrderStatus.PENDING]: 'bg-yellow-100 text-yellow-800',
	[OrderStatus.CONFIRMED]: 'bg-blue-100 text-blue-800',
	[OrderStatus.PROCESSING]: 'bg-purple-100 text-purple-800',
	[OrderStatus.SHIPPING]: 'bg-indigo-100 text-indigo-800',
	[OrderStatus.DELIVERED]: 'bg-green-100 text-green-800',
	[OrderStatus.CANCELLED]: 'bg-red-100 text-red-800',
};

const statusLabels: Record<string, string> = {
	[OrderStatus.PENDING]: 'Chờ xác nhận',
	[OrderStatus.CONFIRMED]: 'Đã xác nhận',
	[OrderStatus.PROCESSING]: 'Đang xử lý',
	[OrderStatus.SHIPPING]: 'Đang giao',
	[OrderStatus.DELIVERED]: 'Đã giao',
	[OrderStatus.CANCELLED]: 'Đã hủy',
};

// Chỉ sử dụng 5 trạng thái chính cho Kanban
const kanbanStatuses = [
	OrderStatus.PENDING,
	OrderStatus.PROCESSING,
	OrderStatus.SHIPPING,
	OrderStatus.DELIVERED,
	OrderStatus.CANCELLED,
];

const allStatuses = [
	{ value: 'all', label: 'Tất cả' },
	{ value: OrderStatus.PENDING, label: statusLabels[OrderStatus.PENDING] },
	{
		value: OrderStatus.PROCESSING,
		label: statusLabels[OrderStatus.PROCESSING],
	},
	{ value: OrderStatus.SHIPPING, label: statusLabels[OrderStatus.SHIPPING] },
	{
		value: OrderStatus.DELIVERED,
		label: statusLabels[OrderStatus.DELIVERED],
	},
	{
		value: OrderStatus.CANCELLED,
		label: statusLabels[OrderStatus.CANCELLED],
	},
];

const statusOptions = [
	{ value: OrderStatus.PENDING, label: statusLabels[OrderStatus.PENDING] },
	{
		value: OrderStatus.PROCESSING,
		label: statusLabels[OrderStatus.PROCESSING],
	},
	{ value: OrderStatus.SHIPPING, label: statusLabels[OrderStatus.SHIPPING] },
	{
		value: OrderStatus.DELIVERED,
		label: statusLabels[OrderStatus.DELIVERED],
	},
	{
		value: OrderStatus.CANCELLED,
		label: statusLabels[OrderStatus.CANCELLED],
	},
];

export default function AdminOrdersPage() {
	const { data: orders = [], isLoading } = useOrders();
	const updateStatusMutation = useUpdateOrderStatus();
	const [searchQuery, setSearchQuery] = useState('');
	const [statusFilter, setStatusFilter] = useState<string>('all');
	const [viewMode, setViewMode] = useState<'table' | 'kanban'>('table');
	const [toastMessage, setToastMessage] = useState('');
	const [showToast, setShowToast] = useState(false);

	const filteredOrders = useMemo(() => {
		return orders.filter((order) => {
			const matchesSearch =
				order.customerName
					.toLowerCase()
					.includes(searchQuery.toLowerCase()) ||
				order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
				order.customerPhone.includes(searchQuery);

			const matchesStatus =
				statusFilter === 'all' || order.status === statusFilter;

			return matchesSearch && matchesStatus;
		});
	}, [orders, searchQuery, statusFilter]);

	const statusCounts = useMemo(() => {
		const counts: Record<string, number> = {
			all: orders.length,
		};
		Object.values(OrderStatus).forEach((status) => {
			counts[status] = orders.filter((o) => o.status === status).length;
		});
		return counts;
	}, [orders]);

	const handleStatusChange = async (orderId: string, newStatus: string) => {
		try {
			await updateStatusMutation.mutateAsync({
				id: orderId,
				status: newStatus,
			});
			const statusLabel = statusLabels[newStatus] || newStatus;
			setToastMessage(
				`Đã cập nhật trạng thái đơn hàng thành "${statusLabel}"`
			);
			setShowToast(true);
		} catch (error) {
			setToastMessage('Có lỗi xảy ra khi cập nhật trạng thái đơn hàng');
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
			<div className='space-y-8'>
				<div className='flex items-center justify-between'>
					<div>
						<h1 className='text-3xl font-bold'>Quản Lý Đơn Hàng</h1>
						<p className='text-muted-foreground'>
							Xem và cập nhật trạng thái đơn hàng
						</p>
					</div>
					<div className='flex items-center gap-2'>
						<Button
							variant={
								viewMode === 'table' ? 'default' : 'outline'
							}
							size='sm'
							onClick={() => setViewMode('table')}>
							<Table2 className='w-4 h-4 mr-2' />
							Bảng
						</Button>
						<Button
							variant={
								viewMode === 'kanban' ? 'default' : 'outline'
							}
							size='sm'
							onClick={() => setViewMode('kanban')}>
							<LayoutGrid className='w-4 h-4 mr-2' />
							Kanban
						</Button>
					</div>
				</div>

				{/* Toolbar */}
				<div className='flex flex-col sm:flex-row items-stretch sm:items-center gap-4 bg-card p-4 rounded-lg border border-border'>
					<div className='relative flex-1 max-w-md'>
						<Search className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground' />
						<input
							type='text'
							placeholder='Tìm theo tên, SĐT hoặc mã đơn...'
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							className='w-full pl-10 pr-4 py-2 bg-background rounded-md border border-input focus:outline-none focus:ring-2 focus:ring-primary/50'
						/>
					</div>

					<div className='flex items-center gap-2'>
						<Filter className='w-4 h-4 text-muted-foreground' />
						<select
							value={statusFilter}
							onChange={(e) => setStatusFilter(e.target.value)}
							className='px-3 py-2 bg-background rounded-md border border-input focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm'>
							{allStatuses.map((status) => (
								<option key={status.value} value={status.value}>
									{status.label} (
									{statusCounts[status.value] || 0})
								</option>
							))}
						</select>
						{statusFilter !== 'all' && (
							<Button
								variant='ghost'
								size='icon'
								className='h-8 w-8'
								onClick={() => setStatusFilter('all')}>
								<X className='w-4 h-4' />
							</Button>
						)}
					</div>
				</div>

				{/* Stats */}
				<div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4'>
					{allStatuses.slice(1).map((status) => (
						<div
							key={status.value}
							className='bg-card rounded-lg border border-border p-4 cursor-pointer hover:border-primary/50 transition-colors'
							onClick={() => setStatusFilter(status.value)}>
							<div className='text-sm text-muted-foreground mb-1'>
								{status.label}
							</div>
							<div className='text-2xl font-bold'>
								{statusCounts[status.value] || 0}
							</div>
						</div>
					))}
				</div>

				{/* Results count */}
				<div className='text-sm text-muted-foreground'>
					Hiển thị {filteredOrders.length} / {orders.length} đơn hàng
				</div>

				{/* Orders View */}
				{viewMode === 'kanban' ? (
					<OrdersKanban
						orders={filteredOrders}
						onStatusChange={handleStatusChange}
						isLoading={isLoading}
					/>
				) : (
					<div className='bg-card rounded-lg border border-border overflow-hidden'>
						<div className='overflow-x-auto'>
							<table className='w-full'>
								<thead className='bg-muted/50'>
									<tr>
										<th className='px-6 py-4 text-left text-sm font-medium text-muted-foreground'>
											Mã Đơn
										</th>
										<th className='px-6 py-4 text-left text-sm font-medium text-muted-foreground'>
											Khách Hàng
										</th>
										<th className='px-6 py-4 text-left text-sm font-medium text-muted-foreground'>
											Ngày Đặt
										</th>
										<th className='px-6 py-4 text-left text-sm font-medium text-muted-foreground'>
											Tổng Tiền
										</th>
										<th className='px-6 py-4 text-left text-sm font-medium text-muted-foreground'>
											Trạng Thái
										</th>
										<th className='px-6 py-4 text-right text-sm font-medium text-muted-foreground'>
											Thao Tác
										</th>
									</tr>
								</thead>
								<tbody className='divide-y divide-border'>
									{isLoading ? (
										<tr>
											<td
												colSpan={6}
												className='px-6 py-8 text-center text-muted-foreground'>
												Đang tải dữ liệu...
											</td>
										</tr>
									) : filteredOrders.length === 0 ? (
										<tr>
											<td
												colSpan={6}
												className='px-6 py-8 text-center text-muted-foreground'>
												Không tìm thấy đơn hàng nào
											</td>
										</tr>
									) : (
										filteredOrders.map((order) => (
											<tr
												key={order.id}
												className='hover:bg-muted/50 transition-colors'>
												<td className='px-6 py-4 text-sm font-medium'>
													#{order.id.slice(0, 8)}
												</td>
												<td className='px-6 py-4'>
													<div className='text-sm font-medium'>
														{order.customerName}
													</div>
													<div className='text-xs text-muted-foreground'>
														{order.customerPhone}
													</div>
												</td>
												<td className='px-6 py-4 text-sm'>
													{new Date(
														order.createdAt
													).toLocaleDateString(
														'vi-VN'
													)}
												</td>
												<td className='px-6 py-4 text-sm font-medium'>
													{new Intl.NumberFormat(
														'vi-VN',
														{
															style: 'currency',
															currency: 'VND',
														}
													).format(order.totalAmount)}
												</td>
												<td className='px-6 py-4'>
													<select
														value={order.status}
														onChange={(e) =>
															handleStatusChange(
																order.id,
																e.target.value
															)
														}
														disabled={
															updateStatusMutation.isPending
														}
														onClick={(e) =>
															e.stopPropagation()
														}
														onMouseDown={(e) =>
															e.stopPropagation()
														}
														className={`text-xs font-medium px-3 py-1.5 rounded-full border-0 focus:ring-2 focus:ring-primary/50 focus:outline-none ${
															statusColors[
																order.status
															] ||
															'bg-gray-100 text-gray-800'
														} cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:opacity-80`}>
														{statusOptions.map(
															(option) => (
																<option
																	key={
																		option.value
																	}
																	value={
																		option.value
																	}>
																	{
																		option.label
																	}
																</option>
															)
														)}
													</select>
												</td>
												<td className='px-6 py-4 text-right'>
													<div className='flex items-center justify-end gap-2'>
														<Link
															href={`/admin/orders/${order.id}`}>
															<Button
																variant='ghost'
																size='icon'
																className='h-8 w-8'>
																<Eye className='w-4 h-4' />
															</Button>
														</Link>
													</div>
												</td>
											</tr>
										))
									)}
								</tbody>
							</table>
						</div>
					</div>
				)}
			</div>
		</>
	);
}
