import { Link } from 'react-router-dom';
import type { InputHTMLAttributes } from 'react';
import { AuthLayout } from './AuthLayout';
import { Button } from '../../components/ui/Button';

export default function RegisterPage() {
  return (
    <AuthLayout title="Create your farm account" subtitle="Join the platform to manage role-specific dashboards, AI insights, and marketplace operations.">
      <form className="grid gap-4 rounded-[1.5rem] border border-white/15 bg-white/8 p-6 backdrop-blur-2xl sm:grid-cols-2">
        <AuthField label="Name" placeholder="Full name" />
        <AuthField label="Email" type="email" placeholder="you@example.com" />
        <AuthField label="Phone" type="tel" placeholder="+91 98765 43210" />
        <AuthField label="User Role" placeholder="Super Admin / Manager / Farmer / Customer" />
        <AuthField label="Password" type="password" placeholder="••••••••" />
        <AuthField label="Confirm Password" type="password" placeholder="••••••••" />
        <div className="sm:col-span-2">
          <Button className="w-full">Register</Button>
        </div>
        <p className="text-center text-sm text-white/70 sm:col-span-2">Already have an account? <Link to="/login" className="font-semibold text-emerald-200">Login</Link></p>
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