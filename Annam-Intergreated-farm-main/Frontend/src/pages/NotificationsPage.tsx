import type { ReactNode } from 'react';
import { FiBell, FiCloud, FiClock, FiShoppingBag } from 'react-icons/fi';
import { Card } from '../components/ui/Card';
import { SectionHeading } from '../components/ui/SectionHeading';
import { alerts } from '../data/mock';

export default function NotificationsPage() {
  return (
    <div className="section-shell py-10">
      <SectionHeading eyebrow="Notifications" title="Notification center" description="Weather alerts, task reminders, disease alerts, and order notifications in one streamlined inbox." tone="light" />

      <div className="grid gap-6 lg:grid-cols-2">
        {alerts.map((alert) => (
          <Card key={alert.title} title={alert.title} subtitle="Alert card">
            <p className="text-sm text-slate-600">{alert.description}</p>
          </Card>
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-4">
        <MiniAlert icon={<FiCloud />} title="Weather alerts" />
        <MiniAlert icon={<FiClock />} title="Task reminders" />
        <MiniAlert icon={<FiBell />} title="Disease alerts" />
        <MiniAlert icon={<FiShoppingBag />} title="Order notifications" />
      </div>
    </div>
  );
}

function MiniAlert({ icon, title }: { icon: ReactNode; title: string }) {
  return <div className="rounded-3xl border border-slate-100 bg-white p-5"><div className="text-2xl text-emerald-600">{icon}</div><p className="mt-3 font-semibold text-slate-900">{title}</p></div>;
}