"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ReactNode, useRef } from "react";

interface ParallaxCardProps {
  children: ReactNode;
  className?: string;
}

export default function ParallaxCard({
  children,
  className = "",
}: ParallaxCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7.5deg", "-7.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7.5deg", "7.5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={`relative rounded-xl transition-shadow duration-300 ${className}`}
      whileHover={{
        scale: 1.02,
      }}
      transition={{
        scale: { duration: 0.2 },
      }}
    >
      <motion.div
        className="absolute -inset-[1px] rounded-xl opacity-0 transition-opacity duration-300 pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, #ef4444, #f97316, #eab308, #22c55e, #3b82f6, #8b5cf6, #ef4444)",
          backgroundSize: "200% 200%",
        }}
        whileHover={{
          opacity: 0.7,
        }}
        animate={{
          backgroundPosition: ["0% 50%", "200% 50%"],
        }}
        transition={{
          backgroundPosition: {
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          },
        }}
      />
      <div className="relative bg-zinc-900 rounded-xl" style={{ transform: "translateZ(20px)" }}>
        {children}
      </div>
    </motion.div>
  );
}
