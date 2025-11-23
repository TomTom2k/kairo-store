import { NextRequest, NextResponse } from "next/server";
import { requestPasswordReset } from "@/api/services/password-reset.service";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { success: false, error: "Email là bắt buộc" },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: "Email không hợp lệ" },
        { status: 400 }
      );
    }

    const result = await requestPasswordReset(email.trim().toLowerCase());

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Mã OTP đã được gửi đến email của bạn",
      username: result.username,
    });
  } catch (error) {
    console.error("Error in request-reset API:", error);
    return NextResponse.json(
      { success: false, error: "Có lỗi xảy ra. Vui lòng thử lại sau." },
      { status: 500 }
    );
  }
}
