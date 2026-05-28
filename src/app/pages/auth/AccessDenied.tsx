import { ShieldX } from 'lucide-react';
import { Button } from '../../components/Button';

export interface AccessDeniedProps {
  onBackToSignIn: () => void;
}

export function AccessDenied({ onBackToSignIn }: AccessDeniedProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F7F7F8]">
      <div className="w-full max-w-md p-8">
        <div className="bg-white rounded-lg border border-[#DFDFE3] p-8 shadow-lg">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#FAD6D7] mb-4">
              <ShieldX className="w-8 h-8 text-[#DE3638]" />
            </div>
            <h1 className="text-2xl font-bold text-[#000000] mb-2">Access Denied</h1>
            <p className="text-sm text-[#5E6072]">
              You do not have permission to access this application
            </p>
          </div>

          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-[#FAD6D7] border border-[#DE3638]">
              <p className="text-sm font-medium text-[#611617] mb-2">
                Why am I seeing this?
              </p>
              <ul className="text-sm text-[#611617] space-y-1 list-disc list-inside">
                <li>Your account does not have the required role</li>
                <li>Your access may have been revoked</li>
                <li>Your organization has not granted you access</li>
              </ul>
            </div>

            <Button onClick={onBackToSignIn} variant="secondary" className="w-full">
              Back to Sign In
            </Button>

            <div className="text-center">
              <p className="text-xs text-[#5E6072]">
                If you believe this is an error, please contact your administrator.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-xs text-[#5E6072]">
            ERDS Admin Portal v1.0.0
          </p>
        </div>
      </div>
    </div>
  );
}
