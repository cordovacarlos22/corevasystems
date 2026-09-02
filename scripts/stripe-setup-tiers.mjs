// One-off setup script: creates the Essential/Professional Products and their
// US + LatAm Prices in Stripe, then prints the price IDs to paste into
// src/lib/pricing.js. Complete System has no Stripe Price — it routes to
// /book instead of checkout, per the pricing page's design.
//
// Run with: node --env-file=.env.local scripts/stripe-setup-tiers.mjs
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
    name: "Essential Site",
    description: "Custom-designed website with booking built in, 7 days of post-launch support.",
    prices: [
      { region: "us", nickname: "Essential — US", unit_amount: 150000 },
      { region: "latam", nickname: "Essential — LatAm", unit_amount: 45000 },
    ],
  },
  {
    name: "Professional Site",
    description: "Up to 10 pages + CMS, Stripe payments, booking automation, 15 days of support.",
    prices: [
      { region: "us", nickname: "Professional — US", unit_amount: 400000 },
      { region: "latam", nickname: "Professional — LatAm", unit_amount: 120000 },
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
    console.log(`  Created price ${p.nickname}: ${price.id} ($${(p.unit_amount / 100).toFixed(2)})`);
    results[`${tier.name}:${p.region}`] = price.id;
  }
}

console.log("\n--- Paste into src/lib/pricing.js ---");
console.log(
  JSON.stringify(
    {
      us: {
        essential: results["Essential Site:us"],
        professional: results["Professional Site:us"],
      },
      latam: {
        essential: results["Essential Site:latam"],
        professional: results["Professional Site:latam"],
      },
    },
    null,
    2
  )
);
