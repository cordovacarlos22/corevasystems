export default function ServicesOverview() {
  return (
    <section className="bg-slate-50/30 py-32">
      <div className="mx-auto max-w-7xl px-8">
        <div className="grid gap-12 md:grid-cols-2">
          <div className="card-shadow hover-lift group rounded-[2.5rem] border border-slate-100 bg-white p-14">
            <div className="mb-8 flex size-14 items-center justify-center rounded-2xl bg-primary/5 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
              <span className="text-3xl">🌐</span>
            </div>
            <h3 className="mb-6 text-3xl font-bold text-slate-900">Websites</h3>
            <p className="text-lg font-medium leading-relaxed text-slate-500">
              Conversion-focused digital experiences that tell your brand story
              and capture high-intent leads 24/7. Built on high-performance
              frameworks.
            </p>
          </div>

          <div className="card-shadow hover-lift group rounded-[2.5rem] border border-slate-100 bg-white p-14">
            <div className="mb-8 flex size-14 items-center justify-center rounded-2xl bg-secondary/5 text-secondary transition-colors group-hover:bg-secondary group-hover:text-white">
              <span className="text-3xl">⚙️</span>
            </div>
            <h3 className="mb-6 text-3xl font-bold text-slate-900">Automation</h3>
            <p className="text-lg font-medium leading-relaxed text-slate-500">
              Intelligent workflows that handle repetitive tasks, sync your data,
              and scale your operations without adding overhead or headcount.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}