import AboutSection from "./components/AboutSection";
import CareerHistory from "./components/CareerHistory";
import HeroSection from "./components/HeroSection";
import PortfolioSection from "./components/PortfolioSection";
import SiteHeader from "./components/SiteHeader";
import { CmsContentProvider } from "./components/CmsContentProvider";
import { getCmsContent } from "@/lib/cms/queries";

export default async function Page() {
  const content = await getCmsContent();

  return (
    <CmsContentProvider initialContent={content}>
      <main className="min-h-screen bg-white antialiased">
        <SiteHeader />

        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
          <HeroSection />
          <AboutSection />
          <CareerHistory />
          <PortfolioSection />
        </div>
      </main>
    </CmsContentProvider>
  );
}
