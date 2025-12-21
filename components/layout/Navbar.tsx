"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ArrowUpRight, ArrowRight } from "lucide-react";
import { useFundingNotification } from "@/lib/contexts/FundingNotificationContext";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const progressRef = useRef<HTMLDivElement>(null);
  const loadProgressRef = useRef<HTMLDivElement>(null);
  const { isUpcomingBotVisible } = useFundingNotification();

  // Page load progress animation
  useEffect(() => {
    if (!loadProgressRef.current) return;

    // Animate load progress from 0 to 100%
    let progress = 0;
    const duration = 800; // Total animation time in ms
    const startTime = performance.now();

    const animateLoad = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      progress = Math.min(elapsed / duration, 1);

      // Ease out cubic for smooth deceleration
      const eased = 1 - Math.pow(1 - progress, 3);

      if (loadProgressRef.current) {
        loadProgressRef.current.style.transform = `scaleX(${eased})`;
      }

      if (progress < 1) {
        requestAnimationFrame(animateLoad);
      } else {
        // Fade out the load progress bar after completion
        setTimeout(() => {
          setIsLoading(false);
        }, 200);
      }
    };

    requestAnimationFrame(animateLoad);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      // Switch to solid header when scrolled past hero section
      setIsScrolled(scrollY > windowHeight * 0.8);

      // Calculate scroll progress (0 to 1) - update directly for smooth linear tracking
      const documentHeight = document.documentElement.scrollHeight;
      const scrollableHeight = documentHeight - windowHeight;
      const progress = scrollableHeight > 0 ? scrollY / scrollableHeight : 0;
      const clampedProgress = Math.min(1, Math.max(0, progress));

      // Update progress bar directly via ref for instant response
      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${clampedProgress})`;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const navLinks = [
    { href: "/team", label: "Team" },
    { href: "/robots", label: "Robots" },
    { href: "/competitions", label: "Competitions" },
  ];

  return (
    <>
      {/* Progress Bar Container */}
      <div className="fixed top-0 left-0 right-0 z-[60] h-[2px] bg-black">
        {/* Page Load Progress - shows on initial load */}
        {isLoading && (
          <div
            ref={loadProgressRef}
            className="absolute inset-0 h-full w-full bg-[var(--accent-primary)] origin-left"
            style={{ transform: "scaleX(0)" }}
          />
        )}
        {/* Scroll Progress Bar - shows after load complete */}
        <div
          ref={progressRef}
          className={`h-full w-full bg-[var(--accent-primary)] origin-left transition-opacity duration-200 ${
            isLoading ? "opacity-0" : "opacity-100"
          }`}
          style={{ transform: "scaleX(0)" }}
        />
      </div>

      <nav className="fixed top-[2px] left-0 right-0 z-50">
        {/* Transparent background in hero section - lets the page's cutting mat grid show through */}

        {/* Solid header background - visible after scrolling past hero */}
        <div
          className={`absolute inset-0 overflow-hidden transition-opacity duration-500 ${
            isScrolled ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Solid black background with subtle gradient */}
          <div
            className="absolute inset-0 backdrop-blur-md"
            style={{
              background:
                "linear-gradient(to bottom, #000 0%, rgba(15,15,15,0.98) 100%)",
            }}
          />
          {/* Bottom border accent */}
          <div className="absolute inset-x-0 bottom-0 h-px bg-white/10" />
        </div>

        <div
          id="header-content"
          className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <div className="flex items-center justify-between h-14 md:h-16">
            {/* Logo/Brand with corner marks */}
            <div className="flex items-center gap-2 md:gap-3">
              <Link href="/" className="relative group flex items-center gap-2 md:gap-3">
                <div className="absolute -top-1 -left-1 w-2 h-2 border-t border-l border-[var(--accent-primary)] opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute -top-1 -right-1 w-2 h-2 border-t border-r border-[var(--accent-primary)] opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute -bottom-1 -left-1 w-2 h-2 border-b border-l border-[var(--accent-primary)] opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b border-r border-[var(--accent-primary)] opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative w-6 h-6 md:w-7 md:h-7 flex-shrink-0 -translate-y-0.5">
                  <Image
                    src="/icon.svg"
                    alt="Ragnarok Logo"
                    fill
                    className="object-contain"
                  />
                </div>
                <span className="text-lg md:text-xl font-black font-mono tracking-tighter text-white group-hover:text-[var(--accent-primary)] transition-colors px-1 leading-none">
                  RAGNAROK
                </span>
              </Link>

              {/* Funding notification banner - appears when UpcomingBot section is visible */}
              <div
                className={`hidden sm:flex items-center transition-all duration-500 ${
                  isUpcomingBotVisible
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-4 pointer-events-none"
                }`}
              >
                <a
                  href="mailto:sponsor@ragnarok.com?subject=Project%20HADES%20Sponsorship"
                  className="group relative flex items-center overflow-hidden border-2 border-[var(--accent-primary)] hover:bg-[var(--accent-primary)] transition-all duration-300"
                >
                  {/* Content */}
                  <div className="relative flex items-center gap-3 px-4 py-1.5">
                    {/* Status indicator */}
                    <div className="flex items-center gap-1.5 pr-3 border-r border-[var(--accent-primary)]/40 group-hover:border-black/20 transition-colors">
                      <div className="w-1.5 h-1.5 bg-[var(--accent-primary)] group-hover:bg-black transition-colors" />
                      <span className="text-[var(--accent-primary)] group-hover:text-black font-mono text-[10px] uppercase tracking-wider font-bold transition-colors">
                        Live
                      </span>
                    </div>

                    {/* Text */}
                    <span className="text-white group-hover:text-black font-mono text-xs uppercase tracking-wider font-bold transition-colors">
                      HADES needs funding
                    </span>

                    {/* CTA */}
                    <span className="text-[var(--accent-primary)] group-hover:text-black font-mono text-xs font-black uppercase tracking-wider flex items-center gap-1 transition-colors">
                      Sponsor
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </div>
                </a>
              </div>
            </div>

            {/* Desktop Navigation - Brutalist style */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link, index) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative px-4 py-2 text-sm font-mono uppercase tracking-wider text-[var(--text-secondary)] hover:text-white transition-colors group"
                >
                  {/* Hover background */}
                  <span className="absolute inset-0 bg-[var(--accent-primary)] scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                  {/* Text */}
                  <span className="relative group-hover:text-black transition-colors">
                    {link.label}
                  </span>
                </Link>
              ))}

              {/* Divider */}
              <div className="w-px h-4 bg-white/20 mx-2" />

              {/* Contact Button - Special styling */}
              <a
                href="mailto:contact@ragnarok.com"
                className="flex items-center gap-1 px-4 py-2 border border-[var(--accent-primary)] text-sm font-mono uppercase tracking-wider text-[var(--accent-primary)] hover:bg-[var(--accent-primary)] hover:text-black transition-all group"
              >
                <span>Contact</span>
                <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden relative w-10 h-10 border border-white/20 flex items-center justify-center text-[var(--text-primary)] hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)] transition-all"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu - Brutalist style */}
        <div
          className={`md:hidden absolute top-full left-0 right-0 bg-black/98 backdrop-blur-md border-t border-white/10 transition-all duration-300 ${
            isMobileMenuOpen
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-2 pointer-events-none"
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 py-4 space-y-1">
            {navLinks.map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center justify-between py-3 border-b border-white/10 text-sm font-mono uppercase tracking-wider text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors group"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="flex items-center gap-3">
                  <span className="text-[var(--accent-primary)]/50 text-xs">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {link.label}
                </span>
                <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            ))}

            {/* Contact in mobile menu */}
            <a
              href="mailto:contact@ragnarok.com"
              className="flex items-center justify-between py-3 text-sm font-mono uppercase tracking-wider text-[var(--accent-primary)] group"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span className="flex items-center gap-3">
                <span className="text-[var(--accent-primary)]/50 text-xs">
                  {String(navLinks.length + 1).padStart(2, "0")}
                </span>
                Contact
              </span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>

          {/* Mobile menu footer */}
          <div className="border-t border-white/10 px-4 py-3">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 animate-pulse" />
              <span className="text-xs font-mono text-[var(--text-muted)] uppercase tracking-wider">
                Actively Competing
              </span>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
