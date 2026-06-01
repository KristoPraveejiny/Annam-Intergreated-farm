import type { ReactNode } from 'react';
import { FiBarChart2, FiClock, FiDollarSign, FiUsers } from 'react-icons/fi';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Card } from '../components/ui/Card';
import { SectionHeading } from '../components/ui/SectionHeading';

const performance = [
  { name: 'Mon', score: 70 },
  { name: 'Tue', score: 82 },
  { name: 'Wed', score: 77 },
  { name: 'Thu', score: 88 },
  { name: 'Fri', score: 91 },
];

export default function WorkforceManagementPage() {
  return (
    <div className="section-shell py-10">
      <SectionHeading eyebrow="Workforce" title="Workforce management" description="Track attendance, salary management, performance charts, and task assignments in one clean interface." tone="light" />

      <div className="grid gap-6 xl:grid-cols-[1fr_0.95fr]">
        <Card title="Worker List" subtitle="Active workforce overview">
          <div className="overflow-hidden rounded-2xl border border-slate-100">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-500"><tr><th className="px-4 py-3">Name</th><th className="px-4 py-3">Role</th><th className="px-4 py-3">Status</th></tr></thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {[
                  ['Ravi', 'Field worker', 'Present'],
                  ['Meena', 'Packhouse', 'Present'],
                  ['Suresh', 'Irrigation', 'On leave'],
                ].map(([name, role, status]) => (
                  <tr key={name}><td className="px-4 py-3 font-medium text-slate-900">{name}</td><td className="px-4 py-3 text-slate-600">{role}</td><td className="px-4 py-3 text-emerald-700">{status}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <div className="grid gap-6">
          <Card title="Attendance Table" subtitle="Daily check-in">
            <div className="grid gap-3 sm:grid-cols-2">
              <MiniMetric label="Present" value="42" icon={<FiUsers />} />
              <MiniMetric label="Late" value="3" icon={<FiClock />} />
            </div>
          </Card>
          <Card title="Salary Management" subtitle="Compensation overview">
            <div className="grid gap-3 sm:grid-cols-2">
              <MiniMetric label="Monthly payroll" value="$8,420" icon={<FiDollarSign />} />
              <MiniMetric label="Bonus pool" value="$1,200" icon={<FiBarChart2 />} />
            </div>
          </Card>
        </div>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1fr_0.95fr]">
        <Card title="Task Assignment" subtitle="Work allocation by team">
          <div className="space-y-3 text-sm text-slate-600">
            <Row label="Irrigation check" value="Team A" />
            <Row label="Harvest sorting" value="Team B" />
            <Row label="Livestock feeding" value="Team C" />
          </div>
        </Card>
        <Card title="Worker Performance Charts" subtitle="Weekly performance score">
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={performance}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="name" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip />
                <Bar dataKey="score" fill="#16a34a" radius={[10, 10, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return <div className="flex items-center justify-between rounded-2xl border border-slate-100 p-4"><span className="font-medium text-slate-900">{label}</span><span>{value}</span></div>;
}

function MiniMetric({ label, value, icon }: { label: string; value: string; icon: ReactNode }) {
  return <div className="rounded-3xl bg-slate-50 p-4"><div className="flex items-center gap-2 text-sm font-semibold text-slate-500">{icon}{label}</div><p className="mt-2 text-2xl font-black text-slate-900">{value}</p></div>;
}