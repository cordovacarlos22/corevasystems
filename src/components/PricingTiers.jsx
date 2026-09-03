"use client";

import { useState } from "react";
import Link from "next/link";
import { sileo } from "sileo";
import { PRICING_CATEGORIES, REGIONS } from "@/lib/pricing";

const CATEGORY_KEYS = ["websites", "ecommerce"];

export default function PricingTiers({ page, lang = "en" }) {
  const [category, setCategory] = useState("websites");
  const [region, setRegion] = useState("us");
  const [loadingIndex, setLoadingIndex] = useState(null);

  const tiers = page.categories[category].tiers;
  const regionTiers = PRICING_CATEGORIES[category][region];
  const gridColsClass =
    tiers.length === 3
      ? "md:grid-cols-3"
      : tiers.length === 6
        ? "sm:grid-cols-2 lg:grid-cols-3"
        : "sm:grid-cols-2 xl:grid-cols-4";
  const hasExplicitMostPopular = tiers.some((t) => t.mostPopular);

  async function handleCheckout(priceId, index) {
    setLoadingIndex(index);

    const request = fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ priceId, locale: lang }),
    }).then(async (res) => {
      const body = await res.json().catch(() => ({}));
      if (!res.ok || !body.ok) {
        throw new Error(body?.error || "Checkout is not available yet");
      }
      return body;
    });

    sileo.promise(request, {
      loading: { title: lang === "es" ? "Preparando pago..." : "Preparing checkout..." },
      success: { title: lang === "es" ? "Redirigiendo..." : "Redirecting..." },
      error: {
        title: lang === "es" ? "Pago no disponible" : "Checkout not available",
        description:
          lang === "es"
            ? "Todavía no hemos activado los pagos en línea. Agenda una llamada mientras tanto."
            : "Online payment isn't live yet. Book a call in the meantime.",
      },
    });

    try {
      const body = await request;
      window.location.href = body.url;
    } catch {
      // handled by the toast above
    } finally {
      setLoadingIndex(null);
    }
  }

  return (
    <div>
      <div className="mb-8 flex justify-center">
        <div className="inline-flex flex-wrap justify-center gap-0.5 rounded-full border border-slate-200 p-1">
          {CATEGORY_KEYS.map((key) => (
            <button
              key={key}
              onClick={() => setCategory(key)}
              className={`rounded-full px-5 py-2.5 text-[13px] font-bold uppercase tracking-wide transition ${
                category === key
                  ? "bg-dark-navy text-white shadow"
                  : "text-slate-500 hover:text-primary"
              }`}
            >
              {page.categoryLabels[key]}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-16 flex justify-center">
        <div className="inline-flex gap-0.5 rounded-full border border-slate-200 p-1">
          {REGIONS.map((r) => (
            <button
              key={r}
              onClick={() => setRegion(r)}
              className={`rounded-full px-5 py-2.5 text-[13px] font-bold uppercase tracking-wide transition ${
                region === r
                  ? "gradient-soft text-white shadow"
                  : "text-slate-500 hover:text-primary"
              }`}
            >
              {page.regionLabels[r]}
            </button>
          ))}
        </div>
      </div>

      <div className={`grid gap-8 ${gridColsClass}`}>
        {tiers.map((tier, index) => {
          const numbers = regionTiers[index];
          const featured = hasExplicitMostPopular ? tier.mostPopular === true : index === 1;
          const dark = index === tiers.length - 1;
          const noteText = tier.turnaround || (numbers.supportDays ? `${numbers.supportDays} ${page.supportLabel}` : null);

          return (
            <div
              key={tier.name}
              className={[
                "flex h-full flex-col p-8",
                featured
                  ? "pro-card-shadow relative z-10 rounded-[2rem] border border-primary/20 bg-white"
                  : dark
                    ? "rounded-[2rem] bg-dark-navy"
                    : "card-shadow rounded-[2rem] border border-slate-100 bg-white",
              ].join(" ")}
            >
              {featured && (
                <div className="absolute left-7 top-0 -translate-y-1/2">
                  <div className="gradient-soft rounded-full px-5 py-2 text-[11px] font-black uppercase tracking-widest text-white shadow-xl">
                    {page.mostPopular}
                  </div>
                </div>
              )}

              <span
                className={`mb-2 text-[11px] font-bold uppercase tracking-widest ${
                  dark ? "text-secondary" : "text-primary"
                }`}
              >
                {tier.audience}
              </span>
              <h3
                className={`mb-5 text-2xl font-bold tracking-tight ${
                  dark ? "text-white" : "text-slate-900"
                }`}
              >
                {tier.name}
              </h3>

              <div className="mb-1 flex items-baseline gap-1.5">
                <span className={`text-4xl font-extrabold ${dark ? "text-white" : "text-slate-900"}`}>
                  {numbers.price}
                </span>
                <span className="text-[13px] text-slate-400">{page.oneTime}</span>
              </div>
              {noteText && (
                <span className={`mb-6 text-[13px] ${dark ? "text-slate-400" : "text-slate-500"}`}>
                  {noteText}
                </span>
              )}

              <ul
                className={`mb-8 flex flex-1 flex-col gap-3 border-t pt-5 text-sm font-medium ${
                  dark ? "border-white/10 text-slate-300" : "border-slate-100 text-slate-600"
                }`}
              >
                {tier.includes.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <span className="mt-0.5 text-primary">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              {numbers.priceId ? (
                <button
                  onClick={() => handleCheckout(numbers.priceId, index)}
                  disabled={loadingIndex === index}
                  className={
                    featured
                      ? "gradient-soft w-full rounded-xl py-3.5 text-sm font-bold text-white shadow-lg shadow-primary/20 transition-opacity hover:opacity-90 disabled:opacity-60"
                      : dark
                        ? "w-full rounded-xl border-2 border-white/25 py-3.5 text-sm font-bold text-white transition-colors hover:border-white/40 hover:bg-white/10 disabled:opacity-60"
                        : "w-full rounded-xl border-2 border-slate-100 py-3.5 text-sm font-bold text-slate-900 transition-colors hover:border-slate-200 hover:bg-slate-50 disabled:opacity-60"
                  }
                >
                  {page.buttonGetStarted}
                </button>
              ) : (
                <Link
                  href={`/${lang}/book`}
                  className="w-full rounded-xl bg-white py-3.5 text-center text-sm font-bold text-slate-900 transition-opacity hover:opacity-90"
                >
                  {page.buttonBookCall}
                </Link>
              )}
            </div>
          );
        })}
      </div>

      <p className="mx-auto mt-10 max-w-2xl text-center text-sm font-semibold text-slate-500">
        {page.pricingNote}
      </p>
    </div>
  );
}
