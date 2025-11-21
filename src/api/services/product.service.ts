import { Product, ApiResponse, PaginatedResponse } from '../types';

// Mock product data - same as categories mock but centralized
const MOCK_PRODUCTS: Product[] = [
	{
		id: 1,
		name: 'Monstera Deliciosa',
		price: '450.000đ',
		priceValue: 450000,
		image: '/images/plants/monstera.jpg',
		description:
			'Cây Monstera với lá hình trái tim độc đáo, lý tưởng cho không gian trong nhà.',
		category: 'Cây Trong Nhà',
		rating: 4.8,
		stock: 'Còn 15 cây',
		badge: 'Bán Chạy',
		inStock: true,
	},
	{
		id: 2,
		name: 'Cây Lưỡi Hổ',
		price: '280.000đ',
		priceValue: 280000,
		image: '/images/plants/snake-plant.jpg',
		description:
			'Cây lưỡi hổ dễ chăm sóc, thanh lọc không khí hiệu quả cho phòng ngủ.',
		category: 'Cây Trong Nhà',
		rating: 4.9,
		stock: 'Còn 23 cây',
		inStock: true,
	},
	{
		id: 3,
		name: 'Cây Trầu Bà',
		price: '320.000đ',
		priceValue: 320000,
		image: '/images/plants/pothos.jpg',
		description:
			'Cây trầu bà leo tường, dễ trồng và phát triển nhanh trong điều kiện ánh sáng yếu.',
		category: 'Cây Trong Nhà',
		rating: 4.7,
		stock: 'Còn 18 cây',
		badge: 'Mới Về',
		inStock: true,
	},
	{
		id: 4,
		name: 'Cây Phát Tài',
		price: '550.000đ',
		priceValue: 550000,
		image: '/images/plants/money-tree.jpg',
		description:
			'Cây phát tài mang ý nghĩa phong thủy tốt, thích hợp làm quà tặng.',
		category: 'Cây Phong Thủy',
		rating: 4.6,
		stock: 'Còn 12 cây',
		inStock: true,
	},
	{
		id: 5,
		name: 'Cây Kim Tiền',
		price: '380.000đ',
		priceValue: 380000,
		image: '/images/plants/zz-plant.jpg',
		description:
			'Cây kim tiền bền bỉ, chịu hạn tốt, lý tưởng cho người bận rộn.',
		category: 'Cây Phong Thủy',
		rating: 4.8,
		stock: 'Còn 20 cây',
		badge: 'Bán Chạy',
		inStock: true,
	},
	{
		id: 6,
		name: 'Cây Hoa Hồng',
		price: '420.000đ',
		priceValue: 420000,
		image: '/images/plants/rose.jpg',
		description:
			'Hoa hồng thơm ngát, nhiều màu sắc, trang trí sân vườn đẹp mắt.',
		category: 'Cây Ngoài Trời',
		rating: 4.5,
		stock: 'Còn 10 cây',
		inStock: true,
	},
	{
		id: 7,
		name: 'Cây Lavender',
		price: '350.000đ',
		priceValue: 350000,
		image: '/images/plants/lavender.jpg',
		description:
			'Cây lavender hương thơm dễ chịu, giúp thư giãn và xua đuổi côn trùng.',
		category: 'Cây Ngoài Trời',
		rating: 4.7,
		stock: 'Còn 16 cây',
		badge: 'Mới Về',
		inStock: true,
	},
	{
		id: 8,
		name: 'Cây Xương Rồng',
		price: '180.000đ',
		priceValue: 180000,
		image: '/images/plants/cactus.jpg',
		description:
			'Xương rồng mini dễ thương, không cần tưới nhiều nước, phù hợp bàn làm việc.',
		category: 'Cây Để Bàn',
		rating: 4.9,
		stock: 'Còn 30 cây',
		badge: 'Bán Chạy',
		inStock: true,
	},
];

/**
 * Simulates API delay
 */
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Get all products
 * @param delay_ms - Simulated API delay in milliseconds (default: 500ms)
 */
export async function getProducts(
	delay_ms: number = 500
): Promise<ApiResponse<Product[]>> {
	await delay(delay_ms);

	try {
		return {
			success: true,
			data: MOCK_PRODUCTS,
			message: 'Products fetched successfully',
		};
	} catch (error) {
		return {
			success: false,
			error: 'Failed to fetch products',
		};
	}
}

/**
 * Get product by ID
 * @param id - Product ID
 * @param delay_ms - Simulated API delay in milliseconds (default: 300ms)
 */
export async function getProductById(
	id: number,
	delay_ms: number = 300
): Promise<ApiResponse<Product>> {
	await delay(delay_ms);

	try {
		const product = MOCK_PRODUCTS.find((p) => p.id === id);

		if (!product) {
			return {
				success: false,
				error: 'Product not found',
			};
		}

		return {
			success: true,
			data: product,
			message: 'Product fetched successfully',
		};
	} catch (error) {
		return {
			success: false,
			error: 'Failed to fetch product',
		};
	}
}

/**
 * Get products by category
 * @param category - Product category
 * @param delay_ms - Simulated API delay in milliseconds (default: 400ms)
 */
export async function getProductsByCategory(
	category: string,
	delay_ms: number = 400
): Promise<ApiResponse<Product[]>> {
	await delay(delay_ms);

	try {
		const products = MOCK_PRODUCTS.filter((p) => p.category === category);

		return {
			success: true,
			data: products,
			message: 'Products fetched successfully',
		};
	} catch (error) {
		return {
			success: false,
			error: 'Failed to fetch products',
		};
	}
}

/**
 * Search products by query
 * @param query - Search query
 * @param delay_ms - Simulated API delay in milliseconds (default: 400ms)
 */
export async function searchProducts(
	query: string,
	delay_ms: number = 400
): Promise<ApiResponse<Product[]>> {
	await delay(delay_ms);

	try {
		const lowerQuery = query.toLowerCase();
		const products = MOCK_PRODUCTS.filter(
			(p) =>
				p.name.toLowerCase().includes(lowerQuery) ||
				p.description.toLowerCase().includes(lowerQuery) ||
				p.category.toLowerCase().includes(lowerQuery)
		);

		return {
			success: true,
			data: products,
			message: 'Products fetched successfully',
		};
	} catch (error) {
		return {
			success: false,
			error: 'Failed to search products',
		};
	}
}

/**
 * Get paginated products
 * @param page - Page number (1-indexed)
 * @param pageSize - Number of items per page
 * @param delay_ms - Simulated API delay in milliseconds (default: 500ms)
 */
export async function getProductsPaginated(
	page: number = 1,
	pageSize: number = 12,
	delay_ms: number = 500
): Promise<ApiResponse<PaginatedResponse<Product>>> {
	await delay(delay_ms);

	try {
		const startIndex = (page - 1) * pageSize;
		const endIndex = startIndex + pageSize;
		const paginatedProducts = MOCK_PRODUCTS.slice(startIndex, endIndex);

		return {
			success: true,
			data: {
				data: paginatedProducts,
				total: MOCK_PRODUCTS.length,
				page,
				pageSize,
				hasMore: endIndex < MOCK_PRODUCTS.length,
			},
			message: 'Products fetched successfully',
		};
	} catch (error) {
		return {
			success: false,
			error: 'Failed to fetch products',
		};
	}
}
