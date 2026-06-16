'use client';

import React from 'react';
import { DesignStyle } from '@/types';

interface StyleItem {
  id: DesignStyle;
  name: string;
  image: string;
  description: string;
  colors: string[];
}

export const DESIGN_STYLES_METADATA: StyleItem[] = [
  {
    id: 'Modern',
    name: 'Modern',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=400',
    description: 'Clean geometric lines, high-contrast monochrome palettes, and low-profile functional furniture.',
    colors: ['#000000', '#FFFFFF', '#A0A0A0']
  },
  {
    id: 'Scandinavian',
    name: 'Scandinavian',
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=400',
    description: 'Warm natural oak woods, cozy woven textiles, high natural light, and organic hygge vibes.',
    colors: ['#F5EBE6', '#D5C4BC', '#5E504A']
  },
  {
    id: 'Minimalist',
    name: 'Minimalist',
    image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=400',
    description: 'Decluttered spaces, hidden storage integrations, soft tonality, and "less is more" focal points.',
    colors: ['#FAF9F6', '#E2DFD2', '#808080']
  },
  {
    id: 'Luxury',
    name: 'Luxury',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=400',
    description: 'Calacatta marble finishes, brushed brass fixtures, rich velvet upholstery, and sculptural statement art.',
    colors: ['#D4AF37', '#1E293B', '#F8FAFC']
  },
  {
    id: 'Industrial',
    name: 'Industrial',
    image: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&q=80&w=400',
    description: 'Exposed structural brick, raw charcoal iron beams, weathered copper fixtures, and leather seating.',
    colors: ['#3A3B3C', '#8A7968', '#1A1110']
  },
  {
    id: 'Bohemian',
    name: 'Bohemian',
    image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80&w=400',
    description: 'Eclectic rattan weaves, layered Moroccan rugs, lush indoor palms, and warm earthy tones.',
    colors: ['#D2B48C', '#E2725B', '#4F7942']
  },
  {
    id: 'Classic',
    name: 'Classic',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=400',
    description: 'Symmetrical traditional layouts, ornate wall moldings, dark mahogany woods, and warm chandelier arrays.',
    colors: ['#4A2E13', '#EBDCB9', '#4E5180']
  }
];

interface StyleSelectorProps {
  selectedStyle: DesignStyle;
  onStyleSelect: (style: DesignStyle) => void;
}

export default function StyleSelector({ selectedStyle, onStyleSelect }: StyleSelectorProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {DESIGN_STYLES_METADATA.map((style) => {
        const selected = selectedStyle === style.id;
        return (
          <div
            key={style.id}
            onClick={() => onStyleSelect(style.id)}
            className={`glass-panel cursor-pointer rounded-2xl overflow-hidden transition-all duration-300 ${
              selected
                ? 'border-primary shadow-xl shadow-primary/10 -translate-y-1'
                : 'border-white/5 hover:border-primary/30 hover:-translate-y-0.5'
            }`}
          >
            {/* Image Cover */}
            <div className="relative h-40 w-full overflow-hidden">
              <img
                src={style.image}
                alt={style.name}
                className={`h-full w-full object-cover transition-transform duration-500 ${
                  selected ? 'scale-105' : 'hover:scale-105'
                }`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/40 to-transparent"></div>
              
              {/* Active Badge */}
              {selected && (
                <div className="absolute top-3 right-3 bg-primary text-dark-900 text-[10px] font-extrabold tracking-widest px-2.5 py-1 rounded-full uppercase shadow-md">
                  Active
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-4 flex flex-col gap-2">
              <h3 className={`font-serif font-semibold text-base ${selected ? 'text-primary' : 'text-white'}`}>
                {style.name}
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed min-h-[48px]">
                {style.description}
              </p>
              
              {/* Color Circles */}
              <div className="flex gap-1.5 mt-2">
                <span className="text-[10px] text-gray-500 mr-1 self-center font-bold tracking-widest uppercase">Palette:</span>
                {style.colors.map((color, i) => (
                  <span
                    key={i}
                    className="w-3.5 h-3.5 rounded-full border border-white/10 shadow-sm"
                    style={{ backgroundColor: color }}
                    title={color}
                  ></span>
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
