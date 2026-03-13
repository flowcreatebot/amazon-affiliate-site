import productsData from './products.json';
import pageProductsData from './page-products.json';
import { AMAZON_TAG } from './site';

export interface Product {
  name: string;
  brand: string;
  asin: string;
  image: string;
  imageAlt: string;
  category: string;
  rating: number;
  specs: Record<string, string>;
}

export interface PageProduct {
  id: string;
  badge: { label: string; variant: string };
  price?: string;
  bestFor?: string;
  featured?: boolean;
  noImage?: boolean;
  extraSpecs?: Record<string, string>;
}

export interface ResolvedProduct extends Omit<Product, 'specs'>, Omit<PageProduct, 'id'> {
  id: string;
  specs: Record<string, string>;
}

const products = productsData as Record<string, Product>;
const pageProducts = pageProductsData as Record<string, { pageType: string; products: PageProduct[] }>;

export function getProduct(id: string): Product {
  const p = products[id];
  if (!p) throw new Error(`Product not found: ${id}`);
  return p;
}

export function getPageProducts(slug: string): PageProduct[] {
  const page = pageProducts[slug];
  if (!page) return [];
  return page.products;
}

export function getResolvedProducts(slug: string): ResolvedProduct[] {
  const pageConfig = pageProducts[slug];
  if (!pageConfig) return [];
  return pageConfig.products.map((pp) => {
    const base = products[pp.id];
    if (!base) throw new Error(`Product not found: ${pp.id}`);
    return {
      ...base,
      ...pp,
      specs: { ...base.specs, ...(pp.extraSpecs || {}) },
    };
  });
}

export function amazonUrl(asin: string): string {
  return `https://www.amazon.com/dp/${asin}/ref=nosim?tag=${AMAZON_TAG}`;
}
