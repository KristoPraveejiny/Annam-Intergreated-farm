type ProgressBarProps = {
  value: number;
  label?: string;
};

export function ProgressBar({ value, label }: ProgressBarProps) {
  return (
    <div>
      {label ? <div className="mb-2 flex items-center justify-between text-sm font-medium text-slate-600"><span>{label}</span><span>{value}%</span></div> : null}
      <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
        <div className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-lime-400" style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}