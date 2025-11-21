"use client";

import { Button } from "@/shared/ui";
import { useState } from "react";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    // Simulate API call
    setTimeout(() => {
      console.log("Newsletter signup:", email);
      setStatus("success");
      setEmail("");
      setTimeout(() => setStatus("idle"), 3000);
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto pt-4">
      <label htmlFor="newsletter-email" className="sr-only">
        Địa chỉ email của bạn
      </label>
      <input
        id="newsletter-email"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Nhập email của bạn..."
        className="flex-1 px-4 py-3 rounded-lg glass focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all hover:scale-[1.02]"
        aria-label="Nhập địa chỉ email để đăng ký nhận tin"
        disabled={status === "loading"}
      />
      <Button
        type="submit"
        size="lg"
        disabled={status === "loading"}
        className="group relative overflow-hidden glass-button shadow-lg hover:shadow-xl transition-all duration-300"
        aria-label="Đăng ký nhận tin"
      >
        <span className="relative z-10">
          {status === "loading" ? "Đang gửi..." : status === "success" ? "Thành công!" : "Đăng Ký"}
        </span>
        <div className="absolute inset-0 bg-gradient-to-r from-primary-dark to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </Button>
    </form>
  );
}
