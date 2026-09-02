import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getDictionary } from "@/lib/getDictionary";
import { isValidLocale } from "@/lib/locales";
import HtmlLangSync from "@/components/HtmlLangSync";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PurchaseConversionTracker from "@/components/PurchaseConversionTracker";
import Link from "next/link";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  if (!isValidLocale(lang)) return {};

  const title =
    lang === "es" ? "Gracias | Coreva Systems" : "Thank You | Coreva Systems";

  return { title, robots: { index: false, follow: false } };
}

export default async function ThankYouPage({ params }) {
  const { lang } = await params;

  if (!isValidLocale(lang)) {
    notFound();
  }

  const dict = getDictionary(lang);

  return (
    <>
      <HtmlLangSync lang={lang} />
      <Navbar dict={dict} lang={lang} />

      <Suspense fallback={null}>
        <PurchaseConversionTracker />
      </Suspense>

      <main className="flex min-h-screen flex-col items-center justify-center bg-white px-8 pt-32 pb-20 text-center">
        <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-slate-900 lg:text-5xl">
          {lang === "es" ? "¡Gracias por tu compra!" : "Thanks for your order!"}
        </h1>
        <p className="mb-10 max-w-xl text-lg font-medium leading-relaxed text-slate-600">
          {lang === "es"
            ? "Recibimos tu pago. Te contactaremos en las próximas 24 horas para arrancar tu proyecto."
            : "We've received your payment. We'll reach out within 24 hours to kick off your project."}
        </p>
        <Link
          href={`/${lang}`}
          className="gradient-soft rounded-2xl px-10 py-4 text-lg font-bold text-white shadow-xl shadow-primary/20"
        >
          {lang === "es" ? "Volver al inicio" : "Back to home"}
        </Link>
      </main>

      <Footer dict={dict} lang={lang} />
    </>
  );
}
