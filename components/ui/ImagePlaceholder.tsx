import React from 'react';
import { ImageOff } from 'lucide-react';

export interface ImagePlaceholderProps {
  label?: string;
  className?: string;
  iconSize?: number;
}

export const ImagePlaceholder: React.FC<ImagePlaceholderProps> = ({
  label = 'No Image Available',
  className = '',
  iconSize = 48
}) => {
  return (
    <div
      className={`flex flex-col items-center justify-center bg-[var(--bg-secondary)] border-2 border-dashed border-[var(--border)] rounded-lg p-8 ${className}`}
    >
      <ImageOff
        size={iconSize}
        className="text-[var(--text-muted)] mb-3"
      />
      {label && (
        <p className="text-sm text-[var(--text-muted)] text-center">
          {label}
        </p>
      )}
    </div>
  );
};
