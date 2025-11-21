# Cấu Trúc Dự Án

## Tổng Quan

Dự án sử dụng **Feature-Based Architecture** - mỗi tính năng độc lập, dễ bảo trì và mở rộng.

## Cấu Trúc Thư Mục

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Homepage
│   └── globals.css        # Global styles
│
├── features/              # 🎯 Features (Tính năng độc lập)
│   └── home/
│       ├── components/    # Components của home
│       └── index.ts       # Public API
│
├── shared/                # 🔧 Shared (Dùng chung)
│   ├── components/
│   │   ├── cards/        # PlantCard, CategoryCard, BenefitCard
│   │   └── forms/        # NewsletterForm
│   ├── ui/               # Button, Card, ScrollIndicator
│   ├── animations/       # FloatingLeaves, TiltCard, etc.
│   └── layout/           # Header, Footer
│
└── lib/                   # 📚 Libraries
    └── utils.ts          # Utility functions
```

## Nguyên Tắc

### Features (Tính năng)

- ✅ Mỗi feature **độc lập**, không phụ thuộc feature khác
- ✅ Chỉ import từ `shared/` và `lib/`
- ✅ Export qua `index.ts` (public API)

**Ví dụ:**

```typescript
// ✅ Đúng
import { Button } from "@/shared/ui";
import { PlantCard } from "@/shared/components/cards";

// ❌ Sai - không import từ feature khác
import { Something } from "@/features/other-feature";
```

### Shared (Dùng chung)

- ✅ Chỉ chứa code được dùng ở **≥2 features**
- ✅ Tổ chức theo **category** (cards, forms, animations)
- ✅ Không chứa business logic của feature cụ thể

## Import Paths

```typescript
// Features
import { Hero, FeaturedPlants } from "@/features/home";

// Shared Components
import { PlantCard } from "@/shared/components/cards";
import { NewsletterForm } from "@/shared/components/forms";

// UI Components
import { Button, Card } from "@/shared/ui";

// Animations
import { TiltCard, ScrollReveal } from "@/shared/animations";

// Layout
import { Header, Footer } from "@/shared/layout";

// Utils
import { cn } from "@/lib/utils";
```

## Thêm Feature Mới

1. Tạo thư mục trong `features/`

```bash
mkdir -p src/features/products/components
```

2. Tạo components

```typescript
// src/features/products/components/ProductList.tsx
export function ProductList() {
  // Component code
}
```

3. Export public API

```typescript
// src/features/products/index.ts
export * from "./components";
```

4. Sử dụng

```typescript
// src/app/products/page.tsx
import { ProductList } from "@/features/products";
```

## Thêm Shared Component

Chỉ thêm vào `shared/` khi:

- Component được dùng ở **≥2 features**
- Component thực sự **reusable** (không chứa logic cụ thể)

```bash
# Tạo shared component
mkdir -p src/shared/components/modals
touch src/shared/components/modals/Modal.tsx
touch src/shared/components/modals/index.ts
```

## Lợi Ích

✅ **Dễ tìm code** - Biết ngay feature nào chứa component gì  
✅ **Dễ bảo trì** - Sửa feature này không ảnh hưởng feature khác  
✅ **Dễ mở rộng** - Thêm feature mới chỉ cần tạo thư mục  
✅ **Tái sử dụng** - Shared components dùng chung nhiều nơi  
✅ **TypeScript** - Import paths rõ ràng, autocomplete tốt
