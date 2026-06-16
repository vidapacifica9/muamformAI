'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { dbManager } from '@/lib/dbManager';
import { DesignStyle, BudgetLevel, Room, Transformation } from '@/types';
import StyleSelector from '@/components/premium/StyleSelector';
import { Upload, Sparkles, AlertCircle, Image as ImageIcon } from 'lucide-react';

const MOCK_ROOM_TEMPLATES = [
  {
    id: 'temp-1',
    name: 'Classic Messy Attic',
    url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=400',
    type: 'Living Room'
  },
  {
    id: 'temp-2',
    name: 'Unfinished concrete cellar',
    url: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&q=80&w=400',
    type: 'Office'
  },
  {
    id: 'temp-3',
    name: 'Dark empty bedroom',
    url: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&q=80&w=400',
    type: 'Bedroom'
  }
];

// Map of styles to high-quality generated outputs (for demo redirection)
const RENDER_OUTPUTS: Record<DesignStyle, string> = {
  Modern: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=1200',
  Scandinavian: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=1200',
  Minimalist: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=1200',
  Luxury: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=1200',
  Industrial: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&q=80&w=1200',
  Bohemian: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80&w=1200',
  Classic: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=1200'
};

export default function TransformPage() {
  const router = useRouter();
  const [selectedStyle, setSelectedStyle] = useState<DesignStyle>('Scandinavian');
  const [roomType, setRoomType] = useState('Living Room');
  const [budgetLevel, setBudgetLevel] = useState<BudgetLevel>('medium');
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string>('');
  
  // Generation Animation States
  const [isGenerating, setIsGenerating] = useState(false);
  const [genStep, setGenStep] = useState(0);
  const [quota, setQuota] = useState({ remaining: 3, total: 3, plan: 'free' });

  useEffect(() => {
    const sub = dbManager.getSubscription();
    const rooms = dbManager.getRooms();
    
    if (sub.plan === 'free') {
      const used = rooms.length;
      setQuota({
        remaining: Math.max(0, 3 - used),
        total: 3,
        plan: 'free'
      });
    } else {
      setQuota({
        remaining: 999, // unlimited
        total: 999,
        plan: sub.plan
      });
    }
  }, []);

  const steps = [
    'Scanning room geometry and window lighting bounds...',
    'Identifying clutter nodes and structural barriers...',
    `Orchestrating ${selectedStyle} design tokens...`,
    'Synthesizing photorealistic furniture nodes...',
    'Itemizing budget estimations and procurement index...'
  ];

  useEffect(() => {
    if (!isGenerating) return;

    if (genStep < steps.length) {
      const timer = setTimeout(() => {
        setGenStep(prev => prev + 1);
      }, 1500);
      return () => clearTimeout(timer);
    } else {
      // Done generating! Create entries in localStorage db
      const roomId = `room-${Math.random().toString(36).substr(2, 9)}`;
      const transformId = `transform-${Math.random().toString(36).substr(2, 9)}`;

      const newRoom: Room = {
        id: roomId,
        user_id: dbManager.getCurrentUser().id,
        original_image_url: uploadedImageUrl || MOCK_ROOM_TEMPLATES[0].url,
        room_analysis: {
          roomType,
          detectedFeatures: ['High ceilings', 'Secondary door framing', 'Hardwood elements'],
          lighting: 'Diffused vertical light, shadowed corners',
          suggestedColors: ['Matte Taupe', 'Eggshell Linen', 'Brushed Copper accents'],
          dimensions: 'Estimated 15ft x 12ft',
          clutterLevel: 'High'
        },
        created_at: new Date().toISOString()
      };

      const newTransform: Transformation = {
        id: transformId,
        room_id: roomId,
        style: selectedStyle,
        generated_image_url: RENDER_OUTPUTS[selectedStyle],
        budget_level: budgetLevel,
        budget_breakdown: {
          low: [
            { category: 'Furniture (Flatpack/Modular)', amount: 1600, notes: 'Modular fabric sofa, light oak coffee table' },
            { category: 'Lighting (Warm LED)', amount: 250, notes: 'Minimalist floor lamp, ceiling pendant' },
            { category: 'Decor & Rugs', amount: 350, notes: 'Wool-blend rug, neutral wall frames' },
            { category: 'Paint & Materials', amount: 150, notes: 'Eggshell white wall paint' }
          ],
          medium: [
            { category: 'Curated Premium Furniture', amount: 3200, notes: 'Mid-century designer sofa, oak coffee table, custom lounge chair' },
            { category: 'Designer Architectural Lighting', amount: 750, notes: 'Low hanging copper chandelier, warm spotlights' },
            { category: 'Acoustic Slat Boards & Rugs', amount: 800, notes: 'Textured oak panels, plush woven rug' },
            { category: 'Contractor Labor & Refinish', amount: 900, notes: 'Professional painting, panel installs' }
          ],
          premium: [
            { category: 'Bespoke Custom Cabinetry', amount: 7900, notes: 'Custom floating wall sideboard, designer mohair sofa' },
            { category: 'Elite Smart-Dimming Plan', amount: 2200, notes: 'High-end architectural fixtures & smart-dimming setup' },
            { category: 'Fine Textiles & Accessories', amount: 2600, notes: 'Hand-knotted linen rug, original local artist canvases' },
            { category: 'Contractor Trades & Finishings', amount: 2200, notes: 'Full plastering, architectural woodwork finishes' }
          ]
        },
        shopping_list: [
          {
            id: `shop-${Math.random()}`,
            name: `${selectedStyle} Curator Sofa`,
            category: 'Furniture',
            price: budgetLevel === 'low' ? 980 : budgetLevel === 'medium' ? 1850 : 3800,
            product_url: 'https://www.westelm.com',
            brand: 'MuamForm Collection'
          },
          {
            id: `shop-${Math.random()}`,
            name: 'Architectural Coffee Dial Table',
            category: 'Furniture',
            price: budgetLevel === 'low' ? 220 : budgetLevel === 'medium' ? 450 : 980,
            product_url: 'https://www.crateandbarrel.com',
            brand: 'LuxeAethel'
          },
          {
            id: `shop-${Math.random()}`,
            name: 'Linear warm pendant array',
            category: 'Lighting',
            price: budgetLevel === 'low' ? 120 : budgetLevel === 'medium' ? 320 : 850,
            product_url: 'https://www.hay.dk',
            brand: 'Lucent'
          },
          {
            id: `shop-${Math.random()}`,
            name: 'Luxury woven textur rug',
            category: 'Decor',
            price: budgetLevel === 'low' ? 280 : budgetLevel === 'medium' ? 680 : 1800,
            product_url: 'https://www.lumens.com',
            brand: 'Copenhagen Weavers'
          }
        ],
        is_selected: false,
        status: 'completed',
        created_at: new Date().toISOString()
      };

      dbManager.addRoom(newRoom);
      dbManager.addTransformation(newTransform);
      
      router.push(`/transform/${transformId}`);
    }
  }, [isGenerating, genStep]);

  const triggerGeneration = () => {
    if (quota.plan === 'free' && quota.remaining <= 0) {
      alert('You have reached your free transformation limit. Please upgrade in Sandbox Mode at the top bar.');
      return;
    }
    
    setIsGenerating(true);
    setGenStep(0);
  };

  const selectTemplate = (url: string, type: string) => {
    setUploadedImageUrl(url);
    setRoomType(type);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 md:px-8">
      {/* Sub header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight font-serif text-white">AI Transformation Studio</h1>
          <p className="text-xs text-gray-400 mt-1">Configure your spatial parameters, style preferences, and budget coordinates.</p>
        </div>

        {/* Quota Indicator */}
        {quota.plan === 'free' ? (
          <div className="glass-panel border-amber-500/20 bg-amber-500/5 px-4 py-3 rounded-2xl flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-primary" />
            <div>
              <p className="text-[10px] uppercase font-bold tracking-widest text-primary">Free Quota Remaining</p>
              <p className="text-xs text-white font-medium">{quota.remaining} of {quota.total} room designs left</p>
            </div>
          </div>
        ) : (
          <div className="glass-panel border-purple-500/20 bg-purple-500/5 px-4 py-3 rounded-2xl flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-purple-400" />
            <div>
              <p className="text-[10px] uppercase font-bold tracking-widest text-purple-400">{quota.plan} tier account</p>
              <p className="text-xs text-white font-medium">Unlimited transformations unlocked</p>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT COLUMN: UPLOAD & PARAMETERS */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          {/* Room Image Upload Container */}
          <div className="glass-panel p-6 rounded-2xl border-white/5 bg-dark-800/40 flex flex-col gap-4">
            <h3 className="text-sm uppercase font-bold text-white tracking-wider">1. Space Photo</h3>
            
            {uploadedImageUrl ? (
              <div className="relative rounded-xl overflow-hidden aspect-video border border-white/10 group">
                <img src={uploadedImageUrl} alt="Uploaded Room" className="w-full h-full object-cover" />
                <button
                  onClick={() => setUploadedImageUrl('')}
                  className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-xs font-bold text-red-400"
                >
                  Remove & Re-upload
                </button>
              </div>
            ) : (
              <div
                onClick={() => selectTemplate(MOCK_ROOM_TEMPLATES[0].url, MOCK_ROOM_TEMPLATES[0].type)}
                className="cursor-pointer border border-dashed border-white/10 hover:border-primary/50 bg-white/2 rounded-xl p-8 flex flex-col items-center justify-center text-center gap-3 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-gray-400">
                  <Upload className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white">Click or Drag Image Here</p>
                  <p className="text-[10px] text-gray-500 mt-1">Supports HEIC, JPEG, PNG up to 15MB</p>
                </div>
              </div>
            )}

            {/* Quick Demo Templates */}
            <div>
              <p className="text-[10px] uppercase font-bold tracking-wider text-gray-400 mb-2.5">Or use a demo space:</p>
              <div className="flex gap-2">
                {MOCK_ROOM_TEMPLATES.map((temp) => (
                  <button
                    key={temp.id}
                    onClick={() => selectTemplate(temp.url, temp.type)}
                    className={`flex-1 rounded-lg overflow-hidden border aspect-video relative transition-all ${
                      uploadedImageUrl === temp.url ? 'border-primary scale-[0.98]' : 'border-white/5 hover:border-white/20'
                    }`}
                  >
                    <img src={temp.url} alt={temp.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/35 hover:bg-transparent transition-colors"></div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Room Type & Budget coordinates */}
          <div className="glass-panel p-6 rounded-2xl border-white/5 bg-dark-800/40 flex flex-col gap-4">
            <h3 className="text-sm uppercase font-bold text-white tracking-wider">2. Context Specifications</h3>

            {/* Room Type Select */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] uppercase font-bold tracking-widest text-gray-400">Room Category</label>
              <select
                value={roomType}
                onChange={(e) => setRoomType(e.target.value)}
                className="glass-input text-xs px-3 py-2.5 border-white/10"
              >
                <option value="Living Room">Living Room</option>
                <option value="Bedroom">Bedroom</option>
                <option value="Office">Office / Study</option>
                <option value="Dining Room">Dining Room</option>
                <option value="Kitchen">Kitchen</option>
              </select>
            </div>

            {/* Budget coordinates */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] uppercase font-bold tracking-widest text-gray-400">Target Budget Class</label>
              <div className="flex gap-2">
                {(['low', 'medium', 'premium'] as BudgetLevel[]).map((level) => (
                  <button
                    key={level}
                    onClick={() => setBudgetLevel(level)}
                    className={`flex-1 text-center text-xs py-2 rounded-lg border capitalize font-semibold tracking-wide transition-all ${
                      budgetLevel === level
                        ? 'bg-white text-dark-900 border-white font-bold'
                        : 'border-white/5 hover:bg-white/5 text-gray-400'
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: STYLE SELECTOR & GENERATE */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="glass-panel p-6 rounded-2xl border-white/5 bg-dark-800/40 flex flex-col gap-6">
            <h3 className="text-sm uppercase font-bold text-white tracking-wider">3. Select Redesign Style</h3>
            <StyleSelector selectedStyle={selectedStyle} onStyleSelect={setSelectedStyle} />
          </div>

          <button
            onClick={triggerGeneration}
            disabled={!uploadedImageUrl && !uploadedImageUrl}
            className={`w-full text-center font-bold py-4 rounded-2xl transition-all flex items-center justify-center gap-2 tracking-widest uppercase text-sm ${
              uploadedImageUrl
                ? 'bg-gold-gradient text-dark-900 hover:shadow-xl hover:shadow-primary/20 cursor-pointer'
                : 'bg-white/5 border border-white/5 text-gray-500 cursor-not-allowed'
            }`}
          >
            <Sparkles className="w-4.5 h-4.5" />
            Synthesize Redesign Render
          </button>
        </div>
      </div>

      {/* --- GENERATING OVERLAY DRAWER --- */}
      {isGenerating && (
        <div className="fixed inset-0 z-50 bg-dark-900/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-panel border-primary/20 bg-dark-800/95 max-w-lg w-full p-8 rounded-3xl flex flex-col gap-6 shadow-2xl relative overflow-hidden">
            
            {/* Animated scanning bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/10 via-primary to-primary/10 animate-pulse"></div>

            <div className="flex flex-col items-center text-center gap-4">
              {/* Image scanner slot */}
              <div className="relative w-40 h-24 rounded-lg overflow-hidden border border-primary/20">
                <img
                  src={uploadedImageUrl || MOCK_ROOM_TEMPLATES[0].url}
                  alt="Scanning Space"
                  className="w-full h-full object-cover grayscale"
                />
                <div className="absolute inset-0 bg-primary/10"></div>
                {/* Horizontal scanner bar */}
                <div className="absolute left-0 right-0 h-0.5 bg-primary shadow-[0_0_8px_#D4AF37] animate-scan"></div>
              </div>
              
              <h2 className="text-xl font-bold font-serif text-white mt-2 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary animate-spin" style={{ animationDuration: '3s' }} />
                MuamForm AI Engine Active
              </h2>
            </div>

            {/* Stepper logs */}
            <div className="flex flex-col gap-3.5 bg-dark-900/50 p-4.5 rounded-xl border border-white/5">
              {steps.map((step, idx) => {
                const isDone = idx < genStep;
                const isActive = idx === genStep;
                return (
                  <div
                    key={idx}
                    className={`flex items-center gap-3 text-xs transition-opacity duration-300 ${
                      isDone ? 'text-primary font-medium' : isActive ? 'text-white font-bold' : 'text-gray-600'
                    }`}
                  >
                    <span className="flex-shrink-0 w-4.5 h-4.5 rounded-full border flex items-center justify-center text-[10px] font-bold"
                          style={{
                            borderColor: isDone ? 'var(--color-primary)' : isActive ? '#FFFFFF' : 'rgba(255,255,255,0.1)',
                            backgroundColor: isDone ? 'rgba(212,175,55,0.1)' : 'transparent'
                          }}>
                      {isDone ? '✓' : isActive ? '●' : idx + 1}
                    </span>
                    <span className="truncate">{step}</span>
                  </div>
                );
              })}
            </div>
            
            <p className="text-[10px] text-gray-500 text-center uppercase tracking-widest italic">
              Estimated pipeline duration: ~10 seconds
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
