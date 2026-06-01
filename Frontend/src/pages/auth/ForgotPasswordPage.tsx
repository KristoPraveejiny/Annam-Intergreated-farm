import { Link } from 'react-router-dom';
import type { InputHTMLAttributes } from 'react';
import { AuthLayout } from './AuthLayout';
import { Button } from '../../components/ui/Button';

export default function ForgotPasswordPage() {
  return (
    <AuthLayout title="Reset your password" subtitle="We will send a secure OTP so you can regain access quickly.">
      <form className="space-y-4 rounded-[1.5rem] border border-white/15 bg-white/8 p-6 backdrop-blur-2xl">
        <AuthField label="Email or Phone" placeholder="Enter your account email or phone" />
        <Button className="w-full">Send OTP</Button>
        <p className="text-center text-sm text-white/70"><Link to="/otp-verification" className="font-semibold text-emerald-200">Already have OTP?</Link></p>
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