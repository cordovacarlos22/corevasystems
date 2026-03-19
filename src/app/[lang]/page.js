import { getDictionary } from "@/lib/getDictionary";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import TrustedBySection from "@/components/TrustedBySection";
import ServicesOverview from "@/components/ServicesOverview";
import ProcessSection from "@/components/ProcessSection";
import PackagesSection from "@/components/PackagesSection";
import ResultsSection from "@/components/ResultsSection";
import FounderSection from "@/components/FounderSection";
import ContactSection from "@/components/ContactSection";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

export default async function Home({ params }) {
  const { lang } = await params;
  const dict = getDictionary(lang);

  return (
    <>
      <Navbar dict={dict} />
      <main className="min-h-screen bg-white text-slate-900 antialiased selection:bg-primary/20">
        <HeroSection dict={dict} />
        <TrustedBySection dict={dict} />
        <ServicesOverview dict={dict} />
        <ProcessSection dict={dict} />
        <PackagesSection dict={dict} />
        <ResultsSection dict={dict} />
        <FounderSection dict={dict} />
        <ContactSection dict={dict} lang={lang} />
        <FinalCTA dict={dict} />
      </main>
      <Footer dict={dict} lang={lang} />
    </>
  );
}