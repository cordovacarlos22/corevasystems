import Link from "next/link";
import { Reveal, ScrollStagger, StaggerItem } from "@/components/motion/Reveal";

// Matches the fixed order of dict.results.items in both en.js and es.js:
// [0] Clínica Arias (healthcare), [1] Cali Construction, [2] internal stack (no page).
const CASE_STUDY_SLUGS = ["industries/healthcare", "industries/construction"];

export default function ResultsSection({ dict, lang = "en" }) {
  const results = dict?.results || {
    badge: "CASE STUDIES",
    title: "Proven Market Results",
    items: [
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
    ],
  };

  return (
    <section className="bg-white py-32" id="results">
      <div className="mx-auto max-w-7xl px-8">
        <Reveal className="mb-24 text-center">
          <div className="mb-6 inline-block rounded-full bg-primary/5 px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-primary">
            {results.badge}
          </div>
          <h2 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
            {results.title}
          </h2>
        </Reveal>

        <ScrollStagger className="grid gap-8 lg:grid-cols-3">
          {results.items.map((item, index) => (
            <StaggerItem key={item.title}>
            <div
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

              {CASE_STUDY_SLUGS[index] && (
                <Link
                  href={`/${lang}/${CASE_STUDY_SLUGS[index]}`}
                  className="mt-6 flex items-center gap-2 text-sm font-bold text-primary transition-transform hover:translate-x-1"
                >
                  {lang === "es" ? "Ver más" : "See more"}
                  <span>→</span>
                </Link>
              )}
            </div>
            </StaggerItem>
          ))}
        </ScrollStagger>
      </div>
    </section>
  );
}