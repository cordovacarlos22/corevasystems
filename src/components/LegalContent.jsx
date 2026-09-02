export default function LegalContent({ lastUpdatedLabel, lastUpdated, sections }) {
  if (!sections?.length) return null;

  return (
    <section className="bg-white pb-32">
      <div className="mx-auto max-w-3xl px-8">
        {lastUpdated && (
          <p className="mb-16 text-sm font-semibold uppercase tracking-widest text-slate-400">
            {lastUpdatedLabel} {lastUpdated}
          </p>
        )}

        <div className="space-y-16">
          {sections.map((section) => (
            <div key={section.heading}>
              <h2 className="mb-5 text-2xl font-bold tracking-tight text-slate-900">
                {section.heading}
              </h2>

              <div className="space-y-4">
                {section.paragraphs?.map((paragraph, i) => (
                  <p key={i} className="leading-relaxed text-slate-600">
                    {paragraph}
                  </p>
                ))}
              </div>

              {section.list?.length > 0 && (
                <ul className="mt-4 space-y-3">
                  {section.list.map((item) => (
                    <li key={item} className="flex items-start gap-3 leading-relaxed text-slate-600">
                      <span className="mt-2.5 size-1.5 flex-shrink-0 rounded-full bg-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
