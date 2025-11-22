import { NextRequest, NextResponse } from "next/server";
import {
  getProductById,
  updateProduct,
  deleteProduct,
} from "@/api/services/products.service";
import { adaptSupabaseProduct } from "@/lib/adapters/product.adapter";
import { z } from "zod";

/**
 * GET /api/products/[id]
 * Fetch a single product by ID
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const productId = parseInt(id);

    if (isNaN(productId)) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid product ID",
        },
        { status: 400 }
      );
    }

    const product = await getProductById(productId);

    if (!product) {
      return NextResponse.json(
        {
          success: false,
          error: "Product not found",
        },
        { status: 404 }
      );
    }

    const adaptedProduct = adaptSupabaseProduct(product);

    return NextResponse.json({
      success: true,
      data: adaptedProduct,
    });
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error ? error.message : "Failed to fetch product",
      },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/products/[id]
 * Update an existing product
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const productId = parseInt(id);

    if (isNaN(productId)) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid product ID",
        },
        { status: 400 }
      );
    }

    const body = await request.json();

    // Build update object with only provided fields
    const updates: any = {};
    if (body.name !== undefined) updates.name = body.name;
    if (body.price !== undefined) updates.price = body.price;
    if (body.price_value !== undefined) updates.price_value = body.price_value;
    if (body.rating !== undefined) updates.rating = body.rating;
    if (body.images !== undefined) updates.images = body.images;
    if (body.description !== undefined) updates.description = body.description;
    if (body.badge !== undefined) updates.badge = body.badge;
    if (body.category !== undefined) updates.category = body.category;
    if (body.quantity !== undefined) updates.quantity = body.quantity;
    if (body.care_light !== undefined) updates.care_light = body.care_light;
    if (body.care_water !== undefined) updates.care_water = body.care_water;
    if (body.care_temperature !== undefined)
      updates.care_temperature = body.care_temperature;
    if (body.care_fertilizer !== undefined)
      updates.care_fertilizer = body.care_fertilizer;

    const updatedProduct = await updateProduct(productId, updates);
    const adaptedProduct = adaptSupabaseProduct(updatedProduct);

    return NextResponse.json({
      success: true,
      data: adaptedProduct,
      message: "Product updated successfully",
    });
  } catch (error) {
    console.error("Error updating product:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid product data",
          details: error.issues,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error ? error.message : "Failed to update product",
      },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/products/[id]
 * Delete a product
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const productId = parseInt(id);

    if (isNaN(productId)) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid product ID",
        },
        { status: 400 }
      );
    }

    await deleteProduct(productId);

    return NextResponse.json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error ? error.message : "Failed to delete product",
      },
      { status: 500 }
    );
  }
}
