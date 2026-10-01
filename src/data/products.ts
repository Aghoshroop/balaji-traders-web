import type { Product } from '@/types';
import productsData from './products.json';

export const products: Product[] = productsData as Product[];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

export function getProductsByCategory(categorySlug: string): Product[] {
  return products.filter((product) => product.categorySlug === categorySlug);
}

export function getAllProducts(): Product[] {
  return products;
}
export function getProductsByBrand(brand: string): Product[] {
  return products.filter((product) => product.brand.toLowerCase() === brand.toLowerCase());
}
