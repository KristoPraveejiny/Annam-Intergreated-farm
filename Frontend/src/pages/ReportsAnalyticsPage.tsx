import type { ReactNode } from 'react';
import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { SectionHeading } from '../components/ui/SectionHeading';
import { chartSeries } from '../data/mock';

export default function ReportsAnalyticsPage() {
  return (
    <div className="section-shell py-10">
      <SectionHeading eyebrow="Reports" title="Reports and analytics" description="Revenue graphs, crop productivity, livestock analytics, and marketplace sales all in a modern chart-first reporting page." tone="light" action={<div className="flex gap-3"><Button theme="dark" variant="secondary">Export PDF</Button><Button theme="dark">Export CSV</Button></div>} />

      <div className="grid gap-6 xl:grid-cols-2">
        <Card title="Revenue Graph" subtitle="Monthly income trend"><ChartSlot><ResponsiveContainer width="100%" height="100%"><LineChart data={chartSeries}><CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" /><XAxis dataKey="month" stroke="#64748b" /><YAxis stroke="#64748b" /><Tooltip /><Line type="monotone" dataKey="revenue" stroke="#16a34a" strokeWidth={3} /></LineChart></ResponsiveContainer></ChartSlot></Card>
        <Card title="Crop Productivity" subtitle="Growth index"><ChartSlot><ResponsiveContainer width="100%" height="100%"><BarChart data={chartSeries}><CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" /><XAxis dataKey="month" stroke="#64748b" /><YAxis stroke="#64748b" /><Tooltip /><Bar dataKey="productivity" fill="#22c55e" radius={[10, 10, 0, 0]} /></BarChart></ResponsiveContainer></ChartSlot></Card>
        <Card title="Livestock Analytics" subtitle="Health and production"><ChartSlot><ResponsiveContainer width="100%" height="100%"><LineChart data={chartSeries}><CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" /><XAxis dataKey="month" stroke="#64748b" /><YAxis stroke="#64748b" /><Tooltip /><Line type="monotone" dataKey="livestock" stroke="#84cc16" strokeWidth={3} /></LineChart></ResponsiveContainer></ChartSlot></Card>
        <Card title="Marketplace Sales Analytics" subtitle="Sales by month"><ChartSlot><ResponsiveContainer width="100%" height="100%"><BarChart data={chartSeries}><CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" /><XAxis dataKey="month" stroke="#64748b" /><YAxis stroke="#64748b" /><Tooltip /><Bar dataKey="revenue" fill="#059669" radius={[10, 10, 0, 0]} /></BarChart></ResponsiveContainer></ChartSlot></Card>
      </div>
    </div>
  );
}

function ChartSlot({ children }: { children: ReactNode }) {
  return <div className="h-72">{children}</div>;
}