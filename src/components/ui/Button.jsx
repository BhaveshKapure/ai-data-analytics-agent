import React from 'react';
import { Loader2 } from 'lucide-react';

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled = false,
  icon: Icon = null,
  iconPosition = 'left',
  className = '',
  onClick,
  type = 'button',
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-95 disabled:opacity-50 disabled:pointer-events-none disabled:transform-none cursor-pointer';

  const variants = {
    primary: 'bg-gradient-to-r from-brand-blue to-brand-cyan text-white shadow-md hover:shadow-glow hover:brightness-105 focus:ring-brand-blue/50 border border-transparent',
    navy: 'bg-navy-900 hover:bg-navy-800 text-white shadow-md hover:shadow-lg focus:ring-navy-900/50 border border-transparent',
    secondary: 'bg-brand-light text-brand-blue hover:bg-blue-100 border border-blue-200 focus:ring-brand-blue/30',
    outline: 'bg-white text-navy-900 border border-slate-200 hover:border-brand-blue hover:text-brand-blue hover:bg-slate-50 focus:ring-brand-blue/30 shadow-sm',
    ghost: 'bg-transparent text-text-secondary hover:text-navy-900 hover:bg-slate-100/80 border border-transparent',
    danger: 'bg-status-danger text-white hover:bg-red-600 focus:ring-red-500/50 shadow-sm',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs gap-1.5',
    md: 'px-4 py-2 text-sm gap-2',
    lg: 'px-6 py-3 text-base gap-2.5',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin text-current" />
      ) : (
        <>
          {Icon && iconPosition === 'left' && <Icon className="w-4 h-4 shrink-0" />}
          <span>{children}</span>
          {Icon && iconPosition === 'right' && <Icon className="w-4 h-4 shrink-0" />}
        </>
      )}
    </button>
  );
};

export default Button;
