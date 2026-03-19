export default function PackagesSection({ dict }) {
  const packagesData = dict?.packages;
  const items = packagesData?.items || [];

  return (
    <section className="bg-slate-50/50 py-40" id="packages">
      <div className="mx-auto max-w-7xl px-8">
        <div className="mb-24 text-center">
          <div className="mb-6 inline-block rounded-full bg-primary/5 px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-primary">
            {packagesData?.badge}
          </div>
          <h2 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
            {packagesData?.title}
          </h2>
          <p className="mt-6 font-medium text-slate-500">
            {packagesData?.subtitle}
          </p>
        </div>

        <div className="grid items-center gap-8 lg:grid-cols-3">
          {items.map((pkg, index) => (
            <div
              key={pkg.title}
              className={[
                "flex h-full flex-col bg-white",
                pkg.featured
                  ? "pro-card-shadow relative z-10 rounded-[3rem] border border-primary/20 p-14 lg:scale-110"
                  : "card-shadow hover-lift rounded-[2.5rem] border border-slate-100 p-12",
                index === 0 ? "order-1" : "",
                index === 1 ? "order-2" : "",
                index === 2 ? "order-3" : "",
              ].join(" ")}
            >
              {pkg.featured && pkg.badge && (
                <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2">
                  <div className="gradient-soft rounded-full px-8 py-2.5 text-[11px] font-black uppercase tracking-widest text-white shadow-xl">
                    {pkg.badge}
                  </div>
                </div>
              )}

              <div className={`mb-12 ${pkg.featured ? "text-center" : ""}`}>
                <h3
                  className={
                    pkg.featured
                      ? "mb-3 text-3xl font-extrabold text-gradient"
                      : "mb-3 text-2xl font-bold text-slate-900"
                  }
                >
                  {pkg.title}
                </h3>
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  {pkg.subtitle}
                </p>
              </div>

              <ul className="mb-16 flex-grow space-y-6">
                {pkg.features.map((feature) => (
                  <li
                    key={feature}
                    className={
                      pkg.featured
                        ? "flex items-center gap-4 font-bold text-slate-800"
                        : "flex items-center gap-4 font-semibold text-slate-600"
                    }
                  >
                    <span
                      className={pkg.featured ? "text-2xl text-primary" : "text-xl text-primary"}
                    >
                      ✓
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                className={
                  pkg.featured
                    ? "gradient-soft w-full rounded-2xl py-6 text-xl font-black text-white shadow-xl shadow-primary/30 transition-all hover:scale-[1.02]"
                    : "w-full rounded-xl border-2 border-slate-100 py-4 font-bold text-slate-900 transition-all hover:border-slate-200 hover:bg-slate-50"
                }
              >
                {pkg.buttonText}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}