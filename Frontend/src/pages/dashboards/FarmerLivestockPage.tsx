import { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { SectionHeading } from '../../components/ui/SectionHeading';
import { ProgressBar } from '../../components/ui/ProgressBar';

export default function FarmerLivestockPage() {
  const [activeTab, setActiveTab] = useState('records');

  return (
    <div className="space-y-6 pb-20">
      <SectionHeading eyebrow="Livestock" title="Livestock Management" description="Track animal health, feeding, and production." tone="light" />

      {/* Tabs */}
      <div className="flex space-x-3 border-b border-white/10 pb-4 overflow-x-auto">
        {['records', 'feeding', 'health', 'production'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2 rounded-xl text-sm font-semibold capitalize transition-all whitespace-nowrap ${activeTab === tab ? 'bg-emerald-600 text-white shadow-[0_4px_20px_rgba(16,185,129,0.3)]' : 'bg-slate-900/50 text-slate-300 hover:bg-slate-800 border border-white/5'}`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === 'records' && (
        <Card title="Livestock Records" subtitle="Overview of all assigned livestock">
          <div className="overflow-x-auto rounded-2xl border border-white/10 shadow-xl mt-4">
            <table className="min-w-full text-left text-sm text-slate-300">
              <thead className="bg-slate-900/90 text-white font-semibold">
                <tr>
                  <th className="px-6 py-4">Animal ID</th>
                  <th className="px-6 py-4">Type</th>
                  <th className="px-6 py-4">Breed</th>
                  <th className="px-6 py-4">Age</th>
                  <th className="px-6 py-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 bg-slate-950/60">
                {[
                  { id: 'L001', type: 'Cow', breed: 'Holstein', age: '2 Years', status: 'Healthy' },
                  { id: 'L002', type: 'Sheep', breed: 'Merino', age: '1.5 Years', status: 'Sick' },
                ].map(l => (
                  <tr key={l.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 font-mono text-emerald-400">{l.id}</td>
                    <td className="px-6 py-4 text-white font-bold">{l.type}</td>
                    <td className="px-6 py-4">{l.breed}</td>
                    <td className="px-6 py-4">{l.age}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${
                        l.status === 'Healthy' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 
                        'bg-amber-500/10 text-amber-400 border-amber-500/20'
                      }`}>{l.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {activeTab === 'feeding' && (
        <Card title="Record Feeding" subtitle="Log feed type and quantity">
           <form className="space-y-6 mt-4">
             <div className="grid gap-6 md:grid-cols-2">
               <label className="block">
                 <span className="mb-2 block text-sm font-semibold text-white/80">Animal / Pen</span>
                 <select className="farm-input w-full appearance-none">
                   <option>L001 - Cow</option>
                   <option>L002 - Sheep</option>
                 </select>
               </label>
               <label className="block">
                 <span className="mb-2 block text-sm font-semibold text-white/80">Feed Type</span>
                 <input type="text" className="farm-input w-full" placeholder="e.g. Silage, Hay" />
               </label>
             </div>
             <div className="grid gap-6 md:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-white/80">Feeding Time</span>
                  <input type="time" className="farm-input w-full" />
                </label>
                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-white/80">Quantity (kg)</span>
                  <input type="number" className="farm-input w-full" placeholder="0" />
                </label>
             </div>
             <Button type="button">Save Feeding Record</Button>
           </form>
        </Card>
      )}

      {activeTab === 'health' && (
        <Card title="Health Records" subtitle="Log health status and vaccinations">
           <form className="space-y-6 mt-4">
             <div className="grid gap-6 md:grid-cols-2">
               <label className="block">
                 <span className="mb-2 block text-sm font-semibold text-white/80">Animal / Pen</span>
                 <select className="farm-input w-full appearance-none">
                   <option>L001 - Cow</option>
                   <option>L002 - Sheep</option>
                 </select>
               </label>
               <label className="block">
                 <span className="mb-2 block text-sm font-semibold text-white/80">Health Status</span>
                 <select className="farm-input w-full appearance-none">
                   <option>Healthy</option>
                   <option>Sick</option>
                   <option>Vaccinated</option>
                 </select>
               </label>
             </div>
             <label className="block">
               <span className="mb-2 block text-sm font-semibold text-white/80">Treatment / Notes</span>
               <textarea className="farm-input w-full min-h-32" placeholder="Describe the treatment..." />
             </label>
             <Button type="button">Save Health Record</Button>
           </form>
        </Card>
      )}

      {activeTab === 'production' && (
        <Card title="Production Tracking" subtitle="Log daily milk or egg production">
           <form className="space-y-6 mt-4">
             <div className="grid gap-6 md:grid-cols-2">
               <label className="block">
                 <span className="mb-2 block text-sm font-semibold text-white/80">Production Type</span>
                 <select className="farm-input w-full appearance-none">
                   <option>Milk</option>
                   <option>Eggs</option>
                 </select>
               </label>
               <label className="block">
                 <span className="mb-2 block text-sm font-semibold text-white/80">Quantity</span>
                 <input type="number" className="farm-input w-full" placeholder="Liters or Count" />
               </label>
             </div>
             <Button type="button">Save Production</Button>
           </form>
        </Card>
      )}
    </div>
  );
}
