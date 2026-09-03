"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { sileo } from "sileo";
import { trackContactConversion } from "@/lib/gtag";
import { trackContactPixel } from "@/lib/metapixel";

const DISMISS_KEY = "coreva_lead_popup_dismissed";
const SHOW_AFTER_MS = 20000;

export default function LeadCapturePopup({ dict, lang = "en" }) {
  const copy = dict?.leadPopup;
  const [visible, setVisible] = useState(false);
  const [sending, setSending] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.localStorage.getItem(DISMISS_KEY)) return;

    const timer = setTimeout(() => setVisible(true), SHOW_AFTER_MS);
    return () => clearTimeout(timer);
  }, []);

  function dismiss() {
    setVisible(false);
    window.localStorage.setItem(DISMISS_KEY, "1");
  }

  async function onSubmit(e) {
    e.preventDefault();
    if (sending) return;
    setSending(true);

    const request = fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fullName: name.trim(),
        email: email.trim(),
        message: "Requested more info via the site popup.",
        locale: lang,
      }),
    }).then(async (res) => {
      const body = await res.json().catch(() => ({}));
      if (!res.ok || !body.ok) {
        throw new Error(body?.error || "Failed");
      }
      return body;
    });

    request
      .then(() => {
        trackContactConversion();
        trackContactPixel();
        window.localStorage.setItem(DISMISS_KEY, "1");
        setTimeout(() => setVisible(false), 1200);
      })
      .catch(() => {})
      .finally(() => setSending(false));

    sileo.promise(request, {
      loading: { title: copy.sending },
      success: {
        title: copy.toast.successTitle,
        description: copy.toast.successDescription,
      },
      error: {
        title: copy.toast.errorTitle,
        description: copy.toast.errorDescription,
      },
    });
  }

  if (!copy) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.96 }}
          transition={{ duration: 0.35, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="fixed bottom-6 left-6 z-40 w-[calc(100vw-3rem)] max-w-sm rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-[0_30px_80px_-20px_rgba(15,23,42,0.25)]"
        >
          <button
            type="button"
            onClick={dismiss}
            aria-label={copy.dismissLabel}
            className="absolute right-4 top-4 flex size-7 items-center justify-center rounded-full text-slate-400 transition-colors hover:bg-slate-50 hover:text-slate-600"
          >
            ×
          </button>

          <h3 className="mb-2 pr-6 text-lg font-bold tracking-tight text-slate-900">
            {copy.title}
          </h3>
          <p className="mb-5 text-sm leading-relaxed text-slate-500">
            {copy.subtitle}
          </p>

          <form onSubmit={onSubmit} className="flex flex-col gap-3">
            <input
              type="text"
              required
              minLength={2}
              placeholder={copy.namePlaceholder}
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary"
            />
            <input
              type="email"
              required
              placeholder={copy.emailPlaceholder}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary"
            />
            <button
              type="submit"
              disabled={sending}
              className="gradient-soft mt-1 rounded-xl py-2.5 text-sm font-bold text-white shadow-lg shadow-primary/20 transition-opacity disabled:opacity-60"
            >
              {sending ? copy.sending : copy.button}
            </button>
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
