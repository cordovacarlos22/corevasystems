export default function ProcessSection() {
  const steps = [
    {
      number: "1",
      title: "Analyze",
      description:
        "We map your current operations to find friction points and high-impact automation opportunities.",
    },
    {
      number: "2",
      title: "Build",
      description:
        "Our team crafts custom web and automation systems specifically tailored to your business needs.",
    },
    {
      number: "3",
      title: "Scale",
      description:
        "We launch your systems and provide ongoing support to ensure long-term, predictable growth.",
    },
  ];

  return (
    <section className="bg-white py-32" id="process">
      <div className="mx-auto max-w-7xl px-8">
        <div className="mb-24 text-center">
          <div className="mb-6 inline-block rounded-full bg-primary/5 px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-primary">
            WORKFLOW
          </div>
          <h2 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
            Our 3-Step Process
          </h2>
        </div>

        <div className="grid gap-16 lg:grid-cols-3">
          {steps.map((step, index) => (
            <div key={step.number} className="group relative">
              {index !== steps.length - 1 && <div className="step-line"></div>}

              <div className="relative z-10 flex flex-col">
                <div className="gradient-soft mb-10 flex size-14 items-center justify-center rounded-full text-xl font-bold text-white shadow-lg">
                  {step.number}
                </div>
                <h3 className="mb-4 text-2xl font-bold">{step.title}</h3>
                <p className="font-medium leading-relaxed text-slate-500">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}