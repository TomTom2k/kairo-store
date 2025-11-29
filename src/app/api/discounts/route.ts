import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase/client";

export interface Discount {
  id: number;
  code: string;
  type: "percentage" | "fixed";
  value: number;
  minOrderValue: number;
  maxDiscountAmount: number | null;
  usageLimit: number | null;
  usedCount: number;
  validFrom: string | null;
  validTo: string | null;
  isActive: boolean;
  description: string | null;
  createdAt: string;
  updatedAt: string;
}

/**
 * GET /api/discounts
 * Fetch all discounts
 */
export async function GET() {
  try {
    const query = supabase.from("discounts");
    // @ts-ignore - Supabase type inference issue with discounts table
    const { data: discountData, error } = await query
      .select("*")
      .order("created_at", { ascending: false });

    const data = discountData as any;

    if (error) throw error;

    // Convert snake_case to camelCase
    const discounts = data?.map((d: any) => ({
      id: d.id,
      code: d.code,
      type: d.type,
      value: d.value,
      minOrderValue: d.min_order_value,
      maxDiscountAmount: d.max_discount_amount,
      usageLimit: d.usage_limit,
      usedCount: d.used_count,
      validFrom: d.valid_from,
      validTo: d.valid_to,
      isActive: d.is_active,
      description: d.description,
      createdAt: d.created_at,
      updatedAt: d.updated_at,
    }));

    return NextResponse.json({
      success: true,
      data: discounts,
    });
  } catch (error) {
    console.error("Error fetching discounts:", error);
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error ? error.message : "Failed to fetch discounts",
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/discounts
 * Create a new discount
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const discountData = {
      code: body.code.toUpperCase(),
      type: body.type,
      value: parseFloat(body.value),
      min_order_value: parseFloat(body.minOrderValue || 0),
      max_discount_amount: body.maxDiscountAmount
        ? parseFloat(body.maxDiscountAmount)
        : null,
      usage_limit: body.usageLimit ? parseInt(body.usageLimit) : null,
      valid_from: body.validFrom || null,
      valid_to: body.validTo || null,
      is_active: body.isActive !== false,
      description: body.description || null,
    };

    const query = supabase.from("discounts");
    const { data, error } = await query
      // @ts-ignore - Supabase type inference issue with discounts table
      .insert([discountData])
      .select()
      .single();

    if (error) {
      if (error.code === "23505") {
        // Unique violation
        throw new Error("Mã giảm giá đã tồn tại");
      }
      throw error;
    }

    return NextResponse.json(
      {
        success: true,
        data,
        message: "Tạo mã giảm giá thành công",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating discount:", error);
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error ? error.message : "Failed to create discount",
      },
      { status: 500 }
    );
  }
}
