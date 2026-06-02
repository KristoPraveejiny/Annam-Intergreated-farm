import { Link } from 'react-router-dom';
import type { InputHTMLAttributes } from 'react';
import { AuthLayout } from './AuthLayout';
import { Button } from '../../components/ui/Button';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../api/auth';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await login({ email, password });
      if (response.token) {
        localStorage.setItem('token', response.token);
        const role = response.user?.role;
        const dashRole = role?.replace('_', '-') === 'worker' ? 'farmer-worker' : role?.replace('_', '-');
        navigate(`/dashboard/${dashRole}`);
      } else {
        alert(response.error || 'Login failed');
      }
    } catch (err) {
      console.error(err);
      alert('An error occurred during login');
    }
  };

  return (
    <AuthLayout title="Welcome back" subtitle="Sign in to access your smart farm dashboard, alerts, analytics, and marketplace tools.">
      <form className="space-y-4 rounded-[1.5rem] border border-white/15 bg-white/8 p-6 backdrop-blur-2xl" onSubmit={handleSubmit}>
        <AuthField label="Email" type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} />
        <AuthField label="Password" type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} />
        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 text-white/70">
            <input type="checkbox" className="rounded border-white/30 bg-white/10" /> Remember me
          </label>
          <Link to="/forgot-password" className="font-semibold text-emerald-200">Forgot password?</Link>
        </div>
        <Button className="w-full" type="submit">Login</Button>
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