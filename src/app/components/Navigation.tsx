import { LayoutDashboard, Users, Shield, TestTube, Activity, Settings, LogOut, User, X } from 'lucide-react';
import { cn } from '../utils/cn';

export type NavigationItem = 'dashboard' | 'clients' | 'policy-studio' | 'testing' | 'audit' | 'settings';

export interface UserProfile {
  name: string;
  email: string;
  role: 'Admin' | 'Operator' | 'ReadOnly';
}

export interface NavigationProps {
  currentPage: NavigationItem;
  onNavigate: (page: NavigationItem) => void;
  userProfile?: UserProfile;
  onSignOut?: () => void;
  isOpen?: boolean;
  onClose?: () => void;
}

const navItems = [
  { id: 'dashboard' as const, label: 'Dashboard', icon: LayoutDashboard },
  { id: 'clients' as const, label: 'Clients', icon: Users },
  { id: 'policy-studio' as const, label: 'Policy Studio', icon: Shield },
  { id: 'testing' as const, label: 'Testing & Verification', icon: TestTube },
  { id: 'audit' as const, label: 'Audit & Activity', icon: Activity },
  { id: 'settings' as const, label: 'Settings', icon: Settings },
];

export function Navigation({ currentPage, onNavigate, userProfile, onSignOut, isOpen, onClose }: NavigationProps) {
  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'Admin':
        return 'bg-[#E9EDF9] text-[#09183F] border-[#1F4AC0]';
      case 'Operator':
        return 'bg-[#FFF6E8] text-[#6B4206] border-[#FCA81A]';
      case 'ReadOnly':
        return 'bg-[#F7F7F8] text-[#5E6072] border-[#DFDFE3]';
      default:
        return 'bg-[#F7F7F8] text-[#5E6072] border-[#DFDFE3]';
    }
  };

  const handleNavigate = (page: NavigationItem) => {
    onNavigate(page);
    if (onClose) {
      onClose();
    }
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Navigation sidebar */}
      <nav
        className={cn(
          'fixed lg:relative inset-y-0 left-0 z-50 w-64 h-full bg-[#FAFAFA] border-r border-[#DFDFE3] flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
      <div className="p-6 border-b border-[#DFDFE3]">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-[#FF8A5C]">ERDS Admin</h1>
            <p className="text-xs text-[#5E6072] mt-1">GraphQL Access Control</p>
          </div>
          {/* Mobile close button */}
          {onClose && (
            <button
              onClick={onClose}
              className="lg:hidden text-[#5E6072] hover:text-[#000000]"
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>
          )}
        </div>
      </div>

      {userProfile && (
        <div className="p-4 border-b border-[#DFDFE3]">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-[#FFE8DE] flex items-center justify-center flex-shrink-0">
              <User className="w-5 h-5 text-[#E07045]" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-[#000000] truncate">{userProfile.name}</p>
              <p className="text-xs text-[#5E6072] truncate">{userProfile.email}</p>
              <span
                className={cn(
                  'inline-block mt-1.5 px-2 py-0.5 rounded-full text-xs font-medium border',
                  getRoleBadgeColor(userProfile.role)
                )}
              >
                {userProfile.role}
              </span>
            </div>
          </div>
        </div>
      )}

      <div className="flex-1 px-3 py-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;

          return (
            <button
              key={item.id}
              onClick={() => handleNavigate(item.id)}
              className={cn(
                'w-full flex items-center gap-3 px-3 py-3 rounded-lg text-sm transition-colors mb-1',
                isActive
                  ? 'bg-[#FFE8DE] text-[#000000] font-medium'
                  : 'text-[#33363F] hover:bg-[rgba(0,0,0,0.04)]'
              )}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

      <div className="p-4 border-t border-[#DFDFE3] space-y-3">
        {onSignOut && userProfile && (
          <button
            onClick={onSignOut}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-[#DE3638] hover:bg-[#FAD6D7] transition-colors"
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            <span>Sign Out</span>
          </button>
        )}
        <div className="text-xs text-[#5E6072]">
          <p>Environment: Production</p>
          <p className="mt-1">v1.0.0</p>
        </div>
      </div>
      </nav>
    </>
  );
}
