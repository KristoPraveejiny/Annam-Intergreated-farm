import { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { SectionHeading } from '../../components/ui/SectionHeading';
import { FiPlus, FiEdit2, FiTrash2, FiSearch, FiMapPin, FiHeart, FiDroplet, FiCheckCircle } from 'react-icons/fi';

// Mock Livestock Data
const livestockData = [
  { id: 'L001', species: 'Cattle', breed: 'Holstein', pen: 'Pen A', dob: '2022-03-10', health: 'Healthy', quantity: '20' },
  { id: 'L002', species: 'Sheep', breed: 'Merino', pen: 'Pen B', dob: '2023-05-21', health: 'Sick', quantity: '15' },
  { id: 'L003', species: 'Goat', breed: 'Boer', pen: 'Pen C', dob: '2021-11-05', health: 'Vaccinated', quantity: '30' },
];

export default function FarmManagerLivestockPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [livestock, setLivestock] = useState(livestockData);
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="space-y-6 pb-20">
      <SectionHeading
        eyebrow="Livestock Management"
        title="Livestock"
        description="Track animal health, feed schedules, and pen allocations."
        tone="light"
      />

      {/* Tabs */}
      <div className="flex space-x-3 border-b border-white/10 pb-4 overflow-x-auto">
        {['overview', 'list', 'feed', 'health'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2 rounded-xl text-sm font-semibold capitalize transition-all whitespace-nowrap ${
              activeTab === tab
                ? 'bg-emerald-600 text-white shadow-[0_4px_20px_rgba(16,185,129,0.3)]'
                : 'bg-slate-900/50 text-slate-300 hover:bg-slate-800 border border-white/5'
            }`}
          >
            {tab === 'overview' ? 'Overview' : tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="grid gap-6 xl:grid-cols-3">
          <Card title="Total Animals" subtitle="All registered livestock">
            <p className="text-5xl font-black text-emerald-400 mt-2">{livestock.length}</p>
          </Card>
          <Card title="Sick Animals" subtitle="Needs attention">
            <p className="text-5xl font-black text-amber-500 mt-2">
              {livestock.filter(l => l.health === 'Sick').length}
            </p>
          </Card>
          <Card title="Today's Feed Tasks" subtitle="Pending feed deliveries">
            <p className="text-5xl font-black text-lime-400 mt-2">3</p>
          </Card>
        </div>
      )}

      {activeTab === 'list' && (
        <Card title="Livestock List" subtitle="Manage all animals across pens">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div className="relative w-full sm:w-80">
              <FiSearch className="absolute left-4 top-3.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search by species or pen..."
                className="w-full bg-slate-900/50 border border-white/10 rounded-2xl pl-11 pr-4 py-3 text-white text-sm font-medium focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:outline-none transition-all"
              />
            </div>
            <Button onClick={() => setShowModal(true)} className="flex items-center gap-2 whitespace-nowrap">
              <FiPlus className="text-lg" /> Add Animal
            </Button>
          </div>
          <div className="overflow-x-auto rounded-2xl border border-white/10 shadow-xl">
            <table className="min-w-full text-left text-sm text-slate-300">
              <thead className="bg-slate-900/90 text-white font-semibold">
                <tr>
                  <th className="px-6 py-4">ID</th>
                  <th className="px-6 py-4">Species</th>
                  <th className="px-6 py-4">Breed</th>
                  <th className="px-6 py-4">Pen</th>
                  <th className="px-6 py-4">DOB</th>
                  <th className="px-6 py-4">Health</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 bg-slate-950/60">
                {livestock.map(l => (
                  <tr key={l.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 font-mono text-xs text-emerald-400">{l.id}</td>
                    <td className="px-6 py-4 font-bold text-white">
                      <span className="flex items-center gap-2"><FiMapPin className="text-slate-400" />{l.species}</span>
                    </td>
                    <td className="px-6 py-4">{l.breed}</td>
                    <td className="px-6 py-4">{l.pen}</td>
                    <td className="px-6 py-4">{l.dob}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${
                          l.health === 'Healthy'
                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                            : l.health === 'Sick'
                            ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                            : 'bg-slate-500/10 text-slate-400 border-slate-500/20'
                        }`}
                      >
                        {l.health}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right space-x-4">
                      <button className="text-blue-400 hover:text-blue-300 transition-colors" title="Edit">
                        <FiEdit2 className="text-lg" />
                      </button>
                      <button className="text-rose-400 hover:text-rose-300 transition-colors" title="Delete">
                        <FiTrash2 className="text-lg" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Add Livestock Modal (placeholder) */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-slate-900 border border-white/10 rounded-3xl p-6 w-full max-w-lg shadow-2xl">
            <h3 className="text-2xl font-bold text-white mb-6">Add New Animal</h3>
            <p className="text-slate-400 mb-6">Form fields for Species, Breed, Pen, DOB, Health, Quantity would go here.</p>
            <div className="flex justify-end gap-3 mt-8">
              <Button variant="ghost" onClick={() => setShowModal(false)}>Cancel</Button>
              <Button onClick={() => setShowModal(false)}>Save</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
