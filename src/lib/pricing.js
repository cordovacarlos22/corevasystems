// Matches the fixed order of dict.pages.pricing.tiers in both en.js and es.js:
// [0] Essential, [1] Professional, [2] Complete System.
// Price IDs are mode-specific (test vs live are entirely separate objects in Stripe).
// This file is imported by the client (PricingTiers.jsx), so it can't read
// STRIPE_SECRET_KEY (server-only, always undefined in the browser bundle) to
// decide which set to use — it reads NEXT_PUBLIC_STRIPE_MODE instead, which
// must be kept in sync with whichever mode STRIPE_SECRET_KEY is in.
// The Complete System tier has no priceId: its CTA routes to /book instead of checkout.
const IS_LIVE_KEY = process.env.NEXT_PUBLIC_STRIPE_MODE === "live";

const TEST_PRICE_IDS = {
  us: { essential: "price_1UBGDKR6OzKMws4mf5dNltDZ", professional: "price_1UBGDLR6OzKMws4m4o5sopRR" },
  latam: { essential: "price_1UBGDLR6OzKMws4mWj7J0Kjw", professional: "price_1UBGDLR6OzKMws4mubZQzIT2" },
};

const LIVE_PRICE_IDS = {
  us: { essential: "price_1UBGRdR6OzKMws4mEt2m1Lep", professional: "price_1UBGReR6OzKMws4muWsYZnOd" },
  latam: { essential: "price_1UBGRdR6OzKMws4myE1O1chT", professional: "price_1UBGReR6OzKMws4mbfkfj1jU" },
};

const ACTIVE = IS_LIVE_KEY ? LIVE_PRICE_IDS : TEST_PRICE_IDS;

export const PRICING_TIERS = {
  us: [
    { price: "$1,500", priceId: ACTIVE.us.essential, supportDays: 7 },
    { price: "$4,000", priceId: ACTIVE.us.professional, supportDays: 15 },
    { price: "$8,000", priceId: null, supportDays: 30 },
  ],
  latam: [
    { price: "$450", priceId: ACTIVE.latam.essential, supportDays: 7 },
    { price: "$1,200", priceId: ACTIVE.latam.professional, supportDays: 15 },
    { price: "$2,500", priceId: null, supportDays: 30 },
  ],
};

export const REGIONS = ["us", "latam"];
