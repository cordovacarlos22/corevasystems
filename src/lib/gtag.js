// Google Ads conversion tracking. Each NEXT_PUBLIC_ var is referenced by its
// literal name (not looked up dynamically) because Next.js only inlines
// process.env.NEXT_PUBLIC_* references it can see statically at build time.
const ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;

function fireConversion(label, params = {}) {
  if (!ADS_ID || !label) return;
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;

  window.gtag("event", "conversion", {
    send_to: `${ADS_ID}/${label}`,
    ...params,
  });
}

export function trackPurchaseConversion({ transactionId, value, currency = "USD" } = {}) {
  fireConversion(process.env.NEXT_PUBLIC_GADS_LABEL_PURCHASE, {
    transaction_id: transactionId,
    value,
    currency,
  });
}

export function trackBookCallConversion() {
  fireConversion(process.env.NEXT_PUBLIC_GADS_LABEL_BOOK_CALL);
}

export function trackContactConversion() {
  fireConversion(process.env.NEXT_PUBLIC_GADS_LABEL_CONTACT);
}
