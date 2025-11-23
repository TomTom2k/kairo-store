import { NextRequest, NextResponse } from "next/server";
import {
  updateCategory,
  deleteCategory,
} from "@/api/services/categories.service";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const categoryId = parseInt(id);

    if (isNaN(categoryId)) {
      return NextResponse.json(
        { success: false, error: "Invalid category ID" },
        { status: 400 }
      );
    }

    const updatedCategory = await updateCategory(categoryId, {
      name: body.name,
      slug: body.slug,
      description: body.description,
      iconName: body.iconName,
      color: body.color,
      bgColor: body.bgColor,
    });

    return NextResponse.json({ success: true, data: updatedCategory });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error ? error.message : "Failed to update category",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const categoryId = parseInt(id);

    if (isNaN(categoryId)) {
      return NextResponse.json(
        { success: false, error: "Invalid category ID" },
        { status: 400 }
      );
    }

    await deleteCategory(categoryId);

    return NextResponse.json({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error ? error.message : "Failed to delete category",
      },
      { status: 500 }
    );
  }
}
