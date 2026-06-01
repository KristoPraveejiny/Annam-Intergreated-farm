import { FiDownload, FiUploadCloud } from 'react-icons/fi';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { SectionHeading } from '../components/ui/SectionHeading';

export default function DiseaseDetectionPage() {
  return (
    <div className="section-shell py-10">
      <SectionHeading eyebrow="Disease Detection" title="Crop disease detection" description="Upload a crop image, preview it instantly, and receive AI analysis with treatment recommendations." tone="light" />

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <Card title="Image Upload" subtitle="Drag and drop area">
          <div className="grid place-items-center rounded-[2rem] border-2 border-dashed border-emerald-200 bg-emerald-50 p-10 text-center">
            <FiUploadCloud className="text-6xl text-emerald-600" />
            <p className="mt-4 text-lg font-bold text-slate-900">Drag and drop crop image here</p>
            <p className="mt-2 text-sm text-slate-600">Supports JPG, PNG, and high-resolution field photos.</p>
            <Button className="mt-5">Choose File</Button>
          </div>
        </Card>
        <div className="space-y-6">
          <Card title="Preview Image" subtitle="Selected file preview">
            <div className="h-56 rounded-3xl bg-gradient-to-br from-emerald-100 via-lime-50 to-white" />
          </Card>
          <Card title="AI Analysis" subtitle="Loading animation and result card">
            <div className="space-y-4">
              <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
                <div className="h-full w-2/3 animate-pulse rounded-full bg-emerald-500" />
              </div>
              <div className="rounded-3xl bg-slate-50 p-4">
                <p className="text-sm font-semibold text-emerald-700">Result: Early blight detected</p>
                <p className="mt-2 text-sm text-slate-600">Probability 92%. Immediate treatment and removal of affected leaves recommended.</p>
              </div>
              <div className="rounded-3xl border border-emerald-100 bg-white p-4">
                <p className="font-semibold text-slate-900">Recommended treatment</p>
                <ul className="mt-2 space-y-2 text-sm text-slate-600">
                  <li>Apply copper-based fungicide</li>
                  <li>Improve air circulation</li>
                  <li>Remove infected foliage</li>
                </ul>
              </div>
              <Button variant="secondary" className="w-full gap-2"><FiDownload /> Download report</Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}