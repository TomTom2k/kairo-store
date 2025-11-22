import { NextRequest, NextResponse } from "next/server";
import { getProducts, createProduct } from "@/api/services/products.service";
import { adaptSupabaseProducts } from "@/lib/adapters/product.adapter";
import { z } from "zod";

/**
 * GET /api/products
 * Fetch all products
 */
export async function GET() {
  try {
    const products = await getProducts();
    const adaptedProducts = adaptSupabaseProducts(products);

    return NextResponse.json({
      success: true,
      data: adaptedProducts,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error ? error.message : "Failed to fetch products",
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/products
 * Create a new product
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate request body
    const productData = {
      name: body.name,
      price_value: body.price_value,
      rating: body.rating || 0,
      images: body.images,
      description: body.description,
      badge: body.badge || null,
      category: body.category,
      quantity: body.quantity,
      care_light: body.care_light || null,
      care_water: body.care_water || null,
      care_temperature: body.care_temperature || null,
      care_fertilizer: body.care_fertilizer || null,
    };

    const newProduct = await createProduct(productData);

    return NextResponse.json(
      {
        success: true,
        data: newProduct,
        message: "Product created successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating product:", error);

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
          error instanceof Error ? error.message : "Failed to create product",
      },
      { status: 500 }
    );
  }
}
