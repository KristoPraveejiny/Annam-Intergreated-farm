import { ReactNode } from 'react';

type BadgeProps = {
  children: ReactNode;
  tone?: 'green' | 'amber' | 'sky' | 'slate';
};

const toneClasses = {
  green: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  amber: 'bg-amber-50 text-amber-700 border-amber-200',
  sky: 'bg-sky-50 text-sky-700 border-sky-200',
  slate: 'bg-slate-100 text-slate-700 border-slate-200',
};

export function Badge({ children, tone = 'green' }: BadgeProps) {
  return <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${toneClasses[tone]}`}>{children}</span>;
}