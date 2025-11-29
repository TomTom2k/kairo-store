import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
  Tailwind,
} from "@react-email/components";
import * as React from "react";

interface ContactFormEmailProps {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

export const ContactFormEmail = ({
  name,
  email,
  phone,
  subject,
  message,
}: ContactFormEmailProps) => {
  const previewText = `Tin nhắn mới từ ${name}: ${subject}`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="bg-white my-auto mx-auto font-sans">
          <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] max-w-[465px]">
            <Section className="mt-[32px]">
              <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
                Tin Nhắn Liên Hệ Mới
              </Heading>
              <Text className="text-black text-[14px] leading-[24px]">
                Xin chào Admin,
              </Text>
              <Text className="text-black text-[14px] leading-[24px]">
                Bạn vừa nhận được một tin nhắn liên hệ mới từ website Kairo
                Plants.
              </Text>
            </Section>

            <Section className="bg-[#f6f9f6] rounded-lg p-6 mb-6">
              <Text className="text-black text-[14px] leading-[24px] font-bold m-0 mb-2">
                Thông tin người gửi:
              </Text>
              <Text className="text-black text-[14px] leading-[24px] m-0">
                <strong>Họ tên:</strong> {name}
              </Text>
              <Text className="text-black text-[14px] leading-[24px] m-0">
                <strong>Email:</strong> {email}
              </Text>
              {phone && (
                <Text className="text-black text-[14px] leading-[24px] m-0">
                  <strong>Số điện thoại:</strong> {phone}
                </Text>
              )}
            </Section>

            <Section className="mb-6">
              <Text className="text-black text-[14px] leading-[24px] font-bold m-0 mb-2">
                Nội dung tin nhắn:
              </Text>
              <div className="bg-[#f6f9f6] rounded-lg p-4 border-l-4 border-[#22c55e]">
                <Text className="text-black text-[14px] leading-[24px] font-bold m-0 mb-2">
                  {subject}
                </Text>
                <Text className="text-black text-[14px] leading-[24px] m-0 whitespace-pre-wrap">
                  {message}
                </Text>
              </div>
            </Section>

            <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />
            <Text className="text-[#666666] text-[12px] leading-[24px]">
              Email này được gửi tự động từ hệ thống Kairo Plants.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default ContactFormEmail;
