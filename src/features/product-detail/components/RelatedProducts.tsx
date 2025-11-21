'use client';

import Link from 'next/link';
import { Product } from '@/features/categories';
import { PlantCard } from '@/shared/components/cards';
import { ChevronRight } from 'lucide-react';

interface RelatedProductsProps {
	products: Product[];
	currentProductId: number;
}

export function RelatedProducts({
	products,
	currentProductId,
}: RelatedProductsProps) {
	// Filter out current product and limit to 4
	const relatedProducts = products
		.filter((p) => p.id !== currentProductId)
		.slice(0, 4);

	if (relatedProducts.length === 0) return null;

	return (
		<section className='py-12'>
			<div className='flex items-center justify-between mb-8'>
				<h2 className='text-2xl md:text-3xl font-bold'>
					<span className='bg-gradient-to-r from-primary via-primary-light to-primary bg-clip-text text-transparent'>
						Sản Phẩm Liên Quan
					</span>
				</h2>
				<Link
					href='/categories'
					className='flex items-center gap-1 text-primary hover:gap-2 transition-all duration-300 text-sm font-medium'>
					Xem tất cả
					<ChevronRight className='w-4 h-4' />
				</Link>
			</div>

			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
				{relatedProducts.map((product, index) => (
					<PlantCard key={product.id} plant={product} index={index} />
				))}
			</div>
		</section>
	);
}
