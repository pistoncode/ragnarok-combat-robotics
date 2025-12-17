import GridBackground from "@/components/layout/GridBackground";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Stats from "@/components/sections/Stats";
import FeaturedRobot from "@/components/sections/FeaturedRobot";
import UpcomingBot from "@/components/sections/UpcomingBot";
import CompetitionHighlights from "@/components/sections/CompetitionHighlights";
import SponsorCTA from "@/components/sections/SponsorCTA";
import ScrollToTop from "@/components/ScrollToTop";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      {/* Scroll to top on page load */}
      <ScrollToTop />

      {/* Fixed elements - Grid and Hero stay in place */}
      <GridBackground />
      <Hero />

      {/* Fixed Navbar */}
      <Navbar />

      {/* Spacer for the fixed hero section */}
      <div className="h-screen" />

      {/* Scrollable content that goes over the hero */}
      <div className="relative z-20 bg-[var(--bg-primary)]">
        {/* Top divider line */}
        <div className="h-px bg-[#333]" />

        {/* Stats Section */}
        <div className="py-8">
          <Stats />
        </div>

        {/* Divider */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-px bg-[#333]" />
        </div>

        {/* Featured Robot Section */}
        <div className="py-8">
          <FeaturedRobot />
        </div>

        {/* Divider */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-px bg-[#333]" />
        </div>

        {/* Upcoming Bot Section */}
        <div className="py-8">
          <UpcomingBot />
        </div>

        {/* Divider */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-px bg-[#333]" />
        </div>

        {/* Competition Highlights Section */}
        <div className="py-8">
          <CompetitionHighlights />
        </div>

        {/* Divider */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-px bg-[#333]" />
        </div>

        {/* Sponsor CTA Section */}
        <div className="py-8">
          <SponsorCTA />
        </div>

        {/* Divider before footer */}
        <div className="h-px bg-[#333]" />

        <Footer />
      </div>
    </main>
  );
}
