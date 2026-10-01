import { getProductBySlug, getProductsByCategory, getAllProducts } from '@/data/products';
import ProductDetailClient from './ProductDetailClient';
import type { Metadata } from 'next';
import { BUSINESS } from '@/lib/config';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: 'Product Not Found',
    };
  }

  return {
    title: product.name,
    description: product.description.substring(0, 160),
    openGraph: {
      title: product.name,
      description: product.description.substring(0, 160),
      images: product.images.length > 0 ? [{ url: product.images[0].src }] : [],
    },
  };
}

export const dynamic = 'force-dynamic';

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  
  const relatedProducts = product 
    ? (await getProductsByCategory(product.categorySlug))
        .filter((p) => p.id !== product.id)
        .slice(0, 4)
    : [];

  return <ProductDetailClient product={product} relatedProducts={relatedProducts} />;
}
