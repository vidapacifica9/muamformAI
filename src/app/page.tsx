'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import BeforeAfterSlider from '@/components/premium/BeforeAfterSlider';
import { ArrowRight, Sparkles, Shield, ShoppingBag, DollarSign, PenTool } from 'lucide-react';
import { DesignStyle } from '@/types';

// Sandbox preview images for different styles
const SANDBOX_PREVIEWS: Record<DesignStyle, { image: string; description: string }> = {
  Modern: {
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=800',
    description: 'Monochrome surfaces, low-profile seating, and geometric lighting profiles.'
  },
  Scandinavian: {
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=800',
    description: 'Warm light woods, soft wool textiles, and functional cozy seating configurations.'
  },
  Minimalist: {
    image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=800',
    description: 'Highly decluttered space focusing on texture, shadows, and natural ventilation lines.'
  },
  Luxury: {
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=800',
    description: 'Polished Calacatta marble, brushed brass lighting fixtures, and custom velvets.'
  },
  Industrial: {
    image: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&q=80&w=800',
    description: 'Raw brick, structural charcoal metals, exposed pipes, and thick distressed leather.'
  },
  Bohemian: {
    image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80&w=800',
    description: 'Potted palms, woven rattan furniture pieces, and hand-woven Moroccan overlays.'
  },
  Classic: {
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=800',
    description: 'Symmetrical layout setups, traditional moldings, and rich mahogany woods.'
  }
};

export default function LandingPage() {
  const [sandboxStyle, setSandboxStyle] = useState<DesignStyle>('Scandinavian');

  return (
    <div className="relative w-full pb-24 overflow-hidden">
      {/* Background Glowing Blobs */}
      <div className="absolute top-[10%] left-[5%] -z-10 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[120px] animate-pulse-glow"></div>
      <div className="absolute top-[40%] right-[5%] -z-10 w-[600px] h-[600px] rounded-full bg-purple-500/5 blur-[140px] animate-pulse-glow" style={{ animationDelay: '2s' }}></div>

      {/* --- HERO SECTION --- */}
      <section className="mx-auto max-w-7xl px-4 pt-16 md:pt-24 flex flex-col items-center text-center gap-8">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4.5 py-1 text-xs font-semibold tracking-wider text-primary">
          <Sparkles className="w-3.5 h-3.5" />
          The Future of Architectural Design
        </div>

        <h1 className="max-w-4xl text-4xl sm:text-6xl font-extrabold tracking-tight font-serif text-white leading-tight">
          Transform Your Space With <span className="text-gold-gradient">AI Precision</span> & Human Artistry
        </h1>

        <p className="max-w-2xl text-sm sm:text-base text-gray-400 leading-relaxed font-sans">
          Upload room photos, instantly generate high-fidelity redesigned concepts across 7 distinct styles, project custom budget plans, and get review revisions from elite designers.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mt-2">
          <Link
            href="/transform"
            className="bg-gold-gradient text-dark-900 font-bold px-8 py-3.5 rounded-xl hover:shadow-lg hover:shadow-primary/25 transition-all flex items-center gap-2 group text-sm tracking-wide"
          >
            Start Room Redesign
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href="/designer"
            className="glass-panel border-white/10 hover:border-primary/50 text-white font-semibold px-8 py-3.5 rounded-xl hover:bg-white/5 transition-all text-sm tracking-wide"
          >
            Browse Designer Marketplace
          </Link>
        </div>

        {/* Hero Interactive Before/After Slider */}
        <div className="w-full max-w-4xl mt-12 bg-dark-800 p-2 sm:p-4 rounded-3xl border border-white/5 shadow-2xl shadow-black">
          <BeforeAfterSlider
            beforeImage="https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=1200" // Messy attic/classic room
            afterImage="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=1200" // Stunning Scandi room
            heightClass="h-[280px] sm:h-[450px] md:h-[500px]"
          />
        </div>
      </section>

      {/* --- HOW IT WORKS (BENEFITS) --- */}
      <section className="mx-auto max-w-7xl px-4 mt-32">
        <div className="text-center mb-16">
          <h2 className="text-2xl sm:text-4xl font-bold font-serif text-white mb-4">Complete AI-to-Contractor Workflow</h2>
          <p className="text-sm text-gray-400 max-w-xl mx-auto">MuamFormAI provides structural room detection, itemized cost estimates, and real designer consultations all in one place.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="glass-panel p-6 rounded-2xl border-white/5 flex flex-col gap-4">
            <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-semibold text-lg text-white">1. AI Vision Analysis</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Our model detects wall boundaries, lighting orientation, and current furniture pieces in your uploaded room photo.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-2xl border-white/5 flex flex-col gap-4">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
              <DollarSign className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-semibold text-lg text-white">2. Smart Budget Planner</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Recalculate project totals instantly using interactive Low, Medium, and Premium budget filters tailored to your zip code.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-2xl border-white/5 flex flex-col gap-4">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-semibold text-lg text-white">3. Itemized Shopping List</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Get an affiliate list of furniture, lighting, and decor items matching the redesigned image style. Exportable to PDF.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-2xl border-white/5 flex flex-col gap-4">
            <div className="w-10 h-10 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-400">
              <PenTool className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-semibold text-lg text-white">4. Designer Marketplace</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Request review validation from certified interior architects. Designers customize recommendations and send final proposals.
            </p>
          </div>
        </div>
      </section>

      {/* --- STYLE SANDBOX PLAYGROUND --- */}
      <section className="mx-auto max-w-7xl px-4 mt-32">
        <div className="glass-panel rounded-3xl border-white/5 bg-dark-800/50 p-6 md:p-12 flex flex-col lg:flex-row gap-12 items-center">
          <div className="flex-1 flex flex-col gap-6">
            <div className="inline-flex max-w-fit items-center gap-1.5 rounded-full border border-purple-500/20 bg-purple-500/5 px-3.5 py-0.5 text-[10px] font-bold uppercase tracking-widest text-purple-400">
              Style Sandbox
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold font-serif text-white">Test Style Visualizations Instantly</h2>
            <p className="text-sm text-gray-400 leading-relaxed">
              Try our style sandbox. Toggle between the interior design templates below to see how our generative architecture model adapts room components.
            </p>

            {/* Selector Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {(Object.keys(SANDBOX_PREVIEWS) as DesignStyle[]).map(style => (
                <button
                  key={style}
                  onClick={() => setSandboxStyle(style)}
                  className={`text-xs text-left px-4 py-3 rounded-xl border font-semibold tracking-wide transition-all ${
                    sandboxStyle === style
                      ? 'bg-primary text-dark-900 border-primary shadow-lg shadow-primary/10'
                      : 'border-white/5 hover:border-white/20 text-gray-300'
                  }`}
                >
                  {style}
                </button>
              ))}
            </div>

            <div className="h-px bg-white/5 my-2"></div>
            <p className="text-xs italic text-gray-400 leading-relaxed">
              &ldquo;{SANDBOX_PREVIEWS[sandboxStyle].description}&rdquo;
            </p>
          </div>

          <div className="flex-1 w-full max-w-xl h-[300px] md:h-[400px] rounded-2xl overflow-hidden border border-white/10 shadow-2xl relative">
            <img
              src={SANDBOX_PREVIEWS[sandboxStyle].image}
              alt={`${sandboxStyle} Room`}
              className="w-full h-full object-cover transition-opacity duration-300 animate-in fade-in-50"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-transparent to-transparent"></div>
            <div className="absolute bottom-4 left-4 z-10 glass-panel bg-dark-800/80 px-3 py-1.5 rounded-lg border-white/10 text-xs font-bold text-primary">
              AI Render Preview: {sandboxStyle}
            </div>
          </div>
        </div>
      </section>

      {/* --- SUBSCRIPTION PLANS --- */}
      <section className="mx-auto max-w-7xl px-4 mt-32">
        <div className="text-center mb-16">
          <h2 className="text-2xl sm:text-4xl font-bold font-serif text-white mb-4">Select Your Design Tier</h2>
          <p className="text-sm text-gray-400 max-w-xl mx-auto">Get started for free or unlock unlimited creations, budget calculations, and real human designer reviews.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch max-w-5xl mx-auto">
          {/* Free Tier */}
          <div className="glass-panel p-8 rounded-3xl border-white/5 bg-dark-800/20 flex flex-col justify-between gap-8">
            <div className="flex flex-col gap-4">
              <p className="text-xs uppercase font-bold text-gray-500 tracking-widest">Client</p>
              <h3 className="font-serif font-bold text-2xl text-white">Free Plan</h3>
              <p className="text-xs text-gray-400">Explore AI visualizations and test layout styles.</p>
              <div className="flex items-baseline gap-1 mt-2">
                <span className="text-4xl font-extrabold text-white">$0</span>
                <span className="text-xs text-gray-500">/ month</span>
              </div>
              <ul className="flex flex-col gap-3 text-xs text-gray-300 mt-4 border-t border-white/5 pt-4">
                <li className="flex items-center gap-2">✓ 3 Room transformations / month</li>
                <li className="flex items-center gap-2">✓ 7 design styles</li>
                <li className="flex items-center gap-2">✗ No custom budget editor</li>
                <li className="flex items-center gap-2">✗ No exportable shopping lists</li>
              </ul>
            </div>
            <Link
              href="/transform"
              className="text-center text-xs font-bold text-white border border-white/10 hover:border-white/30 bg-white/5 py-3 rounded-xl hover:bg-white/10 transition-all mt-4"
            >
              Start Free Redesigns
            </Link>
          </div>

          {/* Pro Tier */}
          <div className="glass-panel p-8 rounded-3xl border-white/15 bg-dark-800/40 relative flex flex-col justify-between gap-8 shadow-xl shadow-purple-500/5">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-purple-600 text-white text-[9px] font-extrabold tracking-widest px-3.5 py-1 rounded-full uppercase">
              Popular Choice
            </div>
            <div className="flex flex-col gap-4">
              <p className="text-xs uppercase font-bold text-purple-400 tracking-widest">Decorator</p>
              <h3 className="font-serif font-bold text-2xl text-white">Pro Plan</h3>
              <p className="text-xs text-gray-400">Perfect for homeowners and DIY decorators executing a makeover.</p>
              <div className="flex items-baseline gap-1 mt-2">
                <span className="text-4xl font-extrabold text-white">$29</span>
                <span className="text-xs text-gray-500">/ month</span>
              </div>
              <ul className="flex flex-col gap-3 text-xs text-gray-300 mt-4 border-t border-white/5 pt-4">
                <li className="flex items-center gap-2 text-purple-400">✓ Unlimited AI Transformations</li>
                <li className="flex items-center gap-2">✓ Zip-code accurate budget planner</li>
                <li className="flex items-center gap-2">✓ Interactive shopping lists</li>
                <li className="flex items-center gap-2">✓ Export lists to PDF</li>
              </ul>
            </div>
            <Link
              href="/transform"
              className="text-center text-xs font-bold text-white bg-purple-600 hover:bg-purple-700 py-3 rounded-xl hover:shadow-lg hover:shadow-purple-600/25 transition-all mt-4"
            >
              Upgrade to Pro
            </Link>
          </div>

          {/* Premium Tier */}
          <div className="glass-panel p-8 rounded-3xl border-primary/30 bg-dark-800/60 relative flex flex-col justify-between gap-8 shadow-2xl shadow-primary/5">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gold-gradient text-dark-900 text-[9px] font-extrabold tracking-widest px-3.5 py-1 rounded-full uppercase">
              Elite Service
            </div>
            <div className="flex flex-col gap-4">
              <p className="text-xs uppercase font-bold text-primary tracking-widest">Full-Service</p>
              <h3 className="font-serif font-bold text-2xl text-primary">Premium Review</h3>
              <p className="text-xs text-gray-400">Get a professional architect review and custom designer proposals.</p>
              <div className="flex items-baseline gap-1 mt-2">
                <span className="text-4xl font-extrabold text-white">$199</span>
                <span className="text-xs text-gray-500">/ room project</span>
              </div>
              <ul className="flex flex-col gap-3 text-xs text-gray-300 mt-4 border-t border-white/5 pt-4">
                <li className="flex items-center gap-2 text-primary">✓ 1-on-1 Certified Designer review</li>
                <li className="flex items-center gap-2">✓ Custom revised shopping lists</li>
                <li className="flex items-center gap-2">✓ Dedicated video scheduler</li>
                <li className="flex items-center gap-2">✓ Everything in Pro Plan included</li>
              </ul>
            </div>
            <Link
              href="/transform"
              className="text-center text-xs font-bold text-dark-900 bg-gold-gradient py-3 rounded-xl hover:shadow-lg hover:shadow-primary/30 transition-all mt-4"
            >
              Book Designer Review
            </Link>
          </div>
        </div>
      </section>

      {/* --- TRUST BADGE SECTION --- */}
      <section className="mx-auto max-w-7xl px-4 mt-32 text-center flex flex-col gap-6">
        <div className="h-px bg-gradient-to-r from-transparent via-white/5 to-transparent w-full"></div>
        <p className="text-xs font-bold tracking-widest uppercase text-gray-500">Endorsed by Independent Architects</p>
        <div className="flex flex-wrap justify-center items-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-300">
          <span className="text-sm font-serif font-semibold tracking-wider text-white">Vogue Living</span>
          <span className="text-sm font-serif font-semibold tracking-wider text-white">Architectural Digest</span>
          <span className="text-sm font-serif font-semibold tracking-wider text-white">ELLE Decor</span>
          <span className="text-sm font-serif font-semibold tracking-wider text-white">Dwell Mag</span>
        </div>
      </section>
    </div>
  );
}
