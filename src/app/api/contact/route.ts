import { NextResponse } from "next/server";
import { resend } from "@/lib/resend";
import ContactFormEmail from "@/components/emails/ContactFormEmail";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, subject, message } = body;

    // Simple validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "Vui lòng điền đầy đủ thông tin bắt buộc" },
        { status: 400 }
      );
    }

    const { data, error } = await resend.emails.send({
      from: "Kairo Plants <onboarding@resend.dev>",
      to: "tramthu96@gmail.com", // Configured admin email
      subject: `[Liên Hệ] ${subject} - từ ${name}`,
      replyTo: email,
      react: ContactFormEmail({
        name,
        email,
        phone,
        subject,
        message,
      }),
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "Đã có lỗi xảy ra, vui lòng thử lại sau" },
      { status: 500 }
    );
  }
}
