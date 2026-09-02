// One-off: pushes richer, detail-rich descriptions to the Essential/Professional
// Stripe Products (test and live) so Checkout shows real feature detail instead
// of the terse one-liner set at initial creation. Descriptions are kept in sync
// with the "includes" bullets on the site's own pricing page
// (src/dictionaries/en.js -> pages.pricing.tiers).
//
// Run with: node scripts/update-product-descriptions.mjs
// Reads both keys directly out of .env.local (active test key + commented-out
// live key) so neither ever appears on the command line or in shell history.
import Stripe from "stripe";
import fs from "fs";

const envContent = fs.readFileSync(new URL("../.env.local", import.meta.url), "utf8");
const testMatch = envContent.match(/^STRIPE_SECRET_KEY=(sk_test_.*|rk_test_.*)$/m);
const liveMatch = envContent.match(/^#\s*STRIPE_SECRET_KEY=(sk_live_.*|rk_live_.*)$/m);
const testKey = testMatch?.[1];
const liveKey = liveMatch?.[1];

const DESCRIPTIONS = {
  essential:
    "A custom-designed website built to convert — not a template. Includes: online booking widget built in from day one, mobile-optimized and fast-loading design, and SEO & performance setup. 7 days of post-launch support included.",
  professional:
    "Everything in Essential Site, plus: Stripe payments integrated directly into your site, CRM & email workflow automation, and custom data dashboards. 15 days of post-launch support included.",
};

const TARGETS = {
  test: {
    essential: "prod_VBdUMKeQONzHhh",
    professional: "prod_VBdUXfIAdbpKGm",
  },
  live: {
    essential: "prod_VBdjq1BhF4cj5i",
    professional: "prod_VBdj9KgJrdpUrY",
  },
};

async function updateMode(mode, key) {
  if (!key) {
    console.log(`Skipping ${mode} — no key provided.`);
    return;
  }
  const stripe = new Stripe(key);
  for (const [tier, productId] of Object.entries(TARGETS[mode])) {
    await stripe.products.update(productId, { description: DESCRIPTIONS[tier] });
    console.log(`[${mode}] Updated ${tier} (${productId})`);
  }
}

await updateMode("test", testKey);
await updateMode("live", liveKey);
