import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase/client";

/**
 * POST /api/discounts/validate
 * Validate a discount code and calculate discount amount
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { code, orderTotal } = body;

    if (!code || !orderTotal) {
      return NextResponse.json(
        {
          success: false,
          error: "Thiếu mã giảm giá hoặc tổng đơn hàng",
        },
        { status: 400 }
      );
    }

    // Fetch discount by code
    const query = supabase.from("discounts");
    // @ts-ignore - Supabase type inference issue with discounts table
    const { data: discountData, error } = await query
      .select("*")
      .eq("code", code.toUpperCase())
      .single();

    const discount = discountData as any;

    if (error || !discount) {
      return NextResponse.json(
        {
          success: false,
          error: "Mã giảm giá không tồn tại",
        },
        { status: 404 }
      );
    }

    // Validate discount
    const now = new Date();

    // Check if active
    if (!discount.is_active) {
      return NextResponse.json(
        {
          success: false,
          error: "Mã giảm giá đã bị vô hiệu hóa",
        },
        { status: 400 }
      );
    }

    // Check valid period
    if (discount.valid_from && new Date(discount.valid_from) > now) {
      return NextResponse.json(
        {
          success: false,
          error: "Mã giảm giá chưa có hiệu lực",
        },
        { status: 400 }
      );
    }

    if (discount.valid_to && new Date(discount.valid_to) < now) {
      return NextResponse.json(
        {
          success: false,
          error: "Mã giảm giá đã hết hạn",
        },
        { status: 400 }
      );
    }

    // Check usage limit
    if (
      discount.usage_limit !== null &&
      discount.used_count >= discount.usage_limit
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Mã giảm giá đã hết lượt sử dụng",
        },
        { status: 400 }
      );
    }

    // Check minimum order value
    if (orderTotal < discount.min_order_value) {
      return NextResponse.json(
        {
          success: false,
          error: `Đơn hàng tối thiểu ${new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(discount.min_order_value)}`,
        },
        { status: 400 }
      );
    }

    // Calculate discount amount
    let discountAmount = 0;

    if (discount.type === "percentage") {
      discountAmount = (orderTotal * discount.value) / 100;

      // Apply max discount cap
      if (
        discount.max_discount_amount &&
        discountAmount > discount.max_discount_amount
      ) {
        discountAmount = discount.max_discount_amount;
      }
    } else if (discount.type === "fixed") {
      discountAmount = discount.value;

      // Cannot discount more than order total
      if (discountAmount > orderTotal) {
        discountAmount = orderTotal;
      }
    }

    const finalTotal = orderTotal - discountAmount;

    return NextResponse.json({
      success: true,
      data: {
        discountId: discount.id,
        code: discount.code,
        type: discount.type,
        value: discount.value,
        discountAmount,
        finalTotal,
        description: discount.description,
      },
    });
  } catch (error) {
    console.error("Error validating discount:", error);
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to validate discount",
      },
      { status: 500 }
    );
  }
}
