import { motion } from 'framer-motion';
import { FiArrowRight, FiBarChart2, FiFeather, FiShield, FiStar } from 'react-icons/fi';
import { PublicHeader } from '../components/layout/PublicHeader';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { SectionHeading } from '../components/ui/SectionHeading';

const principles = [
  {
    icon: FiShield,
    title: 'Trust by design',
    text: 'Role-aware access, audit-ready workflows, and clear actions for every user in the farm ecosystem.',
  },
  {
    icon: FiBarChart2,
    title: 'Operational clarity',
    text: 'Dashboards, reporting, and traceability tools that keep farm operations readable at every scale.',
  },
  {
    icon: FiStar,
    title: 'Premium experience',
    text: 'A calm, modern interface with glass panels, strong spacing, and elevated details that feel polished.',
  },
];

const milestones = [
  'Unified farm management for crops, livestock, workforce, and sales',
  'Smart advisory insights with weather-aware decision support',
  'Marketplace, notifications, and analytics in one connected flow',
  'Built for mobile, desktop, and enterprise-style monitoring',
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-transparent text-slate-900">
      <PublicHeader active="about" />

      <main>
        <section className="relative overflow-hidden py-16">
          <div className="section-shell">
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center">
              <h1 className="text-4xl font-extrabold text-slate-950">About Annam Integrated Farm</h1>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">A modern, integrated farm focused on sustainable crop and livestock production.</p>
              <div className="mt-6">
                <a href="/register"><Button theme="light" className="px-5 py-3">Get Started</Button></a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Short 2-line about summary */}
        <section className="section-shell py-6">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm text-slate-700">Annam Integrated Farm combines traditional knowledge with modern techniques to grow quality produce and manage healthy livestock.</p>
            <p className="mt-2 text-sm text-slate-700">We prioritize sustainability, community engagement, and practical innovations that increase productivity while protecting natural resources.</p>
          </div>
        </section>

        

        

        

        {/* Farm gallery: images served from public/gallery/farm/... */}
        <section className="section-shell py-12">
          <h3 className="text-center text-2xl font-extrabold text-slate-900">Farm</h3>
          <p className="mt-3 text-center text-sm text-slate-600">Scenes from the farm and livestock.</p>
          <ImageGrid folder="" images={[ 'tomato.jpg', 'beans.jpg', 'fresh-milk-1.jpg', 'Papaya-crop.jpg' ]} />
        </section>

        <section className="section-shell pb-20">
          <Card variant="light" className="bg-gradient-to-br from-slate-950 to-emerald-700 text-white" title="Built for teams that want a polished public face and a serious back office" subtitle="Use it to present the platform professionally while keeping the experience practical for day-to-day farm operations.">
            <div className="flex flex-wrap gap-4">
              <a href="/register"><Button theme="light" className="bg-white text-emerald-700 hover:bg-emerald-50">Get Started</Button></a>
              <a href="/"><Button theme="light" variant="secondary" className="border-white/20 bg-white/10 text-white hover:bg-white/20">Back to home</Button></a>
            </div>
          </Card>
        </section>
      </main>
    </div>
  );
}

function StatTile({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-3xl border border-emerald-100 bg-white p-4 shadow-[0_10px_25px_rgba(15,23,42,0.06)]">
      <p className="text-2xl font-black text-slate-950">{value}</p>
      <p className="mt-1 text-xs font-medium uppercase tracking-[0.2em] text-slate-500">{label}</p>
    </div>
  );
}

function ImageGrid({ folder, images }: { folder: string; images: string[] }) {
  return (
    <div className="mt-8 grid gap-6 sm:grid-cols-2 md:grid-cols-4">
      {images.map((img) => (
        <div key={img} className="overflow-hidden rounded-lg border bg-white p-0 shadow-[0_20px_40px_rgba(2,6,23,0.06)]">
          <img src={folder ? `/gallery/${folder}/${img}` : `/${img}`} alt={img} className="h-56 w-full object-cover" />
        </div>
      ))}
    </div>
  );
}