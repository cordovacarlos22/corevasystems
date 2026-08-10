export default function PageHero({ eyebrow, title, subtitle }) {
  return (
    <header className="relative overflow-hidden bg-white pb-20 pt-44 lg:pb-24 lg:pt-56">
      <div className="hero-glow"></div>

      <div className="relative z-10 mx-auto max-w-5xl px-8 text-center">
        {eyebrow && (
          <div className="mb-8 inline-flex items-center rounded-full border border-slate-100 bg-slate-50 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500">
            {eyebrow}
          </div>
        )}

        <h1 className="mx-auto mb-8 max-w-4xl text-4xl font-extrabold leading-[1.15] tracking-tight text-slate-900 lg:text-6xl">
          {title}
        </h1>

        {subtitle && (
          <p className="mx-auto max-w-2xl text-lg font-medium leading-relaxed text-slate-600 lg:text-xl">
            {subtitle}
          </p>
        )}
      </div>
    </header>
  );
}
