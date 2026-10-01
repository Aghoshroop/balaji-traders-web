import { getAllProducts } from '@/data/products';
import ProductsClient from './ProductsClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Collection',
  description: 'Explore our complete warehouse catalog of swimming apparel and equipment.',
};

export default async function ProductsPage() {
  const products = await getAllProducts();
  return <ProductsClient products={products} />;
}
