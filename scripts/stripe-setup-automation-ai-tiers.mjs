// One-off setup script: creates the Automation and AI Solutions Products and
// their US + LatAm Prices in Stripe, then prints the price IDs to paste into
// src/lib/pricing.js. Each category's top ("Enterprise") tier has no Stripe
// Price — it routes to /book instead of checkout, same pattern as Complete
// System on the Websites tab.
//
// Run with: node --env-file=.env.local scripts/stripe-setup-automation-ai-tiers.mjs
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

const CATEGORIES = [
  {
    key: "automation",
    tiers: [
      {
        name: "Starter Automation",
        description:
          "One automated workflow connecting up to two of your tools, with email/SMS notifications. 7 days of post-launch support included.",
        prices: [
          { region: "us", nickname: "Starter Automation — US", unit_amount: 49900 },
          { region: "latam", nickname: "Starter Automation — LatAm", unit_amount: 15000 },
        ],
      },
      {
        name: "Growth Automation",
        description:
          "Up to 3 automated workflows connecting up to 5 tools, with CRM integration and custom triggers. 15 days of post-launch support included.",
        prices: [
          { region: "us", nickname: "Growth Automation — US", unit_amount: 119900 },
          { region: "latam", nickname: "Growth Automation — LatAm", unit_amount: 36000 },
        ],
      },
      {
        name: "Business Automation",
        description:
          "Up to 6 automated workflows with unlimited tool connections, custom dashboards, and reporting. 30 days of post-launch support included.",
        prices: [
          { region: "us", nickname: "Business Automation — US", unit_amount: 259900 },
          { region: "latam", nickname: "Business Automation — LatAm", unit_amount: 78000 },
        ],
      },
    ],
  },
  {
    key: "ai",
    tiers: [
      {
        name: "Starter AI Agent",
        description:
          "One AI agent trained on your business, integrated into your website chat. 7 days of post-launch support included.",
        prices: [
          { region: "us", nickname: "Starter AI Agent — US", unit_amount: 69900 },
          { region: "latam", nickname: "Starter AI Agent — LatAm", unit_amount: 21000 },
        ],
      },
      {
        name: "Growth AI Agent",
        description:
          "Up to 2 AI agents (chat + lead qualification) with CRM/calendar integration and custom conversation flows. 15 days of post-launch support included.",
        prices: [
          { region: "us", nickname: "Growth AI Agent — US", unit_amount: 149900 },
          { region: "latam", nickname: "Growth AI Agent — LatAm", unit_amount: 45000 },
        ],
      },
      {
        name: "Business AI System",
        description:
          "Up to 4 AI agents across web, SMS, and email, with lead scoring, routing, and custom knowledge base training. 30 days of post-launch support included.",
        prices: [
          { region: "us", nickname: "Business AI System — US", unit_amount: 299900 },
          { region: "latam", nickname: "Business AI System — LatAm", unit_amount: 90000 },
        ],
      },
    ],
  },
];

const results = {};

for (const category of CATEGORIES) {
  for (const tier of category.tiers) {
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
      results[`${category.key}:${tier.name}:${p.region}`] = price.id;
    }
  }
}

console.log("\n--- Paste into src/lib/pricing.js ---");
console.log(JSON.stringify(results, null, 2));
