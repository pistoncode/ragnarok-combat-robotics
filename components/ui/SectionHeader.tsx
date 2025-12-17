import React from 'react';

export interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  align = 'left',
  className = ''
}) => {
  const alignStyles = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  return (
    <div className={`${alignStyles[align]} ${className}`}>
      <h2 className="text-4xl md:text-5xl font-bold text-[var(--text-primary)] mb-2">
        {title}
      </h2>
      {subtitle && (
        <p className="text-lg md:text-xl text-[var(--text-secondary)] mt-2">
          {subtitle}
        </p>
      )}
    </div>
  );
};
