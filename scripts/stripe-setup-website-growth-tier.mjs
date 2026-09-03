// One-off: creates a new "Growth Package" Product + US/LatAm Prices for
// Websites — reinstated as a 4th tier between Starter ($399/$150) and
// Professional ($1,899/$699), since the jump between those two felt too
// big. ~$800 US / ~$300 LatAm, same ratio as the other Website tiers.
//
// Run with: node --env-file=.env.local scripts/stripe-setup-website-growth-tier.mjs
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

const product = await stripe.products.create({
  name: "Growth Package",
  description:
    "Up to 5 custom pages, a hero banner with subtle motion, 3 custom graphics + 5 curated images, and sitemap + Google Search Console setup. 1–2 week turnaround.",
});
console.log(`Created product "Growth Package" (${product.id})`);

const results = {};
for (const [region, amount] of [["us", 79900], ["latam", 29900]]) {
  const price = await stripe.prices.create({
    product: product.id,
    currency: "usd",
    unit_amount: amount,
    nickname: `Growth Package — ${region}`,
  });
  console.log(`  ${region}: ${price.id} ($${(amount / 100).toFixed(2)})`);
  results[region] = price.id;
}

console.log("\n--- New price IDs ---");
console.log(JSON.stringify({ product: product.id, ...results }, null, 2));
