// One-off: creates new (higher) Prices under the existing E-Commerce
// Products, applying the same proportional increase as the Website tiers
// (≈2.98x US, 3.75x LatAm — no exact target given for E-Commerce, so this
// mirrors the ratio the Website numbers were confirmed at).
//
// Run with: node --env-file=.env.local scripts/stripe-ecommerce-price-increase.mjs
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

// Rounded to clean numbers, same as the Website increase.
const PRODUCTS = isLive
  ? {
      starter: { id: "prod_VBlOKsBsbPKmps", us: 189900, latam: 69900 },
      plus: { id: "prod_VBlOChcY7wfqWZ", us: 429900, latam: 159900 },
      prime: { id: "prod_VBlOlv7VKnuUa5", us: 649900, latam: 249900 },
    }
  : {
      starter: { id: "prod_VBlNmzuBmHWVrU", us: 189900, latam: 69900 },
      plus: { id: "prod_VBlN0Jgy8r9qNO", us: 429900, latam: 159900 },
      prime: { id: "prod_VBlNkYGhiDk6hQ", us: 649900, latam: 249900 },
    };

const results = {};

for (const [key, tier] of Object.entries(PRODUCTS)) {
  for (const region of ["us", "latam"]) {
    const price = await stripe.prices.create({
      product: tier.id,
      currency: "usd",
      unit_amount: tier[region],
      nickname: `ecommerce:${key} — ${region} (increase)`,
    });
    console.log(`ecommerce:${key} (${region}): ${price.id} ($${(tier[region] / 100).toFixed(2)})`);
    results[`${key}:${region}`] = price.id;
  }
}

console.log("\n--- New price IDs ---");
console.log(JSON.stringify(results, null, 2));
