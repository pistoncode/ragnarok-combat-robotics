"use client";

import { useEffect, useRef, useState } from "react";
import { competitions } from "@/lib/data/competitions";
import { robots } from "@/lib/data/robots";
import { Calendar, MapPin, Trophy, Play } from "lucide-react";

// Helper to get robot name from slug
const getRobotName = (slug: string) => {
  const robot = robots.find((r) => r.slug === slug);
  return robot?.name || slug;
};

export default function CompetitionHighlights() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Get the 3 most recent competitions
  const recentCompetitions = competitions.slice(0, 3);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header - Minimal */}
        <div
          className={`mb-12 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="flex items-center gap-4 mb-4">
            <div
              className={`h-px bg-[var(--accent-primary)] transition-all duration-700 delay-200 ${
                isVisible ? "w-12" : "w-0"
              }`}
            />
            <p className="text-sm font-mono text-[var(--text-secondary)] uppercase tracking-[0.2em]">
              Battle History
            </p>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black font-mono tracking-tighter">
            Competition Highlights
          </h2>
        </div>

        {/* Competition Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recentCompetitions.map((competition, index) => (
            <div
              key={competition.slug}
              className={`relative group transition-all duration-700 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-12"
              }`}
              style={{ transitionDelay: `${300 + index * 150}ms` }}
            >
              {/* Offset background element */}
              <div
                className={`absolute inset-0 border border-[var(--accent-primary)]/20 bg-[var(--accent-primary)]/5 transition-all duration-500 group-hover:translate-x-3 group-hover:translate-y-3 ${
                  isVisible
                    ? "translate-x-2 translate-y-2"
                    : "translate-x-0 translate-y-0"
                }`}
                style={{ transitionDelay: `${400 + index * 150}ms` }}
              />

              <div className="relative border border-white/20 bg-black/80 backdrop-blur-sm p-6 transition-transform group-hover:-translate-x-1 group-hover:-translate-y-1">
                {/* Video Placeholder */}
                <div
                  className={`relative aspect-video bg-[var(--bg-secondary)] mb-6 flex items-center justify-center overflow-hidden transition-all duration-500 ${
                    isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
                  }`}
                  style={{ transitionDelay: `${500 + index * 150}ms` }}
                >
                  {/* Grid overlay */}
                  <div
                    className="absolute inset-0 opacity-10"
                    style={{
                      backgroundImage: `
                        linear-gradient(to right, var(--accent-primary) 1px, transparent 1px),
                        linear-gradient(to bottom, var(--accent-primary) 1px, transparent 1px)
                      `,
                      backgroundSize: "20px 20px",
                    }}
                  />
                  <div className="text-center relative z-10">
                    <div className="w-12 h-12 mx-auto mb-2 border border-[var(--accent-primary)]/50 flex items-center justify-center group-hover:border-[var(--accent-primary)] group-hover:bg-[var(--accent-primary)]/10 transition-all">
                      <Play className="w-5 h-5 text-[var(--accent-primary)]" />
                    </div>
                    <p className="text-xs font-mono text-[var(--text-muted)] uppercase tracking-widest">
                      Highlights
                    </p>
                  </div>
                </div>

                {/* Event Name */}
                <h3
                  className={`text-xl font-black font-mono tracking-tight text-[var(--accent-primary)] mb-4 transition-all duration-500 ${
                    isVisible
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 -translate-x-4"
                  }`}
                  style={{ transitionDelay: `${550 + index * 150}ms` }}
                >
                  {competition.name}
                </h3>

                {/* Date and Location */}
                <div
                  className={`flex flex-wrap gap-4 mb-6 text-xs font-mono text-[var(--text-secondary)] uppercase tracking-wider transition-all duration-500 ${
                    isVisible
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 -translate-x-4"
                  }`}
                  style={{ transitionDelay: `${600 + index * 150}ms` }}
                >
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3 h-3 text-[var(--accent-primary)]" />
                    <span>{competition.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3 h-3 text-[var(--accent-primary)]" />
                    <span>{competition.location}</span>
                  </div>
                </div>

                {/* Results */}
                <div className="space-y-2">
                  {competition.results.map((result, resultIndex) => (
                    <div
                      key={result.robotSlug}
                      className={`flex items-center justify-between border border-white/10 p-3 bg-black/30 transition-all duration-500 ${
                        isVisible
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-2"
                      }`}
                      style={{
                        transitionDelay: `${
                          650 + index * 150 + resultIndex * 100
                        }ms`,
                      }}
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

                {/* Event number badge */}
                <div
                  className={`absolute -top-3 -right-3 bg-[var(--accent-primary)] px-2 py-1 transition-all duration-500 ${
                    isVisible
                      ? "opacity-100 scale-100"
                      : "opacity-0 scale-0"
                  }`}
                  style={{ transitionDelay: `${700 + index * 150}ms` }}
                >
                  <span className="text-black font-mono text-xs font-bold">
                    #{index + 1}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
