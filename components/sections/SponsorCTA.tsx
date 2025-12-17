"use client";

import { useEffect, useRef, useState } from "react";
import { Eye, Users, Globe, Zap, ArrowRight } from "lucide-react";

interface ValueProp {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const valueProps: ValueProp[] = [
  {
    icon: <Eye className="w-5 h-5" />,
    title: "Arena Exposure",
    description:
      "Your logo on robots seen by thousands of spectators at competitions nationwide",
  },
  {
    icon: <Users className="w-5 h-5" />,
    title: "Social Reach",
    description:
      "Engaged community of engineering enthusiasts following our journey online",
  },
  {
    icon: <Globe className="w-5 h-5" />,
    title: "Event Presence",
    description:
      "Represent your brand at premier competitions and engineering showcases",
  },
  {
    icon: <Zap className="w-5 h-5" />,
    title: "Engineering Excellence",
    description:
      "Associate with cutting-edge innovation and precision engineering",
  },
];

export default function SponsorCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const [ctaVisible, setCtaVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

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

    const ctaObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setCtaVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    if (ctaRef.current) {
      ctaObserver.observe(ctaRef.current);
    }

    return () => {
      observer.disconnect();
      ctaObserver.disconnect();
    };
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
              Partnership
            </p>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black font-mono tracking-tighter">
            Why Partner With Us?
          </h2>
        </div>

        {/* Value Props Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {valueProps.map((prop, index) => (
            <div
              key={prop.title}
              className={`relative group transition-all duration-700 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-12"
              }`}
              style={{ transitionDelay: `${300 + index * 100}ms` }}
            >
              {/* Offset background */}
              <div
                className={`absolute inset-0 border border-[var(--accent-primary)]/20 bg-[var(--accent-primary)]/5 transition-all duration-500 group-hover:translate-x-3 group-hover:translate-y-3 ${
                  isVisible
                    ? "translate-x-2 translate-y-2"
                    : "translate-x-0 translate-y-0"
                }`}
                style={{ transitionDelay: `${400 + index * 100}ms` }}
              />

              <div className="relative border border-white/20 bg-black/80 backdrop-blur-sm p-6 h-full transition-transform group-hover:-translate-x-1 group-hover:-translate-y-1">
                {/* Icon */}
                <div
                  className={`w-10 h-10 border border-[var(--accent-primary)]/50 flex items-center justify-center mb-4 text-[var(--accent-primary)] group-hover:border-[var(--accent-primary)] group-hover:bg-[var(--accent-primary)]/10 transition-all duration-500 ${
                    isVisible ? "opacity-100 scale-100" : "opacity-0 scale-0"
                  }`}
                  style={{ transitionDelay: `${500 + index * 100}ms` }}
                >
                  {prop.icon}
                </div>

                {/* Title */}
                <h3
                  className={`text-lg font-bold font-mono tracking-tight text-white mb-2 transition-all duration-500 ${
                    isVisible
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 -translate-x-4"
                  }`}
                  style={{ transitionDelay: `${550 + index * 100}ms` }}
                >
                  {prop.title}
                </h3>

                {/* Description */}
                <p
                  className={`text-sm font-mono text-[var(--text-secondary)] leading-relaxed transition-all duration-500 ${
                    isVisible
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 -translate-x-4"
                  }`}
                  style={{ transitionDelay: `${600 + index * 100}ms` }}
                >
                  {prop.description}
                </p>

                {/* Number badge */}
                <div
                  className={`absolute top-4 right-4 text-[var(--accent-primary)]/20 font-mono text-4xl font-black transition-all duration-500 ${
                    isVisible ? "opacity-100" : "opacity-0"
                  }`}
                  style={{ transitionDelay: `${650 + index * 100}ms` }}
                >
                  {String(index + 1).padStart(2, "0")}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div
          ref={ctaRef}
          className={`relative max-w-4xl mx-auto transition-all duration-1000 ${
            ctaVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
          }`}
        >
          {/* Offset background */}
          <div
            className={`absolute inset-0 border-2 border-[var(--accent-primary)]/30 bg-[var(--accent-primary)]/5 transition-all duration-700 delay-200 ${
              ctaVisible
                ? "translate-x-4 translate-y-4"
                : "translate-x-0 translate-y-0"
            }`}
          />

          <div className="relative">
            {/* Corner marks */}
            <div
              className={`absolute -top-3 -left-3 w-8 h-8 border-t-4 border-l-4 border-[var(--accent-primary)] transition-all duration-500 delay-300 ${
                ctaVisible ? "opacity-100 scale-100" : "opacity-0 scale-0"
              }`}
            />
            <div
              className={`absolute -top-3 -right-3 w-8 h-8 border-t-4 border-r-4 border-[var(--accent-primary)] transition-all duration-500 delay-400 ${
                ctaVisible ? "opacity-100 scale-100" : "opacity-0 scale-0"
              }`}
            />
            <div
              className={`absolute -bottom-3 -left-3 w-8 h-8 border-b-4 border-l-4 border-[var(--accent-primary)] transition-all duration-500 delay-500 ${
                ctaVisible ? "opacity-100 scale-100" : "opacity-0 scale-0"
              }`}
            />
            <div
              className={`absolute -bottom-3 -right-3 w-8 h-8 border-b-4 border-r-4 border-[var(--accent-primary)] transition-all duration-500 delay-600 ${
                ctaVisible ? "opacity-100 scale-100" : "opacity-0 scale-0"
              }`}
            />

            <div className="border-2 border-white/20 bg-black/80 backdrop-blur-sm p-10 md:p-16 text-center">
              {/* Heading */}
              <h3
                className={`text-3xl md:text-4xl lg:text-5xl font-black font-mono tracking-tighter text-white mb-4 transition-all duration-700 delay-300 ${
                  ctaVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
              >
                Ready to Partner?
              </h3>

              {/* Subtitle */}
              <div
                className={`flex items-center justify-center gap-4 mb-6 transition-all duration-700 delay-400 ${
                  ctaVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
              >
                <div
                  className={`h-px bg-[var(--accent-primary)] transition-all duration-500 delay-500 ${
                    ctaVisible ? "w-8" : "w-0"
                  }`}
                />
                <p className="text-sm font-mono text-[var(--text-secondary)] uppercase tracking-[0.2em]">
                  Let's build something great
                </p>
                <div
                  className={`h-px bg-[var(--accent-primary)] transition-all duration-500 delay-500 ${
                    ctaVisible ? "w-8" : "w-0"
                  }`}
                />
              </div>

              {/* Description */}
              <p
                className={`text-base md:text-lg font-mono text-[var(--text-secondary)] leading-relaxed max-w-xl mx-auto mb-8 transition-all duration-700 delay-500 ${
                  ctaVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
              >
                Let's discuss how we can showcase your brand at the cutting edge
                of combat robotics engineering.
              </p>

              {/* Email */}
              <div
                className={`mb-8 transition-all duration-700 delay-600 ${
                  ctaVisible
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-95"
                }`}
              >
                <a
                  href="mailto:sponsor@ragnarok.com"
                  className="text-2xl md:text-3xl font-mono font-black text-[var(--accent-primary)] hover:text-white transition-colors"
                >
                  sponsor@ragnarok.com
                </a>
              </div>

              {/* Button */}
              <div
                className={`transition-all duration-700 delay-700 ${
                  ctaVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
              >
                <a
                  href="mailto:sponsor@ragnarok.com"
                  className="relative inline-block px-8 py-3 border-2 border-[var(--accent-primary)] font-mono uppercase tracking-wider text-[var(--accent-primary)] group overflow-hidden"
                >
                  {/* Hover background */}
                  <span className="absolute inset-0 bg-[var(--accent-primary)] scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                  {/* Content */}
                  <span className="relative flex items-center justify-center gap-2 group-hover:text-black transition-colors">
                    Get In Touch
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
