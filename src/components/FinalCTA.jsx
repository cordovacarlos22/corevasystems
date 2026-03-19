export default function FinalCTA({ dict }) {
  const finalCta = dict?.finalCta || {
    title: "Ready to scale?",
    subtitle:
      "Let's build the systems that will take your business to the next level. Book your free strategy session today.",
    button: "Book a Free Call",
  };

  return (
    <section className="relative overflow-hidden py-48">
      <div className="gradient-soft absolute inset-0 opacity-95"></div>

      <div className="relative z-10 mx-auto max-w-7xl px-8 text-center">
        <h2 className="mb-10 text-5xl font-black leading-none tracking-tight text-white lg:text-[6.5rem]">
          {finalCta.title}
        </h2>

        <p className="mx-auto mb-16 max-w-3xl text-xl font-medium text-white/90 lg:text-2xl">
          {finalCta.subtitle}
        </p>

        <button className="rounded-2xl bg-white px-16 py-7 text-2xl font-black text-primary shadow-2xl transition-transform hover:scale-105">
          {finalCta.button}
        </button>
      </div>
    </section>
  );
}