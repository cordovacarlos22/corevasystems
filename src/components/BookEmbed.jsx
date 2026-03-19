"use client";

import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";

export default function BookEmbed({ lang }) {
  const isSpanish = lang === "es";

  const namespace = isSpanish
    ? "llamada-estrategica-de-automatizacion-e-ia"
    : "free-automation-ai-strategy-call";

  const calLink = isSpanish
    ? "corevasystems/llamada-estrategica-de-automatizacion-e-ia"
    : "corevasystems/free-automation-ai-strategy-call";

  const copy = isSpanish
    ? {
      badge: "RESERVA TU LLAMADA",
      title: "Elige el horario que mejor te funcione",
      subtitle:
        "Agenda una llamada estratégica para hablar sobre tu negocio, automatización, AI y oportunidades de crecimiento.",
      note: "Las reuniones se confirman según disponibilidad.",
    }
    : {
      badge: "BOOK YOUR CALL",
      title: "Choose the time that works best for you",
      subtitle:
        "Schedule a strategy call to talk about your business, automation, AI, and growth opportunities.",
      note: "Meetings are confirmed based on availability.",
    };

  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace });

      cal("ui", {
        theme: "light",
        hideEventTypeDetails: false,
        layout: "month_view",
        cssVarsPerTheme: {
          light: {
            "cal-brand": "#818cf8",
          },
        },
      });
    })();
  }, [namespace]);

  return (
    <section className="relative">
      <div className="absolute inset-x-0 top-10 -z-10 mx-auto h-64 max-w-4xl rounded-full bg-gradient-to-r from-indigo-300/20 via-fuchsia-300/15 to-sky-300/20 blur-3xl" />

      <div className="mx-auto max-w-6xl">
        <div className="mb-10 text-center">
          <div className="mb-5 inline-flex items-center rounded-full border border-slate-200 bg-white px-4 py-2 text-[11px] font-bold uppercase tracking-[0.22em] text-slate-500 shadow-sm">
            {copy.badge}
          </div>

          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 lg:text-5xl">
            {copy.title}
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-600 lg:text-lg">
            {copy.subtitle}
          </p>
        </div>

        <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-3 shadow-[0_30px_80px_-30px_rgba(15,23,42,0.25)] sm:p-4">
          <div className="rounded-[1.5rem] bg-slate-50 p-2 sm:p-3">
            <Cal
              namespace={namespace}
              calLink={calLink}
              style={{
                width: "100%",
                height: "820px",
                borderRadius: "1rem",
                overflow: "hidden",
              }}
              config={{
                layout: "month_view",
                useSlotsViewOnSmallScreen: true,
                theme: "light",
              }}
            />
          </div>
        </div>

        <p className="mt-5 text-center text-sm font-medium text-slate-500">
          {copy.note}
        </p>
      </div>
    </section>
  );
}