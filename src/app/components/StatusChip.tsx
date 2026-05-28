import { cn } from '../utils/cn';

export type StatusVariant = 'active' | 'inactive' | 'warning' | 'error' | 'info';

export interface StatusChipProps {
  variant: StatusVariant;
  label: string;
  className?: string;
}

export function StatusChip({ variant, label, className }: StatusChipProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case 'active':
        return 'bg-[#EAFAF2] text-[#0F4F34] border border-[#30C97F]';
      case 'inactive':
        return 'bg-[#F7F7F8] text-[#5E6072] border border-[#DFDFE3]';
      case 'warning':
        return 'bg-[#FFF6E8] text-[#6B4206] border border-[#FCA81A]';
      case 'error':
        return 'bg-[#FAD6D7] text-[#611617] border border-[#DE3638]';
      case 'info':
        return 'bg-[#E9EDF9] text-[#09183F] border border-[#1F4AC0]';
      default:
        return '';
    }
  };

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium',
        getVariantStyles(),
        className
      )}
    >
      {label}
    </span>
  );
}
