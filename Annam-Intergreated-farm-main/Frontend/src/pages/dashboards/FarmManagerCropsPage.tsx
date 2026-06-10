import { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { SectionHeading } from '../../components/ui/SectionHeading';
import { ProgressBar } from '../../components/ui/ProgressBar';
import { FiPlus, FiEdit2, FiTrash2, FiSearch, FiMapPin, FiDroplet, FiCheckCircle } from 'react-icons/fi';

// Mock Data
const cropsData = [
  { id: 'C001', name: 'Wheat', variety: 'Durum', field: 'Block A', planted: '2026-03-15', harvest: '2026-07-20', status: 'Growing', quantity: '200kg' },
  { id: 'C002', name: 'Tomatoes', variety: 'Roma', field: 'Block B', planted: '2026-04-10', harvest: '2026-08-05', status: 'Growing', quantity: '50kg' },
  { id: 'C003', name: 'Corn', variety: 'Sweet', field: 'Block C', planted: '2026-02-01', harvest: '2026-06-10', status: 'Harvested', quantity: '150kg' },
];

const fieldsData = [
  { id: 'F1', name: 'Block A', size: '5 Acres', soil: 'Loamy', water: 'Drip Irrigation', location: 'North Sector' },
  { id: 'F2', name: 'Block B', size: '2 Acres', soil: 'Sandy Loam', water: 'Sprinkler', location: 'East Sector' },
  { id: 'F3', name: 'Block C', size: '4 Acres', soil: 'Clay Loam', water: 'Canal', location: 'South Sector' },
];

export default function FarmManagerCropsPage() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [crops, setCrops] = useState(cropsData);
  const [showCropModal, setShowCropModal] = useState(false);

  return (
    <div className="space-y-6 pb-20">
      <SectionHeading eyebrow="Crop Management" title="Crops & Fields" description="Manage your crop lifecycle, fields, and growth monitoring." tone="light" />

      {/* Tabs */}
      <div className="flex space-x-3 border-b border-white/10 pb-4 overflow-x-auto">
        {['dashboard', 'crops', 'fields', 'growth'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2 rounded-xl text-sm font-semibold capitalize transition-all whitespace-nowrap ${activeTab === tab ? 'bg-emerald-600 text-white shadow-[0_4px_20px_rgba(16,185,129,0.3)]' : 'bg-slate-900/50 text-slate-300 hover:bg-slate-800 border border-white/5'}`}
          >
            {tab === 'dashboard' ? 'Overview' : tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'dashboard' && (
        <div className="grid gap-6 xl:grid-cols-3">
          <Card title="Total Crops" subtitle="All registered crops">
            <p className="text-5xl font-black text-emerald-400 mt-2">{crops.length}</p>
          </Card>
          <Card title="Active Fields" subtitle="Currently in use">
            <p className="text-5xl font-black text-lime-400 mt-2">{fieldsData.length}</p>
          </Card>
          <Card title="Disease Alerts" subtitle="Requires attention">
            <p className="text-5xl font-black text-amber-500 mt-2">2</p>
          </Card>
          
          <div className="xl:col-span-3">
            <Card title="Today's Irrigation Tasks">
               <div className="grid gap-4 mt-4 lg:grid-cols-2">
                  <div className="flex justify-between items-center border border-white/10 rounded-2xl p-5 bg-slate-900/40 hover:bg-slate-800/50 transition-colors">
                     <div className="flex items-center gap-4">
                        <div className="p-3 bg-blue-500/20 rounded-xl">
                          <FiDroplet className="text-blue-400 text-2xl"/>
                        </div>
                        <div>
                          <p className="text-lg font-bold text-white">Block A - Wheat</p>
                          <p className="text-sm font-medium text-slate-400 mt-1">Drip Irrigation - 2 Hours</p>
                        </div>
                     </div>
                     <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-full font-bold text-xs uppercase tracking-wider border border-emerald-500/20">Completed</span>
                  </div>
                  <div className="flex justify-between items-center border border-white/10 rounded-2xl p-5 bg-slate-900/40 hover:bg-slate-800/50 transition-colors">
                     <div className="flex items-center gap-4">
                        <div className="p-3 bg-blue-500/20 rounded-xl">
                          <FiDroplet className="text-blue-400 text-2xl"/>
                        </div>
                        <div>
                          <p className="text-lg font-bold text-white">Block B - Tomatoes</p>
                          <p className="text-sm font-medium text-slate-400 mt-1">Sprinkler - 1 Hour</p>
                        </div>
                     </div>
                     <span className="px-3 py-1 bg-amber-500/20 text-amber-400 rounded-full font-bold text-xs uppercase tracking-wider border border-amber-500/20">Pending</span>
                  </div>
               </div>
            </Card>
          </div>
        </div>
      )}

      {activeTab === 'crops' && (
        <Card title="Crop List" subtitle="Manage all crops across fields">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div className="relative w-full sm:w-80">
               <FiSearch className="absolute left-4 top-3.5 text-slate-400"/>
               <input type="text" placeholder="Search crops by name or field..." className="w-full bg-slate-900/50 border border-white/10 rounded-2xl pl-11 pr-4 py-3 text-white text-sm font-medium focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:outline-none transition-all"/>
            </div>
            <Button onClick={() => setShowCropModal(true)} className="flex items-center gap-2 whitespace-nowrap"><FiPlus className="text-lg"/> Register Crop</Button>
          </div>
          
          <div className="overflow-x-auto rounded-2xl border border-white/10 shadow-xl">
            <table className="min-w-full text-left text-sm text-slate-300">
              <thead className="bg-slate-900/90 text-white font-semibold">
                <tr>
                  <th className="px-6 py-4">ID</th>
                  <th className="px-6 py-4">Crop Name</th>
                  <th className="px-6 py-4">Variety</th>
                  <th className="px-6 py-4">Field</th>
                  <th className="px-6 py-4">Planting Date</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 bg-slate-950/60">
                {crops.map(c => (
                  <tr key={c.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 font-mono text-xs text-emerald-400">{c.id}</td>
                    <td className="px-6 py-4 font-bold text-white">{c.name}</td>
                    <td className="px-6 py-4">{c.variety}</td>
                    <td className="px-6 py-4 font-medium"><span className="flex items-center gap-2"><FiMapPin className="text-slate-400"/> {c.field}</span></td>
                    <td className="px-6 py-4">{c.planted}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${c.status === 'Growing' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-slate-500/10 text-slate-400 border-slate-500/20'}`}>{c.status}</span>
                    </td>
                    <td className="px-6 py-4 text-right space-x-4">
                       <button className="text-blue-400 hover:text-blue-300 transition-colors" title="Edit"><FiEdit2 className="text-lg"/></button>
                       <button className="text-rose-400 hover:text-rose-300 transition-colors" title="Delete"><FiTrash2 className="text-lg"/></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {activeTab === 'fields' && (
         <Card title="Field Management" subtitle="Manage your land parcels and resources">
             <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-2">
                {fieldsData.map(f => (
                   <div key={f.id} className="border border-white/10 bg-slate-900/40 rounded-3xl p-6 hover:bg-slate-800/60 hover:border-emerald-500/30 transition-all group shadow-lg">
                      <div className="flex justify-between items-start mb-6">
                         <div>
                            <h3 className="text-xl font-black text-white group-hover:text-emerald-300 transition-colors">{f.name}</h3>
                            <p className="text-sm font-bold text-emerald-500 mt-1">{f.size}</p>
                         </div>
                         <button className="text-slate-500 hover:text-blue-400 transition-colors bg-white/5 p-2 rounded-xl"><FiEdit2 size={16}/></button>
                      </div>
                      <div className="space-y-4 text-sm font-medium text-slate-300 bg-black/20 p-4 rounded-2xl border border-white/5">
                         <p className="flex justify-between"><span className="text-slate-500">Soil Type</span> <span className="text-white">{f.soil}</span></p>
                         <p className="flex justify-between"><span className="text-slate-500">Irrigation</span> <span className="text-white">{f.water}</span></p>
                         <p className="flex justify-between"><span className="text-slate-500">Sector</span> <span className="text-white">{f.location}</span></p>
                      </div>
                   </div>
                ))}
             </div>
         </Card>
      )}

      {activeTab === 'growth' && (
         <Card title="Crop Growth Monitoring" subtitle="Track lifecycle stages across your fields in real-time">
            <div className="space-y-8 mt-6">
               {crops.filter(c => c.status === 'Growing').map(c => (
                  <div key={c.id} className="border border-white/10 bg-slate-900/40 rounded-3xl p-6 shadow-xl">
                     <div className="flex justify-between items-center mb-10">
                        <h4 className="text-xl font-black text-white">{c.name} <span className="text-slate-500 font-medium text-lg ml-2">({c.field})</span></h4>
                        <span className="text-sm font-bold text-emerald-400 bg-emerald-400/10 px-3 py-1 rounded-full border border-emerald-400/20">On Track</span>
                     </div>
                     <div className="relative flex justify-between items-center w-full px-2 sm:px-6">
                        {/* Progress Background */}
                        <div className="absolute top-1/2 left-6 right-6 h-1.5 bg-slate-800 -z-10 transform -translate-y-1/2 rounded-full"></div>
                        {/* Progress Fill (assuming 60% for example) */}
                        <div className="absolute top-1/2 left-6 w-[60%] h-1.5 bg-gradient-to-r from-emerald-600 to-lime-400 -z-10 transform -translate-y-1/2 rounded-full shadow-[0_0_15px_rgba(16,185,129,0.6)]"></div>
                        
                        {['Seed Sowing', 'Germination', 'Vegetative', 'Flowering', 'Harvesting'].map((stage, i) => {
                           const isCompleted = i < 2;
                           const isCurrent = i === 2;
                           return (
                              <div key={stage} className="flex flex-col items-center gap-3">
                                 <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center font-bold text-sm sm:text-base border-4 ${
                                    isCompleted ? 'bg-emerald-500 text-white border-emerald-900 shadow-[0_0_15px_rgba(16,185,129,0.4)]' : 
                                    isCurrent ? 'bg-slate-900 text-lime-400 border-lime-500 shadow-[0_0_15px_rgba(132,204,22,0.4)]' : 
                                    'bg-slate-900 text-slate-500 border-slate-800'
                                 } transition-all duration-300`}>
                                    {isCompleted ? <FiCheckCircle className="text-xl"/> : i + 1}
                                 </div>
                                 <span className={`text-xs sm:text-sm font-bold text-center w-20 sm:w-24 ${
                                    isCompleted ? 'text-emerald-400' : 
                                    isCurrent ? 'text-lime-400' : 
                                    'text-slate-600'
                                 }`}>{stage}</span>
                              </div>
                           );
                        })}
                     </div>
                  </div>
               ))}
            </div>
         </Card>
      )}

      {/* Add Crop Modal Placeholder */}
      {showCropModal && (
         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="bg-slate-900 border border-white/10 rounded-3xl p-6 w-full max-w-lg shadow-2xl">
               <h3 className="text-2xl font-bold text-white mb-6">Register New Crop</h3>
               <p className="text-slate-400 mb-6">Form to add a new crop goes here (Input fields for Name, Variety, Field, Planting Date).</p>
               <div className="flex justify-end gap-3 mt-8">
                  <Button variant="ghost" onClick={() => setShowCropModal(false)}>Cancel</Button>
                  <Button onClick={() => setShowCropModal(false)}>Save Crop</Button>
               </div>
            </div>
         </div>
      )}
    </div>
  );
}
