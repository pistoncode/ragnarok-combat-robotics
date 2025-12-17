"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { Calendar, MapPin, Trophy, ArrowRight, Target, Award, Swords, CircleDollarSign, AlertTriangle } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import GridBackground from "@/components/layout/GridBackground";
import { competitions, getCompetitionStats } from "@/lib/data/competitions";
import { robots } from "@/lib/data/robots";

// Helper to get robot name from slug
const getRobotName = (slug: string) => {
  const robot = robots.find((r) => r.slug === slug);
  return robot?.name || slug;
};

export default function CompetitionsPage() {
  const stats = getCompetitionStats();
  const timelineLineRef = useRef<HTMLDivElement | null>(null);

  // Sort competitions by date (newest first)
  const sortedCompetitions = [...competitions].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  // Smooth timeline scroll progress
  useEffect(() => {
    const handleScroll = () => {
      if (!timelineLineRef.current) return;

      const timelineSection = document.getElementById("competition-timeline");
      if (!timelineSection) return;

      const rect = timelineSection.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const sectionTop = rect.top;
      const sectionHeight = rect.height;

      // Calculate progress through the timeline section
      const startOffset = windowHeight * 0.3;
      const endOffset = windowHeight * 0.7;
      const scrollProgress = (startOffset - sectionTop) / (sectionHeight - endOffset + startOffset);
      const clampedProgress = Math.min(1, Math.max(0, scrollProgress));

      timelineLineRef.current.style.transform = `scaleY(${clampedProgress})`;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]">
      <GridBackground />
      <Navbar />

      <main className="relative z-10 pt-20 pb-16 bg-[var(--bg-primary)]">
        {/* Hero Section */}
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <div className="mb-12">
              <div className="flex items-center gap-4 mb-4 animate-fade-in-up">
                <div className="w-12 h-px bg-[var(--accent-primary)]" />
                <p className="text-sm font-mono text-[var(--text-secondary)] uppercase tracking-[0.2em]">
                  Battle Archive
                </p>
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black font-mono tracking-tighter animate-fade-in-up animation-delay-100">
                Competition
              </h1>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black font-mono tracking-tighter text-[var(--accent-primary)] animate-fade-in-up animation-delay-200">
                History
              </h1>
            </div>

            {/* Description */}
            <div className="relative max-w-3xl mb-16 animate-fade-in-up animation-delay-300">
              <div className="absolute -top-2 -left-2 w-4 h-4 border-t-2 border-l-2 border-[var(--accent-primary)]" />
              <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b-2 border-r-2 border-[var(--accent-primary)]" />
              <div className="border border-white/10 p-6 bg-black/50">
                <p className="text-lg font-mono text-[var(--text-secondary)] leading-relaxed">
                  Our journey through the combat robotics arena. Each battle teaches us,
                  each victory drives us forward.
                </p>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-fade-in-up animation-delay-400">
              {[
                { label: "Competitions", value: stats.totalCompetitions, icon: <Target className="w-5 h-5" /> },
                { label: "Tournament Wins", value: stats.firstPlaceCount, icon: <Trophy className="w-5 h-5" /> },
                { label: "Match Victories", value: stats.totalWins, icon: <Swords className="w-5 h-5" /> },
                { label: "Win Rate", value: `${stats.winRate}%`, icon: <Award className="w-5 h-5" /> },
              ].map((stat, index) => (
                <div key={stat.label} className="relative group">
                  {/* Offset background */}
                  <div className="absolute inset-0 translate-x-1 translate-y-1 border border-[var(--accent-primary)]/20 bg-[var(--accent-primary)]/5 transition-transform group-hover:translate-x-2 group-hover:translate-y-2" />

                  <div className="relative border border-white/20 bg-black/80 backdrop-blur-sm p-4 md:p-6 transition-transform group-hover:-translate-x-0.5 group-hover:-translate-y-0.5">
                    <div className="flex items-center gap-2 mb-2 text-[var(--accent-primary)]">
                      {stat.icon}
                      <span className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)]">
                        {stat.label}
                      </span>
                    </div>
                    <div className="text-3xl md:text-4xl font-black font-mono tracking-tighter">
                      {stat.value}
                    </div>
                    {/* Number watermark */}
                    <div className="absolute top-2 right-2 text-[var(--accent-primary)]/10 font-mono text-3xl font-black">
                      {String(index + 1).padStart(2, '0')}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section id="competition-timeline" className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <div className="mb-12">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-px bg-[var(--accent-primary)]" />
                <p className="text-sm font-mono text-[var(--text-secondary)] uppercase tracking-[0.2em]">
                  Timeline
                </p>
              </div>
              <h2 className="text-4xl md:text-5xl font-black font-mono tracking-tighter">
                Event Chronicle
              </h2>
            </div>

            {/* Timeline */}
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-white/10 md:-translate-x-1/2" />
              <div
                ref={timelineLineRef}
                className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-[var(--accent-primary)] md:-translate-x-1/2 origin-top"
                style={{ transform: "scaleY(0)" }}
              />

              {/* Competition Cards */}
              <div className="space-y-16">
                {sortedCompetitions.map((competition, index) => {
                  const totalWins = competition.results.reduce((sum, r) => sum + r.wins, 0);
                  const totalLosses = competition.results.reduce((sum, r) => sum + r.losses, 0);
                  const hasFirstPlace = competition.results.some(r => r.placement === "1st Place");

                  return (
                    <div
                      key={competition.slug}
                      className={`relative flex flex-col md:flex-row items-start gap-8 ${
                        index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                      }`}
                    >
                      {/* Timeline Node */}
                      <div className="absolute left-6 md:left-1/2 transform -translate-x-1/2 z-10">
                        <div className={`w-4 h-4 border-2 ${
                          hasFirstPlace
                            ? "border-[var(--accent-primary)] bg-[var(--accent-primary)]"
                            : "border-white/40 bg-black"
                        }`} />
                      </div>

                      {/* Date Badge - Mobile */}
                      <div className="md:hidden ml-14 mb-4">
                        <div className="inline-flex items-center gap-2 border border-[var(--accent-primary)]/50 bg-[var(--accent-primary)]/10 px-3 py-1">
                          <Calendar className="w-3 h-3 text-[var(--accent-primary)]" />
                          <span className="text-xs font-mono text-[var(--accent-primary)] uppercase tracking-wider">
                            {formatDate(competition.date)}
                          </span>
                        </div>
                      </div>

                      {/* Competition Card */}
                      <div className={`flex-1 ml-14 md:ml-0 ${index % 2 === 0 ? "md:pr-12" : "md:pl-12"}`}>
                        <Link href={`/competitions/${competition.slug}`} className="block group">
                          <div className="relative">
                            {/* Offset background */}
                            <div className="absolute inset-0 translate-x-2 translate-y-2 border border-[var(--accent-primary)]/20 bg-[var(--accent-primary)]/5 transition-transform group-hover:translate-x-3 group-hover:translate-y-3" />

                            <div className="relative border border-white/20 bg-black/80 backdrop-blur-sm transition-transform group-hover:-translate-x-1 group-hover:-translate-y-1">
                              {/* Header */}
                              <div className="border-b border-white/10 p-4 md:p-6">
                                <div className="flex items-start justify-between gap-4">
                                  <div>
                                    <h3 className="text-xl md:text-2xl font-black font-mono tracking-tight text-white group-hover:text-[var(--accent-primary)] transition-colors">
                                      {competition.name}
                                    </h3>
                                    <div className="flex flex-wrap gap-4 mt-2 text-xs font-mono text-[var(--text-secondary)] uppercase tracking-wider">
                                      <div className="flex items-center gap-1">
                                        <MapPin className="w-3 h-3 text-[var(--accent-primary)]" />
                                        <span>{competition.location}</span>
                                      </div>
                                      <div className="hidden md:flex items-center gap-1">
                                        <Calendar className="w-3 h-3 text-[var(--accent-primary)]" />
                                        <span>{formatDate(competition.date)}</span>
                                      </div>
                                    </div>
                                  </div>

                                  {/* Record Badge */}
                                  <div className="text-right">
                                    <div className="text-2xl md:text-3xl font-black font-mono tracking-tighter">
                                      {totalWins}-{totalLosses}
                                    </div>
                                    <div className="text-xs font-mono text-[var(--text-muted)] uppercase">
                                      Record
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* Results */}
                              <div className="p-4 md:p-6">
                                <div className="space-y-2">
                                  {competition.results.map((result) => (
                                    <div
                                      key={result.robotSlug}
                                      className="flex items-center justify-between border border-white/10 p-3 bg-black/30"
                                    >
                                      <div>
                                        <div className="font-mono font-bold text-sm text-white">
                                          {getRobotName(result.robotSlug)}
                                        </div>
                                        <div className="text-xs font-mono text-[var(--text-muted)]">
                                          {result.wins}W - {result.losses}L
                                        </div>
                                      </div>
                                      <div className="flex items-center gap-2">
                                        {result.placement.includes("1st") && (
                                          <Trophy className="w-4 h-4 text-yellow-500" />
                                        )}
                                        {result.placement.includes("2nd") && (
                                          <Trophy className="w-4 h-4 text-gray-400" />
                                        )}
                                        {result.placement.includes("3rd") && (
                                          <Trophy className="w-4 h-4 text-orange-600" />
                                        )}
                                        <span className="text-xs font-mono font-bold text-white uppercase">
                                          {result.placement}
                                        </span>
                                      </div>
                                    </div>
                                  ))}
                                </div>

                                {/* View Details Link */}
                                <div className="mt-4 flex items-center gap-2 text-sm font-mono text-[var(--accent-primary)] group-hover:gap-3 transition-all">
                                  <span className="uppercase tracking-wider">View Details</span>
                                  <ArrowRight className="w-4 h-4" />
                                </div>
                              </div>

                              {/* Event Number Badge */}
                              <div className="absolute -top-3 -right-3 bg-[var(--accent-primary)] px-2 py-1">
                                <span className="text-black font-mono text-xs font-bold">
                                  #{sortedCompetitions.length - index}
                                </span>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </div>

                      {/* Spacer for desktop alignment */}
                      <div className="hidden md:block flex-1" />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Project HADES Sponsor CTA */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Offset background */}
              <div className="absolute inset-0 translate-x-4 translate-y-4 border-2 border-[var(--accent-primary)]/30 bg-[var(--accent-primary)]/5" />

              <div className="relative">
                {/* Corner marks */}
                <div className="absolute -top-3 -left-3 w-8 h-8 border-t-4 border-l-4 border-[var(--accent-primary)]" />
                <div className="absolute -top-3 -right-3 w-8 h-8 border-t-4 border-r-4 border-[var(--accent-primary)]" />
                <div className="absolute -bottom-3 -left-3 w-8 h-8 border-b-4 border-l-4 border-[var(--accent-primary)]" />
                <div className="absolute -bottom-3 -right-3 w-8 h-8 border-b-4 border-r-4 border-[var(--accent-primary)]" />

                <div className="border-2 border-white/20 bg-black/80 backdrop-blur-sm p-8 md:p-12">
                  {/* Header with classified badge */}
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <AlertTriangle className="w-4 h-4 text-[var(--accent-primary)] animate-pulse" />
                        <span className="text-xs font-mono text-[var(--accent-primary)] uppercase tracking-[0.2em]">
                          Help Fund Our Next Build
                        </span>
                      </div>
                      <h3 className="text-2xl md:text-3xl lg:text-4xl font-black font-mono tracking-tighter text-white">
                        Project <span className="text-[var(--accent-primary)]">HADES</span>
                      </h3>
                    </div>
                    
                    {/* Funding badge */}
                    <div className="flex items-center gap-3 border border-[var(--accent-primary)]/50 bg-black/50 px-4 py-3">
                      <div className="text-center">
                        <div className="text-xl md:text-2xl font-mono font-black text-[var(--accent-primary)]">
                          RM 15,000
                        </div>
                        <div className="text-[10px] font-mono text-[var(--text-muted)] uppercase">
                          Funding Goal
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm md:text-base font-mono text-[var(--text-secondary)] leading-relaxed max-w-2xl mb-6">
                    Our most ambitious build yet—a featherweight vertical spinner designed to dominate the 2026 competition season. 
                    Your sponsorship puts your brand at the cutting edge of combat robotics.
                  </p>

                  {/* Quick specs */}
                  <div className="grid grid-cols-3 gap-3 mb-6 max-w-lg">
                    {[
                      { label: "Weight", value: "30 lbs" },
                      { label: "Weapon", value: "20K RPM" },
                      { label: "Debut", value: "2026" },
                    ].map((spec) => (
                      <div key={spec.label} className="border border-white/10 bg-black/30 p-2 text-center">
                        <div className="text-sm md:text-base font-mono font-bold text-white">
                          {spec.value}
                        </div>
                        <div className="text-[10px] font-mono text-[var(--text-muted)] uppercase">
                          {spec.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <a
                      href="mailto:sponsor@ragnarok.com?subject=Project%20HADES%20Sponsorship"
                      className="relative inline-block px-6 py-3 border-2 border-[var(--accent-primary)] font-mono uppercase tracking-wider text-[var(--accent-primary)] group overflow-hidden"
                    >
                      {/* Hover background */}
                      <span className="absolute inset-0 bg-[var(--accent-primary)] scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                      {/* Content */}
                      <span className="relative flex items-center justify-center gap-2 group-hover:text-black transition-colors">
                        <CircleDollarSign className="w-5 h-5" />
                        Become a Sponsor
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </a>
                    <Link
                      href="/"
                      className="relative inline-block px-6 py-3 border-2 border-white/30 font-mono uppercase tracking-wider text-white group overflow-hidden"
                    >
                      {/* Hover background */}
                      <span className="absolute inset-0 bg-[var(--accent-primary)] scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                      {/* Content */}
                      <span className="relative flex items-center justify-center gap-2 group-hover:text-black transition-colors">
                        Learn More
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </div>
  );
}
