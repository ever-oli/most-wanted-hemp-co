#!/usr/bin/env node
import { writeFileSync, existsSync, mkdirSync, createWriteStream } from "fs";
import { dirname, join, extname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const OUT_DIR = join(__dirname, "..", "src", "data");
const IMAGE_DIR = join(__dirname, "..", "public", "products", "tsunami");
const CATALOG_PATH = join(OUT_DIR, "products.tsunami.json");

const USER_AGENT =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36";

mkdirSync(IMAGE_DIR, { recursive: true });

function stripHtml(html) {
  if (!html) return "";
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function inferCategory(product) {
  const text = `${product.product_type || ""} ${(product.tags || []).join(" ")} ${product.title || ""}`.toLowerCase();
  if (/\b(pre[- ]?roll|joint|cone)\b/.test(text)) return "pre-roll";
  if (/\b(vape|cart|cartridge|disposable|pen)\b/.test(text)) return "vape";
  if (/\b(flower|bud|eighth|quarter|ounce|nug)\b/.test(text)) return "flower";
  if (/\b(gummy|edible|chocolate|brownie|cookie|candy)\b/.test(text)) return "edible";
  if (/\b(concentrate|wax|rosin|shatter|hash|live resin|budder|crumble|sugar)\b/.test(text)) return "concentrate";
  if (/\b(tincture|oil|dropper|sublingual)\b/.test(text)) return "tincture";
  if (/\b(grinder|paper|accessory|accessories|pipe|bong|lighter|jar|scale)\b/.test(text)) return "accessory";
  return "other";
}

function inferStrain(product) {
  const text = `${(product.tags || []).join(" ")} ${product.title || ""}`.toLowerCase();
  if (/\bsativa\b/.test(text)) return "sativa";
  if (/\bindica\b/.test(text)) return "indica";
  if (/\bhybrid\b/.test(text)) return "hybrid";
  return null;
}

function toExt(url) {
  try {
    const u = new URL(url);
    const e = extname(u.pathname).toLowerCase();
    if (e === ".jpg" || e === ".jpeg") return "jpg";
    if (e === ".png") return "png";
    if (e === ".webp") return "webp";
    if (e === ".gif") return "gif";
  } catch {}
  return "jpg";
}

async function fetchJson(url) {
  const res = await fetch(url, {
    headers: {
      "User-Agent": USER_AGENT,
      Accept: "application/json",
    },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  return res.json();
}

async function downloadImage(url, dest) {
  if (existsSync(dest)) {
    console.log(`  Image exists, skipping: ${dest}`);
    return;
  }
  console.log(`  Downloading image: ${url}`);
  const res = await fetch(url, { headers: { "User-Agent": USER_AGENT } });
  if (!res.ok) {
    console.warn(`  Failed to download image ${url}: ${res.status}`);
    return;
  }
  const fileStream = createWriteStream(dest);
  const reader = res.body.getReader();
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    fileStream.write(Buffer.from(value));
  }
  fileStream.end();
  await new Promise((resolve, reject) => {
    fileStream.on("finish", resolve);
    fileStream.on("error", reject);
  });
}

async function scrapeWithJson() {
  const allProducts = [];
  let page = 1;
  while (true) {
    const url = `https://tsunami.store/products.json?limit=250&page=${page}`;
    console.log(`Fetching ${url}`);
    const data = await fetchJson(url);
    const products = data.products || [];
    if (products.length === 0) {
      console.log("Empty page reached, done.");
      break;
    }
    console.log(`Page ${page}: ${products.length} products`);
    for (const p of products) {
      const category = inferCategory(p);
      const strain = inferStrain(p);
      const description = stripHtml(p.body_html);
      const tags = p.tags || [];
      const images = [];
      if (p.images && p.images.length > 0) {
        for (let i = 0; i < p.images.length; i++) {
          const img = p.images[i];
          const src = img.src || "";
          if (!src) continue;
          const ext = toExt(src);
          const filename = `${p.handle}-${i}.${ext}`;
          const dest = join(IMAGE_DIR, filename);
          await downloadImage(src, dest);
          images.push(`/products/tsunami/${filename}`);
        }
      }
      const variants = (p.variants || []).map((v) => ({
        id: String(v.id),
        title: v.title || "Default",
        options: [v.option1, v.option2, v.option3].filter(Boolean),
        available: v.available ?? true,
      }));
      allProducts.push({
        id: `tsunami-${p.id}`,
        vendor: p.vendor || "Tsunami",
        handle: p.handle,
        name: p.title,
        category,
        strain,
        description,
        tags,
        images,
        variants,
        sourceUrl: `https://tsunami.store/products/${p.handle}`,
        scrapedAt: new Date().toISOString(),
      });
    }
    page++;
    if (page > 20) {
      console.warn("Stopping at page 20 to avoid infinite loop");
      break;
    }
  }
  const catalog = {
    vendor: "Tsunami",
    sourceUrl: "https://tsunami.store",
    scrapedAt: new Date().toISOString(),
    products: allProducts,
  };
  writeFileSync(CATALOG_PATH, JSON.stringify(catalog, null, 2));
  console.log(`Wrote ${allProducts.length} products to ${CATALOG_PATH}`);
}

async function scrapeWithPlaywrightFallback() {
  console.log("Attempting Playwright fallback...");
  let chromium;
  try {
    const pw = await import("playwright");
    chromium = pw.chromium;
  } catch {
    console.error("Playwright is not installed. Install it with: npm install -D playwright");
    process.exit(1);
  }
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ userAgent: USER_AGENT });
  const page = await context.newPage();
  const allProducts = [];
  let pageNum = 1;
  while (true) {
    const url = `https://tsunami.store/collections/all?page=${pageNum}`;
    console.log(`Navigating ${url}`);
    await page.goto(url, { waitUntil: "networkidle" });
    const links = await page.locator('a[href^="/products/"]').all();
    const hrefs = [];
    const seen = new Set();
    for (const link of links) {
      const href = await link.getAttribute("href");
      if (!href || seen.has(href)) continue;
      seen.add(href);
      hrefs.push(href);
    }
    if (hrefs.length === 0) break;
    for (const href of hrefs) {
      const productUrl = `https://tsunami.store${href}`;
      console.log(`Scraping ${productUrl}`);
      try {
        await page.goto(productUrl, { waitUntil: "networkidle" });
        // Try JSON-LD
        const jsonLd = await page.locator('script[type="application/ld+json"]').first().innerText().catch(() => null);
        let ld = null;
        if (jsonLd) {
          try {
            const parsed = JSON.parse(jsonLd);
            if (parsed["@type"] === "Product") ld = parsed;
          } catch {}
        }
        // Try Shopify meta
        const metaProduct = await page.evaluate(() => {
          try {
            if (window.ShopifyAnalytics && window.ShopifyAnalytics.meta && window.ShopifyAnalytics.meta.product) {
              return window.ShopifyAnalytics.meta.product;
            }
          } catch {}
          return null;
        });
        const title = ld?.name || metaProduct?.title || (await page.locator("h1").first().innerText().catch(() => ""));
        const description = stripHtml(
          ld?.description || metaProduct?.body_html || (await page.locator(".product-description, [data-product-description], .rte").first().innerHTML().catch(() => ""))
        );
        const tags = metaProduct?.tags || [];
        const productType = metaProduct?.type || "";
        const p = { title, product_type: productType, tags, body_html: description };
        const category = inferCategory(p);
        const strain = inferStrain(p);
        const handle = href.replace("/products/", "").split("?")[0];
        // Images
        const imageSrcs = await page
          .locator(".product-image img, .product__media img, .photos img, .product-media img")
          .allAttributeValues("src");
        const images = [];
        for (let i = 0; i < imageSrcs.length; i++) {
          let src = imageSrcs[i];
          if (!src) continue;
          if (src.startsWith("//")) src = "https:" + src;
          const ext = toExt(src);
          const filename = `${handle}-${i}.${ext}`;
          const dest = join(IMAGE_DIR, filename);
          await downloadImage(src, dest);
          images.push(`/products/tsunami/${filename}`);
        }
        // Variants
        let variants = [];
        if (metaProduct && metaProduct.variants) {
          variants = metaProduct.variants.map((v) => ({
            id: String(v.id),
            title: v.title || "Default",
            options: [v.option1, v.option2, v.option3].filter(Boolean),
            available: v.available ?? true,
          }));
        } else if (ld?.offers && Array.isArray(ld.offers)) {
          variants = ld.offers.map((o, idx) => ({
            id: `fallback-${handle}-${idx}`,
            title: o.name || "Default",
            options: [o.name || "Default"].filter(Boolean),
            available: o.availability === "https://schema.org/InStock",
          }));
        } else {
          variants = [{ id: `fallback-${handle}-0`, title: "Default", options: [], available: true }];
        }
        allProducts.push({
          id: `tsunami-fallback-${handle}`,
          vendor: metaProduct?.vendor || "Tsunami",
          handle,
          name: title,
          category,
          strain,
          description,
          tags,
          images,
          variants,
          sourceUrl: productUrl,
          scrapedAt: new Date().toISOString(),
        });
      } catch (e) {
        console.warn(`Failed to scrape ${productUrl}: ${e.message}`);
      }
    }
    pageNum++;
    if (pageNum > 20) break;
  }
  await browser.close();
  const catalog = {
    vendor: "Tsunami",
    sourceUrl: "https://tsunami.store",
    scrapedAt: new Date().toISOString(),
    products: allProducts,
  };
  writeFileSync(CATALOG_PATH, JSON.stringify(catalog, null, 2));
  console.log(`Wrote ${allProducts.length} products to ${CATALOG_PATH} (Playwright fallback)`);
}

async function main() {
  try {
    await scrapeWithJson();
  } catch (err) {
    console.error("JSON scrape failed:", err.message);
    if (err.message.includes("403") || err.message.includes("429") || err.message.includes("Cloudflare")) {
      await scrapeWithPlaywrightFallback();
    } else {
      process.exit(1);
    }
  }
}

main();
