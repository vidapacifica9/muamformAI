'use client';

import React, { useState, useEffect } from 'react';
import { dbManager } from '@/lib/dbManager';
import { DesignerProfile, Profile } from '@/types';
import { ShieldAlert, Users, TrendingUp, Sparkles, Star, CheckCircle, XCircle } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

export default function AdminDashboard() {
  const [designers, setDesigners] = useState<DesignerProfile[]>([]);
  const [analytics, setAnalytics] = useState({
    totalUsers: 142,
    activeSubscribers: 38,
    mrr: 1240, // 38 * $29 + consultations
    totalDesigns: 87,
    affiliateClicks: 412,
    affiliateRevenue: 320
  });

  useEffect(() => {
    setDesigners(dbManager.getDesigners());
  }, []);

  const toggleVerifyDesigner = (dId: string) => {
    // In our mock context, since designers are statically exported from mockData,
    // we can manage verification locally in this state to prove the toggle works.
    setDesigners(prev =>
      prev.map(d => (d.id === dId ? { ...d, is_verified: !d.is_verified } : d))
    );
  };

  const affiliateItems = [
    { name: 'Svalbard Bouclé Sofa', brand: 'NordicForm', clicks: 128, conversionRate: '12%', commission: 156 },
    { name: 'Fjord Solid Oak Coffee Table', brand: 'Aethel', clicks: 84, conversionRate: '8%', commission: 68 },
    { name: 'Paper Halo Floor Lamp', brand: 'HAY Design', clicks: 145, conversionRate: '18%', commission: 72 },
    { name: 'Danish Woven Area Rug', brand: 'Copenhagen Weavers', clicks: 55, conversionRate: '6%', commission: 41 }
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 md:px-8 flex flex-col gap-8">
      {/* Intro */}
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight font-serif text-white">Admin Hub Console</h1>
        <p className="text-xs text-gray-400 mt-1">Platform Operations — Monitor user metrics, check designer portfolios, and audit affiliate payouts.</p>
      </div>

      {/* Analytics KPI Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="glass-panel p-5 rounded-2xl border-white/5 flex flex-col gap-1.5">
          <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest flex items-center gap-1.5">
            <Users className="w-4 h-4 text-primary" /> Registered Client Base
          </p>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-3xl font-extrabold text-white">{analytics.totalUsers}</span>
            <span className="text-xs text-green-400 font-bold">+18% this month</span>
          </div>
        </div>

        <div className="glass-panel p-5 rounded-2xl border-white/5 flex flex-col gap-1.5">
          <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest flex items-center gap-1.5">
            <TrendingUp className="w-4 h-4 text-purple-400" /> Platform MRR
          </p>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-3xl font-extrabold text-white">{formatCurrency(analytics.mrr)}</span>
            <span className="text-xs text-gray-500">active billing</span>
          </div>
        </div>

        <div className="glass-panel p-5 rounded-2xl border-white/5 flex flex-col gap-1.5">
          <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-blue-400" /> Total AI Generations
          </p>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-3xl font-extrabold text-white">{analytics.totalDesigns}</span>
            <span className="text-xs text-gray-500">renders compiled</span>
          </div>
        </div>

        <div className="glass-panel p-5 rounded-2xl border-white/5 flex flex-col gap-1.5">
          <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest flex items-center gap-1.5">
            <TrendingUp className="w-4 h-4 text-green-400" /> Affiliate Commission Payouts
          </p>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-3xl font-extrabold text-white">{formatCurrency(analytics.affiliateRevenue)}</span>
            <span className="text-xs text-green-400 font-bold">{analytics.affiliateClicks} link clicks</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* DESIGNER VERIFICATION AND ROSTER MANAGEMENT */}
        <div className="glass-panel p-6 rounded-2xl border-white/5 bg-dark-800/40 flex flex-col gap-5">
          <h3 className="text-sm uppercase font-bold text-white tracking-wider border-b border-white/5 pb-2">
            Designer Verification Auditing
          </h3>

          <div className="flex flex-col gap-4">
            {designers.map((d) => (
              <div key={d.id} className="flex justify-between items-center p-3.5 rounded-xl bg-dark-900/40 border border-white/5">
                <div className="flex items-center gap-3">
                  <img src={d.avatar_url || ''} alt={d.full_name} className="w-10 h-10 rounded-full border border-white/10 object-cover" />
                  <div>
                    <h4 className="text-xs font-bold text-white">{d.full_name}</h4>
                    <p className="text-[9px] text-gray-500 mt-0.5">Rate: {formatCurrency(d.hourly_rate)}/hr • Rating: {d.rating.toFixed(2)} ★</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`text-[8px] uppercase font-extrabold px-2 py-0.5 rounded ${
                    d.is_verified ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'
                  }`}>
                    {d.is_verified ? 'Verified' : 'Pending Review'}
                  </span>

                  <button
                    onClick={() => toggleVerifyDesigner(d.id)}
                    className={`text-[9px] uppercase font-bold px-3 py-1.5 rounded-lg border transition-all ${
                      d.is_verified
                        ? 'border-red-500/20 hover:bg-red-500/10 text-red-400'
                        : 'border-green-500/20 hover:bg-green-500/10 text-green-400'
                    }`}
                  >
                    {d.is_verified ? 'Revoke Status' : 'Approve Status'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AFFILIATE LINK PERFORMANCE */}
        <div className="glass-panel p-6 rounded-2xl border-white/5 bg-dark-800/40 flex flex-col gap-4">
          <h3 className="text-sm uppercase font-bold text-white tracking-wider border-b border-white/5 pb-2">
            Top Referral Partner Performance
          </h3>

          <div className="overflow-x-auto w-full">
            <table className="w-full text-left border-collapse text-xs text-gray-300">
              <thead>
                <tr className="border-b border-white/5 text-[9px] uppercase tracking-widest text-gray-500">
                  <th className="py-2.5">Product</th>
                  <th className="py-2.5">Brand</th>
                  <th className="py-2.5 text-center">Referrals</th>
                  <th className="py-2.5 text-right">Commission</th>
                </tr>
              </thead>
              <tbody>
                {affiliateItems.map((item, i) => (
                  <tr key={i} className="border-b border-white/5 last:border-b-0 hover:bg-white/1">
                    <td className="py-3 font-semibold text-white truncate max-w-[150px]">{item.name}</td>
                    <td className="py-3 text-gray-500">{item.brand}</td>
                    <td className="py-3 text-center font-mono">{item.clicks}</td>
                    <td className="py-3 text-right font-bold text-accent font-mono">{formatCurrency(item.commission)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
