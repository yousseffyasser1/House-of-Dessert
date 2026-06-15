import React from 'react';

export default function Button({
  children,
  type = 'button',
  variant = 'primary', // primary, secondary, danger, outline, text
  onClick,
  disabled = false,
  className = '',
  icon,
  ...props
}) {
  const baseStyles = 'inline-flex items-center justify-center font-bold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 active:scale-95 disabled:opacity-50 disabled:pointer-events-none rounded-full';
  
  const variants = {
    primary: 'bg-amber-500 hover:bg-amber-600 text-stone-900 shadow-sm border border-transparent',
    secondary: 'bg-[#2D1B13] hover:bg-[#3E2723] text-amber-100 shadow-sm border border-transparent',
    danger: 'bg-rose-600 hover:bg-rose-700 text-white shadow-sm border border-transparent',
    outline: 'border-2 border-amber-500 text-amber-700 hover:bg-amber-50 bg-transparent',
    text: 'text-stone-600 hover:text-amber-700 bg-transparent hover:bg-stone-50',
  };

  const sizes = {
    sm: 'px-4 py-2 text-xs',
    md: 'px-6 py-2.5 text-sm',
    lg: 'px-8 py-3.5 text-base',
  };

  const size = props.size || 'md';

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {icon && <span className="ml-2 flex items-center justify-center">{icon}</span>}
      {children}
    </button>
  );
}
