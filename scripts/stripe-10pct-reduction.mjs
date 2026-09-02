// One-off: creates new (~10% lower) Prices under the EXISTING Products for
// all four pricing categories, rather than duplicating products again.
// Stripe Prices are immutable once created, so "reducing a price" means
// adding a new Price and repointing src/lib/pricing.js at it — the old
// Prices are left in place (Stripe's normal pattern; past Checkout Sessions
// still reference them for records).
//
// Run with: node --env-file=.env.local scripts/stripe-10pct-reduction.mjs
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

// productId -> { us: newCentsAmount, latam: newCentsAmount }, keyed the same
// way as PRICING_CATEGORIES in src/lib/pricing.js.
const PRODUCTS = isLive
  ? {
      "websites:starter": { id: "prod_VBlOhmVX6ldXaz", us: 13400, latam: 4000 },
      "websites:growth": { id: "prod_VBlOFZ0vYoabFW", us: 44900, latam: 13500 },
      "websites:professional": { id: "prod_VBlOz3cGTEVzPo", us: 62900, latam: 18900 },
      "websites:elite": { id: "prod_VBlOJowTVzSz1t", us: 107900, latam: 32400 },
      "websites:corporate": { id: "prod_VBlOPhqThFIniD", us: 233900, latam: 70200 },
      "websites:enterprise": { id: "prod_VBlOZ6thU8kg2r", us: 296900, latam: 89100 },
      "ecommerce:starter": { id: "prod_VBlOKsBsbPKmps", us: 62900, latam: 18900 },
      "ecommerce:basic": { id: "prod_VBlO2pf1v4JLtN", us: 112400, latam: 33800 },
      "ecommerce:plus": { id: "prod_VBlOChcY7wfqWZ", us: 143900, latam: 43200 },
      "ecommerce:prime": { id: "prod_VBlOlv7VKnuUa5", us: 215900, latam: 64800 },
      "automation:starter": { id: "prod_VBku8evCm3BpS3", us: 44900, latam: 13500 },
      "automation:growth": { id: "prod_VBkufSDtcy1E3i", us: 107900, latam: 32400 },
      "automation:business": { id: "prod_VBkuvc8BkzBZAc", us: 233900, latam: 70200 },
      "ai:starter": { id: "prod_VBkvr49Yx0OY7j", us: 62900, latam: 18900 },
      "ai:growth": { id: "prod_VBkvlSf37plvzA", us: 134900, latam: 40500 },
      "ai:business": { id: "prod_VBkvTEc0wvyCzu", us: 269900, latam: 81000 },
    }
  : {
      "websites:starter": { id: "prod_VBlNkRLhNfkRqT", us: 13400, latam: 4000 },
      "websites:growth": { id: "prod_VBlNOvETon4Up1", us: 44900, latam: 13500 },
      "websites:professional": { id: "prod_VBlNCQ1vEATUp6", us: 62900, latam: 18900 },
      "websites:elite": { id: "prod_VBlNc582N5IWDq", us: 107900, latam: 32400 },
      "websites:corporate": { id: "prod_VBlNAtFYVbPPsA", us: 233900, latam: 70200 },
      "websites:enterprise": { id: "prod_VBlNhILJY4gRiC", us: 296900, latam: 89100 },
      "ecommerce:starter": { id: "prod_VBlNmzuBmHWVrU", us: 62900, latam: 18900 },
      "ecommerce:basic": { id: "prod_VBlN5OhSRNe5n8", us: 112400, latam: 33800 },
      "ecommerce:plus": { id: "prod_VBlN0Jgy8r9qNO", us: 143900, latam: 43200 },
      "ecommerce:prime": { id: "prod_VBlNkYGhiDk6hQ", us: 215900, latam: 64800 },
      "automation:starter": { id: "prod_VBkuAIeDzUp5VZ", us: 44900, latam: 13500 },
      "automation:growth": { id: "prod_VBkujk7nmWzT4g", us: 107900, latam: 32400 },
      "automation:business": { id: "prod_VBkuvA75OsWcrO", us: 233900, latam: 70200 },
      "ai:starter": { id: "prod_VBkuhnTm8vG9mT", us: 62900, latam: 18900 },
      "ai:growth": { id: "prod_VBkuwhFcIFIK7b", us: 134900, latam: 40500 },
      "ai:business": { id: "prod_VBkuJyhBXovHnO", us: 269900, latam: 81000 },
    };

const results = {};

for (const [key, tier] of Object.entries(PRODUCTS)) {
  for (const region of ["us", "latam"]) {
    const price = await stripe.prices.create({
      product: tier.id,
      currency: "usd",
      unit_amount: tier[region],
      nickname: `${key} — ${region} (−10%)`,
    });
    console.log(`${key} (${region}): ${price.id} ($${(tier[region] / 100).toFixed(2)})`);
    results[`${key}:${region}`] = price.id;
  }
}

console.log("\n--- New price IDs ---");
console.log(JSON.stringify(results, null, 2));
