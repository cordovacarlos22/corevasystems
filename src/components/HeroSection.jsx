export default function HeroSection() {
  return (
    <header className="relative overflow-hidden bg-white pb-24 pt-48 lg:pb-32 lg:pt-64">
      <div className="hero-glow"></div>

      <div className="relative z-10 mx-auto max-w-7xl px-8 text-center">
        <div className="mb-10 inline-flex items-center rounded-full border border-slate-100 bg-slate-50 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500">
          NOW ACCEPTING NEW PROJECTS FOR Q4
        </div>

        <h1 className="mx-auto mb-10 max-w-5xl text-5xl font-extrabold leading-[1.1] tracking-tight text-slate-900 lg:text-[5.5rem]">
          We Build Systems That <br />
          <span className="text-gradient">Grow Your Business</span>
        </h1>

        <div className="mx-auto mb-12 max-w-3xl">
          <p className="mb-4 text-lg font-medium leading-relaxed text-slate-600 lg:text-xl">
            Websites, automation, and scalable systems designed to generate leads,
            save time, and turn manual chaos into digital precision.
          </p>
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-400">
            Helping companies automate and scale — Trusted by service businesses
            in the US & LATAM
          </p>
        </div>

        <div className="mb-24 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <button className="gradient-soft w-full rounded-2xl px-10 py-5 text-lg font-bold text-white shadow-2xl shadow-primary/20 transition-transform hover:scale-[1.02] sm:w-auto">
            Schedule Strategy Session
          </button>
          <button className="w-full rounded-2xl border border-slate-200 bg-white px-10 py-5 text-lg font-bold text-slate-900 transition-colors hover:bg-slate-50 sm:w-auto">
            See How It Works
          </button>
        </div>

        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-12 border-t border-slate-50 py-12 md:grid-cols-3">
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold text-slate-900">25+</span>
            <span className="mt-1 text-sm font-semibold uppercase tracking-widest text-slate-400">
              Systems Delivered
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold text-slate-900">100%</span>
            <span className="mt-1 text-sm font-semibold uppercase tracking-widest text-slate-400">
              Project Success Rate
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold text-slate-900">Bilingual</span>
            <span className="mt-1 text-sm font-semibold uppercase tracking-widest text-slate-400">
              Web & Automation Support
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}