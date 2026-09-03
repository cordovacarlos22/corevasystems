// One-off: creates the Enterprise Automation and Enterprise AI System
// Products + US/LatAm Prices in Stripe. These tiers previously had no
// Stripe Price and routed straight to /book (quote-only, no checkout) —
// Automation and AI are now getting their own full /pricing tab with real
// checkout on every tier, so the top tier needs a real Price too. Amounts
// match what was already displayed on the (previously quote-only) card.
//
// Run with: node --env-file=.env.local scripts/stripe-setup-enterprise-automation-ai.mjs
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
    key: "automation",
    name: "Enterprise Automation",
    description:
      "Unlimited custom workflows with a dedicated automation architect, multi-department process mapping, and monthly optimization included.",
    us: 359900,
    latam: 108000,
  },
  {
    key: "ai",
    name: "Enterprise AI System",
    description:
      "Unlimited AI agents with multi-channel orchestration, a dedicated AI systems architect, and monthly optimization included.",
    us: 449900,
    latam: 135000,
  },
];

const results = {};

for (const tier of TIERS) {
  const product = await stripe.products.create({
    name: tier.name,
    description: tier.description,
  });
  console.log(`Created product "${tier.name}" (${product.id})`);

  for (const region of ["us", "latam"]) {
    const price = await stripe.prices.create({
      product: product.id,
      currency: "usd",
      unit_amount: tier[region],
      nickname: `${tier.name} — ${region}`,
    });
    console.log(`  ${region}: ${price.id} ($${(tier[region] / 100).toFixed(2)})`);
    results[`${tier.key}:${region}`] = price.id;
  }
}

console.log("\n--- New price IDs ---");
console.log(JSON.stringify(results, null, 2));
