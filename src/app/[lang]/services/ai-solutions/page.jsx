import { notFound } from "next/navigation";
import { getDictionary } from "@/lib/getDictionary";
import { LOCALES, isValidLocale } from "@/lib/locales";
import { buildLocalizedMetadata } from "@/lib/seo";
import HtmlLangSync from "@/components/HtmlLangSync";
import Navbar from "@/components/Navbar";
import PageHero from "@/components/PageHero";
import FeatureList from "@/components/FeatureList";
import PageCTA from "@/components/PageCTA";
import Footer from "@/components/Footer";

const PATH = "/services/ai-solutions";

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }) {
  const { lang } = await params;
  if (!isValidLocale(lang)) return {};

  const dict = getDictionary(lang);
  return buildLocalizedMetadata({ lang, path: PATH, seo: dict.pages.aiSolutions.seo });
}

export default async function AiSolutionsPage({ params }) {
  const { lang } = await params;

  if (!isValidLocale(lang)) {
    notFound();
  }

  const dict = getDictionary(lang);
  const page = dict.pages.aiSolutions;

  return (
    <>
      <HtmlLangSync lang={lang} />
      <Navbar dict={dict} lang={lang} />
      <main className="min-h-screen bg-white text-slate-900 antialiased selection:bg-primary/20">
        <PageHero eyebrow={page.eyebrow} title={page.h1} subtitle={page.subtitle} />
        <FeatureList items={page.features} />
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
