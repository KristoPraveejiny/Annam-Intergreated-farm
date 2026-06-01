import { FiFeather } from 'react-icons/fi';
import { Button } from '../ui/Button';

type PublicHeaderProps = {
  active?: 'home' | 'about' | 'features' | 'marketplace' | 'contact';
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
          <div className="h-11 w-auto overflow-visible rounded-md border border-emerald-100 bg-white shadow-[0_14px_35px_rgba(15,23,42,0.08)] flex items-center">
            <img src="/annam-logo.jpeg" alt="Annam Integrated Farm" className="h-11 w-auto object-contain" onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }} />
            <div className="hidden md:grid h-11 w-11 items-center justify-center text-emerald-700">
              <FiFeather className="text-lg" />
            </div>
          </div>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          <a className={`${linkBase} ${isActive('home') ? linkActive : linkInactive}`} href="/">Home</a>
          <a className={`${linkBase} ${isActive('about') ? linkActive : linkInactive}`} href="/about">About</a>
          <a className={`${linkBase} ${isActive('features') ? linkActive : linkInactive}`} href="/#features">Features</a>
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