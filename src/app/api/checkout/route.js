import Stripe from "stripe";
import { NextResponse } from "next/server";

export async function POST(req) {
  const secretKey = process.env.STRIPE_SECRET_KEY;

  if (!secretKey) {
    return NextResponse.json(
      { ok: false, error: "Stripe is not configured yet" },
      { status: 503 }
    );
  }

  try {
    const { priceId, locale } = await req.json();

    if (!priceId) {
      return NextResponse.json(
        { ok: false, error: "Missing priceId" },
        { status: 400 }
      );
    }

    const stripe = new Stripe(secretKey);
    const origin = process.env.NEXT_PUBLIC_URL || new URL(req.url).origin;
    const lang = locale === "es" ? "es" : "en";

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${origin}/${lang}/thank-you?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/${lang}/pricing`,
      // Managed Payments (Stripe as merchant of record) is on by default for
      // this account and requires a product tax_code without it. Not something
      // we opted into — revisit deliberately if you want Stripe to handle
      // tax collection/remittance instead of Stripe Tax + your own registrations.
      managed_payments: { enabled: false },
    });

    return NextResponse.json({ ok: true, url: session.url });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: err?.message || "Unknown server error" },
      { status: 500 }
    );
  }
}
