import { notFound } from 'next/navigation';
import { Header, Footer } from '@/shared/layout';
import { ScrollIndicator } from '@/shared/ui';
import { Breadcrumbs } from '@/features/categories';
import { mockProducts } from '@/features/categories';
import {
	ProductImageGallery,
	ProductInfo,
	ProductTabs,
	RelatedProducts,
} from '@/features/product-detail';

interface ProductPageProps {
	params: Promise<{
		id: string;
	}>;
}

export default async function ProductPage({ params }: ProductPageProps) {
	const { id } = await params;
	const productId = parseInt(id);
	const product = mockProducts.find((p) => p.id === productId);

	if (!product) {
		notFound();
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
					<ProductInfo
						name={product.name}
						price={product.price}
						rating={product.rating}
						stock={product.stock}
						category={product.category}
						badge={product.badge}
						description={product.description}
					/>
				</div>

				{/* Product Tabs */}
				<div className='mt-16'>
					<ProductTabs
						description={product.description}
						category={product.category}
					/>
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
		</div>
	);
}
