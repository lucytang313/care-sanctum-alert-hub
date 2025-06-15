
import React, { useState } from 'react';
import { cn } from '@/lib/utils';

interface AnimatedInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const AnimatedInput: React.FC<AnimatedInputProps> = ({
  label,
  className,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    setHasValue(e.target.value !== '');
    props.onBlur?.(e);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHasValue(e.target.value !== '');
    props.onChange?.(e);
  };

  const isFloating = isFocused || hasValue || props.value;

  return (
    <div className="relative">
      <input
        {...props}
        className={cn(
          "peer w-full px-4 pt-6 pb-2 border border-gray-300 rounded-lg bg-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
          className
        )}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleChange}
        placeholder=""
      />
      <label
        className={cn(
          "absolute left-4 text-gray-500 transition-all duration-200 pointer-events-none",
          isFloating
            ? "top-2 text-xs text-blue-600 font-medium"
            : "top-1/2 transform -translate-y-1/2 text-base"
        )}
      >
        {label}
      </label>
    </div>
  );
};
