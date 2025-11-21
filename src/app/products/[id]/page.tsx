'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Header, Footer } from '@/shared/layout';
import { ScrollIndicator } from '@/shared/ui';
import { Breadcrumbs } from '@/features/categories';
import { mockProducts } from '@/features/categories';
import {
	ProductImageGallery,
	ProductInfo,
	ProductTabs,
	RelatedProducts,
	WriteReview,
	ReviewList,
	type Review,
} from '@/features/product-detail';
import { Toast } from '@/shared/components/Toast';

export default function ProductPage() {
	const params = useParams();
	const [reviews, setReviews] = useState<Review[]>([]);
	const [showToast, setShowToast] = useState(false);
	const [product, setProduct] = useState<any>(null);
	const [isLoading, setIsLoading] = useState(true);

	// Initialize product from params
	useEffect(() => {
		if (params?.id) {
			const pid = parseInt(params.id as string);
			const foundProduct = mockProducts.find((p) => p.id === pid);
			setProduct(foundProduct);
			setIsLoading(false);
		}
	}, [params]);

	const handleReviewSubmit = (reviewData: { rating: number; comment: string; name: string }) => {
		const newReview: Review = {
			id: `review_${Date.now()}`,
			...reviewData,
			createdAt: new Date(),
		};
		
		setReviews([newReview, ...reviews]);
		setShowToast(true);
	};

	// Loading state
	if (isLoading) {
		return (
			<div className='min-h-screen'>
				<Header />
				<main className='container mx-auto px-4 pt-28 pb-16'>
					<div className='flex items-center justify-center min-h-[60vh]'>
						<div className='text-center space-y-4'>
							<div className='w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto' />
							<p className='text-lg text-muted-foreground'>Đang tải sản phẩm...</p>
						</div>
					</div>
				</main>
				<Footer />
			</div>
		);
	}

	// Product not found
	if (!product) {
		return (
			<div className='min-h-screen'>
				<Header />
				<main className='container mx-auto px-4 pt-28 pb-16'>
					<div className='flex items-center justify-center min-h-[60vh]'>
						<div className='text-center space-y-4'>
							<h1 className='text-4xl font-bold'>Không tìm thấy sản phẩm</h1>
							<p className='text-muted-foreground'>Sản phẩm bạn đang tìm kiếm không tồn tại.</p>
							<a
								href='/categories'
								className='inline-block px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors'>
								Quay lại danh mục
							</a>
						</div>
					</div>
				</main>
				<Footer />
			</div>
		);
	}

	// Get related products from same category
	const relatedProducts = mockProducts.filter(
		(p) => p.category === product.category && p.id !== product.id
	);

	return (
		<div className='min-h-screen'>
			<Header />

			<main className='container mx-auto px-4 pt-28 pb-16'>
				{/* Breadcrumbs */}
				<Breadcrumbs
					items={[
						{ label: 'Danh Mục', href: '/categories' },
						{ label: product.category, href: '/categories' },
						{ label: product.name, href: `/products/${product.id}` },
					]}
				/>

				{/* Product Detail Section */}
				<div className='grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mt-8'>
					{/* Left: Image Gallery */}
					<ProductImageGallery
						productName={product.name}
						mainImage={product.image}
					/>

					{/* Right: Product Info */}
					<ProductInfo product={product} />
				</div>

				{/* Product Tabs */}
				<div className='mt-16'>
					<ProductTabs
						description={product.description}
						category={product.category}
					/>
				</div>

				{/* Reviews Section */}
				<div className='mt-16 space-y-8'>
					<h2 className='text-2xl font-bold'>Đánh Giá Sản Phẩm</h2>
					
					<div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
						{/* Write Review */}
						<WriteReview
							productId={product.id}
							onSubmit={handleReviewSubmit}
						/>

						{/* Review List */}
						<div>
							<h3 className='text-lg font-semibold mb-4'>
								Đánh giá từ khách hàng ({reviews.length})
							</h3>
							<ReviewList reviews={reviews} />
						</div>
					</div>
				</div>

				{/* Related Products */}
				<div className='mt-16'>
					<RelatedProducts
						products={relatedProducts}
						currentProductId={product.id}
					/>
				</div>
			</main>

			<Footer />
			<ScrollIndicator />

			{/* Toast Notification */}
			<Toast
				message='Cảm ơn bạn đã đánh giá sản phẩm!'
				isVisible={showToast}
				onClose={() => setShowToast(false)}
			/>
		</div>
	);
}
