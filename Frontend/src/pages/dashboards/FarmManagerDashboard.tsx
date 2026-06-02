// Farm Manager Dashboard – extracted from DashboardPage.tsx
import { Card } from '../../components/ui/Card';
import { ProgressBar } from '../../components/ui/ProgressBar';
import { SectionHeading } from '../../components/ui/SectionHeading';
import { ChartPanel } from '../../components/ui/ChartPanel';
import { FiCheckCircle, FiUsers, FiAlertTriangle, FiActivity } from 'react-icons/fi';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { chartSeries, tasks, alerts } from '../../data/mock';

export default function FarmManagerDashboard() {
  return (
    <>
      <SectionHeading eyebrow="Dashboard" title="Farm Manager Overview" description="Operations, workforce, and analytics for your farm." tone="light" />
      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        {/* Crop Overview */}
        <Card title="Crop Overview" subtitle="Field health and growth progress">
          <div className="space-y-5">
            <ProgressBar value={82} label="Rice block" />
            <ProgressBar value={68} label="Vegetable block" />
            <ProgressBar value={91} label="Fruit orchard" />
          </div>
        </Card>
        {/* Livestock Overview */}
        <Card title="Livestock Overview" subtitle="Health, feed, and production tracking">
          <div className="grid gap-4 sm:grid-cols-3">
            <MiniMetric label="Healthy" value="126" />
            <MiniMetric label="Feeding due" value="18" />
            <MiniMetric label="Milk yield" value="1,240L" />
          </div>
        </Card>
        {/* Task Progress Cards */}
        <Card title="Task Progress Cards" subtitle="Work allocation across teams">
          <div className="grid gap-4 md:grid-cols-2">
            {tasks.map((task) => (
              <div key={task.title} className="rounded-3xl border border-slate-100 p-4">
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-slate-900">{task.title}</p>
                  <span className="text-xs text-slate-500">{task.assignee}</span>
                </div>
                <div className="mt-3">
                  <ProgressBar value={task.progress} />
                </div>
              </div>
            ))}
          </div>
        </Card>
        {/* Calendar View */}
        <Card title="Calendar View" subtitle="Upcoming field events">
          <div className="grid grid-cols-7 gap-2 text-center text-xs font-semibold text-slate-500">
            {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day) => (
              <span key={day}>{day}</span>
            ))}
            {Array.from({ length: 28 }, (_, i) => i + 1).map((date) => (
              <div
                key={date}
                className={`rounded-2xl p-2 ${date === 18 ? 'bg-emerald-600 text-white' : 'bg-slate-50 text-slate-700'}`}
              >
                {date}
              </div>
            ))}
          </div>
        </Card>
        {/* Farm Activity Timeline */}
        <Card title="Farm Activity Timeline" subtitle="Latest operational updates">
          <div className="space-y-4">
            {[
              ['08:00', 'Irrigation started in Block A'],
              ['10:15', 'Disease alert reviewed by manager'],
              ['12:30', 'Harvest batch packed for marketplace'],
              ['15:20', 'Salary approvals completed'],
            ].map(([time, text]) => (
              <div key={time} className="flex gap-4 rounded-2xl border border-slate-100 p-4">
                <span className="min-w-16 text-sm font-semibold text-emerald-700">{time}</span>
                <p className="text-sm text-slate-600">{text}</p>
              </div>
            ))}
          </div>
        </Card>
        {/* Productivity Chart */}
        <ChartPanel title="Productivity Chart">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartSeries}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip />
              <Bar dataKey="productivity" fill="#16a34a" radius={[10, 10, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartPanel>
      </div>
    </>
  );
}

function MiniMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-3xl bg-slate-50 p-4">
      <div className="flex items-center gap-2 text-sm font-semibold text-slate-500">
        {label}
      </div>
      <p className="mt-2 text-2xl font-black text-slate-900">{value}</p>
    </div>
  );
}
