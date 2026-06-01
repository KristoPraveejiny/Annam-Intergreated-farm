import { Link } from 'react-router-dom';
import type { InputHTMLAttributes } from 'react';
import { AuthLayout } from './AuthLayout';
import { Button } from '../../components/ui/Button';

export default function OtpVerificationPage() {
  return (
    <AuthLayout title="Verify your OTP" subtitle="Enter the one-time passcode sent to your registered contact to continue.">
      <form className="space-y-4 rounded-[1.5rem] border border-white/15 bg-white/8 p-6 backdrop-blur-2xl">
        <AuthField label="OTP Code" placeholder="Enter 6-digit OTP" />
        <Button className="w-full">Verify OTP</Button>
        <p className="text-center text-sm text-white/70"><Link to="/login" className="font-semibold text-emerald-200">Return to login</Link></p>
      </form>
    </AuthLayout>
  );
}

function AuthField({ label, ...props }: InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-white/80">{label}</span>
      <input {...props} className="farm-input tracking-[0.35em]" />
    </label>
  );
}