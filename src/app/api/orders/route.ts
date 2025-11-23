import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/server";
import { CreateOrderSchema } from "@/lib/supabase/types";
import { sendOrderConfirmationEmail, sendAdminOrderNotification } from "@/api/services/email.service";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate request body
    const validationResult = CreateOrderSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { 
          success: false, 
          error: "Invalid request data",
          details: validationResult.error.errors 
        },
        { status: 400 }
      );
    }

    const orderData = validationResult.data;

    // Create order in database
    const { data: order, error: orderError } = await supabaseAdmin
      .from("orders")
      .insert({
        customer_name: orderData.customer_name,
        customer_email: orderData.customer_email,
        customer_phone: orderData.customer_phone,
        customer_address: orderData.customer_address,
        total_amount: orderData.total_amount,
        status: "pending",
      })
      .select()
      .single();

    if (orderError || !order) {
      console.error("Error creating order:", orderError);
      return NextResponse.json(
        { 
          success: false, 
          error: "Failed to create order",
          details: orderError?.message 
        },
        { status: 500 }
      );
    }

    // Create order items
    const orderItems = orderData.items.map((item) => ({
      order_id: order.id,
      product_id: item.product_id,
      quantity: item.quantity,
      price: item.price,
    }));

    const { error: itemsError } = await supabaseAdmin
      .from("order_items")
      .insert(orderItems);

    if (itemsError) {
      console.error("Error creating order items:", itemsError);
      // Try to delete the order if items creation fails
      await supabaseAdmin.from("orders").delete().eq("id", order.id);
      return NextResponse.json(
        { 
          success: false, 
          error: "Failed to create order items",
          details: itemsError.message 
        },
        { status: 500 }
      );
    }

    // Get product details for email
    // Ensure product_id is number for proper query
    const productIds = orderData.items.map((item) => Number(item.product_id));
    const { data: products, error: productsError } = await supabaseAdmin
      .from("products")
      .select("id, name")
      .in("id", productIds);

    if (productsError) {
      console.error("Error fetching products for email:", productsError);
      console.error("Product IDs (original):", orderData.items.map((i) => i.product_id));
      console.error("Product IDs (converted):", productIds);
    }

    if (!products || products.length === 0) {
      console.warn("No products found for email. Product IDs:", productIds);
      console.warn("Order items:", orderData.items);
    } else {
      console.log(`Found ${products.length} products for email`);
    }

    // Map items for email
    const itemsForEmail = orderData.items.map((item) => {
      const productId = Number(item.product_id);
      const product = products?.find((p) => Number(p.id) === productId);
      
      if (!product) {
        console.warn(`Product not found for product_id: ${item.product_id} (converted: ${productId})`);
        console.warn("Available product IDs:", products?.map((p) => p.id));
      }

      return {
        name: product?.name || "Unknown Product",
        quantity: item.quantity,
        price: item.price,
      };
    });

    // Send confirmation email to customer
    const customerEmailResult = await sendOrderConfirmationEmail({
      to: orderData.customer_email,
      customerName: orderData.customer_name,
      orderId: order.id,
      orderNumber: `KP${order.id.slice(0, 8).toUpperCase()}`,
      items: itemsForEmail,
      totalAmount: orderData.total_amount,
    });

    if (!customerEmailResult.success) {
      console.error("Failed to send customer email:", customerEmailResult.error);
      // Don't fail the order creation if email fails
    }

    // Send notification email to admin
    const adminEmailResult = await sendAdminOrderNotification({
      orderId: order.id,
      orderNumber: `KP${order.id.slice(0, 8).toUpperCase()}`,
      customerName: orderData.customer_name,
      customerEmail: orderData.customer_email,
      customerPhone: orderData.customer_phone,
      customerAddress: orderData.customer_address,
      items: itemsForEmail,
      totalAmount: orderData.total_amount,
    });

    if (!adminEmailResult.success) {
      console.error("Failed to send admin email:", adminEmailResult.error);
      // Don't fail the order creation if email fails
    }

    return NextResponse.json({
      success: true,
      data: {
        id: order.id,
        orderNumber: `KP${order.id.slice(0, 8).toUpperCase()}`,
        ...order,
      },
      message: "Order created successfully",
    });
  } catch (error) {
    console.error("Unexpected error creating order:", error);
    return NextResponse.json(
      { 
        success: false, 
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}

