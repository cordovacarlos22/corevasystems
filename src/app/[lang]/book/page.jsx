import { notFound } from "next/navigation";
import { getDictionary } from "@/lib/getDictionary";
import { isValidLocale } from "@/lib/locales";
import HtmlLangSync from "@/components/HtmlLangSync";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookEmbed from "@/components/BookEmbed";

const BASE_URL = "https://www.corevasystems.com";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  if (!isValidLocale(lang)) return {};

  const title =
    lang === "es"
      ? "Agenda tu llamada | Coreva Systems"
      : "Schedule Your Call | Coreva Systems";
  const description =
    lang === "es"
      ? "Agenda una sesión estratégica gratuita con Coreva Systems para hablar sobre IA, sitios web y automatización para tu negocio."
      : "Book a free strategy session with Coreva Systems to talk through AI, websites, and automation for your business.";

  return {
    title,
    description,
    alternates: {
      canonical: `${BASE_URL}/${lang}/book`,
      languages: {
        en: `${BASE_URL}/en/book`,
        es: `${BASE_URL}/es/book`,
        "x-default": `${BASE_URL}/en/book`,
      },
    },
  };
}

export default async function BookPage({ params }) {
  const { lang } = await params;

  if (!isValidLocale(lang)) {
    notFound();
  }

  const dict = getDictionary(lang);

  return (
    <>
      <HtmlLangSync lang={lang} />
      <Navbar dict={dict} lang={lang} />

      <main className="min-h-screen bg-white pt-32">
        <div className="px-6 py-20">
          <h1 className="mb-8 text-center text-3xl font-bold">
            {lang === "es" ? "Agenda tu llamada" : "Schedule your call"}
          </h1>

          <BookEmbed lang={lang} />
        </div>
      </main>

      <Footer dict={dict} lang={lang} />
    </>
  );
}