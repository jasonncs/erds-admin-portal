import { AlertTriangle, Save, Menu } from 'lucide-react';
import { cn } from '../utils/cn';
import { Button } from './Button';

export interface HeaderProps {
  title: string;
  hasUnsavedChanges?: boolean;
  onSave?: () => void;
  actions?: React.ReactNode;
  className?: string;
  onMenuClick?: () => void;
}

export function Header({ title, hasUnsavedChanges, onSave, actions, className, onMenuClick }: HeaderProps) {
  return (
    <header
      className={cn(
        'h-16 border-b border-[#DFDFE3] px-4 lg:px-6 flex items-center justify-between',
        'bg-white',
        className
      )}
    >
      <div className="flex items-center gap-3 lg:gap-4 flex-1 min-w-0">
        {onMenuClick && (
          <button
            onClick={onMenuClick}
            className="lg:hidden text-[#33363F] hover:text-[#000000] flex-shrink-0"
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        )}
        <h1 className="text-xl lg:text-2xl font-semibold text-[#000000] truncate">{title}</h1>
        {hasUnsavedChanges && (
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#FFF6E8] text-[#6B4206] border border-[#FCA81A] flex-shrink-0">
            <AlertTriangle className="w-4 h-4" />
            <span className="text-sm font-medium whitespace-nowrap">Unsaved changes</span>
          </div>
        )}
      </div>

      <div className="flex items-center gap-2 lg:gap-3 flex-shrink-0">
        {hasUnsavedChanges && onSave && (
          <Button onClick={onSave} size="sm">
            <Save className="w-4 h-4" />
            <span className="hidden sm:inline">Save Changes</span>
            <span className="sm:hidden">Save</span>
          </Button>
        )}
        {actions}
      </div>
    </header>
  );
}
