import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Text,
  Tailwind,
} from "@react-email/components";
import * as React from "react";

interface OrderConfirmationEmailProps {
  customerName: string;
  orderId: string;
  items: {
    name: string;
    quantity: number;
    price: number;
  }[];
  totalAmount: number;
}

export const OrderConfirmationEmail = ({
  customerName,
  orderId,
  items,
  totalAmount,
}: OrderConfirmationEmailProps) => {
  const previewText = `Xác nhận đơn hàng #${orderId}`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="bg-white my-auto mx-auto font-sans">
          <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] max-w-[465px]">
            <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
              Cảm ơn bạn đã đặt hàng tại <strong>Kairo Plants</strong>!
            </Heading>
            <Text className="text-black text-[14px] leading-[24px]">
              Xin chào {customerName},
            </Text>
            <Text className="text-black text-[14px] leading-[24px]">
              Chúng tôi đã nhận được đơn hàng của bạn và đang tiến hành xử lý.
              Dưới đây là thông tin chi tiết đơn hàng:
            </Text>
            <Text className="text-black text-[14px] leading-[24px]">
              <strong>Mã đơn hàng:</strong> #{orderId}
            </Text>

            <Section className="mt-[20px] mb-[20px]">
              {items.map((item, index) => (
                <div key={index} className="flex justify-between mb-2">
                  <Text className="m-0">
                    {item.name} x {item.quantity}
                  </Text>
                  <Text className="m-0 font-medium">
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(item.price * item.quantity)}
                  </Text>
                </div>
              ))}
            </Section>

            <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />

            <div className="flex justify-between">
              <Text className="m-0 font-bold">Tổng cộng:</Text>
              <Text className="m-0 font-bold text-[18px]">
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(totalAmount)}
              </Text>
            </div>

            <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />

            <Text className="text-[#666666] text-[12px] leading-[24px]">
              Nếu bạn có bất kỳ câu hỏi nào, vui lòng trả lời email này hoặc
              liên hệ với chúng tôi qua số điện thoại hotline.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default OrderConfirmationEmail;
