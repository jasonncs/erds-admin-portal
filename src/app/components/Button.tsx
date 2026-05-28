import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../utils/cn';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 rounded-lg transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed',
  {
    variants: {
      variant: {
        primary: 'bg-[#FF8A5C] text-white hover:bg-[#E07045]',
        secondary: 'bg-white text-[#33363F] border border-[#DFDFE3] hover:bg-[#F7F7F8]',
        tertiary: 'bg-[#FFF3EF] text-[#E07045] hover:bg-[#FFE8DE]',
        destructive: 'bg-[#DE3638] text-white hover:bg-[#C72F31]',
        ghost: 'text-[#33363F] hover:bg-[rgba(0,0,0,0.04)]',
      },
      size: {
        sm: 'h-9 px-3 text-sm',
        md: 'h-10 px-4 text-sm',
        lg: 'h-11 px-5 text-base',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size }), className)}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';
