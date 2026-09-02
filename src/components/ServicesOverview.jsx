import Image from "next/image";
import Link from "next/link";
import { Reveal, ScrollStagger, StaggerItem } from "@/components/motion/Reveal";

// Matches the fixed order of dict.services.items in both en.js and es.js:
// [0] Websites, [1] E-Commerce, [2] Automation, [3] AI Solutions.
const SERVICE_SLUGS = [
  "services/websites",
  "services/ecommerce",
  "services/automation",
  "services/ai-solutions",
];

export default function ServicesOverview({ dict, lang = "en" }) {
  const services = dict?.services || {
    badge: "What we do",
    title: "Systems designed to grow your business",
    subtitle:
      "We combine AI, modern websites, and automation to help service businesses scale smarter.",
    items: [
      {
        title: "Websites that convert",
        description:
          "Modern websites designed to build trust, capture leads, and grow your business.",
        meta: "Fast • Responsive • Conversion-focused",
        image: "/images/coreva-websites.webp",
        alt: "Website monitor illustration",
        tag: "Core service",
      },
      {
        title: "Automation that scales",
        description:
          "Streamline repetitive tasks, connect your tools, and save time every week.",
        meta: "Workflows • Integrations • Efficiency",
        image: "/images/coreva-automation.webp",
        alt: "Automation flow illustration",
        tag: "Upsell",
      },
      {
        title: "AI Solutions",
        description:
          "Deploy intelligent systems that help your business respond faster and work smarter.",
        meta: "Agents • Assistants • Smart workflows",
        image: "/images/coreva-ai.webp",
        alt: "AI robot illustration",
        tag: "Upsell",
      },
    ],
  };

  return (
    <section className="relative overflow-hidden bg-slate-50/40 py-28">
      <div className="pointer-events-none absolute inset-0 opacity-70 bg-[radial-gradient(circle_at_top_right,rgba(236,72,153,0.08),transparent_20%),radial-gradient(circle_at_top_left,rgba(124,92,255,0.08),transparent_24%)]" />

      <div className="relative mx-auto max-w-7xl px-8">
        <Reveal className="mx-auto mb-16 max-w-3xl text-center">
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
        </Reveal>

        <ScrollStagger className="grid gap-10 md:grid-cols-2 xl:grid-cols-4">
          {services.items.map((item, index) => (
            <StaggerItem key={item.title}>
            <article className="group relative overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white p-6 shadow-[0_10px_35px_rgba(15,23,42,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(124,92,255,0.12)]">
              <div className="absolute inset-x-0 top-0 h-24 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-[radial-gradient(circle_at_center,rgba(124,92,255,0.14),transparent_55%)]" />

              {item.tag && (
                <div
                  className={`absolute right-6 top-6 z-10 inline-flex rounded-full px-3 py-1.5 text-[11px] font-bold uppercase tracking-wide ${
                    item.tag === "Core service" || item.tag === "Servicio principal"
                      ? "bg-primary/5 text-primary"
                      : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {item.tag}
                </div>
              )}

              <div className="relative mb-8 overflow-hidden rounded-[1.75rem] border border-slate-100 bg-gradient-to-br from-violet-50 via-white to-pink-50 p-6">
                <div className="absolute inset-0 opacity-80 bg-[radial-gradient(circle_at_bottom_left,rgba(124,92,255,0.14),transparent_32%),radial-gradient(circle_at_top_right,rgba(236,72,153,0.12),transparent_30%)]" />
                <Image
                  src={item.image}
                  alt={item.alt || item.title}
                  width={360}
                  height={260}
                  className="relative mx-auto h-44 w-auto object-contain"
                  sizes="(max-width: 768px) 45vw, (max-width: 1280px) 30vw, 220px"
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

              {SERVICE_SLUGS[index] && (
                <Link
                  href={`/${lang}/${SERVICE_SLUGS[index]}`}
                  className="mt-6 flex items-center gap-2 text-sm font-bold text-primary transition-transform hover:translate-x-1"
                >
                  {lang === "es" ? "Saber más" : "Learn more"}
                  <span>→</span>
                </Link>
              )}
            </article>
            </StaggerItem>
          ))}
        </ScrollStagger>
      </div>
    </section>
  );
}