import React from 'react';

export const Badge = ({
  children,
  variant = 'info',
  size = 'md',
  dot = false,
  className = '',
}) => {
  const variants = {
    active: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    success: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    pending: 'bg-amber-50 text-amber-700 border-amber-200',
    warning: 'bg-amber-50 text-amber-700 border-amber-200',
    blocked: 'bg-rose-50 text-rose-700 border-rose-200',
    danger: 'bg-rose-50 text-rose-700 border-rose-200',
    info: 'bg-blue-50 text-brand-blue border-blue-200',
    neutral: 'bg-slate-100 text-slate-700 border-slate-200',
    ai: 'bg-gradient-to-r from-blue-50 to-cyan-50 text-brand-blue border-brand-cyan/30',
  };

  const dots = {
    active: 'bg-emerald-500',
    success: 'bg-emerald-500',
    pending: 'bg-amber-500',
    warning: 'bg-amber-500',
    blocked: 'bg-rose-500',
    danger: 'bg-rose-500',
    info: 'bg-brand-blue',
    neutral: 'bg-slate-400',
    ai: 'bg-brand-cyan animate-pulse',
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-[11px]',
    md: 'px-2.5 py-1 text-xs',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-medium rounded-full border ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {dot && (
        <span className={`w-1.5 h-1.5 rounded-full ${dots[variant] || 'bg-current'}`} />
      )}
      {children}
    </span>
  );
};

export default Badge;
