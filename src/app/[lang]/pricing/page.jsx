import { notFound } from "next/navigation";
import { getDictionary } from "@/lib/getDictionary";
import { LOCALES, isValidLocale } from "@/lib/locales";
import { buildLocalizedMetadata } from "@/lib/seo";
import HtmlLangSync from "@/components/HtmlLangSync";
import Navbar from "@/components/Navbar";
import PageHero from "@/components/PageHero";
import PageCTA from "@/components/PageCTA";
import Footer from "@/components/Footer";

const PATH = "/pricing";

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }) {
  const { lang } = await params;
  if (!isValidLocale(lang)) return {};

  const dict = getDictionary(lang);
  return buildLocalizedMetadata({ lang, path: PATH, seo: dict.pages.pricing.seo });
}

export default async function PricingPage({ params }) {
  const { lang } = await params;

  if (!isValidLocale(lang)) {
    notFound();
  }

  const dict = getDictionary(lang);
  const page = dict.pages.pricing;

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: page.whatIsIt.question,
        acceptedAnswer: { "@type": "Answer", text: page.whatIsIt.answer },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <HtmlLangSync lang={lang} />
      <Navbar dict={dict} lang={lang} />
      <main className="min-h-screen bg-white text-slate-900 antialiased selection:bg-primary/20">
        <PageHero eyebrow={page.eyebrow} title={page.h1} subtitle={page.subtitle} />

        <section className="bg-white py-8 lg:py-16">
          <div className="mx-auto max-w-4xl px-8">
            <div className="rounded-[2rem] border border-slate-200/80 bg-slate-50/60 p-10">
              <h2 className="mb-4 text-2xl font-bold tracking-tight text-slate-900">
                {page.whatIsIt.question}
              </h2>
              <p className="leading-relaxed text-slate-600">
                {page.whatIsIt.answer}
              </p>
            </div>
          </div>
        </section>

        <section className="bg-white py-16 lg:py-24">
          <div className="mx-auto max-w-6xl px-8">
            <p className="mx-auto mb-14 max-w-2xl text-center text-lg leading-relaxed text-slate-500">
              {page.pricingIntro}
            </p>

            <div className="grid gap-8 md:grid-cols-3">
              {page.tiers.map((tier) => (
                <div
                  key={tier.name}
                  className="flex flex-col rounded-[2rem] border border-slate-200/80 bg-white p-8 shadow-[0_10px_35px_rgba(15,23,42,0.06)]"
                >
                  <span className="mb-2 text-[11px] font-bold uppercase tracking-widest text-primary">
                    {tier.audience}
                  </span>
                  <h3 className="mb-6 text-2xl font-bold tracking-tight text-slate-900">
                    {tier.name}
                  </h3>
                  <ul className="flex flex-1 flex-col gap-3 text-sm font-medium text-slate-600">
                    {tier.includes.map((feature) => (
                      <li key={feature} className="flex items-start gap-2">
                        <span className="mt-1 text-primary">✓</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <p className="mx-auto mt-14 max-w-2xl text-center text-sm font-semibold text-slate-500">
              {page.pricingNote}
            </p>
          </div>
        </section>

        <PageCTA
          lang={lang}
          title={page.ctaTitle}
          subtitle={page.ctaSubtitle}
          buttonText={dict.nav.cta}
        />
      </main>
      <Footer dict={dict} lang={lang} />
    </>
  );
}
