import { FiFeather } from 'react-icons/fi';
import { Button } from '../ui/Button';

type PublicHeaderProps = {
  active?: 'home' | 'about' | 'marketplace' | 'contact';
};

const linkBase = 'text-sm font-medium transition-colors hover:text-emerald-600';
const linkActive = 'text-emerald-700';
const linkInactive = 'text-slate-600';

export function PublicHeader({ active }: PublicHeaderProps) {
  const isActive = (name: NonNullable<PublicHeaderProps['active']>) => active === name;

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 shadow-[0_8px_24px_rgba(15,23,42,0.04)] backdrop-blur-xl">
      <div className="section-shell flex items-center justify-between py-4">
        <a href="/" className="flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-2xl border border-emerald-100 bg-white text-emerald-700 shadow-[0_14px_35px_rgba(15,23,42,0.08)]">
            <FiFeather className="text-lg" />
          </div>
          <div className="hidden md:block">
            <p className="text-xs font-semibold uppercase tracking-[0.26em] text-emerald-600">Smart Farm</p>
            <p className="text-sm font-medium text-slate-600">Management & Advisory System</p>
          </div>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          <a className={`${linkBase} ${isActive('home') ? linkActive : linkInactive}`} href="/">Home</a>
          <a className={`${linkBase} ${isActive('about') ? linkActive : linkInactive}`} href="/about">About</a>

          <a className={`${linkBase} ${isActive('marketplace') ? linkActive : linkInactive}`} href="/marketplace">Marketplace</a>
          <a className={`${linkBase} ${isActive('contact') ? linkActive : linkInactive}`} href="/#contact">Contact</a>
        </nav>

        <div className="flex items-center gap-3">
          <a href="/login"><Button theme="light" variant="ghost">Login</Button></a>
          <a href="/register"><Button theme="light">Get Started</Button></a>
        </div>
      </div>
    </header>
  );
}