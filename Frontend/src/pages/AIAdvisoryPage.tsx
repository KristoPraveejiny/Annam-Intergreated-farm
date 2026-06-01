import { FiAlertTriangle, FiMessageSquare, FiSun, FiUploadCloud } from 'react-icons/fi';
import { Card } from '../components/ui/Card';
import { SectionHeading } from '../components/ui/SectionHeading';

export default function AIAdvisoryPage() {
  return (
    <div className="section-shell py-10">
      <SectionHeading eyebrow="AI Advisory" title="Futuristic farm intelligence" description="A smart assistant that combines weather, disease risk, and crop planning into a sleek AI-powered workflow." tone="light" />

      <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <Card title="AI Chatbot" subtitle="Ask anything about your farm">
          <div className="space-y-3 rounded-3xl bg-slate-50 p-4">
            <ChatBubble side="left" text="What should I do for rainy weather tomorrow?" />
            <ChatBubble side="right" text="Delay spraying, protect soil cover, and inspect drainage channels." />
            <ChatBubble side="left" text="Any crop recommendation for the next cycle?" />
            <ChatBubble side="right" text="Leafy vegetables and short-cycle legumes are suitable for current conditions." />
          </div>
        </Card>

        <div className="grid gap-6">
          <Card title="Weather-based recommendations" subtitle="Live AI suggestions">
            <div className="grid gap-3 sm:grid-cols-2">
              {['Reduce irrigation by 15%', 'Apply nitrogen supplement', 'Move livestock to shaded areas', 'Delay harvest by 1 day'].map((item) => (
                <div key={item} className="rounded-2xl bg-emerald-50 p-4 text-sm font-semibold text-emerald-800">{item}</div>
              ))}
            </div>
          </Card>
          <Card title="Disease detection upload" subtitle="Quick image scan with AI">
            <div className="grid place-items-center rounded-3xl border-2 border-dashed border-emerald-200 bg-white p-8">
              <FiUploadCloud className="text-5xl text-emerald-600" />
              <p className="mt-3 text-sm text-slate-600">Upload a crop image for instant diagnosis and treatment suggestions.</p>
            </div>
          </Card>
          <Card title="Risk alerts" subtitle="Important signals">
            <div className="space-y-3">
              <RiskCard title="High humidity" description="Monitor fungal disease risk in shaded blocks." />
              <RiskCard title="Heat stress" description="Water livestock more frequently during the afternoon." />
              <RiskCard title="Pest activity" description="Inspect trap counts and spray if thresholds exceed." />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

function ChatBubble({ side, text }: { side: 'left' | 'right'; text: string }) {
  return (
    <div className={`flex ${side === 'right' ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-[80%] rounded-3xl px-4 py-3 text-sm ${side === 'right' ? 'bg-emerald-600 text-white' : 'bg-white text-slate-700 shadow-sm'}`}>{text}</div>
    </div>
  );
}

function RiskCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-slate-100 p-4">
      <FiAlertTriangle className="mt-1 text-amber-500" />
      <div>
        <p className="font-semibold text-slate-900">{title}</p>
        <p className="mt-1 text-sm text-slate-600">{description}</p>
      </div>
    </div>
  );
}