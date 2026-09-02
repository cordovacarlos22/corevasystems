// One-off setup script: creates the E-Commerce Products and their US + LatAm
// Prices in Stripe. Mirrors scripts/stripe-setup-automation-ai-tiers.mjs —
// see that file for the pattern. The top ("Enterprise Store") tier has no
// Stripe Price — it routes to /book instead of checkout.
//
// Run with: node --env-file=.env.local scripts/stripe-setup-ecommerce-tiers.mjs
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

const TIERS = [
  {
    name: "Starter Store",
    description:
      "An online store for up to 25 products, with Stripe payments and basic inventory tracking built in. 15 days of post-launch support included.",
    prices: [
      { region: "us", nickname: "Starter Store — US", unit_amount: 199900 },
      { region: "latam", nickname: "Starter Store — LatAm", unit_amount: 60000 },
    ],
  },
  {
    name: "Growth Store",
    description:
      "An online store for up to 100 products, with discount codes, abandoned-cart recovery, product reviews, and multi-currency support. 30 days of post-launch support included.",
    prices: [
      { region: "us", nickname: "Growth Store — US", unit_amount: 349900 },
      { region: "latam", nickname: "Growth Store — LatAm", unit_amount: 105000 },
    ],
  },
  {
    name: "Scale Store",
    description:
      "An unlimited-product online store with custom shipping and tax rules, CRM and email marketing integration, and an advanced analytics dashboard. 45 days of post-launch support included.",
    prices: [
      { region: "us", nickname: "Scale Store — US", unit_amount: 599900 },
      { region: "latam", nickname: "Scale Store — LatAm", unit_amount: 180000 },
    ],
  },
];

const results = {};

for (const tier of TIERS) {
  const product = await stripe.products.create({
    name: tier.name,
    description: tier.description,
  });
  console.log(`Created product "${tier.name}" (${product.id})`);

  for (const p of tier.prices) {
    const price = await stripe.prices.create({
      product: product.id,
      currency: "usd",
      unit_amount: p.unit_amount,
      nickname: p.nickname,
    });
    console.log(
      `  Created price ${p.nickname}: ${price.id} ($${(p.unit_amount / 100).toFixed(2)})`
    );
    results[`ecommerce:${tier.name}:${p.region}`] = price.id;
  }
}

console.log("\n--- Paste into src/lib/pricing.js ---");
console.log(JSON.stringify(results, null, 2));
