import { getDictionary } from "@/lib/getDictionary";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookEmbed from "@/components/BookEmbed";

export default async function BookPage({ params }) {
  const { lang } = await params;
  const dict = getDictionary(lang);

  return (
    <>
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