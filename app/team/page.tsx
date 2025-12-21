"use client";

import { useEffect, useRef, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import GridBackground from "@/components/layout/GridBackground";
import { Mail, ArrowRight } from "lucide-react";
import { teamMembers, milestones, TeamMember, Milestone } from "@/lib/data/team";
import Image from "next/image";

export default function TeamPage() {
  const timelineRef = useRef<HTMLElement | null>(null);
  const timelineLineRef = useRef<HTMLDivElement | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!timelineRef.current || !timelineLineRef.current) return;

      const timeline = timelineRef.current;
      const rect = timeline.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const scrollY = window.scrollY;

      const timelineTop = rect.top + scrollY;
      const timelineHeight = rect.height;
      const timelineBottom = timelineTop + timelineHeight;
      const viewportCenter = scrollY + windowHeight / 2;

      let progress = 0;

      if (viewportCenter < timelineTop) {
        progress = 0;
      } else if (viewportCenter > timelineBottom) {
        progress = 1;
      } else {
        const distanceFromTop = viewportCenter - timelineTop;
        progress = distanceFromTop / timelineHeight;
      }

      progress = Math.min(1, Math.max(0, progress));

      // Update directly via ref for instant, smooth response (like header progress bar)
      timelineLineRef.current.style.transform = `scaleY(${progress})`;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <>
      <GridBackground />
      <Navbar />

      <main className="relative z-10 min-h-screen pt-24 pb-16 bg-[var(--bg-primary)]">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-4xl">
            {/* Section Label */}
            <div
              className={`flex items-center gap-4 mb-6 transition-all duration-500 ${
                mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <div className="w-12 h-px bg-[var(--accent-primary)]" />
              <p className="text-sm font-mono text-[var(--text-secondary)] uppercase tracking-[0.2em]">
                The Crew
              </p>
            </div>

            {/* Main Title */}
            <div
              className={`relative mb-8 transition-all duration-700 delay-100 ${
                mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <div className="absolute -top-2 -left-2 w-6 h-6 border-t-4 border-l-4 border-[var(--accent-primary)]" />
              <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-4 border-l-4 border-[var(--accent-primary)]" />

              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black font-mono leading-[0.9] tracking-tighter pl-4">
                Meet the
                <br />
                <span className="text-[var(--accent-primary)]">Team</span>
              </h1>
            </div>

            {/* Description */}
            <div
              className={`transition-all duration-500 delay-300 ${
                mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <p className="text-lg md:text-xl font-mono text-[var(--text-secondary)] max-w-2xl leading-relaxed">
                We're a passionate group of engineers, makers, and competitors
                united by our love of combat robotics.
              </p>
            </div>

            {/* Stats */}
            <div
              className={`flex items-center gap-8 mt-8 transition-all duration-500 delay-500 ${
                mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <div className="border border-white/20 bg-black/80 backdrop-blur-sm px-6 py-4">
                <span className="text-4xl md:text-5xl font-black font-mono text-[var(--accent-primary)]">
                  6+
                </span>
                <span className="text-sm font-mono text-[var(--text-secondary)] uppercase tracking-wider ml-3">
                  Years
                </span>
              </div>
              <div className="border border-white/20 bg-black/80 backdrop-blur-sm px-6 py-4">
                <span className="text-4xl md:text-5xl font-black font-mono text-[var(--accent-primary)]">
                  {teamMembers.length}
                </span>
                <span className="text-sm font-mono text-[var(--text-secondary)] uppercase tracking-wider ml-3">
                  Members
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Team Members Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Section Header */}
          <div className="mb-12">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-px bg-[var(--accent-primary)]" />
              <p className="text-sm font-mono text-[var(--text-secondary)] uppercase tracking-[0.2em]">
                Our Engineers
              </p>
            </div>
            <h2 className="text-4xl md:text-5xl font-black font-mono tracking-tighter">
              The Builders
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {teamMembers.map((member: TeamMember, index: number) => (
              <div
                key={member.id}
                className="relative group h-full"
                style={{
                  transitionDelay: `${index * 100}ms`,
                }}
              >
                {/* Offset background */}
                <div className="absolute inset-0 translate-x-2 translate-y-2 border border-[var(--accent-primary)]/20 bg-[var(--accent-primary)]/5 transition-transform group-hover:translate-x-3 group-hover:translate-y-3" />

                <div className="relative border border-white/20 bg-black/80 backdrop-blur-sm overflow-hidden transition-transform group-hover:-translate-x-1 group-hover:-translate-y-1 h-full flex flex-col">
                  {/* Image */}
                  <div className="relative aspect-square overflow-hidden flex-shrink-0">
                    {member.imageUrl ? (
                      <Image
                        src={member.imageUrl}
                        alt={member.name}
                        fill
                        className="object-cover relative z-10"
                      />
                    ) : (
                      <div className="w-full h-full bg-[var(--bg-secondary)] flex items-center justify-center">
                        <div className="text-center">
                          <div className="w-20 h-20 mx-auto mb-3 border-2 border-[var(--accent-primary)]/50 flex items-center justify-center">
                            <span className="text-[var(--accent-primary)] font-mono text-3xl font-bold">
                              {member.name.charAt(0)}
                            </span>
                          </div>
                          <p className="text-[var(--text-muted)] font-mono text-xs uppercase tracking-[0.2em]">
                            Photo
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Role badge */}
                    <div className="absolute top-3 left-3 bg-[var(--accent-primary)] px-2 py-1 z-20">
                      <span className="text-black font-mono text-xs font-bold uppercase tracking-wider">
                        {member.role.split(" ")[0]}
                      </span>
                    </div>
                  </div>

                  {/* Member Info */}
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-xl font-black font-mono tracking-tight text-white mb-1">
                      {member.name}
                    </h3>
                    <p className="text-sm font-mono text-[var(--accent-primary)] uppercase tracking-wider mb-4">
                      {member.role}
                    </p>
                    <p className="text-sm font-mono text-[var(--text-secondary)] leading-relaxed flex-1">
                      {member.bio}
                    </p>
                  </div>

                  {/* Number badge */}
                  <div className="absolute bottom-4 right-4 text-[var(--accent-primary)]/10 font-mono text-6xl font-black">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Timeline Section */}
        <section
          ref={timelineRef}
          className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
        >
          {/* Section Header */}
          <div className="mb-16">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-px bg-[var(--accent-primary)]" />
              <p className="text-sm font-mono text-[var(--text-secondary)] uppercase tracking-[0.2em]">
                History
              </p>
            </div>
            <h2 className="text-4xl md:text-5xl font-black font-mono tracking-tighter">
              Our Journey
            </h2>
          </div>

          <div className="relative">
            {/* Timeline Line Background */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-white/10 md:-translate-x-1/2" />

            {/* Timeline Line Filled - using scaleY transform for smooth linear tracking */}
            <div
              ref={timelineLineRef}
              className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-[var(--accent-primary)] md:-translate-x-1/2 origin-top"
              style={{ transform: "scaleY(0)" }}
            />

            {/* Timeline Items */}
            <div className="space-y-16">
              {milestones.map((milestone: Milestone, index: number) => (
                <div
                  key={milestone.id}
                  className={`relative flex flex-col md:flex-row gap-8 ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-8 md:left-1/2 w-4 h-4 bg-[var(--accent-primary)] md:-translate-x-1/2 z-10">
                    <div className="absolute inset-0 bg-[var(--accent-primary)] animate-ping opacity-20" />
                  </div>

                  {/* Content */}
                  <div
                    className={`flex-1 pl-20 md:pl-0 ${
                      index % 2 === 0 ? "md:pr-16 md:text-right" : "md:pl-16"
                    }`}
                  >
                    <div className="relative group">
                      {/* Offset background */}
                      <div
                        className={`absolute inset-0 border border-[var(--accent-primary)]/20 bg-[var(--accent-primary)]/5 transition-transform ${
                          index % 2 === 0
                            ? "-translate-x-2 translate-y-2 group-hover:-translate-x-3 group-hover:translate-y-3"
                            : "translate-x-2 translate-y-2 group-hover:translate-x-3 group-hover:translate-y-3"
                        }`}
                      />

                      <div className="relative border border-white/20 bg-black/80 backdrop-blur-sm p-6 transition-transform group-hover:-translate-y-1">
                        {/* Year */}
                        <div
                          className={`mb-4 ${
                            index % 2 === 0 ? "md:text-right" : ""
                          }`}
                        >
                          <span className="text-4xl font-black font-mono text-[var(--accent-primary)]">
                            {milestone.year}
                          </span>
                        </div>

                        <h3
                          className={`text-xl font-bold font-mono tracking-tight text-white mb-2 ${
                            index % 2 === 0 ? "md:text-right" : ""
                          }`}
                        >
                          {milestone.title}
                        </h3>

                        <p
                          className={`font-mono text-[var(--text-secondary)] leading-relaxed ${
                            index % 2 === 0 ? "md:text-right" : ""
                          }`}
                        >
                          {milestone.description}
                        </p>

                        {/* Index badge */}
                        <div
                          className={`absolute top-4 text-[var(--accent-primary)]/10 font-mono text-5xl font-black ${
                            index % 2 === 0 ? "left-4" : "right-4"
                          }`}
                        >
                          {String(index + 1).padStart(2, "0")}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Spacer */}
                  <div className="hidden md:block flex-1" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="relative max-w-3xl mx-auto">
            {/* Offset background */}
            <div className="absolute inset-0 translate-x-4 translate-y-4 border-2 border-[var(--accent-primary)]/30 bg-[var(--accent-primary)]/5" />

            <div className="relative">
              {/* Corner marks */}
              <div className="absolute -top-3 -left-3 w-8 h-8 border-t-4 border-l-4 border-[var(--accent-primary)]" />
              <div className="absolute -top-3 -right-3 w-8 h-8 border-t-4 border-r-4 border-[var(--accent-primary)]" />
              <div className="absolute -bottom-3 -left-3 w-8 h-8 border-b-4 border-l-4 border-[var(--accent-primary)]" />
              <div className="absolute -bottom-3 -right-3 w-8 h-8 border-b-4 border-r-4 border-[var(--accent-primary)]" />

              <div className="border-2 border-white/20 bg-black/80 backdrop-blur-sm p-10 md:p-16 text-center">
                <h3 className="text-3xl md:text-4xl font-black font-mono tracking-tighter text-white mb-4">
                  Join Our Team
                </h3>

                <div className="flex items-center justify-center gap-4 mb-6">
                  <div className="w-8 h-px bg-[var(--accent-primary)]" />
                  <p className="text-sm font-mono text-[var(--text-secondary)] uppercase tracking-[0.2em]">
                    Build with us
                  </p>
                  <div className="w-8 h-px bg-[var(--accent-primary)]" />
                </div>

                <p className="text-base md:text-lg font-mono text-[var(--text-secondary)] leading-relaxed max-w-xl mx-auto mb-8">
                  Interested in joining a championship-winning combat robotics
                  team? We're always looking for passionate engineers.
                </p>

                <div className="mb-8">
                  <a
                    href="mailto:join@ragnarok.com"
                    className="text-2xl md:text-3xl font-mono font-black text-[var(--accent-primary)] hover:text-white transition-colors"
                  >
                    join@ragnarok.com
                  </a>
                </div>

                <a 
                  href="mailto:join@ragnarok.com" 
                  className="relative inline-block px-8 py-3 border-2 border-[var(--accent-primary)] font-mono uppercase tracking-wider text-[var(--accent-primary)] group overflow-hidden"
                >
                  {/* Hover background */}
                  <span className="absolute inset-0 bg-[var(--accent-primary)] scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                  {/* Content */}
                  <span className="relative flex items-center justify-center gap-2 group-hover:text-black transition-colors">
                    <Mail className="w-5 h-5" />
                    Get In Touch
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </a>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
