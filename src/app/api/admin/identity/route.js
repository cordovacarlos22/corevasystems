import Stripe from "stripe";
import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";

function isValidEmail(email) {
  return typeof email === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// No user auth system exists in this app yet, so this (and /api/admin/invoice)
// are gated by a shared secret instead — call them from your own machine/tools,
// never from a public form. Swap for real admin auth before anyone besides you
// has access to trigger these.
function isAuthorized(req) {
  const adminKey = process.env.ADMIN_API_KEY;
  if (!adminKey) return false;
  return req.headers.get("x-admin-key") === adminKey;
}

export async function POST(req) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    return NextResponse.json(
      { ok: false, error: "Stripe is not configured yet" },
      { status: 503 }
    );
  }

  try {
    const body = await req.json();
    const email = (body?.email || "").trim().toLowerCase();
    const clientName = (body?.clientName || "").trim();
    const lang = body?.locale === "es" ? "es" : "en";

    if (!isValidEmail(email)) {
      return NextResponse.json({ ok: false, error: "Invalid email" }, { status: 400 });
    }

    const stripe = new Stripe(secretKey);
    const origin = process.env.NEXT_PUBLIC_URL || new URL(req.url).origin;

    const session = await stripe.identity.verificationSessions.create({
      type: "document",
      provided_details: { email },
      metadata: { email, clientName },
      return_url: body?.returnUrl || `${origin}/${lang}/thank-you`,
    });

    const supabase = supabaseServer();
    const { error } = await supabase.from("identity_verifications").insert([
      {
        verification_session_id: session.id,
        email,
        client_name: clientName || null,
        status: session.status,
      },
    ]);
    if (error) {
      return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true, id: session.id, url: session.url });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: err?.message || "Unknown server error" },
      { status: 500 }
    );
  }
}
