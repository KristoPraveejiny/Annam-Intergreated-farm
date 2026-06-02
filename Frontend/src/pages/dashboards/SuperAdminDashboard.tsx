// Super Admin Dashboard – extracted from DashboardPage.tsx
import { Card } from '../../components/ui/Card';
import { SectionHeading } from '../../components/ui/SectionHeading';
import { ChartPanel } from '../../components/ui/ChartPanel';
import { FiShield, FiGrid, FiAlertTriangle, FiActivity, FiUsers, FiDollarSign } from 'react-icons/fi';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';
import { chartSeries, pieData, colors, metrics, alerts } from '../../data/mock';

export default function SuperAdminDashboard() {
  return (
    <>
      <div className="grid gap-6 xl:grid-cols-[1.35fr_0.95fr]">
        <ChartPanel title="System Analytics">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartSeries}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="revenue" stroke="#059669" strokeWidth={3} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="productivity" stroke="#84cc16" strokeWidth={3} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </ChartPanel>

        <Card title="Security Logs" subtitle="Recent events and configuration status">
          <div className="space-y-4">
            {[
              ['2FA enabled for 32 users', 'System'],
              ['QR configuration synced', 'Security'],
              ['Weather API key refreshed', 'Integration'],
              ['Exported monthly reports', 'Reports'],
            ].map(([text, group]) => (
              <div key={text} className="flex items-start gap-3 rounded-2xl border border-slate-100 p-3">
                <FiShield className="mt-1 text-emerald-600" />
                <div>
                  <p className="text-sm font-semibold text-slate-900">{text}</p>
                  <p className="text-xs text-slate-500">{group}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card title="User Management" subtitle="Admins, managers, workers, and customers">
          <div className="overflow-hidden rounded-2xl border border-slate-100">
            <table className="min-w-full divide-y divide-slate-100 text-left text-sm">
              <thead className="bg-slate-50 text-slate-500">
                <tr>
                  <th className="px-4 py-3 font-semibold">User</th>
                  <th className="px-4 py-3 font-semibold">Role</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {[
                  ['Ananya', 'Super Admin', 'Active'],
                  ['Ramesh', 'Farm Manager', 'Active'],
                  ['Kiran', 'Worker', 'Pending'],
                  ['Sita', 'Customer', 'Active'],
                ].map(([user, role, status]) => (
                  <tr key={user}>
                    <td className="px-4 py-3 font-medium text-slate-900">{user}</td>
                    <td className="px-4 py-3 text-slate-600">{role}</td>
                    <td className="px-4 py-3">
                      <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">{status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card title="AI & Weather Configuration" subtitle="API settings, thresholds, and smart alerts">
          <div className="grid gap-4 sm:grid-cols-2">
            <ConfigCard title="Weather API" icon={<FiCloud />} value="Enabled" />
            <ConfigCard title="AI Models" icon={<FiCpu />} value="Live" />
            <ConfigCard title="QR Sync" icon={<FiGrid />} value="Configured" />
            <ConfigCard title="Notifications" icon={<FiAlertTriangle />} value="92 rules" />
          </div>
        </Card>

        <ChartPanel title="Role Distribution">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={pieData} dataKey="value" nameKey="name" innerRadius={62} outerRadius={90} paddingAngle={4}>
                {pieData.map((entry, index) => (
                  <Cell key={entry.name} fill={colors[index % colors.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </ChartPanel>
      </div>
    </>
  );
}

// Helper component used above – re‑exported for convenience
function ConfigCard({ title, value, icon }: { title: string; value: string; icon: React.ReactNode }) {
  return (
    <div className="rounded-3xl border border-slate-100 p-4">
      <div className="flex items-center gap-3 text-sm font-semibold text-slate-900">{icon}{title}</div>
      <p className="mt-3 text-2xl font-black text-emerald-700">{value}</p>
    </div>
  );
}
