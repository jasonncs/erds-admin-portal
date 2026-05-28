import { LogIn } from 'lucide-react';
import { Button } from '../../components/Button';

export interface SignInProps {
  onSignIn: () => void;
}

export function SignIn({ onSignIn }: SignInProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F7F7F8]">
      <div className="w-full max-w-md p-8">
        <div className="bg-white rounded-lg border border-[#DFDFE3] p-8 shadow-lg">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#FFE8DE] mb-4">
              <LogIn className="w-8 h-8 text-[#FF8A5C]" />
            </div>
            <h1 className="text-2xl font-bold text-[#000000] mb-2">ERDS Admin Portal</h1>
            <p className="text-sm text-[#5E6072]">GraphQL Access Control Management</p>
          </div>

          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-[#E9EDF9] border border-[#1F4AC0]">
              <p className="text-sm text-[#09183F]">
                Sign in with your organization's Microsoft Entra ID account to access the admin portal.
              </p>
            </div>

            <Button onClick={onSignIn} className="w-full" size="lg">
              <LogIn className="w-5 h-5" />
              Sign in with Entra ID
            </Button>

            <div className="text-center">
              <p className="text-xs text-[#5E6072]">
                By signing in, you agree to the terms of service and privacy policy.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-xs text-[#5E6072]">
            ERDS Admin Portal v1.0.0
          </p>
          <p className="text-xs text-[#5E6072] mt-1">
            Need help? Contact your administrator
          </p>
        </div>
      </div>
    </div>
  );
}
