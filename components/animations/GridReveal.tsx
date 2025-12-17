"use client";

import { motion } from "framer-motion";

interface GridRevealProps {
  className?: string;
  rows?: number;
  cols?: number;
}

export default function GridReveal({
  className = "",
  rows = 8,
  cols = 8,
}: GridRevealProps) {
  const gridItems = Array.from({ length: rows * cols }, (_, i) => i);

  return (
    <div
      className={`grid gap-px ${className}`}
      style={{
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, 1fr)`,
      }}
    >
      {gridItems.map((i) => {
        const row = Math.floor(i / cols);
        const col = i % cols;
        const delay = (row + col) * 0.03;

        return (
          <motion.div
            key={i}
            initial={{
              opacity: 0,
              scale: 0,
            }}
            whileInView={{
              opacity: 1,
              scale: 1,
            }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{
              duration: 0.5,
              delay,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative"
          >
            <motion.div
              className="w-full h-full bg-gradient-to-br from-red-500/20 via-orange-500/20 to-yellow-500/20 rounded-sm"
              animate={{
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: delay,
                ease: "easeInOut",
              }}
            />
          </motion.div>
        );
      })}
    </div>
  );
}
