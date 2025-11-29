"use client";

import React, { useState } from "react";
import { Header, Footer } from "@/shared/layout";
import { ScrollIndicator } from "@/shared/ui";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  Facebook,
  Instagram,
  Twitter,
  ChevronDown,
} from "lucide-react";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus("success");
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });

      setTimeout(() => setSubmitStatus("idle"), 3000);
    }, 1500);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Điện Thoại",
      content: "+84 123 456 789",
      link: "tel:+84123456789",
      color: "from-blue-400 to-cyan-500",
    },
    {
      icon: Mail,
      title: "Email",
      content: "hello@kairoplants.com",
      link: "mailto:hello@kairoplants.com",
      color: "from-purple-400 to-pink-500",
    },
    {
      icon: MapPin,
      title: "Địa Chỉ",
      content: "123 Đường ABC, Quận XYZ, TP.HCM",
      link: "https://maps.google.com",
      color: "from-green-400 to-emerald-500",
    },
    {
      icon: Clock,
      title: "Giờ Làm Việc",
      content: "T2-T6: 8:00-20:00, T7-CN: 9:00-18:00",
      link: null,
      color: "from-amber-400 to-orange-500",
    },
  ];

  const faqs = [
    {
      question: "Làm thế nào để đặt hàng?",
      answer:
        "Bạn có thể đặt hàng qua website hoặc nhắn tin trực tiếp cho chúng mình. Mình sẽ phản hồi trong vòng vài giờ (giờ hành chính).",
    },
    {
      question: "Thời gian giao hàng là bao lâu?",
      answer:
        "Hiện tại mình chỉ giao hàng nội thành TP.HCM trong 2-3 ngày. Các khu vực khác có thể liên hệ để mình hỗ trợ.",
    },
    {
      question: "Chính sách bảo hành như thế nào?",
      answer:
        "Cây được bảo hành 14 ngày kể từ ngày nhận. Nếu cây có vấn đề do chất lượng ban đầu, mình sẽ hỗ trợ đổi cây mới.",
    },
    {
      question: "Mình có thể xem cây trước khi mua không?",
      answer:
        "Có nhé! Bạn có thể hẹn lịch để ghé xem cây trực tiếp. Mình sẽ tư vấn chi tiết về cách chăm sóc từng loại cây.",
    },
    {
      question: "Có hướng dẫn chăm sóc cây không?",
      answer:
        "Có! Mỗi cây đều đi kèm hướng dẫn chăm sóc cơ bản. Bạn cũng có thể nhắn tin hỏi mình bất cứ lúc nào.",
    },
  ];

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/10 to-primary/20" />
          <div className="absolute inset-0">
            <div className="absolute top-10 left-20 w-40 h-40 bg-primary/20 rounded-full blur-3xl animate-float" />
            <div className="absolute bottom-10 right-20 w-48 h-48 bg-accent/30 rounded-full blur-3xl animate-float-slow" />
            <div className="absolute top-1/2 left-1/2 w-36 h-36 bg-primary/15 rounded-full blur-3xl animate-bounce-slow" />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in-up">
                <span className="gradient-animate">Liên Hệ Với Chúng Tôi</span>
              </h1>
              <p
                className="text-xl md:text-2xl text-muted-foreground animate-fade-in-up"
                style={{ animationDelay: "0.2s" }}
              >
                Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn
              </p>
            </div>
          </div>
        </section>

        {/* Contact Info Cards */}
        <section className="py-20 relative">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
              {contactInfo.map((info, index) => (
                <a
                  key={index}
                  href={info.link || "#"}
                  target={info.link?.startsWith("http") ? "_blank" : undefined}
                  rel={
                    info.link?.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className={`glass-card p-6 rounded-3xl hover-lift group animate-zoom-in-bounce ${
                    !info.link ? "pointer-events-none" : ""
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${info.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <info.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">{info.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {info.content}
                  </p>
                </a>
              ))}
            </div>

            {/* Main Contact Section */}
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div className="animate-slide-in-left-fade">
                <div className="glass-card p-8 md:p-10 rounded-3xl">
                  <h2 className="text-3xl font-bold mb-6">Gửi Tin Nhắn</h2>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-semibold mb-2"
                      >
                        Họ và Tên *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl glass border-2 border-transparent focus:border-primary focus:outline-none transition-all duration-300"
                        placeholder="Nguyễn Văn A"
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-semibold mb-2"
                        >
                          Email *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 rounded-xl glass border-2 border-transparent focus:border-primary focus:outline-none transition-all duration-300"
                          placeholder="email@example.com"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="phone"
                          className="block text-sm font-semibold mb-2"
                        >
                          Số Điện Thoại
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl glass border-2 border-transparent focus:border-primary focus:outline-none transition-all duration-300"
                          placeholder="0123456789"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="subject"
                        className="block text-sm font-semibold mb-2"
                      >
                        Chủ Đề *
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl glass border-2 border-transparent focus:border-primary focus:outline-none transition-all duration-300"
                      >
                        <option value="">Chọn chủ đề</option>
                        <option value="product">Tư vấn sản phẩm</option>
                        <option value="order">Đặt hàng</option>
                        <option value="warranty">Bảo hành</option>
                        <option value="partnership">Hợp tác</option>
                        <option value="other">Khác</option>
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-semibold mb-2"
                      >
                        Tin Nhắn *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        className="w-full px-4 py-3 rounded-xl glass border-2 border-transparent focus:border-primary focus:outline-none transition-all duration-300 resize-none"
                        placeholder="Nhập nội dung tin nhắn của bạn..."
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full glass-button py-4 rounded-xl font-semibold text-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed group"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Đang gửi...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                          Gửi Tin Nhắn
                        </>
                      )}
                    </button>

                    {submitStatus === "success" && (
                      <div className="p-4 bg-green-500/20 border-2 border-green-500/50 rounded-xl text-center animate-bounce-in">
                        <p className="text-green-700 dark:text-green-300 font-semibold">
                          ✓ Tin nhắn đã được gửi thành công!
                        </p>
                      </div>
                    )}
                  </form>
                </div>
              </div>

              {/* Additional Info */}
              <div className="space-y-8 animate-slide-in-right-fade">
                {/* Social Media */}
                <div className="glass-card p-8 rounded-3xl">
                  <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <MessageSquare className="w-6 h-6 text-primary" />
                    Kết Nối Với Chúng Tôi
                  </h3>
                  <div className="flex gap-4">
                    <a
                      href="https://facebook.com/kairoplants"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center hover:scale-110 transition-transform duration-300"
                    >
                      <Facebook className="w-7 h-7 text-white" />
                    </a>
                    <a
                      href="https://instagram.com/kairoplants"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-14 h-14 rounded-xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center hover:scale-110 transition-transform duration-300"
                    >
                      <Instagram className="w-7 h-7 text-white" />
                    </a>
                    <a
                      href="https://twitter.com/kairoplants"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-14 h-14 rounded-xl bg-gradient-to-br from-sky-400 to-blue-500 flex items-center justify-center hover:scale-110 transition-transform duration-300"
                    >
                      <Twitter className="w-7 h-7 text-white" />
                    </a>
                  </div>
                </div>

                {/* Map Placeholder */}
                <div className="glass-card p-8 rounded-3xl">
                  <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <MapPin className="w-6 h-6 text-primary" />
                    Vị Trí Cửa Hàng
                  </h3>
                  <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl flex items-center justify-center">
                    <a
                      href="https://maps.google.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="glass-button px-6 py-3 rounded-full font-semibold hover:scale-105 transition-transform duration-300"
                    >
                      Xem Bản Đồ
                    </a>
                  </div>
                </div>

                {/* Quick Info */}
                <div className="glass-card p-8 rounded-3xl">
                  <h3 className="text-2xl font-bold mb-4">Cam Kết Của Mình</h3>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-primary">✓</span>
                      <span>Phản hồi nhanh trong giờ hành chính</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">✓</span>
                      <span>Tư vấn chăm sóc cây miễn phí</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">✓</span>
                      <span>Cây khỏe mạnh, được chăm sóc kỹ</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">✓</span>
                      <span>Giao hàng nội thành TP.HCM</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">✓</span>
                      <span>Hỗ trợ sau bán hàng tận tình</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5" />
          <div className="container mx-auto px-4 relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 animate-fade-in-up">
              Câu Hỏi Thường Gặp
            </h2>

            <div className="max-w-3xl mx-auto space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="glass-card rounded-2xl overflow-hidden animate-slide-in-bottom"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full p-6 flex items-center justify-between text-left hover:bg-primary/5 transition-colors duration-300"
                  >
                    <span className="font-bold text-lg pr-4">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-6 h-6 text-primary flex-shrink-0 transition-transform duration-300 ${
                        openFaq === index ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      openFaq === index ? "max-h-96" : "max-h-0"
                    }`}
                  >
                    <div className="px-6 pb-6 text-muted-foreground">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <ScrollIndicator />
    </div>
  );
};

export default ContactPage;
