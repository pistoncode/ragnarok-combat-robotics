"use client";

import { useEffect, useRef, useState } from "react";
import { Trophy, Target, Weight, Calendar } from "lucide-react";

interface Stat {
  icon: React.ReactNode;
  value: number;
  suffix: string;
  label: string;
}

const stats: Stat[] = [
  {
    icon: <Trophy className="w-5 h-5" />,
    value: 15,
    suffix: "+",
    label: "Competitions",
  },
  {
    icon: <Target className="w-5 h-5" />,
    value: 78,
    suffix: "%",
    label: "Win Rate",
  },
  {
    icon: <Weight className="w-5 h-5" />,
    value: 4,
    suffix: "",
    label: "Weight Classes",
  },
  {
    icon: <Calendar className="w-5 h-5" />,
    value: 5,
    suffix: "+",
    label: "Years Active",
  },
];

// Simple count up hook
function useCountUp(end: number, duration: number = 2000, startOnView: boolean = true) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!startOnView) {
      setHasStarted(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [hasStarted, startOnView]);

  useEffect(() => {
    if (!hasStarted) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [hasStarted, end, duration]);

  return { count, ref };
}

export default function Stats() {
  return (
    <section className="py-12 md:py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-8 md:mb-12">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-px bg-[var(--accent-primary)]" />
            <p className="text-sm font-mono text-[var(--text-secondary)] uppercase tracking-[0.2em]">
              By The Numbers
            </p>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black font-mono tracking-tighter">
            Our Track Record
          </h2>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {stats.map((stat, index) => {
            const { count, ref } = useCountUp(stat.value, 2000);

            return (
              <div
                key={stat.label}
                ref={ref}
                className="relative group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Offset background */}
                <div className="absolute inset-0 translate-x-1.5 translate-y-1.5 md:translate-x-2 md:translate-y-2 border border-[var(--accent-primary)]/20 bg-[var(--accent-primary)]/5 transition-transform group-hover:translate-x-2.5 group-hover:translate-y-2.5 md:group-hover:translate-x-3 md:group-hover:translate-y-3" />

                <div className="relative border border-white/20 bg-black/80 backdrop-blur-sm p-4 md:p-6 transition-transform group-hover:-translate-x-0.5 group-hover:-translate-y-0.5">
                  {/* Icon */}
                  <div className="w-8 h-8 md:w-10 md:h-10 border border-[var(--accent-primary)]/50 flex items-center justify-center mb-3 md:mb-4 text-[var(--accent-primary)] group-hover:border-[var(--accent-primary)] group-hover:bg-[var(--accent-primary)]/10 transition-all">
                    {stat.icon}
                  </div>

                  {/* Value */}
                  <div className="text-3xl sm:text-4xl md:text-5xl font-black font-mono tracking-tighter mb-1 md:mb-2">
                    {count}
                    <span className="text-[var(--accent-primary)]">{stat.suffix}</span>
                  </div>

                  {/* Label */}
                  <div className="text-xs md:text-sm font-mono text-[var(--text-secondary)] uppercase tracking-wider">
                    {stat.label}
                  </div>

                  {/* Number watermark */}
                  <div className="absolute top-3 right-3 md:top-4 md:right-4 text-[var(--accent-primary)]/10 font-mono text-2xl md:text-3xl font-black">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
