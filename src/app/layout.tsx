import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/providers/QueryProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

// SEO Metadata tối ưu
export const metadata: Metadata = {
  title: {
    default: "Kairo Plants - Cửa Hàng Cây Xanh | Mang Thiên Nhiên Vào Nhà",
    template: "%s | Kairo Plants",
  },
  description:
    "Cửa hàng cây xanh Kairo Plants - Chuyên cung cấp cây cảnh, cây văn phòng, cây trong nhà, cây phong thủy. Giao hàng toàn quốc, bảo hành 30 ngày. Hơn 500 loại cây xanh chất lượng cao.",
  keywords: [
    "cây xanh",
    "cây cảnh",
    "cây văn phòng",
    "cây trong nhà",
    "cây trang trí",
    "cây phong thủy",
    "mua cây online",
    "shop cây xanh",
    "cây lọc không khí",
    "cây sen đá",
  ],
  authors: [{ name: "Kairo Plants" }],
  creator: "Kairo Plants",
  publisher: "Kairo Plants",
  metadataBase: new URL("https://kairoplants.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: "/",
    siteName: "Kairo Plants",
    title: "Kairo Plants - Cửa Hàng Cây Xanh Uy Tín",
    description:
      "Khám phá bộ sưu tập cây xanh đa dạng. Giao hàng nhanh, bảo hành 30 ngày, hướng dẫn chăm sóc tận tình.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Kairo Plants - Cửa hàng cây xanh",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kairo Plants - Cửa Hàng Cây Xanh",
    description: "Mang thiên nhiên vào không gian sống của bạn",
    images: ["/twitter-image.jpg"],
    creator: "@kairoplants",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
  },
};

// JSON-LD Structured Data
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Store",
  "@id": "https://kairoplants.com",
  name: "Kairo Plants",
  description:
    "Cửa hàng cây xanh chuyên nghiệp, cung cấp đa dạng loại cây cảnh và phụ kiện chăm sóc cây",
  url: "https://kairoplants.com",
  logo: "https://kairoplants.com/logo.png",
  image: "https://kairoplants.com/og-image.jpg",
  telephone: "+84-123-456-789",
  email: "hello@kairoplants.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "123 Đường ABC",
    addressLocality: "Quận XYZ",
    addressRegion: "TP. Hồ Chí Minh",
    addressCountry: "VN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "10.762622",
    longitude: "106.660172",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "20:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Saturday", "Sunday"],
      opens: "09:00",
      closes: "18:00",
    },
  ],
  priceRange: "$$",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    reviewCount: "10234",
  },
  sameAs: [
    "https://www.facebook.com/kairoplants",
    "https://www.instagram.com/kairoplants",
    "https://twitter.com/kairoplants",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
