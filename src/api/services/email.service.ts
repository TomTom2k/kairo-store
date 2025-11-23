import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const fromEmail = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";

interface SendOTPEmailParams {
  to: string;
  username: string;
  otp: string;
}

/**
 * Send password reset OTP email
 * @param to - Recipient email address
 * @param username - Admin username
 * @param otp - 6-digit OTP code
 */
export async function sendPasswordResetOTP({
  to,
  username,
  otp,
}: SendOTPEmailParams): Promise<{ success: boolean; error?: string }> {
  try {
    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: [to],
      subject: "Mã OTP Đặt Lại Mật Khẩu - Kairo Store Admin",
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Đặt Lại Mật Khẩu</title>
          </head>
          <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 28px;">🔐 Đặt Lại Mật Khẩu</h1>
            </div>
            
            <div style="background: #ffffff; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 10px 10px;">
              <p style="font-size: 16px; margin-bottom: 20px;">Xin chào <strong>${username}</strong>,</p>
              
              <p style="font-size: 16px; margin-bottom: 20px;">
                Bạn đã yêu cầu đặt lại mật khẩu cho tài khoản admin của Kairo Store. 
                Sử dụng mã OTP bên dưới để tiếp tục:
              </p>
              
              <div style="background: #f3f4f6; border: 2px dashed #667eea; border-radius: 8px; padding: 20px; text-align: center; margin: 30px 0;">
                <p style="font-size: 14px; color: #6b7280; margin: 0 0 10px 0; text-transform: uppercase; letter-spacing: 1px;">Mã OTP của bạn</p>
                <p style="font-size: 36px; font-weight: bold; color: #667eea; margin: 0; letter-spacing: 8px; font-family: 'Courier New', monospace;">
                  ${otp}
                </p>
              </div>
              
              <div style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; margin: 20px 0; border-radius: 4px;">
                <p style="margin: 0; font-size: 14px; color: #92400e;">
                  ⚠️ <strong>Lưu ý:</strong> Mã OTP này sẽ hết hạn sau <strong>15 phút</strong> và chỉ có thể sử dụng một lần.
                </p>
              </div>
              
              <p style="font-size: 14px; color: #6b7280; margin-top: 30px;">
                Nếu bạn không yêu cầu đặt lại mật khẩu, vui lòng bỏ qua email này. 
                Mật khẩu của bạn sẽ không thay đổi.
              </p>
              
              <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
              
              <p style="font-size: 12px; color: #9ca3af; text-align: center; margin: 0;">
                © ${new Date().getFullYear()} Kairo Store. All rights reserved.
              </p>
            </div>
          </body>
        </html>
      `,
    });

    if (error) {
      console.error("Error sending OTP email:", error);
      return { success: false, error: error.message };
    }

    console.log("OTP email sent successfully:", data?.id);
    return { success: true };
  } catch (error) {
    console.error("Error sending OTP email:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
