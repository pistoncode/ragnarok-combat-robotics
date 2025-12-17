import React from 'react';

export type WeightClass = 'Beetleweight' | 'Hobbyweight' | 'Featherweight' | 'Middleweight';
export type Status = 'Active' | 'Retired';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'weightClass' | 'status' | 'default';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ children, variant = 'default', className = '' }) => {
  const baseStyles = 'inline-flex items-center px-3 py-1 text-xs font-medium border';

  const variantStyles = {
    weightClass: 'bg-[var(--accent-primary)] text-[var(--text-primary)] border-[var(--accent-hover)]',
    status: children === 'Active'
      ? 'bg-green-900/30 text-green-400 border-green-700'
      : 'bg-gray-900/30 text-gray-400 border-gray-700',
    default: 'bg-[var(--bg-secondary)] text-[var(--text-secondary)] border-[var(--border)]',
  };

  return (
    <span className={`${baseStyles} ${variantStyles[variant]} ${className}`}>
      {children}
    </span>
  );
};

// Helper component for weight class badges
export const WeightClassBadge: React.FC<{ weightClass: WeightClass; className?: string }> = ({
  weightClass,
  className
}) => {
  return (
    <Badge variant="weightClass" className={className}>
      {weightClass}
    </Badge>
  );
};

// Helper component for status badges
export const StatusBadge: React.FC<{ status: Status; className?: string }> = ({
  status,
  className
}) => {
  return (
    <Badge variant="status" className={className}>
      {status}
    </Badge>
  );
};
