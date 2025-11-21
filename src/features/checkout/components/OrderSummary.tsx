'use client';

import Image from 'next/image';
import { Package, CreditCard } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';

export function OrderSummary() {
	const { items, subtotal, shipping, tax, total } = useCartStore();

	return (
		<div className='glass rounded-xl p-6 sticky top-28 space-y-6'>
			<h2 className='text-xl font-bold'>Đơn Hàng Của Bạn</h2>

			{/* Order Items */}
			<div className='space-y-3 max-h-[400px] overflow-y-auto custom-scrollbar'>
				{items.map((item) => (
					<div key={item.id} className='flex gap-3 pb-3 border-b border-border last:border-0'>
						<div className='relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0'>
							<Image
								src={item.product.image}
								alt={item.product.name}
								fill
								className='object-cover'
							/>
						</div>
						<div className='flex-1 min-w-0'>
							<h4 className='font-medium text-sm truncate'>
								{item.product.name}
							</h4>
							<p className='text-xs text-muted-foreground'>
								Số lượng: {item.quantity}
							</p>
							<p className='text-sm font-semibold text-primary mt-1'>
								{(item.product.priceValue * item.quantity).toLocaleString(
									'vi-VN'
								)}
								đ
							</p>
						</div>
					</div>
				))}
			</div>

			{/* Order Totals */}
			<div className='space-y-3 pt-4 border-t border-border'>
				<div className='flex justify-between text-sm'>
					<span className='text-muted-foreground'>Tạm tính</span>
					<span className='font-medium'>
						{subtotal.toLocaleString('vi-VN')}đ
					</span>
				</div>

				<div className='flex justify-between text-sm'>
					<span className='text-muted-foreground'>Phí vận chuyển</span>
					<span className='font-medium'>
						{shipping === 0 ? (
							<span className='text-green-600'>Miễn phí</span>
						) : (
							`${shipping.toLocaleString('vi-VN')}đ`
						)}
					</span>
				</div>

				<div className='flex justify-between text-sm'>
					<span className='text-muted-foreground'>Thuế VAT</span>
					<span className='font-medium'>
						{tax.toLocaleString('vi-VN')}đ
					</span>
				</div>

				<div className='flex justify-between items-center pt-3 border-t border-border'>
					<span className='font-semibold text-lg'>Tổng cộng</span>
					<span className='font-bold text-2xl text-primary'>
						{total.toLocaleString('vi-VN')}đ
					</span>
				</div>
			</div>

			{/* Payment Method */}
			<div className='glass-card rounded-lg p-4 bg-primary/5 border border-primary/20'>
				<div className='flex items-center gap-2 mb-2'>
					<CreditCard className='w-5 h-5 text-primary' />
					<span className='font-medium'>Phương thức thanh toán</span>
				</div>
				<p className='text-sm text-muted-foreground'>
					Thanh toán khi nhận hàng (COD)
				</p>
			</div>

			{/* Shipping Info */}
			<div className='glass-card rounded-lg p-4 bg-green-500/5 border border-green-500/20'>
				<div className='flex items-center gap-2 mb-2'>
					<Package className='w-5 h-5 text-green-600' />
					<span className='font-medium text-green-600'>Giao hàng nhanh</span>
				</div>
				<p className='text-sm text-muted-foreground'>
					Dự kiến giao trong 2-3 ngày
				</p>
			</div>
		</div>
	);
}
