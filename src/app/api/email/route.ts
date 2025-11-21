import { NextResponse } from "next/server";
import { resend } from "@/lib/resend";
import OrderConfirmationEmail from "@/components/emails/OrderConfirmationEmail";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { customerName, customerEmail, orderId, items, totalAmount } = body;

    const { data, error } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "tramthu96@gmail.com",
      subject: `Xác nhận đơn hàng #${orderId} - Kairo Plants`,
      react: OrderConfirmationEmail({
        customerName,
        orderId,
        items,
        totalAmount,
      }),
    });

    if (error) {
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
