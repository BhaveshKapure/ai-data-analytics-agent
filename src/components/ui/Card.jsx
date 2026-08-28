import React from 'react';

export const Card = ({ 
  children, 
  className = '', 
  hoverable = true,
  glass = false,
  padding = 'p-6',
  onClick,
  ...props 
}) => {
  return (
    <div
      onClick={onClick}
      className={`
        rounded-2xl transition-all duration-300 border
        ${glass 
          ? 'glass-panel shadow-sm' 
          : 'bg-white border-slate-150 shadow-card'
        }
        ${hoverable ? 'hover:shadow-card-hover hover:-translate-y-0.5' : ''}
        ${padding}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardHeader = ({ children, className = '' }) => (
  <div className={`flex items-center justify-between pb-4 border-b border-slate-100 mb-4 ${className}`}>
    {children}
  </div>
);

export const CardTitle = ({ children, className = '' }) => (
  <h3 className={`text-lg font-bold text-navy-900 tracking-tight flex items-center gap-2 ${className}`}>
    {children}
  </h3>
);

export const CardDescription = ({ children, className = '' }) => (
  <p className={`text-sm text-text-secondary ${className}`}>
    {children}
  </p>
);

export default Card;
