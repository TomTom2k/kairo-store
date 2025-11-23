import { Resend } from "resend";
import { render } from "@react-email/render";
import OrderConfirmationEmail from "@/components/emails/OrderConfirmationEmail";

const resend = new Resend(process.env.RESEND_API_KEY);
const fromEmail = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";
const adminEmail = process.env.ADMIN_EMAIL || "tramthu96@gmail.com";

interface SendOTPEmailParams {
  to: string;
  username: string;
  otp: string;
}

interface SendOrderConfirmationEmailParams {
  to: string;
  customerName: string;
  orderId: string;
  orderNumber: string;
  items: {
    name: string;
    quantity: number;
    price: number;
  }[];
  totalAmount: number;
}

interface SendAdminOrderNotificationParams {
  orderId: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerAddress: string;
  items: {
    name: string;
    quantity: number;
    price: number;
  }[];
  totalAmount: number;
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

/**
 * Send order confirmation email to customer
 * @param params - Order confirmation email parameters
 */
export async function sendOrderConfirmationEmail({
  to,
  customerName,
  orderId,
  orderNumber,
  items,
  totalAmount,
}: SendOrderConfirmationEmailParams): Promise<{ success: boolean; error?: string }> {
  try {
    const emailHtml = await render(
      OrderConfirmationEmail({
        customerName,
        orderId: orderNumber,
        items,
        totalAmount,
      })
    );

    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: [to],
      subject: `Xác nhận đơn hàng #${orderNumber} - Kairo Store`,
      html: emailHtml,
    });

    if (error) {
      console.error("Error sending order confirmation email:", error);
      return { success: false, error: error.message };
    }

    console.log("Order confirmation email sent successfully:", data?.id);
    return { success: true };
  } catch (error) {
    console.error("Error sending order confirmation email:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

/**
 * Send order notification email to admin
 * @param params - Admin order notification parameters
 */
export async function sendAdminOrderNotification({
  orderId,
  orderNumber,
  customerName,
  customerEmail,
  customerPhone,
  customerAddress,
  items,
  totalAmount,
}: SendAdminOrderNotificationParams): Promise<{ success: boolean; error?: string }> {
  try {
    const itemsHtml = items
      .map(
        (item) => `
      <tr>
        <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;">${item.name}</td>
        <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; text-align: center;">${item.quantity}</td>
        <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; text-align: right;">
          ${new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(item.price)}
        </td>
        <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; text-align: right;">
          ${new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(item.price * item.quantity)}
        </td>
      </tr>
    `
      )
      .join("");

    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Đơn hàng mới - ${orderNumber}</title>
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 700px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 28px;">🛒 Đơn hàng mới</h1>
            <p style="color: white; margin: 10px 0 0 0; font-size: 18px;">Mã đơn: #${orderNumber}</p>
          </div>
          
          <div style="background: #ffffff; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 10px 10px;">
            <div style="background: #f0f9ff; border-left: 4px solid #3b82f6; padding: 15px; margin-bottom: 20px; border-radius: 4px;">
              <p style="margin: 0; font-size: 14px; color: #1e40af;">
                ⚡ <strong>Thông báo:</strong> Bạn có một đơn hàng mới cần xử lý!
              </p>
            </div>

            <h2 style="color: #1f2937; font-size: 20px; margin-top: 0; margin-bottom: 20px;">Thông tin khách hàng</h2>
            <table style="width: 100%; margin-bottom: 30px;">
              <tr>
                <td style="padding: 8px 0; color: #6b7280; width: 150px;"><strong>Tên khách hàng:</strong></td>
                <td style="padding: 8px 0; color: #1f2937;">${customerName}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #6b7280;"><strong>Email:</strong></td>
                <td style="padding: 8px 0; color: #1f2937;">${customerEmail}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #6b7280;"><strong>Số điện thoại:</strong></td>
                <td style="padding: 8px 0; color: #1f2937;">${customerPhone}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #6b7280; vertical-align: top;"><strong>Địa chỉ:</strong></td>
                <td style="padding: 8px 0; color: #1f2937;">${customerAddress}</td>
              </tr>
            </table>

            <h2 style="color: #1f2937; font-size: 20px; margin-top: 30px; margin-bottom: 20px;">Chi tiết đơn hàng</h2>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
              <thead>
                <tr style="background: #f9fafb;">
                  <th style="padding: 12px; text-align: left; border-bottom: 2px solid #e5e7eb; font-weight: 600;">Sản phẩm</th>
                  <th style="padding: 12px; text-align: center; border-bottom: 2px solid #e5e7eb; font-weight: 600;">SL</th>
                  <th style="padding: 12px; text-align: right; border-bottom: 2px solid #e5e7eb; font-weight: 600;">Đơn giá</th>
                  <th style="padding: 12px; text-align: right; border-bottom: 2px solid #e5e7eb; font-weight: 600;">Thành tiền</th>
                </tr>
              </thead>
              <tbody>
                ${itemsHtml}
              </tbody>
            </table>

            <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin-top: 20px;">
              <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px 0;">
                <span style="font-size: 18px; font-weight: bold; color: #1f2937;">Tổng cộng:</span>
                <span style="font-size: 24px; font-weight: bold; color: #667eea;">
                  ${new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(totalAmount)}
                </span>
              </div>
            </div>

            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
              <p style="font-size: 14px; color: #6b7280; margin: 0;">
                <strong>Mã đơn hàng:</strong> ${orderId}<br>
                <strong>Thời gian đặt hàng:</strong> ${new Date().toLocaleString("vi-VN", {
                  timeZone: "Asia/Ho_Chi_Minh",
                })}
              </p>
            </div>

            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
            
            <p style="font-size: 12px; color: #9ca3af; text-align: center; margin: 0;">
              © ${new Date().getFullYear()} Kairo Store. All rights reserved.
            </p>
          </div>
        </body>
      </html>
    `;

    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: [adminEmail],
      subject: `🛒 Đơn hàng mới #${orderNumber} - ${customerName}`,
      html,
    });

    if (error) {
      console.error("Error sending admin order notification:", error);
      return { success: false, error: error.message };
    }

    console.log("Admin order notification sent successfully:", data?.id);
    return { success: true };
  } catch (error) {
    console.error("Error sending admin order notification:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
