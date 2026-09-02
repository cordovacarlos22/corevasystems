import { notFound } from "next/navigation";
import { getDictionary } from "@/lib/getDictionary";
import { LOCALES, isValidLocale } from "@/lib/locales";
import HtmlLangSync from "@/components/HtmlLangSync";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import TrustedBySection from "@/components/TrustedBySection";
import ServicesOverview from "@/components/ServicesOverview";
import ProcessSection from "@/components/ProcessSection";
import PackagesSection from "@/components/PackagesSection";
import FAQSection from "@/components/FAQSection";
import ResultsSection from "@/components/ResultsSection";
import FounderSection from "@/components/FounderSection";
import ContactSection from "@/components/ContactSection";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

const BASE_URL = "https://www.corevasystems.com";

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }) {
  const { lang } = await params;
  if (!isValidLocale(lang)) return {};

  const dict = getDictionary(lang);
  const seo = dict.seo;

  return {
    title: seo.title,
    description: seo.description,
    alternates: {
      canonical: `${BASE_URL}/${lang}`,
      languages: {
        en: `${BASE_URL}/en`,
        es: `${BASE_URL}/es`,
        "x-default": `${BASE_URL}/en`,
      },
    },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: `${BASE_URL}/${lang}`,
      locale: lang === "es" ? "es_ES" : "en_US",
    },
    twitter: {
      title: seo.title,
      description: seo.description,
    },
  };
}

export default async function Home({ params }) {
  const { lang } = await params;

  if (!isValidLocale(lang)) {
    notFound();
  }

  const dict = getDictionary(lang);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: dict.faq.items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
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
        <HeroSection dict={dict} lang={lang} />
        <TrustedBySection dict={dict} />
        <ServicesOverview dict={dict} lang={lang} />
        <ProcessSection dict={dict} />
        <PackagesSection dict={dict} lang={lang} />
        <ResultsSection dict={dict} lang={lang} />
        <FounderSection dict={dict} lang={lang} />
        <FAQSection dict={dict} lang={lang} />
        <ContactSection dict={dict} lang={lang} />
        <FinalCTA dict={dict} />
      </main>
      <Footer dict={dict} lang={lang} />
    </>
  );
}