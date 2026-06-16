import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full mt-24 border-t border-white/5 bg-dark-900/50 py-16 px-4 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Logo & Bio */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2 text-xl font-bold tracking-wider font-serif">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-gold-gradient text-dark-900 font-bold text-lg font-sans">M</span>
              <span className="text-gold-gradient">MuamForm</span>
              <span className="text-white text-xs font-sans tracking-widest uppercase bg-white/10 px-1.5 py-0.5 rounded font-normal">AI</span>
            </Link>
            <p className="text-xs text-gray-400 leading-relaxed">
              Synthesizing generative artificial intelligence with master human design craftsmanship to curate timeless, high-fidelity interior living spaces.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-4">
            <h4 className="text-xs uppercase font-bold text-white tracking-widest">Platform</h4>
            <div className="flex flex-col gap-2.5 text-xs text-gray-400">
              <Link href="/transform" className="hover:text-primary transition-colors">AI Redesigns</Link>
              <Link href="/designer" className="hover:text-primary transition-colors">Designer Directory</Link>
              <Link href="/learn" className="hover:text-primary transition-colors">Tutorials & Guides</Link>
              <Link href="/dashboard" className="hover:text-primary transition-colors">Client Workspaces</Link>
            </div>
          </div>

          {/* Company */}
          <div className="flex flex-col gap-4">
            <h4 className="text-xs uppercase font-bold text-white tracking-widest">Legal</h4>
            <div className="flex flex-col gap-2.5 text-xs text-gray-400">
              <span className="cursor-pointer hover:text-primary transition-colors">Terms of Service</span>
              <span className="cursor-pointer hover:text-primary transition-colors">Privacy Policy</span>
              <span className="cursor-pointer hover:text-primary transition-colors">Affiliate Disclosures</span>
              <span className="cursor-pointer hover:text-primary transition-colors">Support Portal</span>
            </div>
          </div>

          {/* Newsletter / CTA */}
          <div className="flex flex-col gap-4">
            <h4 className="text-xs uppercase font-bold text-white tracking-widest">Aesthetic Brief</h4>
            <p className="text-xs text-gray-400">Receive architectural inspiration and design trend updates directly in your inbox.</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter email address"
                className="flex-1 glass-input text-xs px-3 py-2 border-white/10"
              />
              <button className="bg-gold-gradient text-dark-900 text-xs font-bold px-4 py-2 rounded-lg hover:shadow-lg hover:shadow-primary/20 transition-all">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="h-px bg-white/5 my-12"></div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-gray-500">
          <p>© {new Date().getFullYear()} MuamFormAI. All architectural renders and conceptual recommendations are AI-assisted with designer review.</p>
          <div className="flex gap-6">
            <span className="cursor-pointer hover:text-gray-400 transition-colors">Twitter</span>
            <span className="cursor-pointer hover:text-gray-400 transition-colors">Instagram</span>
            <span className="cursor-pointer hover:text-gray-400 transition-colors">Pinterest</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
