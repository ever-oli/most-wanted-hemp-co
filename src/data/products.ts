import { ProductCatalog, Product } from "./schema";
import tsunamiCatalog from "./products.tsunami.json";
import mostwantedCatalog from "./products.mostwanted.json";

const catalogs: ProductCatalog[] = [tsunamiCatalog as ProductCatalog, mostwantedCatalog as ProductCatalog];

export const allProducts: Product[] = catalogs.flatMap((c) => c.products);

export const productsByVendor: Record<string, Product[]> = {};
for (const catalog of catalogs) {
  productsByVendor[catalog.vendor] = catalog.products;
}

export const vendors: string[] = catalogs.map((c) => c.vendor);
