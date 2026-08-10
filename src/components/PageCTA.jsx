import Link from "next/link";

export default function PageCTA({ lang, title, subtitle, buttonText }) {
  return (
    <section className="relative overflow-hidden py-32">
      <div className="gradient-soft absolute inset-0 opacity-95"></div>

      <div className="relative z-10 mx-auto max-w-4xl px-8 text-center">
        <h2 className="mb-6 text-4xl font-black leading-tight tracking-tight text-white lg:text-5xl">
          {title}
        </h2>

        {subtitle && (
          <p className="mx-auto mb-10 max-w-2xl text-lg font-medium text-white/90">
            {subtitle}
          </p>
        )}

        <Link
          href={`/${lang}/book`}
          className="inline-block rounded-2xl bg-white px-12 py-5 text-lg font-black text-primary shadow-2xl transition-transform hover:scale-105"
        >
          {buttonText}
        </Link>
      </div>
    </section>
  );
}
