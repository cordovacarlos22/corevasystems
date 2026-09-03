// Price IDs are mode-specific (test vs live are entirely separate objects in Stripe).
// This file is imported by the client (PricingTiers.jsx), so it can't read
// STRIPE_SECRET_KEY (server-only, always undefined in the browser bundle) to
// decide which set to use — it reads NEXT_PUBLIC_STRIPE_MODE instead, which
// must be kept in sync with whichever mode STRIPE_SECRET_KEY is in.
//
// Each category's tiers must line up 1:1, in order, with the matching
// dict.pages.pricing.categories[key].tiers array in en.js/es.js.
//
// Websites and E-Commerce were increased (~2.98x US, 3.75x LatAm from the
// prior ~10%-reduced numbers) per request. These are new Stripe Prices
// under the SAME Products as before — Prices are immutable, so a price
// change means a new Price + repointing here, not editing the old one. The
// prior (lower) Prices are still live in Stripe but no longer referenced.
//
// Websites is 4 tiers: Starter/Growth/Professional/Enterprise. It was
// briefly cut to 3 (dropping Growth entirely), but the $399 → $1,899 jump
// from Starter to Professional felt too big, so Growth was reinstated as
// a new ~$799/$299 tier (a new Stripe Product — the original 6-tier
// Growth/Elite/Corporate Prices are still live in Stripe but no longer
// referenced).
//
// Automation and AI have a full /pricing tab with real checkout on every
// tier, including the top ("Enterprise") tier — it previously had no
// Stripe Price and routed straight to /book.
//
// Homepage teaser (PackagesSection) and the service-overview "Starting
// at" cards both read prices from PRICING_CATEGORIES directly (see
// tierIndex usage there) instead of hardcoding their own price strings,
// so this file is the single source of truth for every price shown on
// the site.
const IS_LIVE_KEY = process.env.NEXT_PUBLIC_STRIPE_MODE === "live";

const TEST_PRICE_IDS = {
  websites: {
    us: {
      starter: "price_1UBOPXR6OzKMws4mXlZAEcye",
      growth: "price_1UBOjgR6OzKMws4mW5UCaH3I",
      professional: "price_1UBOPYR6OzKMws4mYVzQXe0N",
      elite: "price_1UBOPYR6OzKMws4mkdwujnWo",
      corporate: "price_1UBOPZR6OzKMws4m9JBEXK4D",
      enterprise: "price_1UBOPZR6OzKMws4m3tVRFJ2V",
    },
    latam: {
      starter: "price_1UBOPXR6OzKMws4m3reJxTr3",
      growth: "price_1UBOjgR6OzKMws4ml1YJwkhP",
      professional: "price_1UBOPYR6OzKMws4mKtHxYgcx",
      elite: "price_1UBOPZR6OzKMws4mbfrmbFTY",
      corporate: "price_1UBOPZR6OzKMws4mGWbDCPKJ",
      enterprise: "price_1UBOPaR6OzKMws4mzRV6Apkm",
    },
  },
  ecommerce: {
    us: {
      starter: "price_1UBOQCR6OzKMws4m0OpiUf1T",
      plus: "price_1UBOQCR6OzKMws4mF5cVbRWg",
      prime: "price_1UBOQCR6OzKMws4msrY518me",
    },
    latam: {
      starter: "price_1UBOQCR6OzKMws4mDDHcyEr3",
      plus: "price_1UBOQCR6OzKMws4mUhwoiQWD",
      prime: "price_1UBOQDR6OzKMws4mj2DJGyc9",
    },
  },
  automation: {
    us: { starter: "price_1UBO09R6OzKMws4mo88uApNV", growth: "price_1UBO09R6OzKMws4mLIZobpzD", business: "price_1UBO0AR6OzKMws4muMdXc3T2", enterprise: "price_1UBOaZR6OzKMws4mpMfYTxXA" },
    latam: { starter: "price_1UBO09R6OzKMws4mcgAenbLy", growth: "price_1UBO0AR6OzKMws4mX6qzjHP8", business: "price_1UBO0AR6OzKMws4me0Ttjw1J", enterprise: "price_1UBOaaR6OzKMws4m78RWsuGh" },
  },
  ai: {
    us: { starter: "price_1UBO0AR6OzKMws4maKtFFsL1", growth: "price_1UBO0BR6OzKMws4me7kGH6lg", business: "price_1UBO0BR6OzKMws4ml73Qqpc6", enterprise: "price_1UBOaaR6OzKMws4m0WpOLbfX" },
    latam: { starter: "price_1UBO0AR6OzKMws4mV1IJFaZv", growth: "price_1UBO0BR6OzKMws4mCFJeVE3j", business: "price_1UBO0BR6OzKMws4mBnB6tuR5", enterprise: "price_1UBOaaR6OzKMws4mOa6k0dLO" },
  },
};

const LIVE_PRICE_IDS = {
  websites: {
    us: {
      starter: "price_1UBOQXR6OzKMws4ms5kQk9Cd",
      growth: "price_1UBOjtR6OzKMws4m20hypPQ2",
      professional: "price_1UBOQYR6OzKMws4mfaNGpnF6",
      elite: "price_1UBOQYR6OzKMws4m7mA1WDk1",
      corporate: "price_1UBOQYR6OzKMws4ma5oQXyhx",
      enterprise: "price_1UBOQZR6OzKMws4muzufp9i3",
    },
    latam: {
      starter: "price_1UBOQXR6OzKMws4mKMiFdqvk",
      growth: "price_1UBOjtR6OzKMws4m3sqKdkT1",
      professional: "price_1UBOQYR6OzKMws4mROUuZeuJ",
      elite: "price_1UBOQYR6OzKMws4m1b0xmErC",
      corporate: "price_1UBOQZR6OzKMws4mDkTN9G0y",
      enterprise: "price_1UBOQZR6OzKMws4m3nSlCKp6",
    },
  },
  ecommerce: {
    us: {
      starter: "price_1UBOQZR6OzKMws4m9TEzrnVL",
      plus: "price_1UBOQaR6OzKMws4mhmXbR2dW",
      prime: "price_1UBOQaR6OzKMws4mAqnzGdj5",
    },
    latam: {
      starter: "price_1UBOQaR6OzKMws4mMTbDbfTP",
      plus: "price_1UBOQaR6OzKMws4mqzugWNTp",
      prime: "price_1UBOQaR6OzKMws4mPcWH4uQD",
    },
  },
  automation: {
    us: { starter: "price_1UBO0YR6OzKMws4m7ZMca2O9", growth: "price_1UBO0YR6OzKMws4mIchH4bk0", business: "price_1UBO0YR6OzKMws4mpHs95kxX", enterprise: "price_1UBOb0R6OzKMws4mlKfFEsKW" },
    latam: { starter: "price_1UBO0YR6OzKMws4mOYZyvsjZ", growth: "price_1UBO0YR6OzKMws4menXcNSyV", business: "price_1UBO0YR6OzKMws4mMkUIzh9i", enterprise: "price_1UBOb1R6OzKMws4marDLuzdC" },
  },
  ai: {
    us: { starter: "price_1UBO0ZR6OzKMws4mcpF4bHXy", growth: "price_1UBO0ZR6OzKMws4mFmd1KFi9", business: "price_1UBO0ZR6OzKMws4mKElUAVkB", enterprise: "price_1UBOb1R6OzKMws4mi40n2W1K" },
    latam: { starter: "price_1UBO0ZR6OzKMws4mkdrqtdVH", growth: "price_1UBO0ZR6OzKMws4mOIPPGzVl", business: "price_1UBO0aR6OzKMws4mHtn230dR", enterprise: "price_1UBOb1R6OzKMws4mcmyUD3OI" },
  },
};

const ACTIVE = IS_LIVE_KEY ? LIVE_PRICE_IDS : TEST_PRICE_IDS;

export const PRICING_CATEGORIES = {
  websites: {
    us: [
      { price: "$399", priceId: ACTIVE.websites.us.starter },
      { price: "$799", priceId: ACTIVE.websites.us.growth },
      { price: "$1,899", priceId: ACTIVE.websites.us.professional },
      { price: "$8,999", priceId: ACTIVE.websites.us.enterprise },
    ],
    latam: [
      { price: "$150", priceId: ACTIVE.websites.latam.starter },
      { price: "$299", priceId: ACTIVE.websites.latam.growth },
      { price: "$699", priceId: ACTIVE.websites.latam.professional },
      { price: "$3,299", priceId: ACTIVE.websites.latam.enterprise },
    ],
  },
  ecommerce: {
    us: [
      { price: "$1,899", priceId: ACTIVE.ecommerce.us.starter },
      { price: "$4,299", priceId: ACTIVE.ecommerce.us.plus },
      { price: "$6,499", priceId: ACTIVE.ecommerce.us.prime },
    ],
    latam: [
      { price: "$699", priceId: ACTIVE.ecommerce.latam.starter },
      { price: "$1,599", priceId: ACTIVE.ecommerce.latam.plus },
      { price: "$2,499", priceId: ACTIVE.ecommerce.latam.prime },
    ],
  },
  automation: {
    us: [
      { price: "$449", priceId: ACTIVE.automation.us.starter, supportDays: 7 },
      { price: "$1,079", priceId: ACTIVE.automation.us.growth, supportDays: 15 },
      { price: "$2,339", priceId: ACTIVE.automation.us.business, supportDays: 30 },
      { price: "$3,599", priceId: ACTIVE.automation.us.enterprise, supportDays: 60 },
    ],
    latam: [
      { price: "$135", priceId: ACTIVE.automation.latam.starter, supportDays: 7 },
      { price: "$324", priceId: ACTIVE.automation.latam.growth, supportDays: 15 },
      { price: "$702", priceId: ACTIVE.automation.latam.business, supportDays: 30 },
      { price: "$1,080", priceId: ACTIVE.automation.latam.enterprise, supportDays: 60 },
    ],
  },
  ai: {
    us: [
      { price: "$629", priceId: ACTIVE.ai.us.starter, supportDays: 7 },
      { price: "$1,349", priceId: ACTIVE.ai.us.growth, supportDays: 15 },
      { price: "$2,699", priceId: ACTIVE.ai.us.business, supportDays: 30 },
      { price: "$4,499", priceId: ACTIVE.ai.us.enterprise, supportDays: 60 },
    ],
    latam: [
      { price: "$189", priceId: ACTIVE.ai.latam.starter, supportDays: 7 },
      { price: "$405", priceId: ACTIVE.ai.latam.growth, supportDays: 15 },
      { price: "$810", priceId: ACTIVE.ai.latam.business, supportDays: 30 },
      { price: "$1,350", priceId: ACTIVE.ai.latam.enterprise, supportDays: 60 },
    ],
  },
};

export const REGIONS = ["us", "latam"];
