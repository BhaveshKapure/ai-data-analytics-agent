import React from 'react';

export const Skeleton = ({
  className = '',
  variant = 'text',
  width,
  height,
}) => {
  const base = 'animate-shimmer rounded-lg bg-slate-200';
  
  const variants = {
    text: 'h-4 w-full',
    circular: 'rounded-full w-10 h-10',
    rectangular: 'h-32 w-full',
    card: 'h-48 w-full rounded-2xl',
  };

  const style = {
    width: width ? width : undefined,
    height: height ? height : undefined,
  };

  return (
    <div
      className={`${base} ${variants[variant]} ${className}`}
      style={style}
    />
  );
};

export default Skeleton;
