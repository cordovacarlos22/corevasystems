export default function ServicesOverview({ dict }) {
  const services = dict?.services || {
    items: [
      {
        title: "Websites",
        description:
          "Conversion-focused digital experiences that tell your brand story and capture high-intent leads 24/7. Built on high-performance frameworks.",
        icon: "🌐",
      },
      {
        title: "Automation",
        description:
          "Intelligent workflows that handle repetitive tasks, sync your data, and scale your operations without adding overhead or headcount.",
        icon: "⚙️",
      },
    ],
  };

  return (
    <section className="bg-slate-50/30 py-32">
      <div className="mx-auto max-w-7xl px-8">
        <div className="grid gap-12 md:grid-cols-2">
          {services.items.map((item, index) => (
            <div
              key={item.title}
              className="card-shadow hover-lift group rounded-[2.5rem] border border-slate-100 bg-white p-14"
            >
              <div
                className={`mb-8 flex size-14 items-center justify-center rounded-2xl transition-colors ${index === 0
                    ? "bg-primary/5 text-primary group-hover:bg-primary group-hover:text-white"
                    : "bg-secondary/5 text-secondary group-hover:bg-secondary group-hover:text-white"
                  }`}
              >
                <span className="text-3xl">{item.icon}</span>
              </div>
              <h3 className="mb-6 text-3xl font-bold text-slate-900">{item.title}</h3>
              <p className="text-lg font-medium leading-relaxed text-slate-500">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}