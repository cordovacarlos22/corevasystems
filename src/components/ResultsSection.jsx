const results = [
  {
    metric: "40%",
    label: "Increase in Bookings",
    title: "Clínica Arias",
    description:
      "Integrated scheduling and automated reminders that slashed no-shows instantly.",
  },
  {
    metric: "25h+",
    label: "Weekly Admin Savings",
    title: "Cali Construction",
    description:
      "Automated invoicing and project tracking system for complex field operations.",
  },
  {
    metric: "10X",
    label: "Volume Capacity",
    title: "Coreva Framework",
    description:
      "Internal proprietary stack designed for infinite horizontal business scalability.",
  },
];

export default function ResultsSection() {
  return (
    <section className="bg-white py-32" id="results">
      <div className="mx-auto max-w-7xl px-8">
        <div className="mb-24 text-center">
          <div className="mb-6 inline-block rounded-full bg-primary/5 px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-primary">
            CASE STUDIES
          </div>
          <h2 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
            Proven Market Results
          </h2>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {results.map((item) => (
            <div
              key={item.title}
              className="hover-lift rounded-[2.5rem] border border-slate-100 bg-slate-50/50 p-12"
            >
              <div className="text-gradient mb-4 text-5xl font-extrabold">
                {item.metric}
              </div>
              <div className="mb-8 text-[11px] font-bold uppercase tracking-widest text-slate-400">
                {item.label}
              </div>
              <h4 className="mb-4 text-2xl font-bold">{item.title}</h4>
              <p className="font-medium leading-relaxed text-slate-500">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}