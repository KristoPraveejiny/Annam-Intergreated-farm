import { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { SectionHeading } from '../../components/ui/SectionHeading';
import { FiCheckCircle, FiCalendar } from 'react-icons/fi';

export default function FarmerAttendancePage() {
  const [activeTab, setActiveTab] = useState('mark');

  return (
    <div className="space-y-6 pb-20">
      <SectionHeading eyebrow="Attendance" title="Daily Attendance" description="Mark your attendance and view your history." tone="light" />

      {/* Tabs */}
      <div className="flex space-x-3 border-b border-white/10 pb-4 overflow-x-auto">
        {['mark', 'history'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2 rounded-xl text-sm font-semibold capitalize transition-all whitespace-nowrap ${activeTab === tab ? 'bg-emerald-600 text-white shadow-[0_4px_20px_rgba(16,185,129,0.3)]' : 'bg-slate-900/50 text-slate-300 hover:bg-slate-800 border border-white/5'}`}
          >
            {tab === 'mark' ? 'Mark Attendance' : 'History'}
          </button>
        ))}
      </div>

      {activeTab === 'mark' && (
        <Card title="Mark Today's Attendance" subtitle={new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}>
          <div className="grid place-items-center rounded-2xl border-2 border-dashed border-emerald-500/50 bg-emerald-500/10 p-10 text-center">
            <FiCheckCircle className="text-6xl text-emerald-500" />
            <p className="mt-4 text-lg font-bold text-white">Ready to check in?</p>
            <p className="mt-2 text-sm text-slate-400">Ensure your location is enabled for verified check-in.</p>
            <Button className="mt-6">Check In Now</Button>
          </div>
        </Card>
      )}

      {activeTab === 'history' && (
        <Card title="Attendance History" subtitle="Your recent check-ins">
          <div className="overflow-x-auto rounded-2xl border border-white/10 shadow-xl mt-4">
            <table className="min-w-full text-left text-sm text-slate-300">
              <thead className="bg-slate-900/90 text-white font-semibold">
                <tr>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Time In</th>
                  <th className="px-6 py-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 bg-slate-950/60">
                {[
                  { date: '2026-06-02', timeIn: '08:05 AM', status: 'Present' },
                  { date: '2026-06-01', timeIn: '07:55 AM', status: 'Present' },
                  { date: '2026-05-31', timeIn: '-', status: 'Absent' },
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 font-bold text-white flex items-center gap-2"><FiCalendar className="text-slate-400"/> {row.date}</td>
                    <td className="px-6 py-4 font-mono text-emerald-400">{row.timeIn}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${
                        row.status === 'Present' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 
                        'bg-rose-500/10 text-rose-400 border-rose-500/20'
                      }`}>{row.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
}
