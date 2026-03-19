"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar({ dict, lang }) {
  const pathname = usePathname();

  const nav = dict?.nav || {
    process: "Process",
    services: "Services",
    results: "Results",
    contact: "Contact",
    cta: "Book a Free Call",
  };

  const getPath = (targetLang) => {
    return pathname.replace(`/${lang}`, `/${targetLang}`);
  };

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-slate-50 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-8">

        {/* LOGO */}
        <Link href={`/${lang}`} className="flex items-center gap-3">
          <div className="gradient-soft flex size-9 items-center justify-center rounded-lg text-white shadow-sm">
            <span className="text-xl font-bold">C</span>
          </div>
          <span className="text-xl font-bold tracking-tight">
            Coreva Systems
          </span>
        </Link>

        {/* NAV LINKS */}
        <div className="hidden items-center gap-10 text-[13px] font-semibold uppercase tracking-wider text-slate-500 lg:flex">
          <Link href={`/${lang}#process`} className="hover:text-primary transition-colors">
            {nav.process}
          </Link>
          <Link href={`/${lang}#services`} className="hover:text-primary transition-colors">
            {nav.services}
          </Link>
          <Link href={`/${lang}#results`} className="hover:text-primary transition-colors">
            {nav.results}
          </Link>
          <Link href={`/${lang}#contact`} className="hover:text-primary transition-colors">
            {nav.contact}
          </Link>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-4">

          {/* LANGUAGE SWITCHER (PILL STYLE) */}
          <div className="hidden lg:flex items-center rounded-full border border-slate-200 p-1">
            <Link
              href={getPath("en")}
              className={`px-3 py-1.5 text-xs font-bold uppercase rounded-full transition ${lang === "en"
                  ? "bg-gradient-to-r from-primary to-indigo-500 text-white shadow"
                  : "text-slate-500 hover:text-primary"
                }`}
            >
              EN
            </Link>

            <Link
              href={getPath("es")}
              className={`px-3 py-1.5 text-xs font-bold uppercase rounded-full transition ${lang === "es"
                  ? "bg-gradient-to-r from-primary to-indigo-500 text-white shadow"
                  : "text-slate-500 hover:text-primary"
                }`}
            >
              ES
            </Link>
          </div>

          {/* CTA */}
          <Link
            href={`/${lang}/book`}
            className="gradient-soft rounded-full px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-primary/10 transition-all hover:opacity-90"
          >
            {nav.cta}
          </Link>
        </div>
      </div>
    </nav>
  );
}