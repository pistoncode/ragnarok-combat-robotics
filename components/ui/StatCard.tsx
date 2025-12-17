'use client';

import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { Card } from './Card';

export interface StatCardProps {
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  suffix = '',
  prefix = '',
  duration = 2,
  className = ''
}) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const controls = animate(count, value, {
      duration,
      ease: 'easeOut',
    });

    const unsubscribe = rounded.on('change', (latest) => {
      setDisplayValue(latest);
    });

    return () => {
      controls.stop();
      unsubscribe();
    };
  }, [value, count, rounded, duration]);

  return (
    <Card className={`text-center ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-5xl font-bold text-[var(--accent-primary)] mb-2">
          {prefix}{displayValue}{suffix}
        </div>
        <div className="text-sm uppercase tracking-wider text-[var(--text-secondary)]">
          {label}
        </div>
      </motion.div>
    </Card>
  );
};
