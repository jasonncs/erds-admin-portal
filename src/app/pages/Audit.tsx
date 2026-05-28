import { Clock } from 'lucide-react';

export function Audit() {
  return (
    <div className="p-4 lg:p-6">
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <div className="w-16 h-16 rounded-full bg-[#FFE8DE] flex items-center justify-center mb-6">
          <Clock className="w-8 h-8 text-[#FF8A5C]" />
        </div>

        <h2 className="text-2xl font-semibold text-[#000000] mb-3">
          Audit & Activity Tracking
        </h2>

        <p className="text-[#5E6072] max-w-md mb-6">
          This feature will provide comprehensive audit logs and activity tracking for all client
          operations, policy changes, and system events.
        </p>

        <div className="bg-white border border-[#DFDFE3] rounded-lg p-6 max-w-2xl w-full text-left">
          <h3 className="text-lg font-semibold text-[#000000] mb-4">
            Planned Features
          </h3>

          <ul className="space-y-3 text-sm text-[#5E6072]">
            <li className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF8A5C] mt-1.5 flex-shrink-0" />
              <span>Complete audit trail of all policy modifications with before/after snapshots</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF8A5C] mt-1.5 flex-shrink-0" />
              <span>Client creation, activation, and deactivation history</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF8A5C] mt-1.5 flex-shrink-0" />
              <span>User activity tracking with timestamps and action details</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF8A5C] mt-1.5 flex-shrink-0" />
              <span>Searchable and filterable audit logs by date, user, and action type</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF8A5C] mt-1.5 flex-shrink-0" />
              <span>Export capabilities for compliance and reporting</span>
            </li>
          </ul>

          <div className="mt-6 pt-6 border-t border-[#DFDFE3]">
            <p className="text-xs text-[#5E6072]">
              Expected release: Q3 2026
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
