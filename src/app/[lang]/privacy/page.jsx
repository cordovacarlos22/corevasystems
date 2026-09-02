import { notFound } from "next/navigation";
import { getDictionary } from "@/lib/getDictionary";
import { LOCALES, isValidLocale } from "@/lib/locales";
import { buildLocalizedMetadata } from "@/lib/seo";
import HtmlLangSync from "@/components/HtmlLangSync";
import Navbar from "@/components/Navbar";
import PageHero from "@/components/PageHero";
import LegalContent from "@/components/LegalContent";
import Footer from "@/components/Footer";

const PATH = "/privacy";

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }) {
  const { lang } = await params;
  if (!isValidLocale(lang)) return {};

  const dict = getDictionary(lang);
  return buildLocalizedMetadata({ lang, path: PATH, seo: dict.pages.privacy.seo });
}

export default async function PrivacyPage({ params }) {
  const { lang } = await params;

  if (!isValidLocale(lang)) {
    notFound();
  }

  const dict = getDictionary(lang);
  const page = dict.pages.privacy;

  return (
    <>
      <HtmlLangSync lang={lang} />
      <Navbar dict={dict} lang={lang} />
      <main className="min-h-screen bg-white text-slate-900 antialiased selection:bg-primary/20">
        <PageHero eyebrow={page.eyebrow} title={page.h1} subtitle={page.subtitle} />
        <LegalContent
          lastUpdatedLabel={page.lastUpdatedLabel}
          lastUpdated={page.lastUpdated}
          sections={page.sections}
        />
      </main>
      <Footer dict={dict} lang={lang} />
    </>
  );
}
