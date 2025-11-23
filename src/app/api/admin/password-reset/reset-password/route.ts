import { NextRequest, NextResponse } from "next/server";
import { resetPassword } from "@/api/services/password-reset.service";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, otp, newPassword } = body;

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

    if (!newPassword || typeof newPassword !== "string") {
      return NextResponse.json(
        { success: false, error: "Mật khẩu mới là bắt buộc" },
        { status: 400 }
      );
    }

    if (newPassword.length < 6) {
      return NextResponse.json(
        { success: false, error: "Mật khẩu phải có ít nhất 6 ký tự" },
        { status: 400 }
      );
    }

    const result = await resetPassword(
      username.trim(),
      otp.trim(),
      newPassword
    );

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Mật khẩu đã được đặt lại thành công",
    });
  } catch (error) {
    console.error("Error in reset-password API:", error);
    return NextResponse.json(
      { success: false, error: "Có lỗi xảy ra. Vui lòng thử lại sau." },
      { status: 500 }
    );
  }
}
