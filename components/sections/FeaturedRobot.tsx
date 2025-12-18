"use client";

import { useEffect, useRef, useState } from "react";
import { WeightClassBadge } from "@/components/ui/Badge";
import { robots } from "@/lib/data/robots";
import { ArrowRight, ArrowLeft, Zap, Shield, Cog } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function FeaturedRobot() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const autoRotateRef = useRef<NodeJS.Timeout | null>(null);

  // Use the first robot as the featured one
  const featuredRobot = robots[0];

  // Define available images for the featured robot
  const robotImages = featuredRobot.imageUrl
    ? [featuredRobot.imageUrl, "/robots/long-2.webp"]
    : [];

  const winRate = Math.round(
    (featuredRobot.wins / (featuredRobot.wins + featuredRobot.losses)) * 100
  );

  // Helper to get spec value by label
  const getSpec = (label: string) => {
    const spec = featuredRobot.specs.find((s) =>
      s.label.toLowerCase().includes(label.toLowerCase())
    );
    return spec?.value || "N/A";
  };

  // Navigation functions
  const resetAutoRotation = () => {
    if (autoRotateRef.current) {
      clearInterval(autoRotateRef.current);
    }
    if (isVisible && robotImages.length > 1) {
      autoRotateRef.current = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % robotImages.length);
      }, 10000);
    }
  };

  const goToNextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % robotImages.length);
    resetAutoRotation();
  };

  const goToPreviousImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + robotImages.length) % robotImages.length);
    resetAutoRotation();
  };

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Auto-rotate images every 10 seconds
  useEffect(() => {
    if (!isVisible || robotImages.length <= 1) return;

    const rotateImages = () => {
      setCurrentImageIndex((prev) => (prev + 1) % robotImages.length);
    };

    autoRotateRef.current = setInterval(rotateImages, 10000);

    return () => {
      if (autoRotateRef.current) {
        clearInterval(autoRotateRef.current);
      }
    };
  }, [isVisible, robotImages.length]);

  return (
    <section ref={sectionRef} className="py-16 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header - Minimal */}
        <div
          className={`mb-12 transition-all duration-700 ${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <div className="flex items-center gap-4 mb-4">
            <div
              className={`h-px bg-[var(--accent-primary)] transition-all duration-700 delay-200 ${
                isVisible ? "w-12" : "w-0"
              }`}
            />
            <p className="text-sm font-mono text-[var(--text-secondary)] uppercase tracking-[0.2em]">
              Featured Build
            </p>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black font-mono tracking-tighter">
            2023 & 2024 Champion
          </h2>
        </div>

        {/* Featured Robot Card */}
        <div
          className={`relative transition-all duration-1000 delay-300 ${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-12"
          }`}
        >
          {/* Offset background element */}
          <div
            className={`absolute inset-0 border-2 border-[var(--accent-primary)]/30 bg-[var(--accent-primary)]/5 hidden lg:block transition-transform duration-700 delay-500 ${
              isVisible
                ? "translate-x-3 translate-y-3"
                : "translate-x-0 translate-y-0"
            }`}
          />

          <div className="relative border-2 border-white/20 bg-black/80 backdrop-blur-sm">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Content Column - Second on mobile, First on desktop */}
              <div className="p-8 md:p-12 order-2 lg:order-1">
                {/* Robot Name with corner marks */}
                <div
                  className={`relative mb-8 transition-all duration-700 delay-400 ${
                    isVisible
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 -translate-x-8"
                  }`}
                >
                  <div
                    className={`absolute -top-2 -left-2 w-4 h-4 border-t-2 border-l-2 border-[var(--accent-primary)] transition-all duration-500 delay-700 ${
                      isVisible ? "opacity-100 scale-100" : "opacity-0 scale-0"
                    }`}
                  />
                  <div
                    className={`absolute -top-2 -right-2 w-4 h-4 border-t-2 border-r-2 border-[var(--accent-primary)] transition-all duration-500 delay-800 ${
                      isVisible ? "opacity-100 scale-100" : "opacity-0 scale-0"
                    }`}
                  />
                  <div
                    className={`absolute -bottom-2 -left-2 w-4 h-4 border-b-2 border-l-2 border-[var(--accent-primary)] transition-all duration-500 delay-900 ${
                      isVisible ? "opacity-100 scale-100" : "opacity-0 scale-0"
                    }`}
                  />
                  <div
                    className={`absolute -bottom-2 -right-2 w-4 h-4 border-b-2 border-r-2 border-[var(--accent-primary)] transition-all duration-500 delay-1000 ${
                      isVisible ? "opacity-100 scale-100" : "opacity-0 scale-0"
                    }`}
                  />

                  <div className="border border-white/10 p-6 bg-black/50">
                    <h3 className="text-3xl md:text-4xl font-black font-mono tracking-tighter text-[var(--accent-primary)]">
                      {featuredRobot.name}
                    </h3>
                    <div className="mt-3">
                      <WeightClassBadge
                        weightClass={featuredRobot.weightClass}
                        className="!rounded-none border border-white/20 bg-transparent font-mono text-xs uppercase tracking-widest"
                      />
                    </div>
                  </div>
                </div>

                {/* Win/Loss Record */}
                <div
                  className={`mb-8 transition-all duration-700 delay-500 ${
                    isVisible
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 -translate-x-8"
                  }`}
                >
                  <div className="flex items-baseline gap-4">
                    <span className="text-6xl md:text-7xl font-black font-mono tracking-tighter">
                      {featuredRobot.wins}-{featuredRobot.losses}
                    </span>
                    <div className="flex flex-col">
                      <span className="text-sm font-mono text-[var(--text-muted)] uppercase tracking-wider">
                        Record
                      </span>
                      <span className="text-lg font-mono text-[var(--accent-primary)] font-bold">
                        {winRate}% Win Rate
                      </span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div
                  className={`mb-8 transition-all duration-700 delay-600 ${
                    isVisible
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 -translate-x-8"
                  }`}
                >
                  <p className="text-base font-mono text-[var(--text-secondary)] leading-relaxed">
                    {featuredRobot.description}
                  </p>
                </div>

                {/* Quick Specs Grid */}
                <div className="grid grid-cols-3 gap-3 mb-8">
                  {[
                    {
                      icon: <Zap className="w-5 h-5 text-[var(--accent-primary)]" />,
                      label: "Weapon",
                      value: getSpec("weapon speed"),
                    },
                    {
                      icon: <Cog className="w-5 h-5 text-[var(--accent-primary)]" />,
                      label: "Drive",
                      value: getSpec("drive"),
                    },
                    {
                      icon: <Shield className="w-5 h-5 text-[var(--accent-primary)]" />,
                      label: "Weight",
                      value: featuredRobot.weight,
                    },
                  ].map((spec, index) => (
                    <div
                      key={spec.label}
                      className={`border border-white/10 p-4 bg-black/30 transition-all duration-500 ${
                        isVisible
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-4"
                      }`}
                      style={{ transitionDelay: `${700 + index * 100}ms` }}
                    >
                      <div className="mb-2">{spec.icon}</div>
                      <div className="text-xs font-mono text-[var(--text-muted)] uppercase tracking-wider mb-1">
                        {spec.label}
                      </div>
                      <div className="text-sm font-mono font-bold text-white">
                        {spec.value}
                      </div>
                    </div>
                  ))}
                </div>

                {/* View Details Link */}
                <div
                  className={`transition-all duration-700 delay-1000 ${
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-4"
                  }`}
                >
                  <Link
                    href={`/robots/${featuredRobot.slug}`}
                    className="relative inline-block w-full px-8 py-3 border-2 border-[var(--accent-primary)] font-mono uppercase tracking-wider text-[var(--accent-primary)] group overflow-hidden"
                  >
                    {/* Hover background */}
                    <span className="absolute inset-0 bg-[var(--accent-primary)] scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                    {/* Content */}
                    <span className="relative flex items-center justify-center gap-2 group-hover:text-black transition-colors">
                      View Full Specs
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Link>
                </div>
              </div>

              {/* Image Column - First on mobile, Second on desktop */}
              <div
                className={`relative order-1 lg:order-2 border-b lg:border-b-0 lg:border-l border-white/10 transition-all duration-1000 delay-400 ${
                  isVisible
                    ? "opacity-100 translate-y-0 lg:translate-y-0 lg:translate-x-0"
                    : "opacity-0 -translate-y-12 lg:translate-y-0 lg:translate-x-12"
                }`}
              >
                <div 
                  className="relative w-full h-full min-h-[280px] md:min-h-[350px] lg:min-h-[600px] bg-[var(--bg-secondary)] flex items-center justify-center overflow-hidden group"
                  onMouseEnter={() => {
                    // Pause auto-rotation on hover
                    if (autoRotateRef.current) {
                      clearInterval(autoRotateRef.current);
                    }
                  }}
                  onMouseLeave={() => {
                    // Resume auto-rotation on mouse leave
                    resetAutoRotation();
                  }}
                >
                  {/* Grid overlay */}
                  <div
                    className="absolute inset-0 opacity-10 z-10"
                    style={{
                      backgroundImage: `
                        linear-gradient(to right, var(--accent-primary) 1px, transparent 1px),
                        linear-gradient(to bottom, var(--accent-primary) 1px, transparent 1px)
                      `,
                      backgroundSize: "40px 40px",
                    }}
                  />

                  {robotImages.length > 0 ? (
                    <div className="relative w-full h-full overflow-hidden">
                      {robotImages.map((imageUrl, index) => {
                        const isActive = index === currentImageIndex;
                        
                        return (
                          <div
                            key={index}
                            className={`absolute inset-0 ${
                              isActive ? "z-10" : "z-0"
                            }`}
                          >
                            <Image
                              src={imageUrl}
                              alt={`${featuredRobot.name} - View ${index + 1}`}
                              fill
                              className={`object-cover transition-all duration-700 ${
                                isVisible ? "scale-100" : "scale-110"
                              } ${
                                isActive ? "opacity-100" : "opacity-0"
                              }`}
                              priority={index === 0}
                            />
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div
                      className={`text-center p-8 relative z-10 transition-all duration-700 delay-600 ${
                        isVisible
                          ? "opacity-100 scale-100"
                          : "opacity-0 scale-90"
                      }`}
                    >
                      <div className="w-20 h-20 mx-auto mb-4 border-2 border-[var(--accent-primary)]/50 flex items-center justify-center">
                        <span className="text-[var(--accent-primary)] font-mono text-3xl font-bold">
                          R
                        </span>
                      </div>
                      <p className="text-[var(--text-muted)] font-mono text-xs uppercase tracking-[0.3em]">
                        Robot Image
                      </p>
                    </div>
                  )}

                  {/* Navigation Buttons */}
                  {robotImages.length > 1 && (
                    <>
                      {/* Left Navigation Area */}
                      <button
                        onClick={goToPreviousImage}
                        className="absolute left-0 top-0 bottom-0 w-1/2 z-30 flex items-center justify-start pl-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer hover:opacity-100"
                        aria-label="Previous image"
                      >
                        <ArrowLeft className="w-6 h-6 md:w-8 md:h-8 text-white hover:text-[var(--accent-primary)] transition-colors" />
                      </button>

                      {/* Right Navigation Area */}
                      <button
                        onClick={goToNextImage}
                        className="absolute right-0 top-0 bottom-0 w-1/2 z-30 flex items-center justify-end pr-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer hover:opacity-100"
                        aria-label="Next image"
                      >
                        <ArrowRight className="w-6 h-6 md:w-8 md:h-8 text-white hover:text-[var(--accent-primary)] transition-colors" />
                      </button>
                    </>
                  )}

                  {/* Image Indicators */}
                  {robotImages.length > 1 && (
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                      {robotImages.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            setCurrentImageIndex(index);
                            resetAutoRotation();
                          }}
                          className={`transition-all duration-300 ${
                            index === currentImageIndex
                              ? "w-8 bg-[var(--accent-primary)]"
                              : "w-2 bg-white/30 hover:bg-white/50"
                          } h-2 border border-white/20`}
                          aria-label={`View image ${index + 1} of ${robotImages.length}`}
                        />
                      ))}
                    </div>
                  )}

                  {/* Corner label */}
                  <div
                    className={`absolute bottom-4 right-4 bg-[var(--accent-primary)] px-3 py-1 transition-all duration-500 delay-1000 z-20 ${
                      isVisible
                        ? "opacity-100 translate-x-0"
                        : "opacity-0 translate-x-4"
                    }`}
                  >
                    <span className="text-black font-mono text-xs font-bold uppercase tracking-wider">
                      2x Champion
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
