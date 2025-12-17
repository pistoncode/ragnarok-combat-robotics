"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface GradientTextProps {
  children: ReactNode;
  className?: string;
}

export default function GradientText({
  children,
  className = "",
}: GradientTextProps) {
  return (
    <motion.span
      className={`inline-block bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent ${className}`}
      style={{
        backgroundSize: "200% 200%",
      }}
      animate={{
        backgroundPosition: ["0% 50%", "200% 50%", "0% 50%"],
      }}
      transition={{
        duration: 5,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      {children}
    </motion.span>
  );
}
