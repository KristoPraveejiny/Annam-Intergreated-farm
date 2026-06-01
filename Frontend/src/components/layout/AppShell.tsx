import { useState } from 'react';
import type { ComponentType, ReactNode } from 'react';
import { FiBell, FiMenu, FiSearch } from 'react-icons/fi';
import { NavLink } from 'react-router-dom';
import { dashboardBadges } from '../../data/mock';
import { Button } from '../ui/Button';

type NavItem = {
  label: string;
  href: string;
  icon: ComponentType<{ className?: string }>;
};

type AppShellProps = {
  role: 'super-admin' | 'farm-manager' | 'farmer-worker' | 'customer' | 'guest';
  items: readonly NavItem[];
  children: ReactNode;
};

export function AppShell({ role, items, children }: AppShellProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="glass-bg min-h-screen text-white">
      <div className="flex min-h-screen">
        <aside className={`fixed inset-y-0 left-0 z-40 w-72 transform border-r border-white/15 bg-slate-950/35 backdrop-blur-2xl transition-transform duration-300 lg:static lg:translate-x-0 ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
          <div className="flex h-full flex-col px-5 py-6">
            <div className="mb-8 flex items-center gap-3">
              <div className="grid h-12 w-12 place-items-center rounded-2xl border border-white/15 bg-white/10 text-white backdrop-blur-2xl shadow-[0_16px_35px_rgba(16,185,129,0.2)]">
                <span className="text-lg font-black">S</span>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.26em] text-emerald-200">Smart Farm</p>
                <h1 className="text-lg font-semibold tracking-tight text-white">{role.replace('-', ' ')}</h1>
              </div>
            </div>

            <nav className="flex-1 space-y-1 overflow-y-auto pr-1">
              {items.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.label}
                    to={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-3 rounded-2xl border px-4 py-3 text-sm font-medium tracking-wide transition duration-300 ${isActive ? 'border-white/20 bg-white/12 text-white shadow-[0_10px_25px_rgba(2,6,23,0.15)]' : 'border-transparent text-white/72 hover:border-white/10 hover:bg-white/6 hover:text-white'}`
                    }
                  >
                    <Icon className="text-lg text-emerald-200" />
                    {item.label}
                  </NavLink>
                );
              })}
            </nav>

            <div className="mt-6 rounded-3xl border border-white/15 bg-white/10 p-5 text-white backdrop-blur-2xl shadow-[0_20px_50px_rgba(2,6,23,0.2)]">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/80">System Status</p>
              <p className="mt-2 text-lg font-bold">{dashboardBadges.online}</p>
              <p className="mt-3 text-sm text-white/90">{dashboardBadges.ai} and {dashboardBadges.qr}.</p>
            </div>
          </div>
        </aside>

        <div className="flex min-h-screen min-w-0 flex-1 flex-col lg:ml-0">
          <header className="sticky top-0 z-30 border-b border-white/10 bg-slate-950/25 backdrop-blur-2xl">
            <div className="flex items-center gap-4 px-4 py-4 sm:px-6 lg:px-8">
              <Button variant="ghost" className="lg:hidden" onClick={() => setMobileOpen((value) => !value)}>
                <FiMenu />
              </Button>

              <div className="relative flex flex-1 items-center">
                <FiSearch className="pointer-events-none absolute left-4 text-white/45" />
                <input className="farm-input pl-11" placeholder="Search farms, tasks, orders, crops..." />
              </div>

              <Button variant="ghost" className="relative">
                <FiBell className="text-lg" />
                <span className="absolute right-3 top-3 h-2 w-2 rounded-full bg-rose-500" />
              </Button>
              <div className="hidden rounded-2xl border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-white/80 backdrop-blur-2xl md:block">
                {dashboardBadges.weather}
              </div>
            </div>
          </header>

          <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
        </div>
      </div>

      {mobileOpen ? <button type="button" className="fixed inset-0 z-30 bg-slate-950/70 backdrop-blur-sm lg:hidden" aria-label="Close navigation" onClick={() => setMobileOpen(false)} /> : null}
    </div>
  );
}