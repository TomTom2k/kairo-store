# 🌿 Kairo Plants - Website Cửa Hàng Cây Xanh

Website bán cây xanh hiện đại với animations đẹp mắt và được tối ưu SEO toàn diện.

## ✨ Tính Năng

### 🎨 Giao Diện

- ✅ Theme màu xanh lá chủ đạo (có thể tùy chỉnh)
- ✅ Animations 3D mượt mà với CSS
- ✅ Responsive design (mobile-first)
- ✅ Dark mode support
- ✅ Glassmorphism effects

### 🚀 Hiệu Năng

- ✅ Server Components (Next.js 15)
- ✅ Client Components chỉ cho interactive parts
- ✅ Image optimization với Next.js Image
- ✅ Lazy loading
- ✅ CSS animations (không dùng heavy libraries)

### 🔍 SEO

- ✅ Metadata đầy đủ
- ✅ Structured Data (Schema.org)
- ✅ Sitemap.xml tự động
- ✅ Robots.txt
- ✅ Open Graph tags
- ✅ Semantic HTML
- ✅ ARIA labels & accessibility

### 🎯 Components

#### Server Components (SEO-friendly)

```
src/components/sections/
├── Hero.tsx              # Hero section
├── FeaturedPlants.tsx    # Products showcase
├── Categories.tsx        # Product categories
├── Benefits.tsx          # Why choose us
└── Newsletter.tsx        # Newsletter signup
```

#### Client Components (Interactive)

```
src/components/interactive/
├── HeroButtons.tsx       # CTA buttons
├── PlantCard.tsx         # Product cards
├── CategoryCard.tsx      # Category cards
└── NewsletterForm.tsx    # Email form

src/components/animations/
├── FloatingLeaves.tsx    # Floating leaves effect
└── PlantPot3D.tsx        # 3D plant pot
```

#### Layout Components

```
src/components/layout/
├── Header.tsx            # Navigation header
└── Footer.tsx            # Footer with links
```

## 🎨 Tùy Chỉnh Theme

### Thay Đổi Màu Chủ Đạo

File: `src/app/globals.css`

```css
/* Xanh lá (mặc định) */
--plant-primary: oklch(0.55 0.15 145);

/* Xanh dương */
--plant-primary: oklch(0.55 0.15 220);

/* Tím */
--plant-primary: oklch(0.55 0.15 290);

/* Cam */
--plant-primary: oklch(0.6 0.18 40);
```

Xem chi tiết: [THEME-CONFIG.md](./THEME-CONFIG.md)

## 📦 Cấu Trúc Project

```
kairo-store/web/
├── public/
│   ├── manifest.json          # PWA manifest
│   └── favicon.ico
├── src/
│   ├── app/
│   │   ├── layout.tsx         # Root layout với metadata
│   │   ├── page.tsx           # Homepage
│   │   ├── globals.css        # Global styles & animations
│   │   ├── sitemap.ts         # Auto-generated sitemap
│   │   └── robots.ts          # Robots.txt
│   ├── features/              # Feature modules (độc lập)
│   │   └── home/              # Home feature
│   │       ├── components/    # Components của home
│   │       └── index.ts       # Public API
│   ├── shared/                # Shared resources
│   │   ├── components/        # Reusable components
│   │   │   ├── cards/         # Card components
│   │   │   └── forms/         # Form components
│   │   ├── ui/                # shadcn/ui components
│   │   ├── animations/        # Animation components
│   │   ├── layout/            # Layout components
│   │   └── index.ts
│   └── lib/
│       └── utils.ts           # Utility functions
├── THEME-CONFIG.md            # Hướng dẫn tùy chỉnh theme
├── SEO-GUIDE.md               # Hướng dẫn SEO chi tiết
└── README.md
```

## 🚀 Getting Started

### Installation

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```

### Development

```bash
# Development với hot reload
pnpm dev

# Mở browser tại http://localhost:3000
```

### Linting

```bash
pnpm lint
```

## 🎯 SEO Checklist

### Đã Hoàn Thành ✅

- [x] Server/Client components tách biệt
- [x] Metadata & Open Graph tags
- [x] JSON-LD Structured Data
- [x] Semantic HTML5
- [x] ARIA labels & accessibility
- [x] Image alt text & lazy loading
- [x] Sitemap.xml auto-generated
- [x] Robots.txt configured
- [x] PWA manifest.json

### Cần Làm Sau Deploy 📝

- [ ] Google Search Console verification
- [ ] Google Analytics setup
- [ ] Test Rich Snippets
- [ ] Submit sitemap to Google
- [ ] Monitor Core Web Vitals

Xem chi tiết: [SEO-GUIDE.md](./SEO-GUIDE.md)

## 🎨 Design Features

### Animations

- **Floating Leaves:** CSS keyframe animations
- **3D Plant Pot:** CSS transforms với perspective
- **Hover Effects:** Smooth transitions
- **Scroll Animations:** Fade in & slide up
- **Gradient Animations:** Dynamic color shifts

### Responsive Breakpoints

- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px
- Large Desktop: > 1280px

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile Safari
- Chrome Mobile

## 🛠️ Tech Stack

- **Framework:** Next.js 15 (App Router)
- **React:** 19.2.0
- **Styling:** Tailwind CSS 4
- **UI Components:** shadcn/ui
- **Icons:** Lucide React
- **Fonts:** Geist Sans & Geist Mono
- **Type Safety:** TypeScript

## 📚 Documentation

- [THEME-CONFIG.md](./THEME-CONFIG.md) - Hướng dẫn tùy chỉnh màu sắc
- [SEO-GUIDE.md](./SEO-GUIDE.md) - Hướng dẫn SEO chi tiết

## 🤝 Contributing

1. Fork the project
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Credits

- Design & Development: Kairo Team
- Icons: Lucide
- Fonts: Vercel (Geist)
- Images: Unsplash

---

Made with 💚 by Kairo Plants Team
