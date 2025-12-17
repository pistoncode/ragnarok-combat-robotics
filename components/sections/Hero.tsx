"use client";

import { useState, useEffect, useRef } from "react";
import { ArrowRight, Mail } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [displayText, setDisplayText] = useState("");
  const [hasInitialAnimationPlayed, setHasInitialAnimationPlayed] = useState(false);
  const animationRef = useRef<NodeJS.Timeout | null>(null);
  const iterationRef = useRef(0);

  useEffect(() => {
    // Small delay to ensure smooth animation after page load
    const timer = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Initial load animation
  useEffect(() => {
    if (mounted && !hasInitialAnimationPlayed) {
      const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*<>[]{}";
      const targetText = "RAGNAROK";
      let iteration = 0;
      const maxIterations = 12;

      const animate = () => {
        if (iteration >= maxIterations) {
          setDisplayText(targetText);
          setHasInitialAnimationPlayed(true);
          return;
        }

        const newText = targetText
          .split("")
          .map((char, index) => {
            const revealProgress = iteration / maxIterations;
            const shouldReveal = index < Math.floor(revealProgress * targetText.length);

            if (shouldReveal) {
              return char;
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("");

        setDisplayText(newText);
        iteration++;
        animationRef.current = setTimeout(animate, 50);
      };

      // Start with random characters
      setDisplayText(Array(8).fill(0).map(() => chars[Math.floor(Math.random() * chars.length)]).join(""));
      animationRef.current = setTimeout(animate, 100);

      return () => {
        if (animationRef.current) {
          clearTimeout(animationRef.current);
        }
      };
    }
  }, [mounted, hasInitialAnimationPlayed]);

  // Hover animation
  useEffect(() => {
    if (!hasInitialAnimationPlayed) return;

    if (animationRef.current) {
      clearTimeout(animationRef.current);
      animationRef.current = null;
    }

    const targetText = isHovered ? "RAGNARÖK" : "RAGNAROK";
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
    iterationRef.current = 0;
    const maxIterations = 6;

    const animate = () => {
      if (iterationRef.current >= maxIterations) {
        setDisplayText(targetText);
        return;
      }

      const newText = targetText
        .split("")
        .map((char, index) => {
          const revealProgress = iterationRef.current / maxIterations;
          const shouldReveal =
            Math.random() < revealProgress * 1.5 ||
            index < Math.floor(revealProgress * targetText.length * 0.8);

          if (shouldReveal && Math.random() > 0.4) {
            return char;
          }
          return chars[Math.floor(Math.random() * chars.length)];
        })
        .join("");

      setDisplayText(newText);
      iterationRef.current++;

      const delay = 15 + iterationRef.current * 6;
      animationRef.current = setTimeout(animate, delay);
    };

    animationRef.current = setTimeout(animate, 15);

    return () => {
      if (animationRef.current) {
        clearTimeout(animationRef.current);
        animationRef.current = null;
      }
    };
  }, [isHovered, hasInitialAnimationPlayed]);


  return (
    <section className="fixed inset-0 z-[5] h-screen flex items-center justify-center px-4 pt-20 pb-4 sm:pt-16 md:pt-8 lg:pt-0 md:pb-0">
      <div className="relative z-10 w-full max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-6 lg:gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="space-y-3 sm:space-y-4 md:space-y-4 lg:space-y-6">
            {/* Main heading - brutalist block style with staggered animation */}
            <div
              className={`relative transition-all duration-700 ease-out ${
                mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              {/* Accent corner marks */}
              <div className="absolute -top-1.5 -left-1.5 md:-top-2 md:-left-2 w-4 h-4 md:w-6 md:h-6 border-t-2 border-l-2 md:border-t-4 md:border-l-4 border-[var(--accent-primary)]" />
              <div className="absolute -top-1.5 -right-1.5 md:-top-2 md:-right-2 w-4 h-4 md:w-6 md:h-6 border-t-2 border-r-2 md:border-t-4 md:border-r-4 border-[var(--accent-primary)]" />
              <div className="absolute -bottom-1.5 -left-1.5 md:-bottom-2 md:-left-2 w-4 h-4 md:w-6 md:h-6 border-b-2 border-l-2 md:border-b-4 md:border-l-4 border-[var(--accent-primary)]" />
              <div className="absolute -bottom-1.5 -right-1.5 md:-bottom-2 md:-right-2 w-4 h-4 md:w-6 md:h-6 border-b-2 border-r-2 md:border-b-4 md:border-r-4 border-[var(--accent-primary)]" />

              <div className="border-2 border-white/20 p-3 sm:p-4 md:p-5 lg:p-8 bg-black/80 backdrop-blur-sm">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl xl:text-8xl font-black font-mono leading-[0.9] tracking-tighter">
                  <span
                    className={`block transition-all duration-500 delay-200 cursor-pointer ${
                      mounted ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                    }`}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                  >
                    {displayText}
                  </span>
                  <span
                    className={`block text-[var(--accent-primary)] transition-all duration-500 delay-400 ${
                      mounted ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                    }`}
                  >
                    COMBAT
                  </span>
                  <span
                    className={`block text-[var(--accent-primary)] transition-all duration-500 delay-500 ${
                      mounted ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                    }`}
                  >
                    ROBOTICS
                  </span>
                </h1>
              </div>
            </div>

            {/* Subtitle - minimal brutalist */}
            <div
              className={`transition-all duration-500 delay-700 ${
                mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
                <div className="w-6 sm:w-8 md:w-12 h-px bg-[var(--accent-primary)] flex-shrink-0" />
                <p className="text-[10px] sm:text-xs md:text-sm lg:text-base font-mono text-[var(--text-secondary)] uppercase tracking-[0.1em] sm:tracking-[0.15em] md:tracking-[0.2em]">
                  Engineering the future of combat
                </p>
              </div>
            </div>

            {/* CTA Buttons - brutalist blocks */}
            <div
              className={`flex flex-col sm:flex-row gap-2 sm:gap-3 md:gap-4 pt-1 sm:pt-2 md:pt-4 transition-all duration-500 delay-900 ${
                mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <a 
                href="mailto:sponsor@ragnarok.com" 
                className="relative inline-block w-full sm:w-auto px-3 py-2 md:px-4 md:py-2.5 lg:px-6 lg:py-3 border-2 border-[var(--accent-primary)] group-hover:border-white font-mono text-xs sm:text-sm md:text-base uppercase tracking-wider bg-[var(--accent-primary)] text-black group overflow-hidden transition-colors"
              >
                {/* Hover background - white scales in */}
                <span className="absolute inset-0 bg-white scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                {/* Content */}
                <span className="relative flex items-center justify-center gap-1.5 sm:gap-2 text-black group-hover:text-[var(--accent-primary)] transition-colors">
                  <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                  Partner With Us
                  <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </a>

              <Link 
                href="/robots" 
                className="relative inline-block w-full sm:w-auto px-3 py-2 md:px-4 md:py-2.5 lg:px-6 lg:py-3 border-2 border-white/30 font-mono text-xs sm:text-sm md:text-base uppercase tracking-wider text-white group overflow-hidden"
              >
                {/* Hover background */}
                <span className="absolute inset-0 bg-[var(--accent-primary)] scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                {/* Content */}
                <span className="relative flex items-center justify-center gap-1.5 sm:gap-2 group-hover:text-black transition-colors">
                  View Our Robots
                  <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            </div>
          </div>

          {/* Right Column - Image with brutalist frame */}
          <div
            className={`relative transition-all duration-700 delay-300 ${
              mounted ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
            }`}
          >
            {/* Offset background element */}
            <div className="absolute inset-0 translate-x-1.5 translate-y-1.5 md:translate-x-2 md:translate-y-2 lg:translate-x-3 lg:translate-y-3 border-2 border-[var(--accent-primary)]/30 bg-[var(--accent-primary)]/5" />

            <div className="relative border-2 border-white/20 bg-black/80 backdrop-blur-sm p-1.5 md:p-2 lg:p-3">
              <div className="relative w-full aspect-[16/10] md:aspect-[4/3] lg:aspect-square bg-[var(--bg-secondary)] flex items-center justify-center overflow-hidden">
                {/* Grid overlay */}
                <div
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage: `
                      linear-gradient(to right, var(--accent-primary) 1px, transparent 1px),
                      linear-gradient(to bottom, var(--accent-primary) 1px, transparent 1px)
                    `,
                    backgroundSize: '30px 30px',
                  }}
                />

                {/* Placeholder text */}
                <div className="text-center p-4 md:p-6 lg:p-8 relative z-10">
                  <div className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 mx-auto mb-2 md:mb-3 lg:mb-4 border-2 border-[var(--accent-primary)]/50 flex items-center justify-center">
                    <span className="text-[var(--accent-primary)] font-mono text-xl md:text-2xl font-bold">R</span>
                  </div>
                  <p className="text-[var(--text-muted)] font-mono text-[10px] md:text-xs uppercase tracking-[0.2em] md:tracking-[0.3em]">
                    Robot Image
                  </p>
                </div>

                {/* Uncomment and replace with your image when ready:
                <Image
                  src="/path-to-your-image.jpg"
                  alt="Ragnarok Combat Robot"
                  fill
                  className="object-cover"
                  priority
                />
                */}
              </div>

              {/* Corner label */}
              <div className="absolute -bottom-1.5 -right-1.5 md:-bottom-2 md:-right-2 lg:-bottom-3 lg:-right-3 bg-[var(--accent-primary)] px-1.5 py-0.5 md:px-2 lg:px-3 lg:py-1">
                <span className="text-black font-mono text-[8px] md:text-[10px] lg:text-xs font-bold uppercase tracking-wider">Est. 2019</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
