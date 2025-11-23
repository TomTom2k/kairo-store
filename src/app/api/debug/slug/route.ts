import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase/client";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");

  if (!slug) {
    return NextResponse.json(
      { error: "Slug parameter required" },
      { status: 400 }
    );
  }

  try {
    // Test 1: Get all products to see what's in the database
    const { data: allProducts, error: allError } = await supabase
      .from("products")
      .select("id, name, slug")
      .limit(10);

    // Test 2: Try to get product by slug
    const { data: productBySlug, error: slugError } = await supabase
      .from("products")
      .select("*")
      .eq("slug", slug)
      .single();

    // Test 3: Try to get product by slug with ilike (case-insensitive)
    const { data: productByIlike, error: ilikeError } = await supabase
      .from("products")
      .select("*")
      .ilike("slug", slug)
      .single();

    return NextResponse.json({
      requestedSlug: slug,
      allProducts: {
        data: allProducts,
        error: allError?.message,
      },
      exactMatch: {
        data: productBySlug,
        error: slugError?.message,
        errorCode: slugError?.code,
      },
      caseInsensitiveMatch: {
        data: productByIlike,
        error: ilikeError?.message,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
