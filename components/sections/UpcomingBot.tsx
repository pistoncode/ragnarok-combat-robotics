"use client";

import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Zap,
  Shield,
  Cog,
  Target,
  AlertTriangle,
  Lock,
  Unlock,
  CircleDollarSign,
  User,
} from "lucide-react";
import { useFundingNotification } from "@/lib/contexts/FundingNotificationContext";

interface FundingMilestone {
  label: string;
  amount: string;
  funded: boolean;
  icon: React.ReactNode;
  description: string;
}

const fundingMilestones: FundingMilestone[] = [
  {
    label: "Frame & Chassis",
    amount: "RM 5,000",
    funded: false,
    icon: <Shield className="w-5 h-5" />,
    description: "7075 Aluminum with armor mounts",
  },
  {
    label: "Weapon System",
    amount: "RM 5,000",
    funded: false,
    icon: <Zap className="w-5 h-5" />,
    description: "Vertical spinner, hardened blade",
  },
  {
    label: "Drive Motors",
    amount: "RM 3,000",
    funded: false,
    icon: <Cog className="w-5 h-5" />,
    description: "Brushless with custom gearboxes",
  },
  {
    label: "Electronics",
    amount: "RM 2,000",
    funded: false,
    icon: <Target className="w-5 h-5" />,
    description: "ESCs, receiver, telemetry",
  },
];

const specs = [
  {
    label: "Weight Class",
    value: "Featherweight",
    stat: "30 lbs",
    details: "Full 30lb competition weight with modular armor system"
  },
  {
    label: "Weapon Type",
    value: "Vertical Spinner",
    stat: "20,000 RPM",
    details: "Hardened steel disc with optimized energy storage"
  },
  {
    label: "Tip Speed",
    value: "Tip Speed",
    stat: "250+ MPH",
    details: "Supersonic weapon tips for maximum damage"
  },
];

export default function UpcomingBot() {
  const [isVisible, setIsVisible] = useState(false);
  const [fundingVisible, setFundingVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const fundingRef = useRef<HTMLDivElement>(null);
  const { setIsUpcomingBotVisible } = useFundingNotification();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const fundingObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setFundingVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    // Observer for navbar notification - tracks when section is in view
    const navbarNotificationObserver = new IntersectionObserver(
      (entries) => {
        setIsUpcomingBotVisible(entries[0].isIntersecting);
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
      navbarNotificationObserver.observe(sectionRef.current);
    }

    if (fundingRef.current) {
      fundingObserver.observe(fundingRef.current);
    }

    return () => {
      observer.disconnect();
      fundingObserver.disconnect();
      navbarNotificationObserver.disconnect();
    };
  }, [setIsUpcomingBotVisible]);

  const totalFunding = fundingMilestones.reduce((acc, m) => {
    const amount = parseInt(m.amount.replace(/[RM$,\s]/g, ""));
    return acc + amount;
  }, 0);

  const fundedAmount = fundingMilestones.reduce((acc, m) => {
    if (m.funded) {
      const amount = parseInt(m.amount.replace(/[RM$,\s]/g, ""));
      return acc + amount;
    }
    return acc;
  }, 0);

  const fundingPercentage = Math.round((fundedAmount / totalFunding) * 100);

  return (
    <section
      id="upcoming-bot"
      ref={sectionRef}
      className="py-16 md:py-24 px-4 overflow-hidden relative"
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className={`absolute inset-0 bg-gradient-to-b from-transparent via-[var(--accent-primary)]/2 to-transparent transition-opacity duration-1000 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>

      <div className="max-w-7xl mx-auto relative">
        {/* Header Row */}
        <div
          className={`mb-6 md:mb-8 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="flex items-center gap-4 mb-3">
            <div
              className={`h-px bg-[var(--accent-primary)] transition-all duration-700 delay-200 ${
                isVisible ? "w-12" : "w-0"
              }`}
            />
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-[var(--text-secondary)] animate-pulse" />
              <p className="text-sm font-mono text-[var(--text-secondary)] uppercase tracking-[0.2em]">
                Upcoming Project
              </p>
            </div>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black font-mono tracking-tighter">
            Project{" "}
            <span className="text-[var(--accent-primary)]">HADES</span>
          </h2>
          <p className="mt-2 md:mt-3 text-sm md:text-base font-mono text-[var(--text-secondary)] max-w-2xl">
            Our most ambitious build yet. A featherweight destroyer designed to
            dominate the 2026 competition season.
          </p>
        </div>

        {/* Main Layout: Image+Specs on left, Funding on right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Main Image + Specs (spans 7 cols) */}
          <div
            className={`lg:col-span-7 transition-all duration-1000 delay-300 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-12"
            }`}
          >
            <div className="relative h-full">
              {/* Offset background */}
              <div
                className={`absolute inset-0 border-2 border-white/20 bg-white/5 transition-all duration-700 delay-500 ${
                  isVisible
                    ? "translate-x-3 translate-y-3"
                    : "translate-x-0 translate-y-0"
                }`}
              />

              <div className="relative border-2 border-white/30 bg-black h-full flex flex-col">
                {/* Corner brackets */}
                <div
                  className={`absolute -top-2 -left-2 w-5 h-5 border-t-2 border-l-2 border-white/40 transition-all duration-500 delay-700 ${
                    isVisible ? "opacity-100 scale-100" : "opacity-0 scale-0"
                  }`}
                />
                <div
                  className={`absolute -top-2 -right-2 w-5 h-5 border-t-2 border-r-2 border-white/40 transition-all duration-500 delay-800 ${
                    isVisible ? "opacity-100 scale-100" : "opacity-0 scale-0"
                  }`}
                />
                <div
                  className={`absolute -bottom-2 -left-2 w-5 h-5 border-b-2 border-l-2 border-white/40 transition-all duration-500 delay-900 ${
                    isVisible ? "opacity-100 scale-100" : "opacity-0 scale-0"
                  }`}
                />
                <div
                  className={`absolute -bottom-2 -right-2 w-5 h-5 border-b-2 border-r-2 border-white/40 transition-all duration-500 delay-1000 ${
                    isVisible ? "opacity-100 scale-100" : "opacity-0 scale-0"
                  }`}
                />

                {/* Image container - Main focus - flex-1 to fill remaining height */}
                <div className="relative flex-1 min-h-[250px] md:min-h-[300px] bg-[var(--bg-secondary)] overflow-hidden">
                  {/* Grid overlay */}
                  <div
                    className="absolute inset-0 opacity-10"
                    style={{
                      backgroundImage: `
                        linear-gradient(to right, rgba(255,255,255,0.3) 1px, transparent 1px),
                        linear-gradient(to bottom, rgba(255,255,255,0.3) 1px, transparent 1px)
                      `,
                      backgroundSize: "40px 40px",
                    }}
                  />

                  {/* Smoke effects */}
                  <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
                    <div
                      className={`absolute bottom-0 left-0 right-0 h-1/2 transition-all duration-[2000ms] ${
                        isVisible ? "opacity-40" : "opacity-0"
                      }`}
                      style={{
                        background:
                          "linear-gradient(to top, rgba(255,255,255,0.1) 0%, transparent 100%)",
                        filter: "blur(20px)",
                        animation: isVisible
                          ? "smokeRise 8s ease-in-out infinite"
                          : "none",
                      }}
                    />
                    <div
                      className={`absolute bottom-0 left-1/4 right-1/4 h-2/3 transition-all duration-[2500ms] delay-500 ${
                        isVisible ? "opacity-40" : "opacity-0"
                      }`}
                      style={{
                        background:
                          "radial-gradient(ellipse at bottom, rgba(255,255,255,0.15) 0%, transparent 70%)",
                        filter: "blur(30px)",
                        animation: isVisible
                          ? "smokeRise 10s ease-in-out infinite reverse"
                          : "none",
                      }}
                    />
                  </div>

                  {/* Placeholder */}
                  <div
                    className={`absolute inset-0 flex items-center justify-center z-20 transition-all duration-1000 delay-500 ${
                      isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"
                    }`}
                  >
                    <div className="text-center">
                      <div className="w-24 h-24 md:w-32 md:h-32 mx-auto mb-4 border-2 border-[var(--accent-primary)]/50 bg-black/50 flex items-center justify-center relative">
                        <div className="absolute inset-0 border-2 border-[var(--accent-primary)] animate-ping opacity-40" />
                        <span className="text-[var(--accent-primary)] font-mono text-4xl md:text-5xl font-black">
                          ?
                        </span>
                      </div>
                      <p className="text-[var(--text-muted)] font-mono text-xs md:text-sm uppercase tracking-[0.3em]">
                        Design In Progress
                      </p>
                      <p className="text-[var(--text-secondary)] font-mono text-sm md:text-base mt-2">
                        [ REVEAL COMING SOON ]
                      </p>
                    </div>
                  </div>

                  {/* Scanline */}
                  <div
                    className="absolute inset-0 pointer-events-none z-30 opacity-10"
                    style={{
                      backgroundImage:
                        "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)",
                    }}
                  />

                  {/* Badges and Stats */}
                  <div className="absolute top-2 left-2 sm:top-3 sm:left-3 z-40 flex flex-col gap-2 sm:gap-3 max-w-[calc(100%-1rem)] sm:max-w-none">
                    <div
                      className={`transition-all duration-500 delay-1000 ${
                        isVisible
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 -translate-y-4"
                      }`}
                    >
                      <div className="border border-white/30 bg-black/80 px-2 py-1 sm:px-2.5 sm:py-1.5 flex items-center gap-1.5 sm:gap-2">
                        <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-yellow-500 rounded-full animate-pulse flex-shrink-0" />
                        <span className="text-[var(--text-secondary)] font-mono text-[10px] sm:text-xs font-bold uppercase tracking-wider">
                          2026 Build
                        </span>
                      </div>
                    </div>

                    {/* Stats with progress bars - horizontal compact layout */}
                    <div
                      className={`bg-black/80 border border-white/20 p-2 sm:p-3 transition-all duration-500 delay-1200 ${
                        isVisible
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 -translate-y-4"
                      }`}
                    >
                      <div className="flex flex-col gap-1.5 sm:gap-2">
                        {specs.map((spec, index) => {
                          // Calculate progress percentage for visual effect
                          let progress = 0;
                          if (spec.stat.includes("30")) progress = 100; // 30 lbs = 100% of weight class
                          else if (spec.stat.includes("20,000")) progress = 100; // 20K RPM = max
                          else if (spec.stat.includes("250+")) progress = 100; // 250+ MPH = max
                          
                          const statDelay = 1200 + index * 150;
                          const shouldAnimate = isVisible;
                          
                          return (
                            <div
                              key={spec.label}
                              className={`flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-3 transition-all duration-700 ${
                                shouldAnimate
                                  ? "opacity-100 translate-x-0"
                                  : "opacity-0 -translate-x-8"
                              }`}
                              style={{ transitionDelay: `${statDelay}ms` }}
                            >
                              {/* Progress bar with number */}
                              <div className="relative h-6 sm:h-6 flex-1 w-full sm:min-w-[120px] bg-white/10 border border-white/20 overflow-hidden group">
                                <div
                                  className={`absolute inset-y-0 left-0 bg-[var(--accent-primary)] transition-all duration-1000 ease-out ${
                                    shouldAnimate ? "" : "!w-0"
                                  }`}
                                  style={{
                                    width: shouldAnimate ? `${progress}%` : 0,
                                    transitionDelay: `${statDelay + 200}ms`,
                                  }}
                                />
                                {/* Shine effect */}
                                <div
                                  className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-1000 ${
                                    shouldAnimate ? "translate-x-full" : "-translate-x-full"
                                  }`}
                                  style={{
                                    transitionDelay: `${statDelay + 800}ms`,
                                  }}
                                />
                                <div className="absolute inset-0 flex items-center justify-center px-1.5 sm:px-2.5">
                                  <span
                                    className={`text-xs sm:text-sm font-mono font-black text-white relative z-10 transition-all duration-500 ${
                                      shouldAnimate
                                        ? "opacity-100 scale-100"
                                        : "opacity-0 scale-95"
                                    }`}
                                    style={{ transitionDelay: `${statDelay + 300}ms` }}
                                  >
                                    {spec.stat}
                                  </span>
                                </div>
                              </div>
                              {/* Label */}
                              <div
                                className={`text-[10px] sm:text-xs font-mono text-[var(--text-secondary)] uppercase tracking-wider transition-all duration-500 ${
                                  shouldAnimate
                                    ? "opacity-100 translate-x-0"
                                    : "opacity-0 translate-x-4"
                                }`}
                                style={{ transitionDelay: `${statDelay + 400}ms` }}
                              >
                                {spec.value}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  <div className="absolute top-2 right-2 sm:top-3 sm:right-3 z-40 flex flex-col gap-2 sm:gap-3">
                    <div
                      className={`transition-all duration-500 delay-1100 ${
                        isVisible
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 -translate-y-4"
                      }`}
                    >
                      <div className="border border-white/30 bg-black/80 px-2 py-1 sm:px-2.5 sm:py-1.5 flex items-center gap-1.5 sm:gap-2">
                        <Lock className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[var(--text-secondary)] flex-shrink-0" />
                        <span className="text-[var(--text-secondary)] font-mono text-[10px] sm:text-xs font-bold uppercase tracking-wider">
                          Classified
                        </span>
                      </div>
                    </div>

                    {/* Pilot Box */}
                    <div
                      className={`border border-white/30 bg-black/80 px-2 py-1 sm:px-2.5 sm:py-1.5 transition-all duration-500 delay-1300 ${
                        isVisible
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 -translate-y-4"
                      }`}
                    >
                      <div className="flex items-center gap-1.5 sm:gap-2">
                        <User className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[var(--text-secondary)] flex-shrink-0" />
                        <div className="flex flex-col min-w-0">
                          <span className="text-[7px] sm:text-[8px] font-mono text-[var(--text-muted)] uppercase tracking-wider">
                            Pilot
                          </span>
                          <span className="text-[10px] sm:text-xs font-mono font-bold text-[var(--text-secondary)] leading-tight truncate">
                            Fikri H.
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Funding Info (spans 5 cols) */}
          <div
            ref={fundingRef}
            className={`lg:col-span-5 transition-all duration-1000 delay-500 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-12"
            }`}
          >
            <div className="h-full flex flex-col gap-4">
              {/* Funding Summary Box - Prominent */}
              <div className="bg-black border-2 border-white/30 p-4 md:p-5">
                <div className="flex items-center justify-between gap-4">
                  <div className="text-center flex-1">
                    <div className="text-3xl md:text-4xl font-mono font-black text-[var(--accent-primary)]">
                      {fundingPercentage}%
                    </div>
                    <div className="text-[10px] md:text-xs font-mono text-[var(--text-muted)] uppercase mt-1">
                      Funded
                    </div>
                  </div>
                  <div className="w-px h-12 bg-white/20" />
                  <div className="text-center flex-1">
                    <div className="text-2xl md:text-3xl font-mono font-black text-white">
                      RM {(totalFunding - fundedAmount).toLocaleString()}
                    </div>
                    <div className="text-[10px] md:text-xs font-mono text-[var(--text-muted)] uppercase mt-1">
                      Still Needed
                    </div>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="mt-4">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-mono text-[var(--text-muted)]">
                      RM {fundedAmount.toLocaleString()} raised
                    </span>
                    <span className="text-[10px] font-mono text-white">
                      RM {totalFunding.toLocaleString()} goal
                    </span>
                  </div>
                  <div className="relative h-2 bg-white/10 border border-white/20 overflow-hidden">
                    <div
                      className={`absolute inset-y-0 left-0 bg-[var(--accent-primary)] transition-all duration-1000 delay-700 ${
                        fundingVisible ? "" : "!w-0"
                      }`}
                      style={{ width: fundingVisible ? `${fundingPercentage}%` : 0 }}
                    />
                    <div
                      className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 ${
                        fundingVisible ? "translate-x-full" : "-translate-x-full"
                      }`}
                      style={{
                        animation: fundingVisible
                          ? "shine 2s ease-in-out infinite"
                          : "none",
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Funding Milestones */}
              <div className="flex-1">
                <h3 className="text-base md:text-lg font-bold font-mono tracking-tight mb-4 flex items-center gap-2">
                  <CircleDollarSign className="w-5 h-5 text-[var(--text-secondary)]" />
                  Funding Breakdown
                </h3>

                <div className="space-y-3">
                  {fundingMilestones.map((milestone, index) => (
                    <div
                      key={milestone.label}
                      className={`relative border transition-all duration-500 ${
                        milestone.funded
                          ? "border-white/30 bg-white/5"
                          : "border-white/10 bg-black/30"
                      } ${
                        fundingVisible
                          ? "opacity-100 translate-x-0"
                          : "opacity-0 translate-x-8"
                      }`}
                      style={{ transitionDelay: `${800 + index * 100}ms` }}
                    >
                      <div className="p-3 md:p-4">
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex items-center gap-3 flex-1 min-w-0">
                            <div
                              className={`w-9 h-9 md:w-10 md:h-10 border-2 flex items-center justify-center flex-shrink-0 ${
                                milestone.funded
                                  ? "border-white/30 bg-white/10 text-white"
                                  : "border-white/20 text-[var(--text-muted)]"
                              }`}
                            >
                              {milestone.icon}
                            </div>
                            <div className="min-w-0">
                              <h4 className="font-mono font-bold text-sm md:text-base text-white">
                                {milestone.label}
                              </h4>
                              <p className="text-xs md:text-sm font-mono text-[var(--text-muted)] truncate">
                                {milestone.description}
                              </p>
                            </div>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <div className="font-mono font-bold text-sm md:text-base text-white">
                              {milestone.amount}
                            </div>
                            <div className="flex items-center justify-end gap-1.5">
                              {milestone.funded ? (
                                <>
                                  <Unlock className="w-3 h-3 text-white" />
                                  <span className="text-xs font-mono text-white">
                                    Funded
                                  </span>
                                </>
                              ) : (
                                <>
                                  <Lock className="w-3 h-3 text-[var(--text-muted)]" />
                                  <span className="text-xs font-mono text-[var(--text-muted)]">
                                    Needed
                                  </span>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      {!milestone.funded && (
                        <div className="absolute top-0 right-0 w-0 h-0 border-t-[16px] border-t-white/40 border-l-[16px] border-l-transparent">
                          <AlertTriangle className="absolute -top-[14px] right-[1px] w-2.5 h-2.5 text-black" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="relative">
                <div
                  className={`absolute inset-0 border border-white/20 bg-white/5 transition-all duration-500 delay-800 ${
                    fundingVisible
                      ? "translate-x-2 translate-y-2"
                      : "translate-x-0 translate-y-0"
                  }`}
                />

                <div className="relative border-2 border-white/30 bg-black p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 bg-[var(--accent-primary)] animate-pulse" />
                    <h4 className="font-mono font-bold text-xs text-white uppercase tracking-wider">
                      Become a Sponsor
                    </h4>
                  </div>

                  <p className="text-[10px] font-mono text-[var(--text-secondary)] mb-3 leading-relaxed">
                    Help us build the next generation of combat robotics excellence.
                  </p>

                  <a
                    href="mailto:sponsor@ragnarok.com?subject=Project%20HADES%20Sponsorship"
                    className="relative inline-block w-full px-3 py-2 border-2 border-[var(--accent-primary)] font-mono text-xs uppercase tracking-wider text-[var(--accent-primary)] group overflow-hidden"
                  >
                    {/* Hover background */}
                    <span className="absolute inset-0 bg-[var(--accent-primary)] scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                    {/* Content */}
                    <span className="relative flex items-center justify-center gap-1.5 group-hover:text-black transition-colors">
                      <CircleDollarSign className="w-4 h-4" />
                      Contact Us to Sponsor
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CSS for smoke animation */}
      <style jsx>{`
        @keyframes smokeRise {
          0%,
          100% {
            transform: translateY(0) scale(1);
            opacity: 0.4;
          }
          50% {
            transform: translateY(-20px) scale(1.1);
            opacity: 0.6;
          }
        }

        @keyframes shine {
          0% {
            transform: translateX(-100%);
          }
          50%,
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </section>
  );
}
