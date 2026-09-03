// One-off: creates new (higher) Prices under the existing Website Products
// only — E-Commerce is untouched this round. Same pattern as
// stripe-10pct-reduction.mjs: Prices are immutable, so a price change means
// a new Price + repointing src/lib/pricing.js, not editing the old one.
//
// Run with: node --env-file=.env.local scripts/stripe-website-price-increase.mjs
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

const PRODUCTS = isLive
  ? {
      starter: { id: "prod_VBlOhmVX6ldXaz", us: 39900, latam: 15000 },
      growth: { id: "prod_VBlOFZ0vYoabFW", us: 129900, latam: 49900 },
      professional: { id: "prod_VBlOz3cGTEVzPo", us: 189900, latam: 69900 },
      elite: { id: "prod_VBlOJowTVzSz1t", us: 319900, latam: 119900 },
      corporate: { id: "prod_VBlOPhqThFIniD", us: 699900, latam: 259900 },
      enterprise: { id: "prod_VBlOZ6thU8kg2r", us: 899900, latam: 329900 },
    }
  : {
      starter: { id: "prod_VBlNkRLhNfkRqT", us: 39900, latam: 15000 },
      growth: { id: "prod_VBlNOvETon4Up1", us: 129900, latam: 49900 },
      professional: { id: "prod_VBlNCQ1vEATUp6", us: 189900, latam: 69900 },
      elite: { id: "prod_VBlNc582N5IWDq", us: 319900, latam: 119900 },
      corporate: { id: "prod_VBlNAtFYVbPPsA", us: 699900, latam: 259900 },
      enterprise: { id: "prod_VBlNhILJY4gRiC", us: 899900, latam: 329900 },
    };

const results = {};

for (const [key, tier] of Object.entries(PRODUCTS)) {
  for (const region of ["us", "latam"]) {
    const price = await stripe.prices.create({
      product: tier.id,
      currency: "usd",
      unit_amount: tier[region],
      nickname: `website:${key} — ${region} (increase)`,
    });
    console.log(`website:${key} (${region}): ${price.id} ($${(tier[region] / 100).toFixed(2)})`);
    results[`${key}:${region}`] = price.id;
  }
}

console.log("\n--- New price IDs ---");
console.log(JSON.stringify(results, null, 2));
