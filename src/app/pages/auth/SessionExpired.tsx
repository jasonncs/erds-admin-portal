import { Clock } from 'lucide-react';
import { Button } from '../../components/Button';

export interface SessionExpiredProps {
  onSignIn: () => void;
}

export function SessionExpired({ onSignIn }: SessionExpiredProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F7F7F8]">
      <div className="w-full max-w-md p-8">
        <div className="bg-white rounded-lg border border-[#DFDFE3] p-8 shadow-lg">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#FFF6E8] mb-4">
              <Clock className="w-8 h-8 text-[#FCA81A]" />
            </div>
            <h1 className="text-2xl font-bold text-[#000000] mb-2">Session Expired</h1>
            <p className="text-sm text-[#5E6072]">
              Your session has expired due to inactivity
            </p>
          </div>

          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-[#FFF6E8] border border-[#FCA81A]">
              <p className="text-sm text-[#6B4206]">
                For your security, you have been automatically signed out after a period of
                inactivity. Please sign in again to continue.
              </p>
            </div>

            <Button onClick={onSignIn} className="w-full">
              Sign In Again
            </Button>

            <div className="text-center">
              <p className="text-xs text-[#5E6072]">
                Your work may have been saved automatically.
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
