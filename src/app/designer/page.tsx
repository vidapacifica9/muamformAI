'use client';

import React, { useState, useEffect } from 'react';
import { dbManager } from '@/lib/dbManager';
import { DesignerProfile } from '@/types';
import { Star, ShieldCheck, Mail, Globe, Image as ImageIcon, X } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

export default function DesignerMarketplace() {
  const [designers, setDesigners] = useState<DesignerProfile[]>([]);
  const [activePortfolioImg, setActivePortfolioImg] = useState<{ url: string; title: string; desc: string } | null>(null);

  useEffect(() => {
    setDesigners(dbManager.getDesigners());
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 md:px-8 flex flex-col gap-8">
      {/* Intro */}
      <div className="text-center max-w-2xl mx-auto flex flex-col gap-3 mb-6">
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-serif text-gold-gradient">
          Designer Marketplace
        </h1>
        <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
          Collaborate with top-tier interior architects and design consultants. Get expert visual assessments, custom budget alignments, and bespoke furniture guides.
        </p>
      </div>

      {/* Grid of Designers */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {designers.map((designer) => (
          <div
            key={designer.id}
            className="glass-panel p-6 sm:p-8 rounded-3xl border-white/5 bg-dark-800/40 flex flex-col justify-between gap-6"
          >
            {/* Top Info */}
            <div className="flex flex-col sm:flex-row gap-5 items-start sm:items-center">
              <img
                src={designer.avatar_url || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2'}
                alt={designer.full_name}
                className="w-16 h-16 rounded-full border border-primary/25 object-cover"
              />
              <div className="flex-grow">
                <div className="flex items-center gap-2">
                  <h3 className="font-serif font-bold text-xl text-white">{designer.full_name}</h3>
                  {designer.is_verified && (
                    <span className="text-primary" title="Verified Professional">
                      <ShieldCheck className="w-4.5 h-4.5" />
                    </span>
                  )}
                </div>
                
                {/* Rating & Rate Row */}
                <div className="flex items-center gap-4 text-xs mt-1">
                  <span className="flex items-center gap-1 text-primary font-bold">
                    <Star className="w-3.5 h-3.5 fill-primary" />
                    {designer.rating.toFixed(2)}
                  </span>
                  <span className="text-gray-500">•</span>
                  <span className="text-accent font-semibold">{formatCurrency(designer.hourly_rate)} / hr</span>
                </div>
              </div>
            </div>

            {/* Biography */}
            <p className="text-xs text-gray-300 leading-relaxed">
              {designer.bio}
            </p>

            {/* Portfolio Grid preview */}
            <div>
              <p className="text-[10px] uppercase font-bold tracking-widest text-gray-500 mb-3 flex items-center gap-1.5">
                <ImageIcon className="w-3.5 h-3.5" />
                Featured Portfolio
              </p>
              <div className="grid grid-cols-2 gap-4">
                {designer.portfolio.map((item, idx) => (
                  <div
                    key={idx}
                    onClick={() => setActivePortfolioImg({ url: item.image_url, title: item.title, desc: item.description })}
                    className="group relative h-28 rounded-xl overflow-hidden cursor-pointer border border-white/5"
                  >
                    <img
                      src={item.image_url}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors"></div>
                    <div className="absolute bottom-2 left-2 z-10">
                      <p className="text-[10px] font-bold text-white leading-none">{item.title}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="h-px bg-white/5 my-1"></div>

            {/* Actions */}
            <div className="flex gap-4">
              <button className="flex-1 glass-input py-2 text-xs font-bold border-white/10 hover:border-white/20 text-gray-300 flex items-center justify-center gap-2">
                <Mail className="w-3.5 h-3.5" />
                Contact Inquiry
              </button>
              <button className="flex-1 bg-gold-gradient text-dark-900 py-2 rounded-xl text-xs font-bold hover:shadow-lg hover:shadow-primary/20 transition-all flex items-center justify-center gap-2">
                <Globe className="w-3.5 h-3.5" />
                View Full Profile
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* --- PORTFOLIO LIGHTBOX MODAL --- */}
      {activePortfolioImg && (
        <div className="fixed inset-0 z-50 bg-dark-900/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-panel border-white/10 bg-dark-800 max-w-2xl w-full p-5 rounded-3xl flex flex-col gap-4 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setActivePortfolioImg(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="rounded-2xl overflow-hidden aspect-video border border-white/10 relative">
              <img
                src={activePortfolioImg.url}
                alt={activePortfolioImg.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div>
              <h3 className="font-serif font-bold text-lg text-white">{activePortfolioImg.title}</h3>
              <p className="text-xs text-gray-400 mt-1 leading-relaxed">{activePortfolioImg.desc}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
