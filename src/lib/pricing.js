// Price IDs are mode-specific (test vs live are entirely separate objects in Stripe).
// This file is imported by the client (PricingTiers.jsx), so it can't read
// STRIPE_SECRET_KEY (server-only, always undefined in the browser bundle) to
// decide which set to use — it reads NEXT_PUBLIC_STRIPE_MODE instead, which
// must be kept in sync with whichever mode STRIPE_SECRET_KEY is in.
//
// Each category's tiers must line up 1:1, in order, with the matching
// dict.pages.pricing.categories[key].tiers array in en.js/es.js.
//
// Websites and E-Commerce (2026 repricing, from Coreva_Systems_2026_Packages_1.pdf):
// every tier has a real Stripe Price — no quote-only tier this round, the
// source doc prices Enterprise/Prime directly too. supportDays isn't used
// here; PricingTiers reads each tier's `turnaround` field from the dict instead.
//
// Automation and AI are untouched from the earlier build: their top
// ("Enterprise") tier still has no priceId and routes to /book, and they
// still use supportDays rather than a dict `turnaround` field.
const IS_LIVE_KEY = process.env.NEXT_PUBLIC_STRIPE_MODE === "live";

const TEST_PRICE_IDS = {
  websites: {
    us: {
      starter: "price_1UBNr5R6OzKMws4mWkIYfPk7",
      growth: "price_1UBNr6R6OzKMws4mL2NQn560",
      professional: "price_1UBNr6R6OzKMws4mqKLlUDik",
      elite: "price_1UBNr7R6OzKMws4m9nAnlDqY",
      corporate: "price_1UBNr8R6OzKMws4mLZ6yLZhU",
      enterprise: "price_1UBNr8R6OzKMws4mO88bjcZr",
    },
    latam: {
      starter: "price_1UBNr5R6OzKMws4mYTH5uRVh",
      growth: "price_1UBNr6R6OzKMws4mRtVNMXof",
      professional: "price_1UBNr6R6OzKMws4mSsT0oaR3",
      elite: "price_1UBNr7R6OzKMws4muMA8A7V5",
      corporate: "price_1UBNr8R6OzKMws4mAkaCAXRe",
      enterprise: "price_1UBNr9R6OzKMws4mxkU3aNEh",
    },
  },
  ecommerce: {
    us: {
      starter: "price_1UBNr9R6OzKMws4mgiNaxJ0J",
      basic: "price_1UBNrAR6OzKMws4mr3Rrc9rK",
      plus: "price_1UBNrBR6OzKMws4mwoH47jKt",
      prime: "price_1UBNrBR6OzKMws4mFI19p35m",
    },
    latam: {
      starter: "price_1UBNr9R6OzKMws4mM6qpHetl",
      basic: "price_1UBNrAR6OzKMws4mu1Cmpy3A",
      plus: "price_1UBNrBR6OzKMws4m5ujl4YiA",
      prime: "price_1UBNrCR6OzKMws4m420AcCm3",
    },
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
    us: {
      starter: "price_1UBNrXR6OzKMws4mHdQ2Sz4A",
      growth: "price_1UBNrXR6OzKMws4m5eeqJtda",
      professional: "price_1UBNrYR6OzKMws4msefGuhZr",
      elite: "price_1UBNrYR6OzKMws4mrGiE8FC6",
      corporate: "price_1UBNrZR6OzKMws4mrfN1ECug",
      enterprise: "price_1UBNraR6OzKMws4mLO6nqJ3e",
    },
    latam: {
      starter: "price_1UBNrXR6OzKMws4mcKYq456t",
      growth: "price_1UBNrXR6OzKMws4mv3foSSUr",
      professional: "price_1UBNrYR6OzKMws4m0rbUoyco",
      elite: "price_1UBNrZR6OzKMws4m2obE2DKE",
      corporate: "price_1UBNrZR6OzKMws4mVgxxOQ85",
      enterprise: "price_1UBNraR6OzKMws4mW9Uh1i2a",
    },
  },
  ecommerce: {
    us: {
      starter: "price_1UBNraR6OzKMws4mcF3R1E8M",
      basic: "price_1UBNrbR6OzKMws4me8w3vct7",
      plus: "price_1UBNrbR6OzKMws4mHFJe2pqC",
      prime: "price_1UBNrcR6OzKMws4mae9bYMuo",
    },
    latam: {
      starter: "price_1UBNraR6OzKMws4mCZWS807Y",
      basic: "price_1UBNrbR6OzKMws4mDQ7dwzk5",
      plus: "price_1UBNrcR6OzKMws4m3fKSHBui",
      prime: "price_1UBNrcR6OzKMws4m9Z9Rt0CL",
    },
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
      { price: "$149", priceId: ACTIVE.websites.us.starter },
      { price: "$499", priceId: ACTIVE.websites.us.growth },
      { price: "$699", priceId: ACTIVE.websites.us.professional },
      { price: "$1,199", priceId: ACTIVE.websites.us.elite },
      { price: "$2,599", priceId: ACTIVE.websites.us.corporate },
      { price: "$3,299", priceId: ACTIVE.websites.us.enterprise },
    ],
    latam: [
      { price: "$45", priceId: ACTIVE.websites.latam.starter },
      { price: "$150", priceId: ACTIVE.websites.latam.growth },
      { price: "$210", priceId: ACTIVE.websites.latam.professional },
      { price: "$360", priceId: ACTIVE.websites.latam.elite },
      { price: "$780", priceId: ACTIVE.websites.latam.corporate },
      { price: "$990", priceId: ACTIVE.websites.latam.enterprise },
    ],
  },
  ecommerce: {
    us: [
      { price: "$699", priceId: ACTIVE.ecommerce.us.starter },
      { price: "$1,249", priceId: ACTIVE.ecommerce.us.basic },
      { price: "$1,599", priceId: ACTIVE.ecommerce.us.plus },
      { price: "$2,399", priceId: ACTIVE.ecommerce.us.prime },
    ],
    latam: [
      { price: "$210", priceId: ACTIVE.ecommerce.latam.starter },
      { price: "$375", priceId: ACTIVE.ecommerce.latam.basic },
      { price: "$480", priceId: ACTIVE.ecommerce.latam.plus },
      { price: "$720", priceId: ACTIVE.ecommerce.latam.prime },
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
