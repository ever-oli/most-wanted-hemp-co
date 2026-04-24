# Most Wanted Hemp Co — Concierge Sourcing Catalog

A multi-vendor THCA hemp catalog built with Vite + React + TypeScript + Tailwind + shadcn-ui.

This site is **not a store**. Visitors browse products from multiple farms and brands, add items to a quote list, and submit the list via email. Pricing and fulfillment are handled offline through concierge sourcing.

## What this site does

- Displays a browsable catalog of hemp products sourced from multiple vendors.
- No prices are shown. No checkout exists.
- Visitors add products to a **Quote List**.
- Submitting the quote list opens a pre-filled `mailto:` to `mstwntdpacks@gmail.com` with their contact info and item list.

## Local development

```sh
npm install
npm run dev
```

## Build

```sh
npm run build
```

Type-check without emitting:

```sh
npx tsc -p tsconfig.app.json --noEmit
```

## Catalog system

Products are stored as per-vendor JSON files in `src/data/products.<vendor>.json` (e.g. `products.tsunami.json`, `products.mostwanted.json`). Each file is typed as a `ProductCatalog`.

`src/data/products.ts` imports every `products.*.json` and exposes:

- `allProducts` — flat array of every product
- `productsByVendor` — record keyed by vendor name
- `vendors` — list of vendor names

Product images live in `public/products/<vendor>/` and are referenced in JSON as `/products/<vendor>/<filename>`.

## Scraping

To populate or refresh the Tsunami catalog from `https://tsunami.store`:

```sh
npm run scrape:tsunami
```

Requirements:

- Node 18+ (uses native `fetch`)
- The script is idempotent: existing images are skipped.
- If the Shopify JSON endpoint returns 403/Cloudflare block, the script falls back to a Playwright-based scraper. Install Playwright if you need the fallback:
  ```sh
  npm install -D playwright
  npx playwright install chromium
  ```

## Quote submission

The quote form at `/request-quote` collects name, email, phone, preferred contact method, and optional notes. On submit it builds a `mailto:` link and redirects the browser. This requires no backend.

To swap in a form backend later (e.g. Formspree), replace the `window.location.href = mailtoHref` logic in `src/pages/RequestQuote.tsx` with an API call.

## Design notes

- Black borders, sharp corners (no rounding), uppercase tracked caps, Helvetica aesthetic.
- `resolveJsonModule` is enabled in `tsconfig.app.json` so JSON imports typecheck.
