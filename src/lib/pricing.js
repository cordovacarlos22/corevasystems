// Price IDs are mode-specific (test vs live are entirely separate objects in Stripe).
// This file is imported by the client (PricingTiers.jsx), so it can't read
// STRIPE_SECRET_KEY (server-only, always undefined in the browser bundle) to
// decide which set to use — it reads NEXT_PUBLIC_STRIPE_MODE instead, which
// must be kept in sync with whichever mode STRIPE_SECRET_KEY is in.
//
// Each category's tiers must line up 1:1, in order, with the matching
// dict.pages.pricing.categories[key].tiers array in en.js/es.js.
//
// All amounts here are ~10% below the original 2026 repricing (per request).
// These are new Stripe Prices under the SAME Products as before — Prices are
// immutable, so a price change means a new Price + repointing here, not
// editing the old one. The old (pre-reduction) Prices are still live in
// Stripe but no longer referenced.
//
// Websites and E-Commerce: every tier has a real Stripe Price, no quote-only
// tier. Automation and AI: their top ("Enterprise") tier still has no
// priceId and routes to /book — only its displayed price text changed.
const IS_LIVE_KEY = process.env.NEXT_PUBLIC_STRIPE_MODE === "live";

const TEST_PRICE_IDS = {
  websites: {
    us: {
      starter: "price_1UBO05R6OzKMws4m5swewYDM",
      growth: "price_1UBO05R6OzKMws4mLlVNC7Q8",
      professional: "price_1UBO06R6OzKMws4msLfJ4JiE",
      elite: "price_1UBO06R6OzKMws4m1mmQabPA",
      corporate: "price_1UBO06R6OzKMws4mame4NFO4",
      enterprise: "price_1UBO07R6OzKMws4mUNR2GlPw",
    },
    latam: {
      starter: "price_1UBO05R6OzKMws4m7raurGVc",
      growth: "price_1UBO05R6OzKMws4mYdGTNVbI",
      professional: "price_1UBO06R6OzKMws4mDn4JFfq5",
      elite: "price_1UBO06R6OzKMws4mOJeoTtys",
      corporate: "price_1UBO07R6OzKMws4m1XdUGsm8",
      enterprise: "price_1UBO07R6OzKMws4my3e0H3LF",
    },
  },
  ecommerce: {
    us: {
      starter: "price_1UBO07R6OzKMws4m2l7PQRIf",
      basic: "price_1UBO08R6OzKMws4mqwgqUbgU",
      plus: "price_1UBO08R6OzKMws4m8enjUuuB",
      prime: "price_1UBO09R6OzKMws4mF95Etnzu",
    },
    latam: {
      starter: "price_1UBO07R6OzKMws4mre9fH7WZ",
      basic: "price_1UBO08R6OzKMws4mZFMB6B23",
      plus: "price_1UBO08R6OzKMws4mc9HL38uW",
      prime: "price_1UBO09R6OzKMws4mTH6IklYv",
    },
  },
  automation: {
    us: { starter: "price_1UBO09R6OzKMws4mo88uApNV", growth: "price_1UBO09R6OzKMws4mLIZobpzD", business: "price_1UBO0AR6OzKMws4muMdXc3T2" },
    latam: { starter: "price_1UBO09R6OzKMws4mcgAenbLy", growth: "price_1UBO0AR6OzKMws4mX6qzjHP8", business: "price_1UBO0AR6OzKMws4me0Ttjw1J" },
  },
  ai: {
    us: { starter: "price_1UBO0AR6OzKMws4maKtFFsL1", growth: "price_1UBO0BR6OzKMws4me7kGH6lg", business: "price_1UBO0BR6OzKMws4ml73Qqpc6" },
    latam: { starter: "price_1UBO0AR6OzKMws4mV1IJFaZv", growth: "price_1UBO0BR6OzKMws4mCFJeVE3j", business: "price_1UBO0BR6OzKMws4mBnB6tuR5" },
  },
};

const LIVE_PRICE_IDS = {
  websites: {
    us: {
      starter: "price_1UBO0TR6OzKMws4mqopCyMeE",
      growth: "price_1UBO0UR6OzKMws4mXrLGQXkK",
      professional: "price_1UBO0UR6OzKMws4mR05ZIARu",
      elite: "price_1UBO0VR6OzKMws4mFnM4l0tI",
      corporate: "price_1UBO0VR6OzKMws4mKWdKisAw",
      enterprise: "price_1UBO0VR6OzKMws4m6YwhF69O",
    },
    latam: {
      starter: "price_1UBO0UR6OzKMws4mFxUmcfzB",
      growth: "price_1UBO0UR6OzKMws4mCsKnOvE0",
      professional: "price_1UBO0UR6OzKMws4mHmXXtNN1",
      elite: "price_1UBO0VR6OzKMws4mNjkrS66N",
      corporate: "price_1UBO0VR6OzKMws4mq6pcbe1m",
      enterprise: "price_1UBO0WR6OzKMws4mwIzALyiZ",
    },
  },
  ecommerce: {
    us: {
      starter: "price_1UBO0WR6OzKMws4mp5jlfGPt",
      basic: "price_1UBO0WR6OzKMws4myK8mJGJW",
      plus: "price_1UBO0XR6OzKMws4mzlSAsWqt",
      prime: "price_1UBO0XR6OzKMws4mLcKLHcPw",
    },
    latam: {
      starter: "price_1UBO0WR6OzKMws4mRNoaNKl2",
      basic: "price_1UBO0XR6OzKMws4mrxaVZ138",
      plus: "price_1UBO0XR6OzKMws4m3nxncNjZ",
      prime: "price_1UBO0XR6OzKMws4mrRqet0Au",
    },
  },
  automation: {
    us: { starter: "price_1UBO0YR6OzKMws4m7ZMca2O9", growth: "price_1UBO0YR6OzKMws4mIchH4bk0", business: "price_1UBO0YR6OzKMws4mpHs95kxX" },
    latam: { starter: "price_1UBO0YR6OzKMws4mOYZyvsjZ", growth: "price_1UBO0YR6OzKMws4menXcNSyV", business: "price_1UBO0YR6OzKMws4mMkUIzh9i" },
  },
  ai: {
    us: { starter: "price_1UBO0ZR6OzKMws4mcpF4bHXy", growth: "price_1UBO0ZR6OzKMws4mFmd1KFi9", business: "price_1UBO0ZR6OzKMws4mKElUAVkB" },
    latam: { starter: "price_1UBO0ZR6OzKMws4mkdrqtdVH", growth: "price_1UBO0ZR6OzKMws4mOIPPGzVl", business: "price_1UBO0aR6OzKMws4mHtn230dR" },
  },
};

const ACTIVE = IS_LIVE_KEY ? LIVE_PRICE_IDS : TEST_PRICE_IDS;

export const PRICING_CATEGORIES = {
  websites: {
    us: [
      { price: "$134", priceId: ACTIVE.websites.us.starter },
      { price: "$449", priceId: ACTIVE.websites.us.growth },
      { price: "$629", priceId: ACTIVE.websites.us.professional },
      { price: "$1,079", priceId: ACTIVE.websites.us.elite },
      { price: "$2,339", priceId: ACTIVE.websites.us.corporate },
      { price: "$2,969", priceId: ACTIVE.websites.us.enterprise },
    ],
    latam: [
      { price: "$40", priceId: ACTIVE.websites.latam.starter },
      { price: "$135", priceId: ACTIVE.websites.latam.growth },
      { price: "$189", priceId: ACTIVE.websites.latam.professional },
      { price: "$324", priceId: ACTIVE.websites.latam.elite },
      { price: "$702", priceId: ACTIVE.websites.latam.corporate },
      { price: "$891", priceId: ACTIVE.websites.latam.enterprise },
    ],
  },
  ecommerce: {
    us: [
      { price: "$629", priceId: ACTIVE.ecommerce.us.starter },
      { price: "$1,439", priceId: ACTIVE.ecommerce.us.plus },
      { price: "$2,159", priceId: ACTIVE.ecommerce.us.prime },
    ],
    latam: [
      { price: "$189", priceId: ACTIVE.ecommerce.latam.starter },
      { price: "$432", priceId: ACTIVE.ecommerce.latam.plus },
      { price: "$648", priceId: ACTIVE.ecommerce.latam.prime },
    ],
  },
  automation: {
    us: [
      { price: "$449", priceId: ACTIVE.automation.us.starter, supportDays: 7 },
      { price: "$1,079", priceId: ACTIVE.automation.us.growth, supportDays: 15 },
      { price: "$2,339", priceId: ACTIVE.automation.us.business, supportDays: 30 },
      { price: "$3,599", priceId: null, supportDays: 60 },
    ],
    latam: [
      { price: "$135", priceId: ACTIVE.automation.latam.starter, supportDays: 7 },
      { price: "$324", priceId: ACTIVE.automation.latam.growth, supportDays: 15 },
      { price: "$702", priceId: ACTIVE.automation.latam.business, supportDays: 30 },
      { price: "$1,080", priceId: null, supportDays: 60 },
    ],
  },
  ai: {
    us: [
      { price: "$629", priceId: ACTIVE.ai.us.starter, supportDays: 7 },
      { price: "$1,349", priceId: ACTIVE.ai.us.growth, supportDays: 15 },
      { price: "$2,699", priceId: ACTIVE.ai.us.business, supportDays: 30 },
      { price: "$4,499", priceId: null, supportDays: 60 },
    ],
    latam: [
      { price: "$189", priceId: ACTIVE.ai.latam.starter, supportDays: 7 },
      { price: "$405", priceId: ACTIVE.ai.latam.growth, supportDays: 15 },
      { price: "$810", priceId: ACTIVE.ai.latam.business, supportDays: 30 },
      { price: "$1,350", priceId: null, supportDays: 60 },
    ],
  },
};

export const REGIONS = ["us", "latam"];
