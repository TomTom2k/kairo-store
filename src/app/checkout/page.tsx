'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Header, Footer } from '@/shared/layout';
import { ScrollIndicator } from '@/shared/ui';
import { Breadcrumbs } from '@/features/categories';
import { GuestInfoForm, OrderSummary } from '@/features/checkout';
import { useCartStore } from '@/store/useCartStore';
import { GuestInfo } from '@/api/types';

export default function CheckoutPage() {
	const router = useRouter();
	const { items, clearCart } = useCartStore();
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isProcessingOrder, setIsProcessingOrder] = useState(false);

	// Redirect if cart is empty (but not during order processing)
	useEffect(() => {
		if (items.length === 0 && !isProcessingOrder) {
			router.push('/cart');
		}
	}, [items.length, isProcessingOrder, router]);

	const handleSubmit = async (guestInfo: GuestInfo) => {
		setIsSubmitting(true);
		setIsProcessingOrder(true);

		try {
			// Get cart totals
			const { total } = useCartStore.getState();

			// Format customer address
			const customerAddress = `${guestInfo.address}, ${guestInfo.city}${
				guestInfo.notes ? ` - ${guestInfo.notes}` : ''
			}`;

			// Prepare order data for API
			const orderData = {
				customer_name: guestInfo.name,
				customer_email: guestInfo.email,
				customer_phone: guestInfo.phone,
				customer_address: customerAddress,
				total_amount: total,
				items: items.map((item) => ({
					product_id: item.product.id,
					quantity: item.quantity,
					price: item.product.priceValue,
				})),
			};

			// Create order via API route
			const response = await fetch('/api/orders', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(orderData),
			});

			const result = await response.json();

			if (result.success && result.data) {
				// Clear cart
				clearCart();

				// Redirect to order confirmation
				router.push(`/order/${result.data.id}`);
			} else {
				alert(result.error || 'Đã có lỗi xảy ra. Vui lòng thử lại.');
				setIsSubmitting(false);
				setIsProcessingOrder(false);
			}
		} catch (error) {
			console.error('Order creation error:', error);
			alert('Đã có lỗi xảy ra. Vui lòng thử lại.');
			setIsSubmitting(false);
			setIsProcessingOrder(false);
		}
	};

	return (
		<div className='min-h-screen'>
			<Header />

			<main className='container mx-auto px-4 pt-28 pb-16'>
				{/* Breadcrumbs */}
				<Breadcrumbs
					items={[
						{ label: 'Giỏ Hàng', href: '/cart' },
						{ label: 'Thanh Toán', href: '/checkout' },
					]}
				/>

				{/* Page Title */}
				<div className='mt-8 mb-8'>
					<h1 className='text-3xl md:text-4xl font-bold'>
						<span className='bg-gradient-to-r from-primary via-primary-light to-primary bg-clip-text text-transparent'>
							Thanh Toán
						</span>
					</h1>
					<p className='text-muted-foreground mt-2'>
						Vui lòng điền thông tin để hoàn tất đơn hàng
					</p>
				</div>

				{/* Checkout Content */}
				<div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
					{/* Guest Info Form */}
					<div className='lg:col-span-2'>
						<div className='glass rounded-xl p-6 md:p-8'>
							<GuestInfoForm
								onSubmit={handleSubmit}
								isSubmitting={isSubmitting}
							/>
						</div>
					</div>

					{/* Order Summary */}
					<div className='lg:col-span-1'>
						<OrderSummary />
					</div>
				</div>
			</main>

			<Footer />
			<ScrollIndicator />
		</div>
	);
}
