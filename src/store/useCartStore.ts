import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { CartItem, Product } from '@/api/types';

interface CartState {
	items: CartItem[];
	// Computed values
	totalItems: number;
	subtotal: number;
	shipping: number;
	tax: number;
	total: number;
	// Actions
	addItem: (product: Product, quantity?: number) => void;
	removeItem: (itemId: string) => void;
	updateQuantity: (itemId: string, quantity: number) => void;
	clearCart: () => void;
	// Helper
	getItemQuantity: (productId: number) => number;
}

/**
 * Calculate cart totals
 */
function calculateTotals(items: CartItem[]) {
	const subtotal = items.reduce(
		(sum, item) => sum + item.product.priceValue * item.quantity,
		0
	);

	// Free shipping over 500,000đ
	const shipping = subtotal >= 500000 ? 0 : 30000;

	// 10% tax
	const tax = Math.round(subtotal * 0.1);

	const total = subtotal + shipping + tax;

	const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

	return { subtotal, shipping, tax, total, totalItems };
}

/**
 * Generate unique cart item ID
 */
function generateCartItemId(productId: number): string {
	return `cart_item_${productId}_${Date.now()}`;
}

export const useCartStore = create<CartState>()(
	persist(
		(set, get) => ({
			items: [],
			totalItems: 0,
			subtotal: 0,
			shipping: 0,
			tax: 0,
			total: 0,

			addItem: (product: Product, quantity: number = 1) => {
				set((state) => {
					// Check if product already exists in cart
					const existingItemIndex = state.items.findIndex(
						(item) => item.product.id === product.id
					);

					let newItems: CartItem[];

					if (existingItemIndex !== -1) {
						// Update quantity of existing item
						newItems = state.items.map((item, index) =>
							index === existingItemIndex
								? {
										...item,
										quantity: Math.min(item.quantity + quantity, 99),
								  }
								: item
						);
					} else {
						// Add new item
						const newItem: CartItem = {
							id: generateCartItemId(product.id),
							product,
							quantity: Math.min(quantity, 99),
							addedAt: new Date(),
						};
						newItems = [...state.items, newItem];
					}

					const totals = calculateTotals(newItems);

					return {
						items: newItems,
						...totals,
					};
				});
			},

			removeItem: (itemId: string) => {
				set((state) => {
					const newItems = state.items.filter((item) => item.id !== itemId);
					const totals = calculateTotals(newItems);

					return {
						items: newItems,
						...totals,
					};
				});
			},

			updateQuantity: (itemId: string, quantity: number) => {
				set((state) => {
					// Ensure quantity is between 1 and 99
					const validQuantity = Math.max(1, Math.min(quantity, 99));

					const newItems = state.items.map((item) =>
						item.id === itemId ? { ...item, quantity: validQuantity } : item
					);

					const totals = calculateTotals(newItems);

					return {
						items: newItems,
						...totals,
					};
				});
			},

			clearCart: () => {
				set({
					items: [],
					totalItems: 0,
					subtotal: 0,
					shipping: 0,
					tax: 0,
					total: 0,
				});
			},

			getItemQuantity: (productId: number) => {
				const item = get().items.find(
					(item) => item.product.id === productId
				);
				return item ? item.quantity : 0;
			},
		}),
		{
			name: 'kairo-cart-storage', // localStorage key
			storage: createJSONStorage(() => localStorage),
		}
	)
);
