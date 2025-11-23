import { NextRequest, NextResponse } from "next/server";
import {
  getCategories,
  createCategory,
} from "@/api/services/categories.service";

export async function GET() {
  try {
    const categories = await getCategories();
    return NextResponse.json({ success: true, data: categories });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error ? error.message : "Failed to fetch categories",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Basic validation
    if (!body.name || !body.slug) {
      return NextResponse.json(
        { success: false, error: "Name and slug are required" },
        { status: 400 }
      );
    }

    const newCategory = await createCategory({
      name: body.name,
      slug: body.slug,
      description: body.description || null,
      iconName: body.iconName || null,
      color: body.color || null,
      bgColor: body.bgColor || null,
    });

    return NextResponse.json(
      { success: true, data: newCategory },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error ? error.message : "Failed to create category",
      },
      { status: 500 }
    );
  }
}
