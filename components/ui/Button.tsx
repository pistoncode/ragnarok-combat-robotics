import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className = '', children, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg';

    const sizeStyles = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg',
    };

    const variantStyles = {
      primary: 'bg-[var(--accent-primary)] text-[var(--text-primary)] hover:bg-[var(--accent-hover)] hover:shadow-[0_0_20px_var(--accent-glow)] border border-[var(--accent-hover)]',
      secondary: 'bg-[var(--bg-secondary)] text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] hover:brightness-125 border border-[var(--border)]',
      ghost: 'bg-transparent text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] border border-transparent hover:border-[var(--border)]',
    };

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
