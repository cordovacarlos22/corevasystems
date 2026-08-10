export default function FAQSection({ dict }) {
  const faq = dict?.faq;

  if (!faq) return null;

  return (
    <section id="faq" className="bg-slate-50/40 py-32">
      <div className="mx-auto max-w-4xl px-8">
        <div className="mb-16 text-center">
          <div className="mb-6 inline-block rounded-full bg-primary/5 px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-primary">
            {faq.badge}
          </div>
          <h2 className="mb-5 text-4xl font-extrabold tracking-tight text-slate-900 lg:text-5xl">
            {faq.title}
          </h2>
          {faq.subtitle && (
            <p className="text-lg leading-8 text-slate-500">{faq.subtitle}</p>
          )}
        </div>

        <div className="flex flex-col gap-4">
          {faq.items.map((item) => (
            <details
              key={item.question}
              className="group rounded-2xl border border-slate-200 bg-white px-6 py-5 open:shadow-[0_10px_35px_rgba(15,23,42,0.06)]"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-bold text-slate-900 marker:content-none">
                {item.question}
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-slate-50 text-slate-400 transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-4 leading-relaxed text-slate-500">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
