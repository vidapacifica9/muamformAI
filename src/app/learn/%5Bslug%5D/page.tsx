'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { MOCK_TUTORIALS, LearningContent } from '@/lib/mockData';
import { ArrowLeft, BookOpen, Clock, User } from 'lucide-react';

export default function LearnArticlePage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const [article, setArticle] = useState<LearningContent | null>(null);

  useEffect(() => {
    const found = MOCK_TUTORIALS.find(t => t.slug === slug);
    if (found) setArticle(found);
  }, [slug]);

  if (!article) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-24 text-center">
        <p className="text-gray-400">Lesson not found.</p>
        <button
          onClick={() => router.push('/learn')}
          className="mt-4 bg-gold-gradient text-dark-900 px-6 py-2 rounded-xl text-xs font-bold"
        >
          Return to Learning Center
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 flex flex-col gap-6">
      {/* Back button */}
      <button
        onClick={() => router.push('/learn')}
        className="flex items-center gap-1.5 text-xs font-bold text-gray-400 hover:text-white transition-colors self-start"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Learning Center
      </button>

      {/* Header Info */}
      <div className="flex flex-col gap-3">
        <span className="text-[10px] font-extrabold uppercase tracking-widest text-primary">
          {article.category}
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold font-serif text-white leading-tight">
          {article.title}
        </h1>
        
        {/* Meta row */}
        <div className="flex items-center gap-6 text-[10px] text-gray-400 font-semibold uppercase tracking-wider mt-1 border-b border-white/5 pb-4">
          <span className="flex items-center gap-1">
            <User className="w-3.5 h-3.5 text-primary" />
            By {article.author}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-primary" />
            {article.duration}
          </span>
        </div>
      </div>

      {/* Article Cover Image */}
      <div className="rounded-2xl overflow-hidden aspect-video border border-white/5 shadow-xl">
        <img src={article.imageUrl} alt={article.title} className="w-full h-full object-cover" />
      </div>

      {/* Article content parsed simple markup */}
      <article className="prose prose-invert max-w-none text-gray-300 leading-relaxed text-sm flex flex-col gap-6 font-sans">
        {article.content.split('\n\n').map((paragraph, index) => {
          if (paragraph.startsWith('### ')) {
            return (
              <h2 key={index} className="text-2xl font-bold font-serif text-white mt-6 border-b border-white/5 pb-2">
                {paragraph.replace('### ', '')}
              </h2>
            );
          }
          if (paragraph.startsWith('#### ')) {
            return (
              <h3 key={index} className="text-lg font-bold font-serif text-primary mt-4">
                {paragraph.replace('#### ', '')}
              </h3>
            );
          }
          if (paragraph.startsWith('1. ') || paragraph.startsWith('2. ') || paragraph.startsWith('3. ')) {
            const lines = paragraph.split('\n');
            return (
              <ol key={index} className="list-decimal pl-5 flex flex-col gap-3 mt-2">
                {lines.map((line, lIdx) => (
                  <li key={lIdx} className="pl-1">
                    <span className="font-semibold text-white">{line.split('. ')[0]}. </span>
                    {line.split('. ').slice(1).join('. ')}
                  </li>
                ))}
              </ol>
            );
          }
          return (
            <p key={index} className="text-gray-300">
              {paragraph}
            </p>
          );
        })}
      </article>
    </div>
  );
}
