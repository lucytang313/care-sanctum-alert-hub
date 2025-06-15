
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
          "peer w-full px-4 py-4 border-2 rounded-lg bg-transparent transition-all duration-300 focus:outline-none text-white placeholder-transparent",
          isFocused 
            ? "border-cyan-400 shadow-lg shadow-cyan-400/20" 
            : "border-gray-600 hover:border-gray-500",
          className
        )}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleChange}
        placeholder={label}
      />
      <label
        className={cn(
          "absolute left-4 text-gray-400 transition-all duration-300 pointer-events-none bg-gray-900 px-1",
          isFloating
            ? "-top-2.5 text-sm text-cyan-400 font-medium"
            : "top-4 text-base"
        )}
      >
        {label}
      </label>
    </div>
  );
};
