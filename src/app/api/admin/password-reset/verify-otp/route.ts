import { NextRequest, NextResponse } from "next/server";
import { verifyOTP } from "@/api/services/password-reset.service";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, otp } = body;

    if (!username || typeof username !== "string") {
      return NextResponse.json(
        { success: false, error: "Tên đăng nhập là bắt buộc" },
        { status: 400 }
      );
    }

    if (!otp || typeof otp !== "string") {
      return NextResponse.json(
        { success: false, error: "Mã OTP là bắt buộc" },
        { status: 400 }
      );
    }

    const result = await verifyOTP(username.trim(), otp.trim());

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Mã OTP hợp lệ",
    });
  } catch (error) {
    console.error("Error in verify-otp API:", error);
    return NextResponse.json(
      { success: false, error: "Có lỗi xảy ra. Vui lòng thử lại sau." },
      { status: 500 }
    );
  }
}
