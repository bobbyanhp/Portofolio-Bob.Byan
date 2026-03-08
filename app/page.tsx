import AboutSection from "@/app/components/sections/AboutSection";
import CareerSection from "@/app/components/sections/CareerSection";
import HeroSection from "@/app/components/sections/HeroSection";
import PortfolioSection from "@/app/components/sections/PortfolioSection";

export default function Page() {
  return (
    <main className="min-h-screen bg-white antialiased">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <HeroSection />
        <AboutSection />
        <CareerSection />
        <PortfolioSection />
      </div>
    </main>
  );
}
