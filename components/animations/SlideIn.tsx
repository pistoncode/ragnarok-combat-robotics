"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface SlideInProps {
  children: ReactNode;
  direction: "left" | "right" | "up" | "down";
  delay?: number;
  className?: string;
}

export default function SlideIn({
  children,
  direction,
  delay = 0,
  className = "",
}: SlideInProps) {
  const getSlideVariants = () => {
    const distance = 100;
    switch (direction) {
      case "left":
        return {
          initial: { x: -distance, opacity: 0 },
          animate: { x: 0, opacity: 1 },
        };
      case "right":
        return {
          initial: { x: distance, opacity: 0 },
          animate: { x: 0, opacity: 1 },
        };
      case "up":
        return {
          initial: { y: distance, opacity: 0 },
          animate: { y: 0, opacity: 1 },
        };
      case "down":
        return {
          initial: { y: -distance, opacity: 0 },
          animate: { y: 0, opacity: 1 },
        };
    }
  };

  const variants = getSlideVariants();

  return (
    <motion.div
      initial={variants.initial}
      whileInView={variants.animate}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: 0.7,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
