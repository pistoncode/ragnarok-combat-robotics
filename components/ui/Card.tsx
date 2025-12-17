'use client';

import React from 'react';
import { motion } from 'framer-motion';

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, className = '', hoverable = true }) => {
  const baseStyles = 'bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg p-6';
  const hoverStyles = hoverable
    ? 'transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_30px_var(--accent-glow)]'
    : '';

  if (hoverable) {
    return (
      <motion.div
        className={`${baseStyles} ${hoverStyles} ${className}`}
        whileHover={{ y: -4 }}
        transition={{ duration: 0.2 }}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div className={`${baseStyles} ${className}`}>
      {children}
    </div>
  );
};
