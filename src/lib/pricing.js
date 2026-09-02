// Matches the fixed order of dict.pages.pricing.tiers in both en.js and es.js:
// [0] Essential, [1] Professional, [2] Complete System.
// priceId values are placeholders — create the matching Products/Prices in the
// Stripe Dashboard and swap these in before checkout can go live. The Complete
// System tier has no priceId: its CTA routes to /book instead of checkout.
export const PRICING_TIERS = {
  us: [
    { price: "$1,500", priceId: "price_us_essential_REPLACE_ME", supportDays: 7 },
    { price: "$4,000", priceId: "price_us_professional_REPLACE_ME", supportDays: 15 },
    { price: "$8,000", priceId: null, supportDays: 30 },
  ],
  latam: [
    { price: "$450", priceId: "price_latam_essential_REPLACE_ME", supportDays: 7 },
    { price: "$1,200", priceId: "price_latam_professional_REPLACE_ME", supportDays: 15 },
    { price: "$2,500", priceId: null, supportDays: 30 },
  ],
};

export const REGIONS = ["us", "latam"];
