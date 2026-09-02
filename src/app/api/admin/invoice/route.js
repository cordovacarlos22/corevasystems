import Stripe from "stripe";
import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";

function isValidEmail(email) {
  return typeof email === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// See the matching note in /api/admin/identity — shared-secret gate, not real
// admin auth. Call from your own tools only.
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
    const name = (body?.name || "").trim();
    const description = (body?.description || "Coreva Systems — Complete System").trim();
    const amountUsd = Number(body?.amountUsd);
    const daysUntilDue = Number(body?.daysUntilDue) || 15;

    if (!isValidEmail(email)) {
      return NextResponse.json({ ok: false, error: "Invalid email" }, { status: 400 });
    }
    if (!Number.isFinite(amountUsd) || amountUsd <= 0) {
      return NextResponse.json({ ok: false, error: "Invalid amountUsd" }, { status: 400 });
    }

    const stripe = new Stripe(secretKey);

    const existing = await stripe.customers.list({ email, limit: 1 });
    const customer =
      existing.data[0] ?? (await stripe.customers.create({ email, name: name || undefined }));

    await stripe.invoiceItems.create({
      customer: customer.id,
      currency: "usd",
      amount: Math.round(amountUsd * 100),
      description,
    });

    let invoice = await stripe.invoices.create({
      customer: customer.id,
      collection_method: "send_invoice",
      days_until_due: daysUntilDue,
      auto_advance: false,
    });

    invoice = await stripe.invoices.finalizeInvoice(invoice.id);
    invoice = await stripe.invoices.sendInvoice(invoice.id);

    const supabase = supabaseServer();
    const { error } = await supabase.from("stripe_invoices").insert([
      {
        invoice_id: invoice.id,
        customer_email: email,
        amount_due: invoice.amount_due,
        currency: invoice.currency,
        status: invoice.status,
        hosted_invoice_url: invoice.hosted_invoice_url,
      },
    ]);
    if (error) {
      return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      ok: true,
      invoiceId: invoice.id,
      hostedInvoiceUrl: invoice.hosted_invoice_url,
      invoicePdf: invoice.invoice_pdf,
    });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: err?.message || "Unknown server error" },
      { status: 500 }
    );
  }
}
