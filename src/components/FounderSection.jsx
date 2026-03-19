import Image from "next/image";
import Link from "next/link";

export default function FounderSection({ dict }) {
  const founder = dict?.founder || {
    badge: "MEET THE FOUNDER",
    name: "Carlos Cordova",
    role: "Founder & Systems Architect",
    quote:
      "We build systems that help businesses grow, automate operations, and scale efficiently. My goal is to free founders from the day-to-day grind so they can focus on their vision.",
    highlights: {
      automation: "Enterprise Automation",
      bilingual: "Bilingual Operations",
    },
    cta: "Work directly with Carlos",
    linkedin: "Connect on LinkedIn",
  };
  return (
    <section className="bg-white py-40">
      <div className="mx-auto max-w-7xl px-8">
        <div className="grid items-center gap-24 lg:grid-cols-2">
          <div className="group relative">
            <div className="gradient-soft absolute -inset-10 rounded-full opacity-15 blur-[100px]"></div>
            <Image
              src="/images/founder.jpg"
              alt="Carlos Cordova"
              width={500}
              height={600}
              className="rounded-[3rem] shadow-2xl"
            />
          </div>

          <div className="flex flex-col">
            <div className="mb-8 inline-block w-fit rounded-full bg-primary/5 px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-primary">
              {founder.badge}
            </div>

            <h2 className="mb-2 text-5xl font-black tracking-tight">
              {founder.name}
            </h2>
            <p className="mb-12 text-xl font-bold text-primary">
              {founder.role}
            </p>

            <div className="relative mb-12">
              <span className="absolute -left-8 -top-4 text-7xl font-serif text-primary/10">
                "
              </span>
              <p className="text-2xl font-medium italic leading-relaxed text-slate-700">
                {founder.quote}
              </p>
            </div>

            <div className="mb-12 grid grid-cols-1 gap-8 sm:grid-cols-2">
              <div className="flex items-center gap-4">
                <div className="flex size-10 items-center justify-center rounded-full bg-slate-50 text-primary">
                  <span className="text-xl">⚡</span>
                </div>
                <span className="text-sm font-semibold text-slate-600">
                  {founder.highlights.automation}
                </span>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex size-10 items-center justify-center rounded-full bg-slate-50 text-primary">
                  <span className="text-xl">🌎</span>
                </div>
                <span className="text-sm font-semibold text-slate-600">
                  {founder.highlights.bilingual}
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <Link
                href="#contact"
                className="group flex items-center gap-3 text-lg font-extrabold text-slate-900 transition-colors hover:text-primary"
              >
                {founder.cta}
                <span className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </Link>

              <Link
                href="https://www.linkedin.com/in/carloscordovadev/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 text-sm font-semibold text-slate-500 transition-colors hover:text-primary"
              >
                {founder.linkedin}
                <span className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}