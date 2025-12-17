"use client";

import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";

export default function GridBackground() {
  const [hasAnimated, setHasAnimated] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Get window dimensions for calculating line lengths
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);

    // Mark animation as complete after initial load
    const timer = setTimeout(() => setHasAnimated(true), 3000);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", updateDimensions);
    };
  }, []);

  // Grid configuration
  const gridSpacing = 40; // pixels between minor lines
  const majorLineInterval = 5; // every 5th line is major

  // Calculate number of lines based on dimensions
  const numHorizontalLines = Math.ceil(dimensions.height / gridSpacing) + 1;
  const numVerticalLines = Math.ceil(dimensions.width / gridSpacing) + 1;

  // Generate line data
  const horizontalLines = Array.from({ length: numHorizontalLines }, (_, i) => ({
    y: i * gridSpacing,
    isMajor: i % majorLineInterval === 0,
    // Lines above center come from top, lines below come from bottom
    fromTop: i * gridSpacing < dimensions.height / 2,
  }));

  const verticalLines = Array.from({ length: numVerticalLines }, (_, i) => ({
    x: i * gridSpacing,
    isMajor: i % majorLineInterval === 0,
    // Lines left of center come from left, lines right come from right
    fromLeft: i * gridSpacing < dimensions.width / 2,
  }));

  // Calculate delay based on distance from center (lines further from center animate first)
  const getHorizontalDelay = (y: number) => {
    const distanceFromCenter = Math.abs(y - dimensions.height / 2);
    const maxDistance = dimensions.height / 2;
    // Invert: further lines start first (delay 0), center lines start last
    return (1 - distanceFromCenter / maxDistance) * 1.2;
  };

  const getVerticalDelay = (x: number) => {
    const distanceFromCenter = Math.abs(x - dimensions.width / 2);
    const maxDistance = dimensions.width / 2;
    return (1 - distanceFromCenter / maxDistance) * 1.2 + 0.1;
  };

  if (dimensions.width === 0) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[1] overflow-hidden pointer-events-none"
    >
      {/* Black background base */}
      <div className="absolute inset-0 bg-[var(--bg-primary)]" />

      {/* Animated converging grid lines */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
        preserveAspectRatio="none"
      >
        {/* Horizontal lines - animate from edges toward center */}
        {horizontalLines.map((line, i) => {
          const lineLength = dimensions.width;
          const baseDelay = getHorizontalDelay(line.y);
          // Add micro-stagger for minor lines to create wave effect
          const microStagger = line.isMajor ? 0 : (i % majorLineInterval) * 0.05;
          const delay = baseDelay + microStagger;

          return (
            <motion.line
              key={`h-${i}`}
              x1={0}
              x2={dimensions.width}
              y1={line.y}
              y2={line.y}
              stroke={
                line.isMajor
                  ? "rgba(255, 87, 95, 0.3)"
                  : "rgba(255, 87, 95, 0.15)"
              }
              strokeWidth={line.isMajor ? 1 : 0.5}
              strokeDasharray={lineLength}
              initial={{
                strokeDashoffset: line.fromTop ? -lineLength : lineLength,
              }}
              animate={{
                strokeDashoffset: 0,
              }}
              transition={{
                duration: line.isMajor ? 1.5 : 1.2,
                delay: delay,
                ease: [0.25, 0.1, 0.25, 1],
              }}
            />
          );
        })}

        {/* Vertical lines - animate from edges toward center */}
        {verticalLines.map((line, i) => {
          const lineLength = dimensions.height;
          const baseDelay = getVerticalDelay(line.x);
          // Add micro-stagger for minor lines to create wave effect
          const microStagger = line.isMajor ? 0 : (i % majorLineInterval) * 0.05;
          const delay = baseDelay + microStagger;

          return (
            <motion.line
              key={`v-${i}`}
              x1={line.x}
              x2={line.x}
              y1={0}
              y2={dimensions.height}
              stroke={
                line.isMajor
                  ? "rgba(255, 87, 95, 0.3)"
                  : "rgba(255, 87, 95, 0.15)"
              }
              strokeWidth={line.isMajor ? 1 : 0.5}
              strokeDasharray={lineLength}
              initial={{
                strokeDashoffset: line.fromLeft ? -lineLength : lineLength,
              }}
              animate={{
                strokeDashoffset: 0,
              }}
              transition={{
                duration: line.isMajor ? 1.5 : 1.2,
                delay: delay,
                ease: [0.25, 0.1, 0.25, 1],
              }}
            />
          );
        })}
      </svg>

      {/* Static grid pattern (shows after animation for better performance) */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: hasAnimated ? 1 : 0 }}
        transition={{ duration: 0.8 }}
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 87, 95, 0.15) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 87, 95, 0.15) 1px, transparent 1px),
            linear-gradient(to right, rgba(255, 87, 95, 0.3) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 87, 95, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px, 40px 40px, 200px 200px, 200px 200px",
          backgroundPosition: "0 0, 0 0, 0 0, 0 0",
        }}
      />

      {/* Fade out animated SVG after static grid shows */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 1 }}
        animate={{ opacity: hasAnimated ? 0 : 1 }}
        transition={{ duration: 0.8 }}
      />

      {/* Subtle center glow */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(255, 87, 95, 0.05) 0%, transparent 60%)",
        }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 2, delay: 0.5, ease: "easeOut" }}
      />
    </div>
  );
}
