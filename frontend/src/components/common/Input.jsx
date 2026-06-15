import React from 'react';

export default function Input({
  label,
  type = 'text',
  placeholder = '',
  name,
  value,
  onChange,
  required = false,
  error = '',
  className = '',
  textarea = false,
  rows = 4,
  ...props
}) {
  const inputClass = `w-full px-4 py-3 rounded-2xl bg-stone-50 border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-stone-800 transition-all placeholder:text-stone-400/80 ${
    error ? 'border-rose-500 focus:ring-rose-500' : 'border-stone-200'
  }`;

  return (
    <div className={`flex flex-col gap-2 text-right ${className}`} dir="rtl">
      {label && (
        <label htmlFor={name} className="text-sm font-semibold text-stone-700">
          {label} {required && <span className="text-rose-500">*</span>}
        </label>
      )}

      {textarea ? (
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          rows={rows}
          className={inputClass}
          {...props}
        />
      ) : (
        <input
          id={name}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={inputClass}
          {...props}
        />
      )}

      {error && <span className="text-xs text-rose-500">{error}</span>}
    </div>
  );
}
