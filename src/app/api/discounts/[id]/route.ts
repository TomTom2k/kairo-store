import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase/client";

/**
 * PUT /api/discounts/[id]
 * Update a discount
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const discountId = parseInt(id);

    if (isNaN(discountId)) {
      return NextResponse.json(
        { success: false, error: "Invalid discount ID" },
        { status: 400 }
      );
    }

    const body = await request.json();

    const updates: any = {};
    if (body.code !== undefined) updates.code = body.code.toUpperCase();
    if (body.type !== undefined) updates.type = body.type;
    if (body.value !== undefined) updates.value = parseFloat(body.value);
    if (body.minOrderValue !== undefined)
      updates.min_order_value = parseFloat(body.minOrderValue);
    if (body.maxDiscountAmount !== undefined)
      updates.max_discount_amount = body.maxDiscountAmount
        ? parseFloat(body.maxDiscountAmount)
        : null;
    if (body.usageLimit !== undefined)
      updates.usage_limit = body.usageLimit ? parseInt(body.usageLimit) : null;
    if (body.validFrom !== undefined) updates.valid_from = body.validFrom;
    if (body.validTo !== undefined) updates.valid_to = body.validTo;
    if (body.isActive !== undefined) updates.is_active = body.isActive;
    if (body.description !== undefined) updates.description = body.description;

    updates.updated_at = new Date().toISOString();

    const { data, error } = await supabase
      .from("discounts")
      .update(updates)
      .eq("id", discountId)
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({
      success: true,
      data,
      message: "Cập nhật mã giảm giá thành công",
    });
  } catch (error) {
    console.error("Error updating discount:", error);
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error ? error.message : "Failed to update discount",
      },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/discounts/[id]
 * Delete a discount
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const discountId = parseInt(id);

    if (isNaN(discountId)) {
      return NextResponse.json(
        { success: false, error: "Invalid discount ID" },
        { status: 400 }
      );
    }

    const { error } = await supabase
      .from("discounts")
      .delete()
      .eq("id", discountId);

    if (error) throw error;

    return NextResponse.json({
      success: true,
      message: "Xóa mã giảm giá thành công",
    });
  } catch (error) {
    console.error("Error deleting discount:", error);
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error ? error.message : "Failed to delete discount",
      },
      { status: 500 }
    );
  }
}
