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

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white text-slate-900 antialiased selection:bg-primary/20">
        <HeroSection />
        <TrustedBySection />
        <ServicesOverview />
        <ProcessSection />
        <PackagesSection />
        <ResultsSection />
        <FounderSection />
        <ContactSection />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}