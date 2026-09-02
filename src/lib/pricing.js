// Price IDs are mode-specific (test vs live are entirely separate objects in Stripe).
// This file is imported by the client (PricingTiers.jsx), so it can't read
// STRIPE_SECRET_KEY (server-only, always undefined in the browser bundle) to
// decide which set to use — it reads NEXT_PUBLIC_STRIPE_MODE instead, which
// must be kept in sync with whichever mode STRIPE_SECRET_KEY is in.
//
// Each category's tiers must line up 1:1, in order, with the matching
// dict.pages.pricing.categories[key].tiers array in en.js/es.js. The last
// tier in Automation and AI (Enterprise) has no priceId, same as Complete
// System on Websites — its CTA routes to /book instead of checkout.
const IS_LIVE_KEY = process.env.NEXT_PUBLIC_STRIPE_MODE === "live";

const TEST_PRICE_IDS = {
  websites: {
    us: { essential: "price_1UBGDKR6OzKMws4mf5dNltDZ", professional: "price_1UBGDLR6OzKMws4m4o5sopRR" },
    latam: { essential: "price_1UBGDLR6OzKMws4mWj7J0Kjw", professional: "price_1UBGDLR6OzKMws4mubZQzIT2" },
  },
  ecommerce: {
    us: { starter: "price_1UBNd4R6OzKMws4m41GfqiEw", growth: "price_1UBNd5R6OzKMws4mUVPEKNTi", scale: "price_1UBNd6R6OzKMws4mQRl30vP3" },
    latam: { starter: "price_1UBNd5R6OzKMws4m1yehWf3S", growth: "price_1UBNd5R6OzKMws4m4Hj2xW46", scale: "price_1UBNd6R6OzKMws4mMRhqWCbz" },
  },
  automation: {
    us: { starter: "price_1UBNOXR6OzKMws4mOvdoYjDp", growth: "price_1UBNOYR6OzKMws4mEA8MIMXu", business: "price_1UBNOYR6OzKMws4m6Zrov4X2" },
    latam: { starter: "price_1UBNOXR6OzKMws4mo83J2oil", growth: "price_1UBNOYR6OzKMws4md5x4IXc0", business: "price_1UBNOZR6OzKMws4ms1RZWBYd" },
  },
  ai: {
    us: { starter: "price_1UBNOZR6OzKMws4mOhwO8l4m", growth: "price_1UBNOaR6OzKMws4mD3RBBO3j", business: "price_1UBNOaR6OzKMws4mivpMHUlS" },
    latam: { starter: "price_1UBNOZR6OzKMws4mCqcWwFcp", growth: "price_1UBNOaR6OzKMws4miRemcXci", business: "price_1UBNOaR6OzKMws4mnRSGrI83" },
  },
};

const LIVE_PRICE_IDS = {
  websites: {
    us: { essential: "price_1UBGRdR6OzKMws4mEt2m1Lep", professional: "price_1UBGReR6OzKMws4muWsYZnOd" },
    latam: { essential: "price_1UBGRdR6OzKMws4myE1O1chT", professional: "price_1UBGReR6OzKMws4mbfkfj1jU" },
  },
  ecommerce: {
    us: { starter: "price_1UBNdOR6OzKMws4mFmRQTiRL", growth: "price_1UBNdPR6OzKMws4m3M3dRmgX", scale: "price_1UBNdPR6OzKMws4mpPfQJdu9" },
    latam: { starter: "price_1UBNdOR6OzKMws4mXA3g5wvV", growth: "price_1UBNdPR6OzKMws4mZyH7jM7p", scale: "price_1UBNdPR6OzKMws4mSx1WdeZq" },
  },
  automation: {
    us: { starter: "price_1UBNP8R6OzKMws4mR7wB7gTE", growth: "price_1UBNP9R6OzKMws4mTGkrXXlp", business: "price_1UBNP9R6OzKMws4mg6J08T4r" },
    latam: { starter: "price_1UBNP8R6OzKMws4mKaqaps1M", growth: "price_1UBNP9R6OzKMws4mY8cGTsCG", business: "price_1UBNPAR6OzKMws4mluctlwUt" },
  },
  ai: {
    us: { starter: "price_1UBNPAR6OzKMws4mkEoBLcFU", growth: "price_1UBNPBR6OzKMws4mO36lUXJ2", business: "price_1UBNPBR6OzKMws4mPuDqiPIA" },
    latam: { starter: "price_1UBNPAR6OzKMws4mRUy3Rpdd", growth: "price_1UBNPBR6OzKMws4mIXdUEKVZ", business: "price_1UBNPCR6OzKMws4mwPuK09NI" },
  },
};

const ACTIVE = IS_LIVE_KEY ? LIVE_PRICE_IDS : TEST_PRICE_IDS;

export const PRICING_CATEGORIES = {
  websites: {
    us: [
      { price: "$1,500", priceId: ACTIVE.websites.us.essential, supportDays: 7 },
      { price: "$4,000", priceId: ACTIVE.websites.us.professional, supportDays: 15 },
      { price: "$8,000", priceId: null, supportDays: 30 },
    ],
    latam: [
      { price: "$450", priceId: ACTIVE.websites.latam.essential, supportDays: 7 },
      { price: "$1,200", priceId: ACTIVE.websites.latam.professional, supportDays: 15 },
      { price: "$2,500", priceId: null, supportDays: 30 },
    ],
  },
  ecommerce: {
    us: [
      { price: "$1,999", priceId: ACTIVE.ecommerce.us.starter, supportDays: 15 },
      { price: "$3,499", priceId: ACTIVE.ecommerce.us.growth, supportDays: 30 },
      { price: "$5,999", priceId: ACTIVE.ecommerce.us.scale, supportDays: 45 },
      { price: "$9,999", priceId: null, supportDays: 60 },
    ],
    latam: [
      { price: "$600", priceId: ACTIVE.ecommerce.latam.starter, supportDays: 15 },
      { price: "$1,050", priceId: ACTIVE.ecommerce.latam.growth, supportDays: 30 },
      { price: "$1,800", priceId: ACTIVE.ecommerce.latam.scale, supportDays: 45 },
      { price: "$3,000", priceId: null, supportDays: 60 },
    ],
  },
  automation: {
    us: [
      { price: "$499", priceId: ACTIVE.automation.us.starter, supportDays: 7 },
      { price: "$1,199", priceId: ACTIVE.automation.us.growth, supportDays: 15 },
      { price: "$2,599", priceId: ACTIVE.automation.us.business, supportDays: 30 },
      { price: "$3,999", priceId: null, supportDays: 60 },
    ],
    latam: [
      { price: "$150", priceId: ACTIVE.automation.latam.starter, supportDays: 7 },
      { price: "$360", priceId: ACTIVE.automation.latam.growth, supportDays: 15 },
      { price: "$780", priceId: ACTIVE.automation.latam.business, supportDays: 30 },
      { price: "$1,200", priceId: null, supportDays: 60 },
    ],
  },
  ai: {
    us: [
      { price: "$699", priceId: ACTIVE.ai.us.starter, supportDays: 7 },
      { price: "$1,499", priceId: ACTIVE.ai.us.growth, supportDays: 15 },
      { price: "$2,999", priceId: ACTIVE.ai.us.business, supportDays: 30 },
      { price: "$4,999", priceId: null, supportDays: 60 },
    ],
    latam: [
      { price: "$210", priceId: ACTIVE.ai.latam.starter, supportDays: 7 },
      { price: "$450", priceId: ACTIVE.ai.latam.growth, supportDays: 15 },
      { price: "$900", priceId: ACTIVE.ai.latam.business, supportDays: 30 },
      { price: "$1,500", priceId: null, supportDays: 60 },
    ],
  },
};

export const REGIONS = ["us", "latam"];
