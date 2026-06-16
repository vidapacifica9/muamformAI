'use client';

import React, { useState, useEffect } from 'react';
import { dbManager } from '@/lib/dbManager';
import { Consultation, Transformation, Room, ShoppingItem, BudgetItem, Profile } from '@/types';
import { formatCurrency } from '@/lib/utils';
import { Check, ClipboardList, PenTool, ExternalLink, Calendar, Plus, Trash2, ArrowRight } from 'lucide-react';

export default function DesignerDashboard() {
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [activeConsult, setActiveConsult] = useState<Consultation | null>(null);
  
  // Workspace editable states
  const [editShoppingList, setEditShoppingList] = useState<ShoppingItem[]>([]);
  const [editBudgetItems, setEditBudgetItems] = useState<BudgetItem[]>([]);
  const [feedbackNotes, setFeedbackNotes] = useState('');
  
  // Client details cache
  const [rooms, setRooms] = useState<Room[]>([]);
  const [transformations, setTransformations] = useState<Transformation[]>([]);
  const [clients, setClients] = useState<Profile[]>([]);

  useEffect(() => {
    // Current designer is Saskia Vance (user-456, profile designer-profile-1)
    const designerProfile = dbManager.getDesignerByUserId('designer-456');
    if (!designerProfile) return;

    const list = dbManager.getConsultationsForDesigner(designerProfile.id);
    setConsultations(list);
    setRooms(dbManager.getRooms());
    setTransformations(dbManager.getTransformations());
    
    // We only have Alexander Sterling (user-123) in this mock context
    setClients([dbManager.getCurrentUser()]);
  }, []);

  const getClientInfo = (userId: string) => {
    return clients.find(c => c.id === userId) || { full_name: 'Client', email: '' };
  };

  const getRoomInfo = (roomId: string) => {
    return rooms.find(r => r.id === roomId);
  };

  const getTransformInfo = (tId: string) => {
    return transformations.find(t => t.id === tId);
  };

  const handleOpenReview = (c: Consultation) => {
    setActiveConsult(c);
    
    const transform = getTransformInfo(c.transformation_id);
    if (!transform) return;

    // Load existing modifications, or default to AI generated models
    setEditShoppingList(
      c.designer_modifications.revised_shopping_list || [...transform.shopping_list]
    );

    const activeLevel = transform.budget_level;
    setEditBudgetItems(
      c.designer_modifications.revised_budget || [...transform.budget_breakdown[activeLevel]]
    );

    setFeedbackNotes(
      c.designer_modifications.feedback_notes || ''
    );
  };

  // Editable shopping list handlers
  const handleShoppingFieldChange = (idx: number, field: keyof ShoppingItem, value: any) => {
    const list = [...editShoppingList];
    list[idx] = { ...list[idx], [field]: value };
    setEditShoppingList(list);
  };

  const handleDeleteShoppingItem = (idx: number) => {
    setEditShoppingList(prev => prev.filter((_, i) => i !== idx));
  };

  const handleAddShoppingItem = () => {
    const newItem: ShoppingItem = {
      id: `shop-new-${Math.random()}`,
      name: 'Custom Designer Sofa / Decor',
      category: 'Furniture',
      price: 1200,
      product_url: 'https://www.designatler.com',
      brand: 'Designer Curated'
    };
    setEditShoppingList(prev => [...prev, newItem]);
  };

  // Editable budget handlers
  const handleBudgetChange = (idx: number, field: keyof BudgetItem, value: any) => {
    const list = [...editBudgetItems];
    list[idx] = { ...list[idx], [field]: value };
    setEditBudgetItems(list);
  };

  const handleSaveProposal = () => {
    if (!activeConsult) return;

    const updatedConsultation = dbManager.updateConsultation(activeConsult.id, {
      status: 'completed',
      designer_modifications: {
        revised_shopping_list: editShoppingList,
        revised_budget: editBudgetItems,
        feedback_notes: feedbackNotes
      }
    });

    if (updatedConsultation) {
      alert('Design proposal finalized and sent to client dashboard!');
      setActiveConsult(null);
      // Refresh list
      const designerProfile = dbManager.getDesignerByUserId('designer-456');
      if (designerProfile) {
        setConsultations(dbManager.getConsultationsForDesigner(designerProfile.id));
      }
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 md:px-8 flex flex-col gap-8">
      {/* Intro */}
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight font-serif text-white">Designer Review Panel</h1>
        <p className="text-xs text-gray-400 mt-1">Saskia Vance Workspace — Review client spaces, override shopping lists, and submit proposals.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT PANEL: CONSULTATION QUEUE */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          <div className="glass-panel p-5 rounded-2xl border-white/5 bg-dark-800/40">
            <h3 className="text-sm uppercase font-bold text-white tracking-wider mb-4 flex items-center gap-2">
              <ClipboardList className="w-4.5 h-4.5 text-primary" />
              Assigned Consultations ({consultations.length})
            </h3>

            {consultations.length === 0 ? (
              <div className="py-8 text-center text-xs text-gray-500">
                No active consultation requests in your inbox queue.
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {consultations.map((c) => {
                  const client = getClientInfo(c.user_id);
                  const transform = getTransformInfo(c.transformation_id);
                  const room = transform ? getRoomInfo(transform.room_id) : undefined;
                  const active = activeConsult?.id === c.id;

                  return (
                    <div
                      key={c.id}
                      onClick={() => handleOpenReview(c)}
                      className={`p-4 rounded-xl border cursor-pointer transition-all ${
                        active 
                          ? 'bg-primary/10 border-primary shadow-lg' 
                          : 'glass-panel border-white/5 hover:border-primary/30'
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="text-xs font-bold text-white">{client.full_name}</h4>
                          <p className="text-[10px] text-gray-400 mt-0.5">
                            {room?.room_analysis.roomType} • {transform?.style} style
                          </p>
                        </div>
                        <span className={`text-[8px] uppercase font-bold px-2 py-0.5 rounded ${
                          c.status === 'completed'
                            ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                            : 'bg-amber-500/10 text-primary border border-primary/20'
                        }`}>
                          {c.status}
                        </span>
                      </div>

                      <div className="h-px bg-white/5 my-2.5"></div>

                      <div className="flex items-center gap-1.5 text-[9px] text-gray-500">
                        <Calendar className="w-3 h-3 text-primary" />
                        <span>{c.scheduled_slot || 'No slot selected'}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* RIGHT PANEL: EDITOR WORKSPACE */}
        <div className="lg:col-span-2">
          {activeConsult ? (
            (() => {
              const client = getClientInfo(activeConsult.user_id);
              const transform = getTransformInfo(activeConsult.transformation_id);
              const room = transform ? getRoomInfo(transform.room_id) : undefined;

              if (!transform || !room) return null;

              return (
                <div className="glass-panel p-6 sm:p-8 rounded-3xl border-white/5 bg-dark-800/20 flex flex-col gap-8">
                  {/* Workspace header */}
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/5 pb-4">
                    <div>
                      <span className="text-[9px] uppercase font-extrabold tracking-widest text-primary">Active Consultation Workspace</span>
                      <h2 className="text-xl font-bold font-serif text-white">Reviewing Room for {client.full_name}</h2>
                    </div>

                    <button
                      onClick={handleSaveProposal}
                      className="bg-gold-gradient text-dark-900 font-extrabold text-xs tracking-widest uppercase px-5 py-2.5 rounded-xl hover:shadow-lg hover:shadow-primary/25 transition-all flex items-center gap-1.5 self-stretch sm:self-auto"
                    >
                      <Check className="w-4 h-4" />
                      Finalize Proposal
                    </button>
                  </div>

                  {/* Room Overview Comparison */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <span className="text-[9px] uppercase font-bold tracking-wider text-gray-500">Original room Upload</span>
                      <div className="rounded-xl overflow-hidden aspect-video border border-white/5 h-32">
                        <img src={room.original_image_url} alt="Original" className="w-full h-full object-cover" />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <span className="text-[9px] uppercase font-bold tracking-wider text-primary">AI redeliver concept</span>
                      <div className="rounded-xl overflow-hidden aspect-video border border-primary/10 h-32">
                        <img src={transform.generated_image_url} alt="AI output" className="w-full h-full object-cover" />
                      </div>
                    </div>
                  </div>

                  {/* Client design notes block */}
                  <div className="p-4 rounded-xl bg-white/2 border border-white/5">
                    <p className="text-[9px] uppercase font-bold text-gray-400 tracking-wider">Client Design Notes</p>
                    <p className="text-xs text-gray-300 italic mt-1 leading-relaxed">
                      &ldquo;{activeConsult.designer_modifications.feedback_notes || 'No notes provided.'}&rdquo;
                    </p>
                  </div>

                  {/* EDITABLE SHOPPING LIST OVERRIDES */}
                  <div className="flex flex-col gap-4">
                    <div className="flex justify-between items-center border-b border-white/5 pb-2">
                      <h3 className="text-sm font-bold font-serif text-white uppercase tracking-wide">
                        1. Override Shopping List Recommendations
                      </h3>
                      <button
                        onClick={handleAddShoppingItem}
                        className="text-[10px] text-primary font-bold hover:underline flex items-center gap-1"
                      >
                        <Plus className="w-3.5 h-3.5" /> Add Item
                      </button>
                    </div>

                    <div className="flex flex-col gap-3">
                      {editShoppingList.map((item, idx) => (
                        <div
                          key={item.id}
                          className="flex flex-wrap sm:flex-nowrap gap-3 items-center p-3 rounded-xl bg-dark-900/40 border border-white/5 justify-between"
                        >
                          <input
                            type="text"
                            value={item.name}
                            onChange={(e) => handleShoppingFieldChange(idx, 'name', e.target.value)}
                            className="flex-grow glass-input text-xs px-2.5 py-1.5"
                            placeholder="Product Name"
                          />
                          <input
                            type="text"
                            value={item.brand}
                            onChange={(e) => handleShoppingFieldChange(idx, 'brand', e.target.value)}
                            className="w-28 glass-input text-xs px-2.5 py-1.5"
                            placeholder="Brand"
                          />
                          <select
                            value={item.category}
                            onChange={(e) => handleShoppingFieldChange(idx, 'category', e.target.value)}
                            className="w-28 glass-input text-xs px-2.5 py-1.5"
                          >
                            <option value="Furniture">Furniture</option>
                            <option value="Lighting">Lighting</option>
                            <option value="Decor">Decor</option>
                          </select>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-gray-500 font-mono">$</span>
                            <input
                              type="number"
                              value={item.price}
                              onChange={(e) => handleShoppingFieldChange(idx, 'price', parseFloat(e.target.value) || 0)}
                              className="w-20 glass-input text-xs px-2 py-1.5 text-right font-mono"
                              placeholder="Price"
                            />
                            <button
                              onClick={() => handleDeleteShoppingItem(idx)}
                              className="text-red-400 hover:text-red-300 p-1.5"
                              title="Delete Item"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* EDITABLE BUDGET BREAKDOWN */}
                  <div className="flex flex-col gap-4">
                    <h3 className="text-sm font-bold font-serif text-white uppercase tracking-wide border-b border-white/5 pb-2">
                      2. Override Estimated Budget Plan
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {editBudgetItems.map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between gap-3 p-3 rounded-xl bg-dark-900/40 border border-white/5">
                          <span className="text-xs text-gray-300 font-semibold">{item.category}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-gray-500 font-mono">$</span>
                            <input
                              type="number"
                              value={item.amount}
                              onChange={(e) => handleBudgetChange(idx, 'amount', parseFloat(e.target.value) || 0)}
                              className="w-24 glass-input text-xs px-2 py-1.5 text-right font-mono"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* DESIGNER REVIEW TEXT AREA */}
                  <div className="flex flex-col gap-2">
                    <h3 className="text-sm font-bold font-serif text-white uppercase tracking-wide border-b border-white/5 pb-2">
                      3. Professional Feedback Report
                    </h3>
                    <textarea
                      value={feedbackNotes}
                      onChange={(e) => setFeedbackNotes(e.target.value)}
                      placeholder="Write your advice, modifications rationale, placement tips, color pairings, or trade contractor guidelines here..."
                      className="glass-input text-xs px-4 py-3 h-32 resize-none"
                    />
                  </div>
                </div>
              );
            })()
          ) : (
            <div className="glass-panel p-16 rounded-3xl border-white/5 bg-dark-800/10 text-center flex flex-col items-center justify-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-gray-500">
                <PenTool className="w-6 h-6 animate-pulse" />
              </div>
              <h3 className="font-serif font-bold text-white">No Consultation Selected</h3>
              <p className="text-xs text-gray-500 max-w-xs leading-relaxed">
                Choose a client proposal from your queue list on the left to start editing spatial details and finalizing design plans.
              </p>
              <ArrowRight className="w-4 h-4 text-primary animate-bounce mt-2" style={{ transform: 'rotate(90deg)' }} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
