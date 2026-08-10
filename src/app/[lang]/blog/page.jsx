import { notFound } from "next/navigation";
import { getDictionary } from "@/lib/getDictionary";
import { LOCALES, isValidLocale } from "@/lib/locales";
import { buildLocalizedMetadata } from "@/lib/seo";
import HtmlLangSync from "@/components/HtmlLangSync";
import Navbar from "@/components/Navbar";
import PageHero from "@/components/PageHero";
import PageCTA from "@/components/PageCTA";
import Footer from "@/components/Footer";

const PATH = "/blog";

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }) {
  const { lang } = await params;
  if (!isValidLocale(lang)) return {};

  const dict = getDictionary(lang);
  return buildLocalizedMetadata({ lang, path: PATH, seo: dict.pages.blog.seo });
}

export default async function BlogIndexPage({ params }) {
  const { lang } = await params;

  if (!isValidLocale(lang)) {
    notFound();
  }

  const dict = getDictionary(lang);
  const page = dict.pages.blog;

  return (
    <>
      <HtmlLangSync lang={lang} />
      <Navbar dict={dict} lang={lang} />
      <main className="min-h-screen bg-white text-slate-900 antialiased selection:bg-primary/20">
        <PageHero eyebrow={page.eyebrow} title={page.h1} subtitle={page.subtitle} />

        <section className="bg-white py-8 lg:py-16">
          <div className="mx-auto max-w-3xl px-8 text-center">
            <h2 className="mb-4 text-2xl font-bold tracking-tight text-slate-900">
              {page.comingSoonTitle}
            </h2>
            <p className="leading-relaxed text-slate-500">
              {page.comingSoonBody}
            </p>
          </div>
        </section>

        <section className="bg-slate-50/40 py-16 lg:py-20">
          <div className="mx-auto max-w-3xl px-8">
            <ul className="flex flex-col gap-4">
              {page.upcomingTopics.map((topic) => (
                <li
                  key={topic}
                  className="flex items-center gap-4 rounded-2xl border border-slate-200/80 bg-white px-6 py-5 text-sm font-bold text-slate-700 shadow-[0_10px_35px_rgba(15,23,42,0.06)]"
                >
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/5 text-xs font-bold text-primary">
                    →
                  </span>
                  {topic}
                </li>
              ))}
            </ul>
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
