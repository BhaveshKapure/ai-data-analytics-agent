import React from 'react';

export const Input = ({
  label,
  error,
  icon: Icon = null,
  rightElement = null,
  className = '',
  id,
  type = 'text',
  ...props
}) => {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="w-full space-y-1.5">
      {label && (
        <label htmlFor={inputId} className="block text-xs font-semibold uppercase tracking-wider text-text-secondary">
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {Icon && (
          <div className="absolute left-3.5 text-slate-400 pointer-events-none">
            <Icon className="w-4 h-4" />
          </div>
        )}
        <input
          id={inputId}
          type={type}
          className={`
            w-full rounded-xl border bg-white px-3.5 py-2.5 text-sm text-navy-900 placeholder-slate-400 transition-all duration-200
            focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20
            ${Icon ? 'pl-10' : ''}
            ${rightElement ? 'pr-10' : ''}
            ${error ? 'border-status-danger focus:ring-rose-500/20' : 'border-slate-200'}
            ${className}
          `}
          {...props}
        />
        {rightElement && (
          <div className="absolute right-3">
            {rightElement}
          </div>
        )}
      </div>
      {error && (
        <p className="text-xs text-status-danger font-medium mt-1">{error}</p>
      )}
    </div>
  );
};

export default Input;
