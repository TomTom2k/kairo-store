'use client';

import { useRouter } from 'next/navigation';
import { ShoppingCart, Tag } from 'lucide-react';
import { Button } from '@/shared/ui';
import { useCartStore } from '@/store/useCartStore';

export function CartSummary() {
	const router = useRouter();
	const { subtotal, shipping, tax, total, totalItems } = useCartStore();

	const handleCheckout = () => {
		router.push('/checkout');
	};

	return (
		<div className='glass rounded-xl p-6 sticky top-28 space-y-6'>
			<h2 className='text-xl font-bold'>Tóm Tắt Đơn Hàng</h2>

			{/* Order Summary */}
			<div className='space-y-3'>
				<div className='flex justify-between text-sm'>
					<span className='text-muted-foreground'>
						Tạm tính ({totalItems} sản phẩm)
					</span>
					<span className='font-medium'>
						{subtotal.toLocaleString('vi-VN')}đ
					</span>
				</div>

				<div className='flex justify-between text-sm'>
					<span className='text-muted-foreground'>
						Phí vận chuyển
					</span>
					<span className='font-medium'>
						{shipping === 0 ? (
							<span className='text-green-600'>Miễn phí</span>
						) : (
							`${shipping.toLocaleString('vi-VN')}đ`
						)}
					</span>
				</div>

				<div className='flex justify-between text-sm'>
					<span className='text-muted-foreground'>
						Thuế VAT (10%)
					</span>
					<span className='font-medium'>
						{tax.toLocaleString('vi-VN')}đ
					</span>
				</div>

				<div className='border-t border-border pt-3'>
					<div className='flex justify-between items-center'>
						<span className='font-semibold text-lg'>Tổng cộng</span>
						<span className='font-bold text-2xl text-primary'>
							{total.toLocaleString('vi-VN')}đ
						</span>
					</div>
				</div>
			</div>

			{/* Free Shipping Notice */}
			{shipping > 0 && subtotal < 500000 && (
				<div className='glass-card rounded-lg p-3 bg-primary/5 border border-primary/20'>
					<p className='text-xs text-muted-foreground'>
						Mua thêm{' '}
						<span className='font-semibold text-primary'>
							{(500000 - subtotal).toLocaleString('vi-VN')}đ
						</span>{' '}
						để được{' '}
						<span className='font-semibold'>
							miễn phí vận chuyển
						</span>
						!
					</p>
				</div>
			)}

			{/* Checkout Button */}
			<Button
				onClick={handleCheckout}
				className='w-full py-6 text-base font-semibold group'
				size='lg'>
				<ShoppingCart className='w-5 h-5 mr-2 group-hover:scale-110 transition-transform' />
				Thanh Toán
			</Button>

			{/* Payment Methods */}
			<div className='text-center text-xs text-muted-foreground'>
				<p>Chấp nhận thanh toán:</p>
				<p className='font-medium mt-1'>COD • Chuyển khoản</p>
			</div>
		</div>
	);
}
