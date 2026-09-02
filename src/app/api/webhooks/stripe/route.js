import Stripe from "stripe";
import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";

export async function POST(req) {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!secretKey || !webhookSecret) {
    return NextResponse.json(
      { error: "Stripe webhooks are not configured yet" },
      { status: 503 }
    );
  }

  const signature = req.headers.get("stripe-signature");
  const payload = await req.text();

  const stripe = new Stripe(secretKey);
  let event;
  try {
    event = stripe.webhooks.constructEvent(payload, signature, webhookSecret);
  } catch (err) {
    return NextResponse.json(
      { error: `Webhook signature verification failed: ${err.message}` },
      { status: 400 }
    );
  }

  try {
    switch (event.type) {
      case "checkout.session.completed":
      case "checkout.session.async_payment_succeeded": {
        const session = event.data.object;
        // Delayed-notification payment methods can send `completed` while the
        // session is still unpaid — only fulfill once it's actually paid.
        if (session.payment_status !== "unpaid") {
          await fulfillCheckout(session);
        }
        break;
      }
      case "checkout.session.async_payment_failed": {
        const session = event.data.object;
        console.error("Async payment failed for checkout session", session.id);
        break;
      }
      case "identity.verification_session.verified":
      case "identity.verification_session.requires_input":
      case "identity.verification_session.canceled": {
        const session = event.data.object;
        await updateIdentityStatus(session.id, session.status);
        break;
      }
      case "invoice.paid":
      case "invoice.payment_failed":
      case "invoice.voided": {
        const invoice = event.data.object;
        await updateInvoiceStatus(invoice.id, invoice.status);
        break;
      }
      default:
        break;
    }
  } catch (err) {
    console.error("Stripe webhook handler error", event.type, err);
    return NextResponse.json({ error: "Webhook handler error" }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}

async function fulfillCheckout(session) {
  const supabase = supabaseServer();

  // Upsert on checkout_session_id so a duplicate event (Stripe retries
  // webhooks) never fulfills the same order twice.
  const { error } = await supabase.from("stripe_orders").upsert(
    {
      checkout_session_id: session.id,
      amount_total: session.amount_total,
      currency: session.currency,
      customer_email: session.customer_details?.email ?? null,
      status: "paid",
    },
    { onConflict: "checkout_session_id" }
  );

  if (error) {
    throw new Error(`Failed to record Stripe order: ${error.message}`);
  }

  // TODO: send confirmation email / notify the team to kick off the project.
}

async function updateIdentityStatus(verificationSessionId, status) {
  const supabase = supabaseServer();
  const { error } = await supabase
    .from("identity_verifications")
    .update({ status })
    .eq("verification_session_id", verificationSessionId);

  if (error) {
    throw new Error(`Failed to update identity verification: ${error.message}`);
  }
}

async function updateInvoiceStatus(invoiceId, status) {
  const supabase = supabaseServer();
  const { error } = await supabase
    .from("stripe_invoices")
    .update({ status })
    .eq("invoice_id", invoiceId);

  if (error) {
    throw new Error(`Failed to update invoice status: ${error.message}`);
  }
}
