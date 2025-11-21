import { Order, OrderStatus, GuestInfo, CartItem, ApiResponse } from "../types";

/**
 * Simulates API delay
 */
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Generate a random order number
 */
function generateOrderNumber(): string {
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.floor(Math.random() * 1000)
    .toString()
    .padStart(3, "0");
  return `KP${timestamp}${random}`;
}

/**
 * Generate a unique order ID
 */
function generateOrderId(): string {
  return `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Create a new order
 * @param cartItems - Items in the cart
 * @param guestInfo - Guest information
 * @param delay_ms - Simulated API delay in milliseconds (default: 1000ms)
 */
export async function createOrder(
  cartItems: CartItem[],
  guestInfo: GuestInfo,
  delay_ms: number = 1000
): Promise<ApiResponse<Order>> {
  await delay(delay_ms);

  try {
    // Validate cart items
    if (!cartItems || cartItems.length === 0) {
      return {
        success: false,
        error: "Cart is empty",
      };
    }

    // Validate guest info
    if (!guestInfo.name || !guestInfo.email || !guestInfo.phone) {
      return {
        success: false,
        error: "Missing required guest information",
      };
    }

    // Calculate totals
    const subtotal = cartItems.reduce(
      (sum, item) => sum + item.product.priceValue * item.quantity,
      0
    );
    const shipping = subtotal >= 500000 ? 0 : 30000; // Free shipping over 500k
    const tax = Math.round(subtotal * 0.1); // 10% tax
    const total = subtotal + shipping + tax;

    // Create order
    const order: Order = {
      id: generateOrderId(),
      orderNumber: generateOrderNumber(),
      items: cartItems.map((item) => ({
        productId: item.product.id,
        productName: item.product.name,
        productImage: item.product.images[0],
        price: item.product.priceValue,
        quantity: item.quantity,
        subtotal: item.product.priceValue * item.quantity,
      })),
      guestInfo,
      subtotal,
      shipping,
      tax,
      total,
      status: OrderStatus.PENDING,
      paymentMethod: "COD",
      createdAt: new Date(),
      estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
    };

    return {
      success: true,
      data: order,
      message: "Order created successfully",
    };
  } catch (error) {
    return {
      success: false,
      error: "Failed to create order",
    };
  }
}

/**
 * Get order by ID
 * @param orderId - Order ID
 * @param delay_ms - Simulated API delay in milliseconds (default: 500ms)
 */
export async function getOrderById(
  orderId: string,
  delay_ms: number = 500
): Promise<ApiResponse<Order>> {
  await delay(delay_ms);

  try {
    // In a real app, this would fetch from a database
    // For now, we'll return a mock order
    // You would typically store orders in localStorage or a backend

    return {
      success: false,
      error: "Order not found. Orders are not persisted in this demo.",
    };
  } catch (error) {
    return {
      success: false,
      error: "Failed to fetch order",
    };
  }
}

/**
 * Cancel an order
 * @param orderId - Order ID to cancel
 * @param delay_ms - Simulated API delay in milliseconds (default: 500ms)
 */
export async function cancelOrder(
  orderId: string,
  delay_ms: number = 500
): Promise<ApiResponse<Order>> {
  await delay(delay_ms);

  try {
    return {
      success: false,
      error: "Order cancellation not implemented in this demo",
    };
  } catch (error) {
    return {
      success: false,
      error: "Failed to cancel order",
    };
  }
}
