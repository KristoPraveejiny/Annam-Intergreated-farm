import { Link } from 'react-router-dom';
import type { InputHTMLAttributes } from 'react';
import { AuthLayout } from './AuthLayout';
import { Button } from '../../components/ui/Button';

export default function LoginPage() {
  return (
    <AuthLayout title="Welcome back" subtitle="Sign in to access your smart farm dashboard, alerts, analytics, and marketplace tools.">
      <form className="space-y-4 rounded-[1.5rem] border border-white/15 bg-white/8 p-6 backdrop-blur-2xl">
        <AuthField label="Email" type="email" placeholder="you@example.com" />
        <AuthField label="Password" type="password" placeholder="••••••••" />
        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 text-white/70"><input type="checkbox" className="rounded border-white/30 bg-white/10" /> Remember me</label>
          <Link to="/forgot-password" className="font-semibold text-emerald-200">Forgot password?</Link>
        </div>
        <Button className="w-full">Login</Button>
        <p className="text-center text-sm text-white/70">New user? <Link to="/register" className="font-semibold text-emerald-200">Create account</Link></p>
      </form>
    </AuthLayout>
  );
}

function AuthField({ label, ...props }: InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-white/80">{label}</span>
      <input {...props} className="farm-input" />
    </label>
  );
}