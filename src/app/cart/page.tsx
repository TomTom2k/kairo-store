'use client';

import { Header, Footer } from '@/shared/layout';
import { ScrollIndicator } from '@/shared/ui';
import { Breadcrumbs } from '@/features/categories';
import { CartItemCard, CartSummary, EmptyCart } from '@/features/cart';
import { useCartStore } from '@/store/useCartStore';

export default function CartPage() {
	const { items } = useCartStore();

	return (
		<div className='min-h-screen'>
			<Header />

			<main className='container mx-auto px-4 pt-28 pb-16'>
				{/* Breadcrumbs */}
				<Breadcrumbs
					items={[
						{ label: 'Giỏ Hàng', href: '/cart' },
					]}
				/>

				{/* Page Title */}
				<div className='mt-8 mb-8'>
					<h1 className='text-3xl md:text-4xl font-bold mb-2'>
						<span className='bg-gradient-to-r from-primary via-primary-light to-primary bg-clip-text text-transparent'>
							Giỏ Hàng Của Bạn
						</span>
					</h1>
					{items.length > 0 && (
						<p className='text-muted-foreground'>
							Bạn có {items.length} sản phẩm trong giỏ hàng
						</p>
					)}
				</div>

				{/* Cart Content */}
				{items.length === 0 ? (
					<EmptyCart />
				) : (
					<div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
						{/* Cart Items */}
						<div className='lg:col-span-2 space-y-4'>
							{items.map((item) => (
								<CartItemCard key={item.id} item={item} />
							))}
						</div>

						{/* Cart Summary */}
						<div className='lg:col-span-1'>
							<CartSummary />
						</div>
					</div>
				)}
			</main>

			<Footer />
			<ScrollIndicator />
		</div>
	);
}
