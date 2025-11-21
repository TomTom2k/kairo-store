import { ApiResponse } from '../types';

/**
 * Simulates API delay
 */
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Add item to cart
 * @param productId - Product ID to add
 * @param quantity - Quantity to add
 * @param delay_ms - Simulated API delay in milliseconds (default: 200ms)
 */
export async function addToCart(
	productId: number,
	quantity: number,
	delay_ms: number = 200
): Promise<ApiResponse<{ productId: number; quantity: number }>> {
	await delay(delay_ms);

	try {
		// Simulate validation
		if (quantity <= 0) {
			return {
				success: false,
				error: 'Quantity must be greater than 0',
			};
		}

		if (quantity > 99) {
			return {
				success: false,
				error: 'Maximum quantity is 99',
			};
		}

		return {
			success: true,
			data: { productId, quantity },
			message: 'Item added to cart successfully',
		};
	} catch (error) {
		return {
			success: false,
			error: 'Failed to add item to cart',
		};
	}
}

/**
 * Update cart item quantity
 * @param itemId - Cart item ID
 * @param quantity - New quantity
 * @param delay_ms - Simulated API delay in milliseconds (default: 200ms)
 */
export async function updateCartItem(
	itemId: string,
	quantity: number,
	delay_ms: number = 200
): Promise<ApiResponse<{ itemId: string; quantity: number }>> {
	await delay(delay_ms);

	try {
		// Simulate validation
		if (quantity <= 0) {
			return {
				success: false,
				error: 'Quantity must be greater than 0',
			};
		}

		if (quantity > 99) {
			return {
				success: false,
				error: 'Maximum quantity is 99',
			};
		}

		return {
			success: true,
			data: { itemId, quantity },
			message: 'Cart item updated successfully',
		};
	} catch (error) {
		return {
			success: false,
			error: 'Failed to update cart item',
		};
	}
}

/**
 * Remove item from cart
 * @param itemId - Cart item ID to remove
 * @param delay_ms - Simulated API delay in milliseconds (default: 200ms)
 */
export async function removeFromCart(
	itemId: string,
	delay_ms: number = 200
): Promise<ApiResponse<{ itemId: string }>> {
	await delay(delay_ms);

	try {
		return {
			success: true,
			data: { itemId },
			message: 'Item removed from cart successfully',
		};
	} catch (error) {
		return {
			success: false,
			error: 'Failed to remove item from cart',
		};
	}
}

/**
 * Clear all items from cart
 * @param delay_ms - Simulated API delay in milliseconds (default: 200ms)
 */
export async function clearCart(
	delay_ms: number = 200
): Promise<ApiResponse<null>> {
	await delay(delay_ms);

	try {
		return {
			success: true,
			data: null,
			message: 'Cart cleared successfully',
		};
	} catch (error) {
		return {
			success: false,
			error: 'Failed to clear cart',
		};
	}
}
