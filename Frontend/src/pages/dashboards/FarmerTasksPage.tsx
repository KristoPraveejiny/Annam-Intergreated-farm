import { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { SectionHeading } from '../../components/ui/SectionHeading';
import { ProgressBar } from '../../components/ui/ProgressBar';
import { FiCheckCircle, FiClock, FiMessageSquare } from 'react-icons/fi';
import { tasks } from '../../data/mock';

export default function FarmerTasksPage() {
  const [taskList, setTaskList] = useState(tasks.map((t, i) => ({
    id: `TSK-${1000 + i}`,
    title: t.title,
    assigned: '2026-06-01',
    due: '2026-06-03',
    status: t.progress === 100 ? 'Completed' : t.progress > 0 ? 'In Progress' : 'Pending',
    progress: t.progress
  })));

  return (
    <div className="space-y-6 pb-20">
      <SectionHeading eyebrow="My Tasks" title="Assigned Tasks" description="View and update your daily farm operations." tone="light" />

      <Card title="Task List" subtitle="Manage your ongoing tasks">
        <div className="overflow-x-auto rounded-2xl border border-white/10 shadow-xl mt-4">
          <table className="min-w-full text-left text-sm text-slate-300">
            <thead className="bg-slate-900/90 text-white font-semibold">
              <tr>
                <th className="px-6 py-4">Task ID</th>
                <th className="px-6 py-4">Task Name</th>
                <th className="px-6 py-4">Assigned Date</th>
                <th className="px-6 py-4">Due Date</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Progress</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 bg-slate-950/60">
              {taskList.map(t => (
                <tr key={t.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 font-mono text-xs text-emerald-400">{t.id}</td>
                  <td className="px-6 py-4 font-bold text-white">{t.title}</td>
                  <td className="px-6 py-4">{t.assigned}</td>
                  <td className="px-6 py-4">{t.due}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${
                      t.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 
                      t.status === 'In Progress' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : 
                      'bg-amber-500/10 text-amber-400 border-amber-500/20'
                    }`}>{t.status}</span>
                  </td>
                  <td className="px-6 py-4 w-48">
                    <ProgressBar value={t.progress} />
                  </td>
                  <td className="px-6 py-4 text-right space-x-2 whitespace-nowrap">
                    <Button variant="ghost" className="!p-2 text-blue-400 hover:text-blue-300" title="Add Note"><FiMessageSquare /></Button>
                    <Button variant="ghost" className="!p-2 text-emerald-400 hover:text-emerald-300" title="Update Status"><FiClock /></Button>
                    <Button variant="ghost" className="!p-2 text-lime-400 hover:text-lime-300" title="Mark Complete"><FiCheckCircle /></Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
