import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";

function isValidEmail(email) {
  return typeof email === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req) {
  try {
    const body = await req.json();

    const fullName = (body?.fullName || "").trim();
    const email = (body?.email || "").trim().toLowerCase();
    const company = (body?.company || "").trim();
    const message = (body?.message || "").trim();
    const locale = body?.locale === "es" ? "es" : "en";

    if (!fullName || fullName.length < 2) {
      return NextResponse.json(
        { ok: false, error: "Invalid name" },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { ok: false, error: "Invalid email" },
        { status: 400 }
      );
    }

    if (!message || message.length < 10) {
      return NextResponse.json(
        { ok: false, error: "Message is too short" },
        { status: 400 }
      );
    }

    const supabase = supabaseServer();

    const { error } = await supabase.from("contact_leads").insert([
      {
        full_name: fullName,
        email,
        company: company || null,
        message,
        locale,
      },
    ]);

    if (error) {
      return NextResponse.json(
        { ok: false, error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        ok: true,
        message: "Contact form submitted successfully",
      },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json(
      {
        ok: false,
        error: err?.message || "Unknown server error",
      },
      { status: 500 }
    );
  }
}