'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { dbManager } from '@/lib/dbManager';
import { Profile, Subscription, Transformation, Room } from '@/types';
import { Sparkles, Calendar, Plus, ExternalLink, Image as ImageIcon, Heart } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

export default function UserDashboard() {
  const [currentUser, setCurrentUser] = useState<Profile | null>(null);
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [transformations, setTransformations] = useState<Transformation[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [consultations, setConsultations] = useState<number>(0);

  useEffect(() => {
    setCurrentUser(dbManager.getCurrentUser());
    setSubscription(dbManager.getSubscription());
    setTransformations(dbManager.getTransformations());
    setRooms(dbManager.getRooms());
    setConsultations(dbManager.getConsultations().length);
  }, []);

  const getRoomForTransform = (roomId: string): Room | undefined => {
    return rooms.find(r => r.id === roomId);
  };

  const getSelectedTotal = (t: Transformation) => {
    const items = t.shopping_list;
    return items.reduce((acc, curr) => acc + curr.price, 0);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 md:px-8 flex flex-col gap-8">
      {/* Welcome Banner */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border-white/5 bg-gradient-to-r from-dark-800 via-dark-800/60 to-primary/5 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4 text-center sm:text-left flex-col sm:flex-row">
          {currentUser?.avatar_url ? (
            <img
              src={currentUser.avatar_url}
              alt={currentUser.full_name || 'User'}
              className="w-16 h-16 rounded-full border border-primary/20 object-cover"
            />
          ) : (
            <div className="w-16 h-16 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-gray-400">
              <ImageIcon className="w-6 h-6" />
            </div>
          )}
          <div>
            <h1 className="text-2xl font-bold font-serif text-white">
              Welcome Back, {currentUser?.full_name || 'Decorator'}
            </h1>
            <p className="text-xs text-gray-400 mt-1">
              Select design styles and coordinate budget plans for your interior spaces.
            </p>
          </div>
        </div>

        <Link
          href="/transform"
          className="bg-gold-gradient text-dark-900 font-bold px-6 py-3 rounded-xl hover:shadow-lg hover:shadow-primary/20 transition-all flex items-center gap-2 text-xs tracking-wider uppercase"
        >
          <Plus className="w-4 h-4" />
          New Room Transformation
        </Link>
      </div>

      {/* Statistics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="glass-panel p-5 rounded-2xl border-white/5 flex flex-col gap-1.5">
          <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">Transformations Generated</p>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-3xl font-extrabold text-white">{transformations.length}</span>
            <span className="text-xs text-gray-500">spaces</span>
          </div>
        </div>

        <div className="glass-panel p-5 rounded-2xl border-white/5 flex flex-col gap-1.5">
          <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">Active Consultations</p>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-3xl font-extrabold text-white">{consultations}</span>
            <span className="text-xs text-gray-500">reviews pending</span>
          </div>
        </div>

        <div className="glass-panel p-5 rounded-2xl border-white/5 flex flex-col gap-1.5">
          <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">Subscription tier</p>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-3xl font-extrabold text-primary capitalize">{subscription?.plan || 'Free'}</span>
            <span className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Level</span>
          </div>
        </div>
      </div>

      {/* Past Renders Catalog */}
      <div>
        <h2 className="text-xl font-bold font-serif text-white mb-6 flex items-center gap-2">
          <ImageIcon className="w-5 h-5 text-primary" />
          Transformation Catalog
        </h2>

        {transformations.length === 0 ? (
          <div className="glass-panel rounded-2xl border-white/5 py-16 text-center flex flex-col items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-gray-500">
              <ImageIcon className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-base text-white">No Designs Created Yet</h3>
              <p className="text-xs text-gray-400 max-w-sm mt-1">
                Upload room photos and let the AI model visualize new architectural configurations.
              </p>
            </div>
            <Link
              href="/transform"
              className="bg-gold-gradient text-dark-900 font-bold px-6 py-2.5 rounded-lg text-xs tracking-wider uppercase mt-2 hover:shadow-lg hover:shadow-primary/20 transition-all"
            >
              Get Started
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {transformations.map((t) => {
              const room = getRoomForTransform(t.room_id);
              const totalCost = getSelectedTotal(t);
              return (
                <div
                  key={t.id}
                  className="glass-panel glass-panel-hover rounded-2xl overflow-hidden flex flex-col justify-between border-white/5"
                >
                  {/* Photo Container */}
                  <div className="relative h-48 w-full overflow-hidden">
                    <img
                      src={t.generated_image_url}
                      alt={`${t.style} design`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/30 to-transparent"></div>
                    
                    {/* Tags */}
                    <div className="absolute bottom-3 left-3 flex gap-2">
                      <span className="bg-primary text-dark-900 text-[9px] font-extrabold tracking-wider px-2 py-0.5 rounded uppercase">
                        {t.style}
                      </span>
                      <span className="bg-dark-900/80 text-white border border-white/10 text-[9px] font-bold px-2 py-0.5 rounded uppercase">
                        {room?.room_analysis.roomType || 'Living Room'}
                      </span>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="p-5 flex flex-col gap-4 flex-grow justify-between">
                    <div className="flex flex-col gap-1.5">
                      <div className="flex justify-between items-center text-xs text-gray-500 font-medium">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          {new Date(t.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                        </span>
                        <span className="capitalize text-accent">Budget: {t.budget_level}</span>
                      </div>
                      <p className="text-xs text-gray-400 mt-1 line-clamp-2">
                        Features: {room?.room_analysis.detectedFeatures.join(', ') || 'AI generated furniture and materials config.'}
                      </p>
                    </div>

                    <div className="h-px bg-white/5 my-1"></div>

                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-[9px] uppercase font-bold text-gray-500 tracking-widest">Est. Shopping Cost</p>
                        <p className="text-base font-extrabold text-white">{formatCurrency(totalCost)}</p>
                      </div>

                      <Link
                        href={`/transform/${t.id}`}
                        className="flex items-center gap-1.5 text-xs text-primary font-bold hover:text-white transition-colors"
                      >
                        Open Workspace
                        <ExternalLink className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
