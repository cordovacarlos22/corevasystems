import Image from "next/image";

export default function ServicesOverview({ dict }) {
  const services = dict?.services || {
    badge: "What we do",
    title: "Systems designed to grow your business",
    subtitle:
      "We combine AI, modern websites, and automation to help service businesses scale smarter.",
    items: [
      {
        title: "AI Solutions",
        description:
          "Deploy intelligent systems that help your business respond faster and work smarter.",
        meta: "Agents • Assistants • Smart workflows",
        image: "/images/coreva-ai.webp",
        alt: "AI robot illustration",
      },
      {
        title: "Websites that convert",
        description:
          "Modern websites designed to build trust, capture leads, and grow your business.",
        meta: "Fast • Responsive • Conversion-focused",
        image: "/images/coreva-websites.webp",
        alt: "Website monitor illustration",
      },
      {
        title: "Automation that scales",
        description:
          "Streamline repetitive tasks, connect your tools, and save time every week.",
        meta: "Workflows • Integrations • Efficiency",
        image: "/images/coreva-automation.webp",
        alt: "Automation flow illustration",
      },
    ],
  };

  return (
    <section className="relative overflow-hidden bg-slate-50/40 py-28">
      <div className="pointer-events-none absolute inset-0 opacity-70 bg-[radial-gradient(circle_at_top_right,rgba(236,72,153,0.08),transparent_20%),radial-gradient(circle_at_top_left,rgba(124,92,255,0.08),transparent_24%)]" />

      <div className="relative mx-auto max-w-7xl px-8">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          {services.badge && (
            <div className="mb-4 inline-flex items-center rounded-full border border-slate-200 bg-white px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.22em] text-slate-500">
              {services.badge}
            </div>
          )}

          {services.title && (
            <h2 className="mb-5 text-4xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
              {services.title}
            </h2>
          )}

          {services.subtitle && (
            <p className="text-lg leading-8 text-slate-500">
              {services.subtitle}
            </p>
          )}
        </div>

        <div className="grid gap-10 md:grid-cols-2 xl:grid-cols-3">
          {services.items.map((item) => (
            <article
              key={item.title}
              className="group relative overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white p-6 shadow-[0_10px_35px_rgba(15,23,42,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(124,92,255,0.12)]"
            >
              <div className="absolute inset-x-0 top-0 h-24 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-[radial-gradient(circle_at_center,rgba(124,92,255,0.14),transparent_55%)]" />

              <div className="relative mb-8 overflow-hidden rounded-[1.75rem] border border-slate-100 bg-gradient-to-br from-violet-50 via-white to-pink-50 p-6">
                <div className="absolute inset-0 opacity-80 bg-[radial-gradient(circle_at_bottom_left,rgba(124,92,255,0.14),transparent_32%),radial-gradient(circle_at_top_right,rgba(236,72,153,0.12),transparent_30%)]" />
                <Image
                  src={item.image}
                  alt={item.alt || item.title}
                  width={360}
                  height={260}
                  className="relative mx-auto h-44 w-auto object-contain"
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                />
              </div>

              <h3 className="mb-4 text-2xl font-bold tracking-tight text-slate-900">
                {item.title}
              </h3>

              <p className="text-lg leading-relaxed text-slate-500">
                {item.description}
              </p>

              {item.meta && (
                <div className="mt-6 inline-flex rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700">
                  {item.meta}
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}