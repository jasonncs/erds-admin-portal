import { InputHTMLAttributes, forwardRef } from 'react';
import { cn } from '../utils/cn';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  helperText?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, helperText, ...props }, ref) => {
    return (
      <div className="w-full">
        <input
          className={cn(
            'w-full h-10 px-3 rounded-lg border transition-colors',
            'bg-white text-[#000000]',
            'border-[#DFDFE3] focus:border-[#FF8A5C] focus:outline-none',
            'placeholder:text-[#7E7F8E]',
            error && 'border-[#DE3638] focus:border-[#DE3638]',
            'disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-[#F7F7F8]',
            className
          )}
          ref={ref}
          {...props}
        />
        {helperText && (
          <p
            className={cn(
              'mt-1 text-xs',
              error ? 'text-[#DE3638]' : 'text-[#5E6072]'
            )}
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
