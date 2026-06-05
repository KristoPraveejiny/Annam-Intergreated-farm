import { ReactNode } from 'react';
import { Card } from './Card';

type ChartPanelProps = {
  title: string;
  children: ReactNode;
};

export function ChartPanel({ title, children }: ChartPanelProps) {
  return (
    <Card title={title}>
      <div className="h-[300px] w-full mt-4">
        {children}
      </div>
    </Card>
  );
}
