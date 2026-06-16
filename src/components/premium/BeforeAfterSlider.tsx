'use client';

import React, { useState, useRef, useEffect, MouseEvent, TouchEvent } from 'react';

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  className?: string;
  heightClass?: string;
}

export default function BeforeAfterSlider({
  beforeImage,
  afterImage,
  className = '',
  heightClass = 'h-[300px] md:h-[500px]'
}: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50); // percentage (0-100)
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging) return;
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  };

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);
    
    if (isDragging) {
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchend', handleMouseUp);
    }
    
    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div
      ref={containerRef}
      className={`relative select-none overflow-hidden rounded-2xl border border-white/10 ${heightClass} ${className}`}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
    >
      {/* After Image (Transformed) - Background */}
      <img
        src={afterImage}
        alt="AI Redesigned Room"
        className="absolute inset-0 h-full w-full object-cover"
        draggable="false"
      />

      {/* Before Image (Original) - Foreground clipped dynamically */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
      >
        <img
          src={beforeImage}
          alt="Original Room"
          className="absolute inset-0 h-full w-full object-cover"
          style={{ width: containerRef.current?.getBoundingClientRect().width || '100%' }}
          draggable="false"
        />
      </div>

      {/* Labels */}
      <div className="absolute top-4 left-4 z-20 pointer-events-none rounded-lg bg-dark-900/80 backdrop-blur-sm border border-white/5 px-2.5 py-1 text-[10px] uppercase font-bold tracking-widest text-gray-300">
        Original
      </div>
      <div className="absolute top-4 right-4 z-20 pointer-events-none rounded-lg bg-primary/25 backdrop-blur-sm border border-primary/30 px-2.5 py-1 text-[10px] uppercase font-bold tracking-widest text-primary">
        Redesign Proposal
      </div>

      {/* Slider Bar & Handle */}
      <div
        className="absolute top-0 bottom-0 z-30 w-[2px] bg-primary cursor-ew-resize group"
        style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
        onMouseDown={() => setIsDragging(true)}
        onTouchStart={() => setIsDragging(true)}
      >
        {/* Glow Line effect */}
        <div className="absolute inset-y-0 -left-1 -right-1 bg-primary/20 blur-[4px] opacity-0 group-hover:opacity-100 transition-opacity"></div>
        
        {/* Handle Dial */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-dark-800 border border-primary shadow-xl shadow-black/80 flex items-center justify-center cursor-ew-resize transition-transform duration-200 group-hover:scale-110 active:scale-95">
          <div className="flex gap-1 items-center text-primary">
            <span className="text-xs font-bold font-sans">‹</span>
            <span className="text-xs font-bold font-sans">›</span>
          </div>
        </div>
      </div>
    </div>
  );
}
