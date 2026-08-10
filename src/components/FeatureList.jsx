export default function FeatureList({ items }) {
  if (!items?.length) return null;

  return (
    <section className="bg-white py-8 lg:py-16">
      <div className="mx-auto max-w-6xl px-8">
        <div className="grid gap-8 md:grid-cols-3">
          {items.map((item) => (
            <div
              key={item.title}
              className="rounded-[2rem] border border-slate-200/80 bg-white p-8 shadow-[0_10px_35px_rgba(15,23,42,0.06)]"
            >
              <h3 className="mb-3 text-xl font-bold tracking-tight text-slate-900">
                {item.title}
              </h3>
              <p className="leading-relaxed text-slate-500">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
