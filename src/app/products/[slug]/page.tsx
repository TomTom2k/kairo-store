import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductBySlug } from "@/api/services/products.service";
import { ProductDetailClient } from "./ProductDetailClient";
import { adaptSupabaseProduct } from "@/lib/adapters/product.adapter";

// Force dynamic rendering to prevent caching issues
export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  // Note: getProductBySlug returns snake_case product (Supabase type)
  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: "Sản phẩm không tồn tại | Kairo Store",
    };
  }

  // Adapt to get camelCase properties if needed, but for metadata we can access snake_case directly
  // However, let's adapt for consistency
  const adaptedProduct = adaptSupabaseProduct(product);

  return {
    title: `${adaptedProduct.metaTitle || adaptedProduct.name} | Kairo Store`,
    description:
      adaptedProduct.metaDescription ||
      adaptedProduct.description.substring(0, 160),
    keywords: adaptedProduct.keywords?.split(",").map((k) => k.trim()),
    openGraph: {
      title: adaptedProduct.metaTitle || adaptedProduct.name,
      description:
        adaptedProduct.metaDescription ||
        adaptedProduct.description.substring(0, 160),
      images: adaptedProduct.images,
      type: "website",
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const adaptedProduct = adaptSupabaseProduct(product);

  return <ProductDetailClient product={adaptedProduct} />;
}
