import { useState } from 'react';
import { Layout } from './components/Layout';
import { NavigationItem, UserProfile } from './components/Navigation';
import { Dashboard } from './pages/Dashboard';
import { Clients } from './pages/Clients';
import { PolicyStudio } from './pages/PolicyStudio';
import { Testing } from './pages/Testing';
import { Audit } from './pages/Audit';
import { Settings } from './pages/Settings';
import { BannerVariant } from './components/Banner';
import { SignIn } from './pages/auth/SignIn';
import { AuthInProgress } from './pages/auth/AuthInProgress';

type AuthState = 'signed-out' | 'authenticating' | 'authenticated';

export default function App() {
  const [authState, setAuthState] = useState<AuthState>('signed-out');
  const [currentPage, setCurrentPage] = useState<NavigationItem>('dashboard');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [userProfile] = useState<UserProfile>({
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'Admin',
  });
  const [banners, setBanners] = useState<
    Array<{ id: string; variant: BannerVariant; message: string; dismissible?: boolean }>
  >([
    {
      id: 'schema-drift',
      variant: 'warning',
      message:
        'Schema drift detected: 2 new fields added to User resource. Review and update policies as needed.',
      dismissible: true,
    },
  ]);

  const handleSignIn = () => {
    setAuthState('authenticating');
    setTimeout(() => {
      setAuthState('authenticated');
    }, 2000);
  };

  const handleSignOut = () => {
    if (hasUnsavedChanges) {
      const confirmed = window.confirm(
        'You have unsaved changes. Are you sure you want to sign out?'
      );
      if (!confirmed) return;
      setHasUnsavedChanges(false);
    }
    setAuthState('signed-out');
    setCurrentPage('dashboard');
  };

  const handleNavigate = (page: NavigationItem) => {
    if (hasUnsavedChanges) {
      const confirmed = window.confirm(
        'You have unsaved changes. Are you sure you want to leave this page?'
      );
      if (!confirmed) return;
      setHasUnsavedChanges(false);
    }
    setCurrentPage(page);
  };

  const handleSave = () => {
    setTimeout(() => {
      setHasUnsavedChanges(false);
      setBanners([
        {
          id: Date.now().toString(),
          variant: 'success',
          message: 'Policies saved successfully',
          dismissible: true,
        },
        ...banners,
      ]);
    }, 500);
  };

  const handleDismissBanner = (id: string) => {
    setBanners(banners.filter((banner) => banner.id !== id));
  };

  const getPageTitle = () => {
    switch (currentPage) {
      case 'dashboard':
        return 'Dashboard';
      case 'clients':
        return 'Clients';
      case 'policy-studio':
        return 'Policy Studio';
      case 'testing':
        return 'Testing & Verification';
      case 'audit':
        return 'Audit & Activity';
      case 'settings':
        return 'Settings';
      default:
        return 'ERDS Admin';
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'clients':
        return <Clients />;
      case 'policy-studio':
        return (
          <PolicyStudio
            hasUnsavedChanges={hasUnsavedChanges}
            onUnsavedChangesChange={setHasUnsavedChanges}
          />
        );
      case 'testing':
        return <Testing />;
      case 'audit':
        return <Audit />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  if (authState === 'signed-out') {
    return <SignIn onSignIn={handleSignIn} />;
  }

  if (authState === 'authenticating') {
    return <AuthInProgress />;
  }

  return (
    <Layout
      currentPage={currentPage}
      onNavigate={handleNavigate}
      pageTitle={getPageTitle()}
      hasUnsavedChanges={hasUnsavedChanges && currentPage === 'policy-studio'}
      onSave={handleSave}
      banners={banners}
      onDismissBanner={handleDismissBanner}
      userProfile={userProfile}
      onSignOut={handleSignOut}
    >
      {renderPage()}
    </Layout>
  );
}
