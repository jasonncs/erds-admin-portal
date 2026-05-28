import { ReactNode, useState } from 'react';
import { Navigation, NavigationItem, UserProfile } from './Navigation';
import { Header } from './Header';
import { Banner, BannerVariant } from './Banner';

export interface LayoutProps {
  children: ReactNode;
  currentPage: NavigationItem;
  onNavigate: (page: NavigationItem) => void;
  pageTitle: string;
  hasUnsavedChanges?: boolean;
  onSave?: () => void;
  headerActions?: ReactNode;
  banners?: Array<{ id: string; variant: BannerVariant; message: string; dismissible?: boolean }>;
  onDismissBanner?: (id: string) => void;
  userProfile?: UserProfile;
  onSignOut?: () => void;
}

export function Layout({
  children,
  currentPage,
  onNavigate,
  pageTitle,
  hasUnsavedChanges,
  onSave,
  headerActions,
  banners = [],
  onDismissBanner,
  userProfile,
  onSignOut,
}: LayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="h-screen flex bg-[#FFFFFF]">
      <Navigation
        currentPage={currentPage}
        onNavigate={onNavigate}
        userProfile={userProfile}
        onSignOut={onSignOut}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <div className="flex-1 flex flex-col overflow-hidden w-full lg:w-auto">
        <Header
          title={pageTitle}
          hasUnsavedChanges={hasUnsavedChanges}
          onSave={onSave}
          actions={headerActions}
          onMenuClick={() => setIsSidebarOpen(true)}
        />

        {banners.length > 0 && (
          <div className="flex flex-col gap-2 p-4 bg-white border-b border-[#DFDFE3]">
            {banners.map((banner) => (
              <Banner
                key={banner.id}
                variant={banner.variant}
                message={banner.message}
                onDismiss={
                  banner.dismissible && onDismissBanner
                    ? () => onDismissBanner(banner.id)
                    : undefined
                }
              />
            ))}
          </div>
        )}

        <main className="flex-1 overflow-y-auto bg-[#F7F7F8]">
          {children}
        </main>
      </div>
    </div>
  );
}
