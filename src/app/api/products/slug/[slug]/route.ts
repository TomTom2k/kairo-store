import { NextRequest, NextResponse } from "next/server";
import { getProductBySlug } from "@/api/services/products.service";
import { adaptSupabaseProduct } from "@/lib/adapters/product.adapter";

/**
 * GET /api/products/slug/[slug]
 * Fetch a single product by Slug
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    if (!slug) {
      return NextResponse.json(
        {
          success: false,
          error: "Slug is required",
        },
        { status: 400 }
      );
    }

    const product = await getProductBySlug(slug);

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
