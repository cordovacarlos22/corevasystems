import { notFound } from "next/navigation";
import { getDictionary } from "@/lib/getDictionary";
import { LOCALES, isValidLocale } from "@/lib/locales";
import { buildLocalizedMetadata } from "@/lib/seo";
import HtmlLangSync from "@/components/HtmlLangSync";
import Navbar from "@/components/Navbar";
import PageHero from "@/components/PageHero";
import PageCTA from "@/components/PageCTA";
import Footer from "@/components/Footer";

const PATH = "/industries/construction";

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }) {
  const { lang } = await params;
  if (!isValidLocale(lang)) return {};

  const dict = getDictionary(lang);
  return buildLocalizedMetadata({ lang, path: PATH, seo: dict.pages.construction.seo });
}

export default async function ConstructionPage({ params }) {
  const { lang } = await params;

  if (!isValidLocale(lang)) {
    notFound();
  }

  const dict = getDictionary(lang);
  const page = dict.pages.construction;

  return (
    <>
      <HtmlLangSync lang={lang} />
      <Navbar dict={dict} lang={lang} />
      <main className="min-h-screen bg-white text-slate-900 antialiased selection:bg-primary/20">
        <PageHero eyebrow={page.eyebrow} title={page.h1} subtitle={page.subtitle} />

        <section className="bg-white py-8 lg:py-16">
          <div className="mx-auto max-w-6xl px-8">
            <ul className="grid gap-6 md:grid-cols-3">
              {page.useCases.map((useCase) => (
                <li
                  key={useCase}
                  className="rounded-2xl border border-slate-200/80 bg-white p-6 text-sm font-semibold leading-relaxed text-slate-700 shadow-[0_10px_35px_rgba(15,23,42,0.06)]"
                >
                  {useCase}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="bg-slate-50/40 py-20 lg:py-28">
          <div className="mx-auto max-w-4xl px-8">
            <div className="rounded-[2rem] border border-slate-200/80 bg-white p-10 text-center shadow-[0_10px_35px_rgba(15,23,42,0.06)]">
              <span className="mb-4 block text-[11px] font-bold uppercase tracking-widest text-primary">
                CASE STUDY
              </span>
              <div className="text-gradient mb-3 text-6xl font-black tracking-tight">
                {page.caseStudy.metric}
              </div>
              <p className="mb-6 text-sm font-bold uppercase tracking-widest text-slate-400">
                {page.caseStudy.label}
              </p>
              <h3 className="mb-4 text-xl font-bold text-slate-900">
                {page.caseStudy.title}
              </h3>
              <p className="mx-auto max-w-xl leading-relaxed text-slate-500">
                {page.caseStudy.description}
              </p>
            </div>
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
