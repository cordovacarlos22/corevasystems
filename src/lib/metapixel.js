// Meta (Facebook/Instagram) Pixel conversion tracking. Mirrors gtag.js —
// same call sites, same "no-op until the env var is set" behavior. Uses
// Meta's own standard event names (Purchase/Lead/Schedule) so they show up
// correctly in Ads Manager without custom-event mapping.
const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;

function fireEvent(eventName, params = {}) {
  if (!PIXEL_ID) return;
  if (typeof window === "undefined" || typeof window.fbq !== "function") return;

  window.fbq("track", eventName, params);
}

export function trackPurchasePixel({ value, currency = "USD" } = {}) {
  fireEvent("Purchase", { value, currency });
}

export function trackBookCallPixel() {
  fireEvent("Schedule");
}

export function trackContactPixel() {
  fireEvent("Lead");
}
