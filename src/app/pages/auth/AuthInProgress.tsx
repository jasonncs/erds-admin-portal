import { Loader2 } from 'lucide-react';

export function AuthInProgress() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F7F7F8]">
      <div className="w-full max-w-md p-8">
        <div className="bg-white rounded-lg border border-[#DFDFE3] p-8 shadow-lg">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#FFE8DE] mb-6">
              <Loader2 className="w-8 h-8 text-[#FF8A5C] animate-spin" />
            </div>
            <h2 className="text-xl font-semibold text-[#000000] mb-2">
              Authenticating...
            </h2>
            <p className="text-sm text-[#5E6072]">
              Please wait while we verify your credentials with Microsoft Entra ID
            </p>
          </div>

          <div className="mt-8 space-y-2">
            <div className="h-2 bg-[#F7F7F8] rounded-full overflow-hidden">
              <div className="h-full bg-[#FF8A5C] rounded-full animate-pulse" style={{ width: '60%' }} />
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-xs text-[#5E6072]">
            This may take a few moments. Do not close this window.
          </p>
        </div>
      </div>
    </div>
  );
}
