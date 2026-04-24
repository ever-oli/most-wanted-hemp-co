export type ProductCategory = "flower" | "pre-roll" | "vape" | "edible" | "concentrate" | "tincture" | "accessory" | "other";

export type Strain = "sativa" | "indica" | "hybrid" | null;

export interface ProductVariant {
  id: string;
  title: string;
  options: string[];
  available: boolean;
}

export interface Product {
  id: string;
  vendor: string;
  handle: string;
  name: string;
  category: ProductCategory;
  strain: Strain;
  description: string;
  tags: string[];
  images: string[];
  variants: ProductVariant[];
  sourceUrl: string;
  scrapedAt: string;
}

export interface ProductCatalog {
  vendor: string;
  sourceUrl: string;
  scrapedAt: string;
  products: Product[];
}
