'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CheckCircle2, Package, MapPin, Phone, Mail, ArrowRight } from 'lucide-react';
import { Header, Footer } from '@/shared/layout';
import { ScrollIndicator, Button } from '@/shared/ui';
import { Order } from '@/api/types';

interface OrderPageProps {
	params: Promise<{
		id: string;
	}>;
}

export default async function OrderConfirmationPage({ params }: OrderPageProps) {
	const { id } = await params;
	
	// In a real app, you would fetch the order from an API or localStorage
	// For now, we'll show a success message with the order ID
	// Since orders aren't persisted in this demo, we'll create a mock display

	return (
		<div className='min-h-screen'>
			<Header />

			<main className='container mx-auto px-4 pt-28 pb-16'>
				{/* Success Message */}
				<div className='max-w-3xl mx-auto text-center mb-12'>
					<div className='inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-500/20 mb-6 animate-bounce-in'>
						<CheckCircle2 className='w-12 h-12 text-green-600' />
					</div>

					<h1 className='text-3xl md:text-4xl font-bold mb-4'>
						<span className='bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent'>
							Đặt Hàng Thành Công!
						</span>
					</h1>

					<p className='text-muted-foreground text-lg mb-2'>
						Cảm ơn bạn đã đặt hàng tại Kairo Plants
					</p>

					<p className='text-sm text-muted-foreground'>
						Mã đơn hàng: <span className='font-mono font-semibold text-primary'>{id}</span>
					</p>
				</div>

				{/* Order Info */}
				<div className='max-w-3xl mx-auto space-y-6'>
					{/* What's Next */}
					<div className='glass rounded-xl p-6'>
						<h2 className='text-xl font-bold mb-4'>Tiếp Theo Sẽ Diễn Ra Gì?</h2>
						
						<div className='space-y-4'>
							<div className='flex gap-4'>
								<div className='flex-shrink-0 w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold'>
									1
								</div>
								<div>
									<h3 className='font-semibold mb-1'>Xác Nhận Đơn Hàng</h3>
									<p className='text-sm text-muted-foreground'>
										Chúng tôi sẽ gọi điện xác nhận đơn hàng trong vòng 1-2 giờ
									</p>
								</div>
							</div>

							<div className='flex gap-4'>
								<div className='flex-shrink-0 w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold'>
									2
								</div>
								<div>
									<h3 className='font-semibold mb-1'>Đóng Gói & Giao Hàng</h3>
									<p className='text-sm text-muted-foreground'>
										Đơn hàng sẽ được đóng gói cẩn thận và giao trong 2-3 ngày
									</p>
								</div>
							</div>

							<div className='flex gap-4'>
								<div className='flex-shrink-0 w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold'>
									3
								</div>
								<div>
									<h3 className='font-semibold mb-1'>Nhận Hàng & Thanh Toán</h3>
									<p className='text-sm text-muted-foreground'>
										Kiểm tra hàng và thanh toán khi nhận (COD)
									</p>
								</div>
							</div>
						</div>
					</div>

					{/* Contact Info */}
					<div className='glass rounded-xl p-6'>
						<h2 className='text-xl font-bold mb-4'>Thông Tin Liên Hệ</h2>
						
						<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
							<div className='flex items-center gap-3'>
								<Phone className='w-5 h-5 text-primary' />
								<div>
									<p className='text-sm text-muted-foreground'>Hotline</p>
									<p className='font-semibold'>1900 xxxx</p>
								</div>
							</div>

							<div className='flex items-center gap-3'>
								<Mail className='w-5 h-5 text-primary' />
								<div>
									<p className='text-sm text-muted-foreground'>Email</p>
									<p className='font-semibold'>support@kairoplants.com</p>
								</div>
							</div>
						</div>
					</div>

					{/* Actions */}
					<div className='flex flex-col sm:flex-row gap-4'>
						<Link href='/categories' className='flex-1'>
							<Button variant='outline' className='w-full' size='lg'>
								Tiếp Tục Mua Sắm
								<ArrowRight className='w-5 h-5 ml-2' />
							</Button>
						</Link>

						<Link href='/' className='flex-1'>
							<Button className='w-full' size='lg'>
								Về Trang Chủ
							</Button>
						</Link>
					</div>
				</div>
			</main>

			<Footer />
			<ScrollIndicator />
		</div>
	);
}
