import { Reveal } from "@/components/motion/Reveal";

export default function TechFoundation({ data }) {
  if (!data) return null;

  return (
    <section className="bg-slate-50/50 py-16">
      <div className="mx-auto max-w-5xl px-8">
        <Reveal className="rounded-[2rem] border border-slate-200/80 bg-white p-8 shadow-[0_10px_35px_rgba(15,23,42,0.06)] lg:p-12">
          <h2 className="mb-8 text-center text-xl font-bold tracking-tight text-slate-900 lg:text-2xl">
            {data.title}
          </h2>
          <ul className="grid gap-x-10 gap-y-4 sm:grid-cols-2">
            {data.items.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm leading-relaxed text-slate-600">
                <span className="mt-0.5 text-primary">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
