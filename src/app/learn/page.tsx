'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { MOCK_TUTORIALS, LearningContent } from '@/lib/mockData';
import { BookOpen, Clock, User, ChevronRight } from 'lucide-react';

export default function LearnCenter() {
  const [courses, setCourses] = useState<LearningContent[]>([]);
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    setCourses(MOCK_TUTORIALS);
  }, []);

  const categories = ['All', 'Furniture Placement', 'Color Matching'];

  const filteredCourses = activeCategory === 'All'
    ? courses
    : courses.filter(c => c.category === activeCategory);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 md:px-8 flex flex-col gap-8">
      {/* Intro */}
      <div className="text-center max-w-2xl mx-auto flex flex-col gap-3 mb-6">
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-serif text-gold-gradient">
          MuamForm Learning Center
        </h1>
        <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
          Master spatial arrangement, color harmony, and room transformation fundamentals from our certified architectural consultants.
        </p>
      </div>

      {/* Category filter tabs */}
      <div className="flex gap-2 justify-center flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`text-xs px-4 py-2 rounded-xl border font-semibold tracking-wide transition-all ${
              activeCategory === cat
                ? 'bg-primary text-dark-900 border-primary font-bold shadow-lg shadow-primary/10'
                : 'border-white/5 hover:border-white/20 text-gray-400'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {filteredCourses.map((c) => (
          <div
            key={c.id}
            className="glass-panel glass-panel-hover rounded-2xl overflow-hidden border-white/5 flex flex-col justify-between"
          >
            {/* Cover image */}
            <div className="h-48 overflow-hidden relative">
              <img src={c.imageUrl} alt={c.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/40 to-transparent"></div>
              <span className="absolute bottom-3 left-3 bg-primary/20 backdrop-blur-sm border border-primary/30 text-[9px] font-extrabold tracking-widest text-primary px-2.5 py-0.5 rounded-full uppercase">
                {c.category}
              </span>
            </div>

            {/* Details */}
            <div className="p-6 flex flex-col gap-4 flex-grow justify-between">
              <div className="flex flex-col gap-2">
                <h3 className="font-serif font-bold text-lg text-white leading-snug">{c.title}</h3>
                <p className="text-xs text-gray-400 leading-relaxed line-clamp-3">{c.summary}</p>
              </div>

              <div className="h-px bg-white/5 my-2"></div>

              <div className="flex justify-between items-center text-[10px] text-gray-500 font-semibold tracking-wide">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-primary" />
                    By {c.author}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-primary" />
                    {c.duration}
                  </span>
                </div>

                <Link
                  href={`/learn/${c.slug}`}
                  className="flex items-center gap-0.5 text-primary hover:text-white transition-colors uppercase font-bold tracking-widest"
                >
                  Read Guide
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
