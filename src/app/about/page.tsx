"use client";

import React from "react";
import { Header, Footer } from "@/shared/layout";
import { ScrollIndicator } from "@/shared/ui";
import {
  Leaf,
  Heart,
  Users,
  Award,
  TrendingUp,
  ShoppingBag,
  Star,
  CheckCircle2,
} from "lucide-react";

const AboutPage = () => {
  const values = [
    {
      icon: Leaf,
      title: "Bền Vững",
      description:
        "Cam kết bảo vệ môi trường và phát triển bền vững trong mọi hoạt động",
      color: "from-green-400 to-emerald-500",
    },
    {
      icon: Heart,
      title: "Tận Tâm",
      description:
        "Chăm sóc từng cây xanh như chăm sóc người thân trong gia đình",
      color: "from-rose-400 to-pink-500",
    },
    {
      icon: Award,
      title: "Chất Lượng",
      description:
        "Chỉ cung cấp những cây xanh khỏe mạnh, đạt tiêu chuẩn cao nhất",
      color: "from-amber-400 to-orange-500",
    },
    {
      icon: Users,
      title: "Cộng Đồng",
      description:
        "Xây dựng cộng đồng yêu cây, yêu thiên nhiên và bảo vệ môi trường",
      color: "from-blue-400 to-cyan-500",
    },
  ];

  const stats = [
    { number: "200+", label: "Khách Hàng Tin Tưởng", icon: Users },
    { number: "50+", label: "Loại Cây Xanh", icon: Leaf },
    { number: "4.9/5", label: "Đánh Giá Trung Bình", icon: Star },
    { number: "14 Ngày", label: "Bảo Hành Cây", icon: CheckCircle2 },
  ];

  const milestones = [
    {
      title: "Khởi Đầu Hành Trình",
      description:
        "Kairo Plants được thành lập bởi những người trẻ yêu cây, yêu thiên nhiên",
    },
    {
      title: "Phát Triển & Mở Rộng",
      description: "Mở rộng bộ sưu tập và xây dựng cộng đồng yêu cây online",
    },
    {
      title: "Hiện Tại",
      description:
        "Phục vụ khách hàng qua nền tảng online, giao hàng nội thành TP.HCM",
    },
  ];

  return (
    <div className="min-h-screen">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/10 to-primary/20" />
          <div className="absolute inset-0">
            <div className="absolute top-20 left-10 w-32 h-32 bg-primary/20 rounded-full blur-3xl animate-float" />
            <div className="absolute bottom-20 right-10 w-40 h-40 bg-accent/30 rounded-full blur-3xl animate-float-slow" />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in-up">
                <span className="gradient-animate">Về Kairo Plants</span>
              </h1>
              <p
                className="text-xl md:text-2xl text-muted-foreground mb-8 animate-fade-in-up"
                style={{ animationDelay: "0.2s" }}
              >
                Mang Thiên Nhiên Vào Không Gian Sống Của Bạn
              </p>
              <div
                className="flex flex-wrap gap-4 justify-center animate-fade-in-up"
                style={{ animationDelay: "0.4s" }}
              >
                <div className="flex items-center gap-2 glass px-6 py-3 rounded-full">
                  <Heart className="w-5 h-5 text-primary" />
                  <span className="font-semibold">Tư Vấn Tận Tình</span>
                </div>
                <div className="flex items-center gap-2 glass px-6 py-3 rounded-full">
                  <ShoppingBag className="w-5 h-5 text-primary" />
                  <span className="font-semibold">200+ Đơn Hàng</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-20 relative">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 animate-fade-in-up">
                Câu Chuyện Của Chúng Tôi
              </h2>

              <div className="glass-card p-8 md:p-12 rounded-3xl mb-12 animate-slide-in-bottom">
                <p className="text-lg leading-relaxed mb-6">
                  Kairo Plants bắt đầu từ niềm đam mê với cây xanh của hai người
                  bạn trẻ. Chúng mình tin rằng mỗi ngôi nhà đều xứng đáng có một
                  góc xanh nhỏ, nơi bạn có thể thư giãn và kết nối với thiên
                  nhiên.
                </p>
                <p className="text-lg leading-relaxed mb-6">
                  Từ việc chăm sóc vài chậu cây trong căn hộ nhỏ, chúng mình
                  quyết định chia sẻ niềm đam mê này với mọi người. Hiện tại,
                  Kairo Plants có hơn 50 loại cây phổ biến, phù hợp với không
                  gian sống Việt Nam.
                </p>
                <p className="text-lg leading-relaxed">
                  Chúng mình không chỉ bán cây, mà còn muốn chia sẻ kinh nghiệm
                  chăm sóc và đồng hành cùng bạn trong hành trình tạo dựng không
                  gian xanh của riêng mình.
                </p>
              </div>

              {/* Milestones */}
              <div className="space-y-6">
                {milestones.map((item, index) => (
                  <div
                    key={index}
                    className="glass-card p-6 rounded-2xl hover-lift animate-slide-in-left-fade"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <h3 className="text-2xl font-bold mb-2 flex items-center gap-2">
                      <span className="text-primary">✓</span>
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground pl-7">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 relative">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 animate-fade-in-up">
              Giá Trị Cốt Lõi
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="glass-card p-8 rounded-3xl hover-lift group animate-zoom-in-bounce"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${value.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <value.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{value.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="glass-strong text-center p-8 rounded-3xl hover-lift animate-bounce-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <stat.icon className="w-12 h-12 mx-auto mb-4 text-primary" />
                  <div className="text-4xl md:text-5xl font-bold mb-2 gradient-animate">
                    {stat.number}
                  </div>
                  <div className="text-muted-foreground font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 relative">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto glass-strong p-12 rounded-3xl text-center animate-fade-in-scale">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Sẵn Sàng Bắt Đầu Hành Trình Xanh?
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Khám phá bộ sưu tập cây xanh đa dạng và tìm kiếm người bạn xanh
                hoàn hảo cho không gian của bạn
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <a
                  href="/products"
                  className="glass-button px-8 py-4 rounded-full font-semibold text-lg hover:scale-105 transition-transform duration-300"
                >
                  Khám Phá Sản Phẩm
                </a>
                <a
                  href="/contact"
                  className="glass px-8 py-4 rounded-full font-semibold text-lg hover:scale-105 transition-transform duration-300"
                >
                  Liên Hệ Với Chúng Tôi
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <ScrollIndicator />
    </div>
  );
};

export default AboutPage;
