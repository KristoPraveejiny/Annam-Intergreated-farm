import { FiFilter, FiGrid, FiSearch, FiStar } from 'react-icons/fi';
import { Card } from '../components/ui/Card';
import { SectionHeading } from '../components/ui/SectionHeading';
import { marketplaceProducts } from '../data/mock';

export default function MarketplacePage() {
  return (
    <div className="section-shell py-10">
      <SectionHeading eyebrow="Marketplace" title="Fresh produce marketplace" description="Search products, filter by category, review ratings, and purchase farm-fresh goods with a polished ecommerce experience." tone="light" />

      <div className="mb-6 grid gap-4 lg:grid-cols-[1fr_auto_auto]">
        <div className="relative">
          <FiSearch className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input className="farm-input pl-11" placeholder="Search vegetables, fruits, milk, eggs, organic items..." />
        </div>
        <button className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700"><FiFilter /> Filter</button>
        <button className="inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white"><FiGrid /> QR Section</button>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {marketplaceProducts.map((product) => (
            <Card key={product.name} title={product.name} subtitle={product.category}>
              <div className="h-40 rounded-2xl bg-gradient-to-br from-emerald-100 via-lime-50 to-white" />
              <div className="mt-4 flex items-center justify-between">
                <span className="text-lg font-black text-slate-900">{product.price}</span>
                <span className="inline-flex items-center gap-1 text-sm font-semibold text-amber-500"><FiStar /> {product.rating}</span>
              </div>
              <div className="mt-4 flex items-center justify-between text-sm">
                <span className="rounded-full bg-emerald-50 px-3 py-1 font-semibold text-emerald-700">{product.badge}</span>
                <button className="rounded-full bg-slate-900 px-4 py-2 font-semibold text-white">Buy now</button>
              </div>
            </Card>
          ))}
        </div>

        <div className="space-y-6">
          <Card title="Product Details Modal" subtitle="Preview selected product details">
            <div className="rounded-3xl border border-slate-100 p-4">
              <p className="text-lg font-black text-slate-900">Organic Spinach</p>
              <p className="mt-2 text-sm text-slate-600">Fresh harvest from Block B, verified by QR code, suitable for same-day delivery.</p>
              <button className="mt-4 w-full rounded-2xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white">Add to cart</button>
            </div>
          </Card>
          <Card title="QR Code Section" subtitle="Batch traceability">
            <div className="grid place-items-center rounded-3xl border-2 border-dashed border-emerald-200 bg-emerald-50 p-10">
              <FiGrid className="text-6xl text-emerald-600" />
              <p className="mt-3 text-center text-sm text-slate-600">Verify produce origin, batch, and storage conditions.</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}