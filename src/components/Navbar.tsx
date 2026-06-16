'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { dbManager } from '@/lib/dbManager';
import { Profile, Subscription } from '@/types';
import { Sparkles, Menu, X, User, Layers, ShieldCheck, ChevronDown } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<Profile | null>(null);
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [showSandbox, setShowSandbox] = useState(false);

  useEffect(() => {
    // Load state
    setCurrentUser(dbManager.getCurrentUser());
    setSubscription(dbManager.getSubscription());
  }, [pathname]);

  const handleRoleChange = (role: 'user' | 'designer' | 'admin') => {
    const updated = dbManager.switchUserRole(role);
    setCurrentUser(updated);
    setShowSandbox(false);
    // Force reload components on the page
    window.location.reload();
  };

  const handlePlanChange = (plan: 'free' | 'pro' | 'premium') => {
    const updated = dbManager.updateSubscription(plan);
    setSubscription(updated);
    setShowSandbox(false);
    // Force reload components on the page
    window.location.reload();
  };

  const isActive = (path: string) => pathname === path;

  const navLinks = [
    { name: 'Dashboard', href: '/dashboard', show: currentUser?.role === 'user' },
    { name: 'AI Transform', href: '/transform', show: currentUser?.role === 'user' },
    { name: 'Designers', href: '/designer', show: currentUser?.role === 'user' },
    { name: 'Designer Panel', href: '/designer/dashboard', show: currentUser?.role === 'designer' },
    { name: 'Admin Hub', href: '/admin', show: currentUser?.role === 'admin' },
    { name: 'Learn Center', href: '/learn', show: true },
  ];

  return (
    <header className="sticky top-0 z-50 w-full px-4 py-4 md:px-8 bg-dark-900/30 backdrop-blur-md">
      <div className="mx-auto max-w-7xl">
        <nav className="glass-panel relative flex items-center justify-between rounded-2xl px-6 py-4 border-white/5 bg-dark-800/80">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 text-xl font-bold tracking-wider font-serif">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-gold-gradient text-dark-900 font-bold text-lg font-sans">M</span>
            <span className="text-gold-gradient">MuamForm</span>
            <span className="text-white text-xs font-sans tracking-widest uppercase bg-white/10 px-1.5 py-0.5 rounded font-normal">AI</span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks
              .filter(link => link.show)
              .map(link => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-sm tracking-wide transition-all duration-200 hover:text-primary ${
                    isActive(link.href) ? 'text-primary font-medium' : 'text-gray-300'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            {/* Subscription Badge */}
            {currentUser?.role === 'user' && subscription && (
              <span className={`text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded-full border ${
                subscription.plan === 'premium' 
                  ? 'bg-primary/10 border-primary text-primary'
                  : subscription.plan === 'pro'
                  ? 'bg-purple-500/10 border-purple-500/30 text-purple-400'
                  : 'bg-white/5 border-white/10 text-gray-400'
              }`}>
                {subscription.plan} Tier
              </span>
            )}

            {/* Sandbox Simulation Button */}
            <div className="relative">
              <button
                onClick={() => setShowSandbox(!showSandbox)}
                className="flex items-center gap-2 text-xs font-semibold tracking-wider text-accent border border-accent/20 bg-dark-900 hover:bg-primary/5 hover:border-primary/50 px-4 py-2 rounded-xl transition-all duration-200"
              >
                <Sparkles className="w-3.5 h-3.5 text-primary" />
                Sandbox Mode
                <ChevronDown className="w-3.5 h-3.5 text-primary" />
              </button>

              {showSandbox && (
                <div className="absolute right-0 mt-3 w-64 rounded-2xl glass-panel bg-dark-800 p-4 shadow-2xl border-primary/20 animate-in fade-in-50 slide-in-from-top-3 duration-200">
                  <div className="mb-3 pb-2 border-b border-white/5">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Switch User Role</p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => handleRoleChange('user')}
                      className={`flex items-center gap-2.5 text-left text-xs p-2 rounded-lg transition-colors ${
                        currentUser?.role === 'user' ? 'bg-primary/10 text-primary' : 'hover:bg-white/5 text-gray-300'
                      }`}
                    >
                      <User className="w-4.5 h-4.5" />
                      Client Dashboard
                    </button>
                    <button
                      onClick={() => handleRoleChange('designer')}
                      className={`flex items-center gap-2.5 text-left text-xs p-2 rounded-lg transition-colors ${
                        currentUser?.role === 'designer' ? 'bg-primary/10 text-primary' : 'hover:bg-white/5 text-gray-300'
                      }`}
                    >
                      <Layers className="w-4.5 h-4.5" />
                      Designer Dashboard
                    </button>
                    <button
                      onClick={() => handleRoleChange('admin')}
                      className={`flex items-center gap-2.5 text-left text-xs p-2 rounded-lg transition-colors ${
                        currentUser?.role === 'admin' ? 'bg-primary/10 text-primary' : 'hover:bg-white/5 text-gray-300'
                      }`}
                    >
                      <ShieldCheck className="w-4.5 h-4.5" />
                      Admin Dashboard
                    </button>
                  </div>

                  {currentUser?.role === 'user' && (
                    <>
                      <div className="mt-4 mb-3 pb-2 border-b border-white/5">
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Switch Plan Tier</p>
                      </div>
                      <div className="flex gap-2 justify-between">
                        {(['free', 'pro', 'premium'] as const).map(tier => (
                          <button
                            key={tier}
                            onClick={() => handlePlanChange(tier)}
                            className={`flex-1 text-center text-[10px] py-1.5 rounded-lg border capitalize font-bold transition-all ${
                              subscription?.plan === tier 
                                ? 'bg-primary text-dark-900 border-primary shadow-lg shadow-primary/20' 
                                : 'border-white/10 hover:bg-white/5 text-gray-300'
                            }`}
                          >
                            {tier}
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex md:hidden text-gray-300 hover:text-white"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>

        {/* Mobile Navigation Drawer */}
        {isOpen && (
          <div className="md:hidden mt-2 rounded-2xl glass-panel bg-dark-800 p-6 flex flex-col gap-4 animate-in fade-in slide-in-from-top-5 duration-200">
            {navLinks
              .filter(link => link.show)
              .map(link => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`text-sm tracking-wide transition-colors ${
                    isActive(link.href) ? 'text-primary font-semibold' : 'text-gray-300'
                  }`}
                >
                  {link.name}
                </Link>
              ))}

            <div className="h-px bg-white/5 my-2"></div>

            {/* Mobile role selections */}
            <div className="flex flex-col gap-3">
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Sandbox Roles</p>
              <div className="flex gap-2">
                <button
                  onClick={() => { handleRoleChange('user'); setIsOpen(false); }}
                  className={`flex-1 text-center text-xs py-2 rounded-lg border ${
                    currentUser?.role === 'user' ? 'bg-primary/10 text-primary border-primary/30' : 'border-white/5 text-gray-400'
                  }`}
                >
                  Client
                </button>
                <button
                  onClick={() => { handleRoleChange('designer'); setIsOpen(false); }}
                  className={`flex-1 text-center text-xs py-2 rounded-lg border ${
                    currentUser?.role === 'designer' ? 'bg-primary/10 text-primary border-primary/30' : 'border-white/5 text-gray-400'
                  }`}
                >
                  Designer
                </button>
                <button
                  onClick={() => { handleRoleChange('admin'); setIsOpen(false); }}
                  className={`flex-1 text-center text-xs py-2 rounded-lg border ${
                    currentUser?.role === 'admin' ? 'bg-primary/10 text-primary border-primary/30' : 'border-white/5 text-gray-400'
                  }`}
                >
                  Admin
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
