'use client';

import { ScrollReveal, ParallaxSection } from '@/shared/animations';

interface CategoryHeaderProps {
	title: string;
	productCount: number;
}

export function CategoryHeader({
	title,
	productCount,
}: CategoryHeaderProps) {
	return (
		<section className='relative mb-8 md:mb-12'>
			{/* Decorative background */}
			<div
				className='absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10'
				aria-hidden='true'
			/>
			<div
				className='absolute bottom-0 left-0 w-80 h-80 bg-primary-light/5 rounded-full blur-3xl -z-10'
				aria-hidden='true'
			/>

			<ParallaxSection speed={0.5}>
				<ScrollReveal>
					<div>
						<h1 className='text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-2'>
							<span className='bg-gradient-to-r from-primary via-primary-light to-primary bg-clip-text text-transparent animate-gradient'>
								{title}
							</span>
						</h1>
						<p className='text-muted-foreground text-sm md:text-base'>
							Tìm thấy{' '}
							<span className='font-semibold text-primary'>
								{productCount}
							</span>{' '}
							sản phẩm
						</p>
					</div>
				</ScrollReveal>
			</ParallaxSection>
		</section>
	);
}
