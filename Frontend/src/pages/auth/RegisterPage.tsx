import { Link, useNavigate } from 'react-router-dom';
import type { InputHTMLAttributes } from 'react';
import { AuthLayout } from './AuthLayout';
import { Button } from '../../components/ui/Button';
import { useState } from 'react';
import { register as registerApi } from '../../api/auth';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState('Farmer');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    try {
      const roleMap: Record<string, string> = {
        "Super Admin": "super_admin",
        "Manager": "farm_manager",
        "Farmer": "worker",
        "Customer": "customer",
      } as const;
      const dbRole = roleMap[role as keyof typeof roleMap] || role.toLowerCase();
      const response = await registerApi({ name, email, password, phone, role: dbRole });
      if (response.token) {
      localStorage.setItem('token', response.token);
  // Map backend role to dashboard slug
  const dashRole = response.user?.role?.replace('_', '-') === 'worker' ? 'farmer-worker' : response.user?.role?.replace('_', '-');
  navigate('/login');
      } else {
        alert(response.error || 'Registration failed');
      }
    } catch (err) {
      console.error(err);
      alert('An error occurred during registration');
    }
  };

  return (
    <AuthLayout title="Create your farm account" subtitle="Join the platform to manage role-specific dashboards, AI insights, and marketplace operations.">
      <form className="grid gap-4 rounded-[1.5rem] border border-white/15 bg-white/8 p-6 backdrop-blur-2xl sm:grid-cols-2" onSubmit={handleSubmit}>
        <AuthField label="Name" placeholder="Full name" value={name} onChange={e => setName(e.target.value)} />
        <AuthField label="Email" type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} />
        <AuthField label="Phone" type="tel" placeholder="+91 98765 43210" value={phone} onChange={e => setPhone(e.target.value)} />
        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-white/80">User Role</span>
          <select name="role" value={role} onChange={e => setRole(e.target.value)} className="farm-input bg-white/6">
            <option value="Super Admin">Super Admin</option>
            <option value="Manager">Manager</option>
            <option value="Farmer">Farmer</option>
            <option value="Customer">Customer</option>
          </select>
        </label>
        <AuthField label="Password" type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} />
        <AuthField label="Confirm Password" type="password" placeholder="••••••••" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
        <div className="sm:col-span-2">
          <Button className="w-full" type="submit">Register</Button>
        </div>
        <p className="text-center text-sm text-white/70 sm:col-span-2">
          Already have an account? <Link to="/login" className="font-semibold text-emerald-200">Login</Link>
        </p>
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