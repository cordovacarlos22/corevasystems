// One-off: archives the old Website (Essential/Professional) and E-Commerce
// (Starter/Growth/Scale Store) Products, then creates the new 2026 package
// structure from Coreva_Systems_2026_Packages_1.pdf — 6 Website tiers,
// 4 E-Commerce tiers, all with direct checkout (no quote-only tier this
// round — the source doc prices every tier including Enterprise).
//
// Run with: node --env-file=.env.local scripts/stripe-2026-repricing.mjs
import Stripe from "stripe";

const secretKey = process.env.STRIPE_SECRET_KEY;
if (!secretKey) {
  console.error("STRIPE_SECRET_KEY is not set in the environment.");
  process.exit(1);
}
const isLive = secretKey.startsWith("sk_live_") || secretKey.startsWith("rk_live_");
const isTest = secretKey.startsWith("sk_test_") || secretKey.startsWith("rk_test_");
if (!isLive && !isTest) {
  console.error("STRIPE_SECRET_KEY doesn't look like a valid secret/restricted key.");
  process.exit(1);
}
console.log(`Running against ${isLive ? "LIVE" : "TEST"} mode.\n`);

const stripe = new Stripe(secretKey);

// Old Essential/Professional Site + Starter/Growth/Scale Store products are
// no longer referenced by pricing.js after this script runs, but are left
// active in Stripe — archiving them was blocked by the safety classifier as
// a consequential action on live business data. Archive manually in the
// Dashboard if you want them off your product list, or ask to have it done.

const WEBSITE_TIERS = [
  {
    name: "Website Starter Package",
    description:
      "A fast, credible first web presence: up to 3 custom pages, animated hero, spam-protected contact form, and Core Web Vitals-optimized build. Full deployment included. 3–5 business day turnaround.",
    prices: [
      { region: "us", nickname: "Website Starter — US", unit_amount: 14900 },
      { region: "latam", nickname: "Website Starter — LatAm", unit_amount: 4500 },
    ],
  },
  {
    name: "Website Growth Package",
    description:
      "Up to 5 custom pages with a motion hero banner, 3 custom graphics plus 5 curated images, sitemap and Google Search Console setup. Full deployment included. 1–2 week turnaround.",
    prices: [
      { region: "us", nickname: "Website Growth — US", unit_amount: 49900 },
      { region: "latam", nickname: "Website Growth — LatAm", unit_amount: 15000 },
    ],
  },
  {
    name: "Website Professional Package",
    description:
      "Up to 10 unique pages with a headless CMS/admin panel so you can edit content yourself, 8 images plus 5 custom banners, and WCAG 2.2 AA accessibility baseline. 2–3 week turnaround.",
    prices: [
      { region: "us", nickname: "Website Professional — US", unit_amount: 69900 },
      { region: "latam", nickname: "Website Professional — LatAm", unit_amount: 21000 },
    ],
  },
  {
    name: "Website Elite Package",
    description:
      "Up to 15 dynamic pages (Next.js/React) with optional online booking and Stripe/PayPal payment integration, custom lead-capture forms with a CRM webhook, and scroll animations. 3–4 week turnaround.",
    prices: [
      { region: "us", nickname: "Website Elite — US", unit_amount: 119900 },
      { region: "latam", nickname: "Website Elite — LatAm", unit_amount: 36000 },
    ],
  },
  {
    name: "Website Corporate Package",
    description:
      "15–20 pages of custom, high-end design with a headless CMS and unlimited revisions, a free domain for the first year, and a dedicated project manager plus senior design/dev team. 5–8 week turnaround.",
    prices: [
      { region: "us", nickname: "Website Corporate — US", unit_amount: 259900 },
      { region: "latam", nickname: "Website Corporate — LatAm", unit_amount: 78000 },
    ],
  },
  {
    name: "Website Enterprise Package",
    description:
      "Everything in Corporate, plus a 15–20 second AI-assisted brand/explainer video with voice-over and sound, and a dedicated account manager throughout the project. 6–10 week turnaround.",
    prices: [
      { region: "us", nickname: "Website Enterprise — US", unit_amount: 329900 },
      { region: "latam", nickname: "Website Enterprise — LatAm", unit_amount: 99000 },
    ],
  },
];

const ECOMMERCE_TIERS = [
  {
    name: "E-Commerce Starter Package",
    description:
      "A lean, real online store for up to 50 products — Shopify or headless commerce, cart plus Stripe/PayPal payment integration, with a dedicated designer and developer. 2–3 week turnaround.",
    prices: [
      { region: "us", nickname: "E-Commerce Starter — US", unit_amount: 69900 },
      { region: "latam", nickname: "E-Commerce Starter — LatAm", unit_amount: 21000 },
    ],
  },
  {
    name: "E-Commerce Basic Package",
    description:
      "A full-featured store for up to 100 products with custom detail pages, multi-currency payments, automated tax calculation, customer accounts, and order/inventory management. 3–4 week turnaround.",
    prices: [
      { region: "us", nickname: "E-Commerce Basic — US", unit_amount: 124900 },
      { region: "latam", nickname: "E-Commerce Basic — LatAm", unit_amount: 37500 },
    ],
  },
  {
    name: "E-Commerce Plus Package",
    description:
      "Unlimited products and revisions with a dedicated design and development team, full cart/reviews/search, and a Google-optimized sitemap. 4–6 week turnaround.",
    prices: [
      { region: "us", nickname: "E-Commerce Plus — US", unit_amount: 159900 },
      { region: "latam", nickname: "E-Commerce Plus — LatAm", unit_amount: 48000 },
    ],
  },
  {
    name: "E-Commerce Prime Package",
    description:
      "Unlimited products and categories with a full dedicated team (designer, developer, project manager), the complete commerce stack, and a free starter brand kit (social covers, brochure, invoice design, email signature). 6–8 week turnaround.",
    prices: [
      { region: "us", nickname: "E-Commerce Prime — US", unit_amount: 239900 },
      { region: "latam", nickname: "E-Commerce Prime — LatAm", unit_amount: 72000 },
    ],
  },
];

const results = {};

for (const [categoryKey, tiers] of [["website", WEBSITE_TIERS], ["ecommerce", ECOMMERCE_TIERS]]) {
  for (const tier of tiers) {
    const product = await stripe.products.create({ name: tier.name, description: tier.description });
    console.log(`Created product "${tier.name}" (${product.id})`);
    for (const p of tier.prices) {
      const price = await stripe.prices.create({
        product: product.id,
        currency: "usd",
        unit_amount: p.unit_amount,
        nickname: p.nickname,
      });
      console.log(`  ${p.nickname}: ${price.id} ($${(p.unit_amount / 100).toFixed(2)})`);
      results[`${categoryKey}:${tier.name}:${p.region}`] = price.id;
    }
  }
}

console.log("\n--- Paste into src/lib/pricing.js ---");
console.log(JSON.stringify(results, null, 2));
