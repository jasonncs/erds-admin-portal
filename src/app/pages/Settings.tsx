import { Input } from '../components/Input';

export function Settings() {
  return (
    <div className="p-4 lg:p-6 space-y-4 lg:space-y-6">
      <div className="bg-white rounded-lg border border-[#DFDFE3] p-6">
        <h2 className="text-lg font-semibold text-[#000000] mb-4">
          Environment Configuration
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#000000] mb-2">
              Environment
            </label>
            <Input type="text" value="Production" disabled />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#000000] mb-2">
              GraphQL API Source
            </label>
            <Input type="text" value="https://api.example.com/graphql" disabled />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#000000] mb-2">
              Schema Endpoint
            </label>
            <Input type="text" value="https://api.example.com/graphql/schema" disabled />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-[#DFDFE3] p-6">
        <h2 className="text-lg font-semibold text-[#000000] mb-4">
          Authentication & Authorization
        </h2>

        <div className="space-y-4">
          <div className="p-4 rounded-lg bg-[#E9EDF9] border border-[#1F4AC0]">
            <p className="text-sm text-[#09183F]">
              <strong>Pending Feature:</strong> Entra ID (Azure AD) authentication configuration will
              be available in a future release.
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#000000] mb-2">
              Authentication Provider
            </label>
            <Input type="text" value="Entra ID (Coming Soon)" disabled />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#000000] mb-2">
              Tenant ID
            </label>
            <Input type="text" value="Not configured" disabled />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#000000] mb-2">
              Role Mapping
            </label>
            <div className="space-y-2 text-sm text-[#5E6072]">
              <p>• Admin: Full access to all features</p>
              <p>• Operator: Limited settings access</p>
              <p>• ReadOnly: View-only access</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-[#DFDFE3] p-6">
        <h2 className="text-lg font-semibold text-[#000000] mb-4">
          System Information
        </h2>

        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-sm text-[#5E6072]">Version</span>
            <span className="text-sm font-mono text-[#000000]">1.0.0</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-[#5E6072]">Build Date</span>
            <span className="text-sm text-[#000000]">2026-05-20</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-[#5E6072]">Last Schema Sync</span>
            <span className="text-sm text-[#000000]">2 days ago</span>
          </div>
        </div>
      </div>
    </div>
  );
}
