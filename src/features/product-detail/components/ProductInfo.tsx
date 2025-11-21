'use client';

import { useState } from 'react';
import { Star, Minus, Plus, ShoppingCart, Heart, Share2 } from 'lucide-react';
import { Button } from '@/shared/ui';

interface ProductInfoProps {
	name: string;
	price: string;
	rating: number;
	stock: string;
	category: string;
	badge: string | null;
	description: string;
}

export function ProductInfo({
	name,
	price,
	rating,
	stock,
	category,
	badge,
	description,
}: ProductInfoProps) {
	const [quantity, setQuantity] = useState(1);
	const [isFavorite, setIsFavorite] = useState(false);

	const handleQuantityChange = (delta: number) => {
		setQuantity((prev) => Math.max(1, Math.min(99, prev + delta)));
	};

	const handleAddToCart = () => {
		// TODO: Implement add to cart functionality
		alert(`Đã thêm ${quantity} ${name} vào giỏ hàng!`);
	};

	return (
		<div className='space-y-6'>
			{/* Category & Badge */}
			<div className='flex items-center gap-2 flex-wrap'>
				<span className='px-3 py-1 rounded-full glass text-xs font-medium'>
					{category}
				</span>
				{badge && (
					<span className='px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-semibold'>
						{badge}
					</span>
				)}
			</div>

			{/* Product Name */}
			<h1 className='text-3xl md:text-4xl font-bold tracking-tight'>
				<span className='bg-gradient-to-r from-primary via-primary-light to-primary bg-clip-text text-transparent'>
					{name}
				</span>
			</h1>

			{/* Rating & Stock */}
			<div className='flex items-center gap-4 flex-wrap'>
				<div className='flex items-center gap-1'>
					{[...Array(5)].map((_, i) => (
						<Star
							key={i}
							className={`w-5 h-5 ${
								i < Math.floor(rating)
									? 'fill-yellow-400 text-yellow-400'
									: 'text-gray-300'
							}`}
						/>
					))}
					<span className='ml-2 text-sm text-muted-foreground'>
						({rating})
					</span>
				</div>
				<span className='px-3 py-1 rounded-full bg-green-500/20 text-green-600 text-sm font-medium'>
					{stock}
				</span>
			</div>

			{/* Price */}
			<div className='py-4 border-y border-border'>
				<p className='text-4xl font-bold text-primary'>{price}</p>
			</div>

			{/* Description */}
			<p className='text-muted-foreground leading-relaxed'>{description}</p>

			{/* Quantity Selector */}
			<div className='space-y-3'>
				<label className='text-sm font-medium'>Số lượng</label>
				<div className='flex items-center gap-3'>
					<div className='flex items-center glass rounded-lg'>
						<button
							onClick={() => handleQuantityChange(-1)}
							className='p-3 hover:bg-primary/10 transition-colors rounded-l-lg'
							aria-label='Giảm số lượng'>
							<Minus className='w-4 h-4' />
						</button>
						<span className='px-6 py-3 font-semibold min-w-[60px] text-center'>
							{quantity}
						</span>
						<button
							onClick={() => handleQuantityChange(1)}
							className='p-3 hover:bg-primary/10 transition-colors rounded-r-lg'
							aria-label='Tăng số lượng'>
							<Plus className='w-4 h-4' />
						</button>
					</div>
				</div>
			</div>

			{/* Action Buttons */}
			<div className='flex gap-3'>
				<Button
					onClick={handleAddToCart}
					className='flex-1 flex items-center justify-center gap-2 py-6 text-base font-semibold'
					size='lg'>
					<ShoppingCart className='w-5 h-5' />
					Thêm Vào Giỏ
				</Button>
				<Button
					variant='outline'
					size='lg'
					onClick={() => setIsFavorite(!isFavorite)}
					className={`p-6 ${isFavorite ? 'text-red-500' : ''}`}
					aria-label='Yêu thích'>
					<Heart
						className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`}
					/>
				</Button>
				<Button
					variant='outline'
					size='lg'
					className='p-6'
					aria-label='Chia sẻ'>
					<Share2 className='w-5 h-5' />
				</Button>
			</div>

			{/* Additional Info */}
			<div className='glass rounded-lg p-4 space-y-2 text-sm'>
				<div className='flex justify-between'>
					<span className='text-muted-foreground'>Giao hàng:</span>
					<span className='font-medium'>Miễn phí toàn quốc</span>
				</div>
				<div className='flex justify-between'>
					<span className='text-muted-foreground'>Bảo hành:</span>
					<span className='font-medium'>7 ngày đổi trả</span>
				</div>
				<div className='flex justify-between'>
					<span className='text-muted-foreground'>Thời gian giao:</span>
					<span className='font-medium'>2-3 ngày</span>
				</div>
			</div>
		</div>
	);
}
