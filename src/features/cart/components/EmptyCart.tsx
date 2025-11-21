'use client';

import Link from 'next/link';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { Button } from '@/shared/ui';

export function EmptyCart() {
	return (
		<div className='flex flex-col items-center justify-center min-h-[60vh] text-center px-4'>
			<div className='glass rounded-full p-8 mb-6'>
				<ShoppingBag className='w-24 h-24 text-muted-foreground' />
			</div>

			<h2 className='text-2xl md:text-3xl font-bold mb-3'>
				Giỏ Hàng Trống
			</h2>

			<p className='text-muted-foreground mb-8 max-w-md'>
				Bạn chưa có sản phẩm nào trong giỏ hàng. Hãy khám phá bộ sưu tập
				cây xanh tuyệt đẹp của chúng tôi!
			</p>

			<Link href='/categories'>
				<Button size='lg' className='group'>
					Khám Phá Sản Phẩm
					<ArrowRight className='w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform' />
				</Button>
			</Link>

			{/* Decorative Elements */}
			<div className='mt-12 grid grid-cols-3 gap-4 max-w-md w-full'>
				<div className='glass rounded-lg p-4 text-center'>
					<p className='text-2xl font-bold text-primary mb-1'>100+</p>
					<p className='text-xs text-muted-foreground'>Sản phẩm</p>
				</div>
				<div className='glass rounded-lg p-4 text-center'>
					<p className='text-2xl font-bold text-primary mb-1'>24/7</p>
					<p className='text-xs text-muted-foreground'>Hỗ trợ</p>
				</div>
				<div className='glass rounded-lg p-4 text-center'>
					<p className='text-2xl font-bold text-primary mb-1'>Free</p>
					<p className='text-xs text-muted-foreground'>Vận chuyển</p>
				</div>
			</div>
		</div>
	);
}
