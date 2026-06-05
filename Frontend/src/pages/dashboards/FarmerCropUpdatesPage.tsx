import { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { SectionHeading } from '../../components/ui/SectionHeading';
import { FiCheckCircle, FiUploadCloud, FiSearch, FiLayers, FiDroplet } from 'react-icons/fi';

const crops = ['Wheat - Block A', 'Tomatoes - Block B', 'Corn - Block C'];
const activities = ['Irrigation', 'Fertilizer Application', 'Pesticide Application', 'Weeding', 'Pruning', 'Harvesting'];
const stages = ['Seed Sowing', 'Germination', 'Vegetative', 'Flowering', 'Fruiting', 'Harvesting'];

export default function FarmerCropUpdatesPage() {
  const [activeTab, setActiveTab] = useState('stages');

  return (
    <div className="space-y-6 pb-20">
      <SectionHeading eyebrow="Crop Updates" title="Crop Management" description="Update crop stages, record daily activities, and report diseases." tone="light" />

      {/* Tabs */}
      <div className="flex space-x-3 border-b border-white/10 pb-4 overflow-x-auto">
        {['stages', 'activities', 'disease'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2 rounded-xl text-sm font-semibold capitalize transition-all whitespace-nowrap ${activeTab === tab ? 'bg-emerald-600 text-white shadow-[0_4px_20px_rgba(16,185,129,0.3)]' : 'bg-slate-900/50 text-slate-300 hover:bg-slate-800 border border-white/5'}`}
          >
            {tab === 'disease' ? 'Disease Reporting' : tab === 'stages' ? 'Crop Stages' : 'Daily Activities'}
          </button>
        ))}
      </div>

      {activeTab === 'stages' && (
        <Card title="Update Crop Stage" subtitle="Select crop and update current growth stage">
          <form className="space-y-6 mt-4">
            <div className="grid gap-6 md:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-white/80">Select Crop</span>
                <select className="farm-input w-full appearance-none">
                  {crops.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </label>
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-white/80">Current Stage</span>
                <select className="farm-input w-full appearance-none">
                  {stages.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </label>
            </div>
            
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-white/80">Add Notes</span>
              <textarea className="farm-input w-full min-h-32" placeholder="Describe the growth condition..." />
            </label>

            <div>
              <span className="mb-2 block text-sm font-semibold text-white/80">Upload Images</span>
              <div className="grid place-items-center rounded-2xl border-2 border-dashed border-white/20 bg-white/5 p-8 text-center hover:bg-white/10 transition-colors cursor-pointer">
                <FiUploadCloud className="text-4xl text-emerald-400" />
                <p className="mt-4 text-sm text-slate-300">Drag and drop images here</p>
              </div>
            </div>

            <Button type="button" className="w-full sm:w-auto">Update Progress</Button>
          </form>
        </Card>
      )}

      {activeTab === 'activities' && (
        <Card title="Record Daily Activity" subtitle="Log irrigation, fertilizing, and other field tasks">
           <form className="space-y-6 mt-4">
            <div className="grid gap-6 md:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-white/80">Activity Type</span>
                <select className="farm-input w-full appearance-none">
                  {activities.map(a => <option key={a} value={a}>{a}</option>)}
                </select>
              </label>
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-white/80">Crop / Field</span>
                <select className="farm-input w-full appearance-none">
                  {crops.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </label>
            </div>
            
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-white/80">Date</span>
              <input type="date" className="farm-input w-full" defaultValue={new Date().toISOString().split('T')[0]} />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-white/80">Description</span>
              <textarea className="farm-input w-full min-h-32" placeholder="Details about the activity..." />
            </label>

            <Button type="button" className="w-full sm:w-auto">Save Activity</Button>
          </form>
        </Card>
      )}

      {activeTab === 'disease' && (
        <div className="grid gap-6 xl:grid-cols-2">
          <Card title="Report Disease" subtitle="Upload leaf images for AI analysis">
            <div className="grid place-items-center rounded-2xl border-2 border-dashed border-emerald-500/50 bg-emerald-500/10 p-10 text-center cursor-pointer hover:bg-emerald-500/20 transition-colors">
              <FiUploadCloud className="text-6xl text-emerald-500" />
              <p className="mt-4 text-lg font-bold text-white">Upload leaf photo</p>
              <p className="mt-2 text-sm text-slate-400">Supported formats: JPG, PNG</p>
              <Button className="mt-6">Choose File</Button>
            </div>
          </Card>
          <Card title="Detection Results" subtitle="AI feedback and recommendations">
            <div className="h-full flex flex-col justify-center items-center text-slate-400 p-6 text-center border-2 border-dashed border-white/10 rounded-2xl bg-white/5">
              <FiSearch className="text-4xl mb-3 text-slate-500"/>
              <p>Upload an image to see disease confidence scores and suggested treatments.</p>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
