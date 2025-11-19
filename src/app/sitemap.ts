import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://kairoplants.com'
  
  // Static pages
  const routes = [
    '',
    '/san-pham',
    '/danh-muc',
    '/gioi-thieu',
    '/lien-he',
    '/huong-dan-cham-soc',
    '/chinh-sach-doi-tra',
    '/chinh-sach-van-chuyen',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  // Categories
  const categories = [
    'cay-van-phong',
    'cay-canh',
    'cay-trong-nha',
    'cay-ngoai-troi',
    'cay-sen-da',
    'cay-nhiet-doi',
  ].map((category) => ({
    url: `${baseUrl}/danh-muc/${category}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  // Example products - In production, fetch from database
  const products = [
    'monstera-deliciosa',
    'cay-trau-ba',
    'cay-da-bup-do',
    'cay-luoi-ho',
  ].map((product) => ({
    url: `${baseUrl}/san-pham/${product}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [...routes, ...categories, ...products]
}

