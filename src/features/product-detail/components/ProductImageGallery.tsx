'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ProductImageGalleryProps {
	productName: string;
	mainImage: string;
}

export function ProductImageGallery({
	productName,
	mainImage,
}: ProductImageGalleryProps) {
	const [selectedImage, setSelectedImage] = useState(0);

	// For demo, we'll use the same image with different crops
	const images = [mainImage, mainImage, mainImage, mainImage];

	return (
		<div className='space-y-4'>
			{/* Main Image */}
			<div className='relative aspect-square rounded-2xl overflow-hidden glass group'>
				<Image
					src={images[selectedImage]}
					alt={productName}
					fill
					className='object-cover transition-transform duration-500 group-hover:scale-110'
					priority
				/>
				{/* Navigation Arrows */}
				{images.length > 1 && (
					<>
						<button
							onClick={() =>
								setSelectedImage((prev) =>
									prev === 0 ? images.length - 1 : prev - 1
								)
							}
							className='absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full glass flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:scale-110'
							aria-label='Ảnh trước'>
							<ChevronLeft className='w-5 h-5' />
						</button>
						<button
							onClick={() =>
								setSelectedImage((prev) =>
									prev === images.length - 1 ? 0 : prev + 1
								)
							}
							className='absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full glass flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:scale-110'
							aria-label='Ảnh tiếp theo'>
							<ChevronRight className='w-5 h-5' />
						</button>
					</>
				)}
			</div>

			{/* Thumbnail Gallery */}
			<div className='grid grid-cols-4 gap-3'>
				{images.map((image, index) => (
					<button
						key={index}
						onClick={() => setSelectedImage(index)}
						className={`relative aspect-square rounded-lg overflow-hidden transition-all duration-300 ${
							selectedImage === index
								? 'ring-2 ring-primary scale-105'
								: 'opacity-60 hover:opacity-100'
						}`}>
						<Image
							src={image}
							alt={`${productName} ${index + 1}`}
							fill
							className='object-cover'
						/>
					</button>
				))}
			</div>
		</div>
	);
}
