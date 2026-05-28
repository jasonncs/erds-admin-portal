import { Users, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import { DashboardWidget, ActivityItem } from '../components/DashboardWidget';

export function Dashboard() {
  const stats = {
    totalClients: 42,
    activeClients: 38,
    inactiveClients: 4,
    alerts: 2,
  };

  const recentActivity = [
    {
      timestamp: '2 hours ago',
      user: 'admin@example.com',
      action: 'updated policies for',
      target: 'client-app-prod',
    },
    {
      timestamp: '5 hours ago',
      user: 'operator@example.com',
      action: 'deactivated',
      target: 'legacy-client-v1',
    },
    {
      timestamp: '1 day ago',
      user: 'admin@example.com',
      action: 'created new client',
      target: 'mobile-app-v2',
    },
    {
      timestamp: '2 days ago',
      user: 'operator@example.com',
      action: 'ran testing suite for',
      target: 'client-web-dashboard',
    },
  ];

  return (
    <div className="p-4 lg:p-6 space-y-4 lg:space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        <DashboardWidget
          title="Total Clients"
          value={stats.totalClients}
          icon={Users}
          variant="default"
        />
        <DashboardWidget
          title="Active Clients"
          value={stats.activeClients}
          icon={CheckCircle}
          variant="success"
        />
        <DashboardWidget
          title="Inactive Clients"
          value={stats.inactiveClients}
          icon={XCircle}
          variant="default"
        />
        <DashboardWidget
          title="Alerts"
          value={stats.alerts}
          icon={AlertTriangle}
          variant="warning"
          subtitle="Schema drift detected"
        />
      </div>

      <div className="grid grid-cols-1 gap-6">
        <div className="bg-white rounded-lg border border-[#DFDFE3] p-6">
          <h2 className="text-lg font-semibold text-[#000000] mb-4">
            Schema Information
          </h2>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-[#5E6072]">Source</p>
              <p className="text-sm font-mono text-[#000000] mt-1">
                api.example.com/graphql
              </p>
            </div>
            <div>
              <p className="text-sm text-[#5E6072]">Schema Hash</p>
              <p className="text-sm font-mono text-[#000000] mt-1">
                a3f8b2c1d...
              </p>
            </div>
            <div>
              <p className="text-sm text-[#5E6072]">Last Updated</p>
              <p className="text-sm text-[#000000] mt-1">2 days ago</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-[#DFDFE3] p-6">
        <h2 className="text-lg font-semibold text-[#000000] mb-4">
          Recent Activity
        </h2>
        <div className="space-y-0">
          {recentActivity.map((activity, index) => (
            <ActivityItem key={index} {...activity} />
          ))}
        </div>
      </div>
    </div>
  );
}
