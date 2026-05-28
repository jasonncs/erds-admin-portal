import { ReactNode } from 'react';
import { cn } from '../utils/cn';
import { LucideIcon } from 'lucide-react';

export interface DashboardWidgetProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  variant?: 'default' | 'primary' | 'success' | 'warning';
  subtitle?: string;
  className?: string;
}

export function DashboardWidget({
  title,
  value,
  icon: Icon,
  variant = 'default',
  subtitle,
  className,
}: DashboardWidgetProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return 'border-[#FF8A5C] bg-[#FFF3EF]';
      case 'success':
        return 'border-[#30C97F] bg-[#EAFAF2]';
      case 'warning':
        return 'border-[#FCA81A] bg-[#FFF6E8]';
      default:
        return 'border-[#DFDFE3] bg-white';
    }
  };

  const getIconColor = () => {
    switch (variant) {
      case 'primary':
        return 'text-[#FF8A5C]';
      case 'success':
        return 'text-[#30C97F]';
      case 'warning':
        return 'text-[#FCA81A]';
      default:
        return 'text-[#FF8A5C]';
    }
  };

  return (
    <div
      className={cn(
        'p-4 lg:p-6 rounded-lg border-l-4 transition-shadow hover:shadow-md',
        getVariantStyles(),
        className
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-xs lg:text-sm text-[#5E6072] mb-2">{title}</p>
          <p className="text-2xl lg:text-3xl font-bold text-[#000000] truncate">{value}</p>
          {subtitle && (
            <p className="text-xs text-[#5E6072] mt-2">{subtitle}</p>
          )}
        </div>
        <div className="p-2.5 lg:p-3 rounded-lg bg-[rgba(255,138,92,0.1)] flex-shrink-0">
          <Icon className={cn('w-5 h-5 lg:w-6 lg:h-6', getIconColor())} />
        </div>
      </div>
    </div>
  );
}

export interface ActivityItemProps {
  timestamp: string;
  user: string;
  action: string;
  target: string;
}

export function ActivityItem({ timestamp, user, action, target }: ActivityItemProps) {
  return (
    <div className="flex items-start gap-3 py-3 border-b border-[#DFDFE3] last:border-b-0">
      <div className="flex-1">
        <p className="text-sm text-[#000000]">
          <span className="font-medium">{user}</span> {action}{' '}
          <span className="font-medium">{target}</span>
        </p>
        <p className="text-xs text-[#5E6072] mt-1">{timestamp}</p>
      </div>
    </div>
  );
}
