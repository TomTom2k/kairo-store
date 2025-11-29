import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/server';
import { z } from 'zod';

const UpdateOrderStatusSchema = z.object({
	status: z.enum([
		'pending',
		'confirmed',
		'processing',
		'shipping',
		'delivered',
		'cancelled',
	]),
});

/**
 * GET /api/orders/[id]
 * Get order by ID
 */
export async function GET(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) {
	try {
		const { id } = await params;

		const { data: order, error } = await supabaseAdmin
			.from('orders')
			.select(
				`
        *,
        order_items (
          id,
          quantity,
          price,
          product:products (
            id,
            name,
            images
          )
        )
      `
			)
			.eq('id', id)
			.single();

		if (error) {
			console.error('Error fetching order:', error);
			return NextResponse.json(
				{
					success: false,
					error: 'Failed to fetch order',
					details: error.message,
				},
				{ status: 500 }
			);
		}

		if (!order) {
			return NextResponse.json(
				{
					success: false,
					error: 'Order not found',
				},
				{ status: 404 }
			);
		}

		return NextResponse.json({
			success: true,
			data: order,
		});
	} catch (error) {
		console.error('Unexpected error fetching order:', error);
		return NextResponse.json(
			{
				success: false,
				error: 'Internal server error',
				details:
					error instanceof Error ? error.message : 'Unknown error',
			},
			{ status: 500 }
		);
	}
}

/**
 * PUT /api/orders/[id]
 * Update order status
 */
export async function PUT(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) {
	try {
		const { id } = await params;
		const body = await request.json();

		// Validate request body
		const validationResult = UpdateOrderStatusSchema.safeParse(body);
		if (!validationResult.success) {
			return NextResponse.json(
				{
					success: false,
					error: 'Invalid request data',
					details: validationResult.error.issues,
				},
				{ status: 400 }
			);
		}

		const { status } = validationResult.data;

		// Update order status
		const query = supabaseAdmin.from('orders');
		const { data: order, error } = await query
			// @ts-ignore - Supabase type inference issue with orders table
			.update({ status: status as string })
			.eq('id', id)
			.select()
			.single();

		if (error) {
			console.error('Error updating order status:', error);
			return NextResponse.json(
				{
					success: false,
					error: 'Failed to update order status',
					details: error.message,
				},
				{ status: 500 }
			);
		}

		if (!order) {
			return NextResponse.json(
				{
					success: false,
					error: 'Order not found',
				},
				{ status: 404 }
			);
		}

		return NextResponse.json({
			success: true,
			data: order,
			message: 'Order status updated successfully',
		});
	} catch (error) {
		console.error('Unexpected error updating order:', error);
		return NextResponse.json(
			{
				success: false,
				error: 'Internal server error',
				details:
					error instanceof Error ? error.message : 'Unknown error',
			},
			{ status: 500 }
		);
	}
}
