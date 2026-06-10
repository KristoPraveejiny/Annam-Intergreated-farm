import type { ReactNode } from 'react';
import { FiGrid } from 'react-icons/fi';
import { Card } from '../../components/ui/Card';
import { ProgressBar } from '../../components/ui/ProgressBar';
import { marketplaceProducts, alerts, tasks } from '../../data/mock';

function ConfigCard({ title, value, icon }: { title: string; value: string; icon: ReactNode }) {
  return (
    <div className="rounded-3xl border border-slate-100 p-4">
      <div className="flex items-center gap-3 text-sm font-semibold text-slate-900">
        {icon}{title}
      </div>
      <p className="mt-3 text-2xl font-black text-emerald-700">{value}</p>
    </div>
  );
}

export default function CustomerDashboard() {
  return (
    <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
      <Card title="Product Browsing" subtitle="Premium ecommerce-style product discovery">
        <div className="grid gap-4 md:grid-cols-2">
          {marketplaceProducts.slice(0, 4).map((product) => (
            <div key={product.name} className="rounded-3xl border border-slate-100 p-4">
              <div className="h-36 rounded-2xl bg-gradient-to-br from-emerald-100 via-lime-50 to-white" />
              <p className="mt-3 font-semibold text-slate-900">{product.name}</p>
              <p className="text-sm text-slate-500">{product.category}</p>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-emerald-700">{product.price}</span>
                <span className="text-sm text-slate-500">{product.rating} ★</span>
              </div>
            </div>
          ))}
        </div>
      </Card>
      <div className="grid gap-6">
        <Card title="Order Tracking" subtitle="Live order status">
          <div className="space-y-4">
            <ProgressBar value={78} label="Order packed" />
            <ProgressBar value={54} label="Out for delivery" />
            <ProgressBar value={96} label="Payment verified" />
          </div>
        </Card>
        <Card title="QR Verification" subtitle="Traceability and authenticity">
          <div className="grid place-items-center rounded-3xl border-2 border-dashed border-emerald-200 bg-emerald-50 p-8">
            <FiGrid className="text-5xl text-emerald-600" />
            <p className="mt-3 text-center text-sm text-slate-600">
              Scan product QR to confirm source, batch, and freshness.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
