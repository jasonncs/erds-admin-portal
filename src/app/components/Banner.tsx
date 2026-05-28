import { X, AlertCircle, AlertTriangle, CheckCircle, Info } from 'lucide-react';
import { cn } from '../utils/cn';

export type BannerVariant = 'success' | 'warning' | 'error' | 'info';

export interface BannerProps {
  variant: BannerVariant;
  message: string;
  onDismiss?: () => void;
  className?: string;
}

export function Banner({ variant, message, onDismiss, className }: BannerProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case 'success':
        return {
          container: 'bg-[#EAFAF2] border-[#30C97F]',
          text: 'text-[#0F4F34]',
          icon: CheckCircle,
        };
      case 'warning':
        return {
          container: 'bg-[#FFF6E8] border-[#FCA81A]',
          text: 'text-[#6B4206]',
          icon: AlertTriangle,
        };
      case 'error':
        return {
          container: 'bg-[#FAD6D7] border-[#DE3638]',
          text: 'text-[#611617]',
          icon: AlertCircle,
        };
      case 'info':
        return {
          container: 'bg-[#E9EDF9] border-[#1F4AC0]',
          text: 'text-[#09183F]',
          icon: Info,
        };
    }
  };

  const styles = getVariantStyles();
  const Icon = styles.icon;

  return (
    <div
      className={cn(
        'flex items-start gap-3 p-4 rounded-lg border-l-4',
        styles.container,
        className
      )}
    >
      <Icon className={cn('w-5 h-5 flex-shrink-0', styles.text)} />
      <p className={cn('flex-1 text-sm font-medium', styles.text)}>{message}</p>
      {onDismiss && (
        <button
          onClick={onDismiss}
          className={cn('flex-shrink-0 hover:opacity-70', styles.text)}
          aria-label="Dismiss"
        >
          <X className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}
