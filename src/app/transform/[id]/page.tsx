'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { dbManager } from '@/lib/dbManager';
import { Transformation, Room, DesignerProfile, Consultation, BudgetLevel, ShoppingItem, BudgetItem } from '@/types';
import BeforeAfterSlider from '@/components/premium/BeforeAfterSlider';
import { formatCurrency } from '@/lib/utils';
import {
  ArrowLeft, Download, ShieldCheck, Calendar, Sparkles, DollarSign,
  Info, ShoppingCart, UserCheck, MessageSquare, X, CheckSquare, Square
} from 'lucide-react';

export default function TransformationDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [transformation, setTransformation] = useState<Transformation | null>(null);
  const [room, setRoom] = useState<Room | null>(null);
  const [designers, setDesigners] = useState<DesignerProfile[]>([]);
  const [activeBudget, setActiveBudget] = useState<BudgetLevel>('medium');
  
  // Shopping list selection states (which items user wants to buy)
  const [selectedShopIds, setSelectedShopIds] = useState<string[]>([]);
  
  // Consultation booking states
  const [consultation, setConsultation] = useState<Consultation | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDesignerId, setSelectedDesignerId] = useState('');
  const [scheduleSlot, setScheduleSlot] = useState('');
  const [clientNote, setClientNote] = useState('');

  useEffect(() => {
    const transformData = dbManager.getTransformation(id);
    if (!transformData) return;

    setTransformation(transformData);
    setActiveBudget(transformData.budget_level);
    
    const roomData = dbManager.getRoom(transformData.room_id);
    if (roomData) setRoom(roomData);

    const designersData = dbManager.getDesigners();
    setDesigners(designersData);
    if (designersData.length > 0) {
      setSelectedDesignerId(designersData[0].id);
    }

    // Check consultations
    const consults = dbManager.getConsultationsForUser(dbManager.getCurrentUser().id);
    const existing = consults.find(c => c.transformation_id === id);
    if (existing) {
      setConsultation(existing);
    }

    // Default select all shopping list items
    setSelectedShopIds(transformData.shopping_list.map(item => item.id));
  }, [id]);

  if (!transformation || !room) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-24 text-center">
        <p className="text-gray-400">Loading transformation details...</p>
      </div>
    );
  }

  // Calculate shopping cart total based on checked items
  const activeShoppingItems = transformation.shopping_list;
  
  // If designer revised the list, override
  const displayedItems = (consultation?.status === 'completed' && consultation.designer_modifications.revised_shopping_list)
    ? consultation.designer_modifications.revised_shopping_list
    : activeShoppingItems;

  const shoppingTotal = displayedItems
    .filter(item => selectedShopIds.includes(item.id))
    .reduce((sum, item) => sum + item.price, 0);

  const activeBudgetItems: BudgetItem[] = (consultation?.status === 'completed' && consultation.designer_modifications.revised_budget)
    ? consultation.designer_modifications.revised_budget
    : transformation.budget_breakdown[activeBudget];

  const budgetTotal = activeBudgetItems.reduce((sum, item) => sum + item.amount, 0);

  const toggleShopItem = (itemId: string) => {
    setSelectedShopIds(prev => 
      prev.includes(itemId) ? prev.filter(i => i !== itemId) : [...prev, itemId]
    );
  };

  const handleOpenConsultationModal = () => {
    setIsModalOpen(true);
  };

  const handleBookConsultation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!scheduleSlot) {
      alert('Please select a preferred slot.');
      return;
    }

    const newConsult: Consultation = {
      id: `consult-${Math.random().toString(36).substr(2, 9)}`,
      user_id: dbManager.getCurrentUser().id,
      transformation_id: id,
      designer_id: selectedDesignerId,
      status: 'requested',
      scheduled_slot: scheduleSlot,
      designer_modifications: {
        feedback_notes: clientNote // client uses this for initial message
      },
      created_at: new Date().toISOString()
    };

    dbManager.addConsultation(newConsult);
    setConsultation(newConsult);
    setIsModalOpen(false);
  };

  const handleExportPDF = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  const getDesignerName = (dId: string | null) => {
    if (!dId) return 'Assigned Designer';
    const designer = designers.find(d => d.id === dId);
    return designer ? designer.full_name : 'Designer';
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 md:px-8 flex flex-col gap-8 print:py-0 print:px-0">
      
      {/* Header and Print layout controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 print:hidden">
        <button
          onClick={() => router.push('/dashboard')}
          className="flex items-center gap-1.5 text-xs font-bold text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </button>

        <div className="flex gap-3 w-full sm:w-auto">
          <button
            onClick={handleExportPDF}
            className="flex-1 sm:flex-none glass-panel border-white/10 hover:border-primary/50 text-xs font-bold text-white px-4 py-2.5 rounded-xl flex items-center justify-center gap-2 hover:bg-white/5 transition-all"
          >
            <Download className="w-4 h-4 text-primary" />
            Export Shopping PDF
          </button>
          
          {consultation ? (
            <div className={`px-4 py-2.5 rounded-xl border flex items-center gap-2 text-xs font-bold ${
              consultation.status === 'completed'
                ? 'bg-green-500/10 border-green-500/20 text-green-400'
                : 'bg-amber-500/10 border-amber-500/20 text-primary'
            }`}>
              <ShieldCheck className="w-4 h-4" />
              {consultation.status === 'completed' 
                ? 'Designer Review Complete' 
                : 'Expert Review In-Progress'}
            </div>
          ) : (
            <button
              onClick={handleOpenConsultationModal}
              className="flex-1 sm:flex-none bg-gold-gradient text-dark-900 font-extrabold text-xs tracking-wider uppercase px-5 py-2.5 rounded-xl hover:shadow-lg hover:shadow-primary/20 transition-all flex items-center justify-center gap-2"
            >
              <UserCheck className="w-4 h-4" />
              Request Designer Review
            </button>
          )}
        </div>
      </div>

      {/* PRINT-ONLY TITLE */}
      <div className="hidden print:flex flex-col gap-2 mb-8 border-b border-black pb-4 text-black">
        <h1 className="text-3xl font-serif font-bold">MuamFormAI — Interior Design Proposal</h1>
        <p className="text-sm">Client: {dbManager.getCurrentUser().full_name} | Style Recommendation: {transformation.style}</p>
        <p className="text-xs text-gray-600">Export Date: {new Date().toLocaleDateString()}</p>
      </div>

      {/* MAIN LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT COLUMN: BEFORE/AFTER COMPARISON & ANALYSIS */}
        <div className="lg:col-span-2 flex flex-col gap-8">
          
          {/* Visual Slider */}
          <div className="bg-dark-800 p-2 sm:p-4 rounded-3xl border border-white/5 shadow-2xl print:hidden">
            <BeforeAfterSlider
              beforeImage={room.original_image_url}
              afterImage={transformation.generated_image_url}
              heightClass="h-[300px] sm:h-[450px] md:h-[500px]"
            />
          </div>

          {/* PRINT-ONLY IMAGES */}
          <div className="hidden print:grid grid-cols-2 gap-4 h-[300px] mb-8">
            <div className="border border-black rounded-lg overflow-hidden relative">
              <img src={room.original_image_url} alt="Before" className="w-full h-full object-cover" />
              <div className="absolute top-2 left-2 bg-white text-black px-2 py-0.5 text-[10px] font-bold rounded uppercase">Before</div>
            </div>
            <div className="border border-black rounded-lg overflow-hidden relative">
              <img src={transformation.generated_image_url} alt="After" className="w-full h-full object-cover" />
              <div className="absolute top-2 left-2 bg-yellow-500 text-black px-2 py-0.5 text-[10px] font-bold rounded uppercase">AI Redesign</div>
            </div>
          </div>

          {/* AI Room Analysis Coordinates */}
          <div className="glass-panel p-6 rounded-2xl border-white/5 bg-dark-800/20 flex flex-col gap-5 print:border-black print:text-black print:bg-transparent">
            <h3 className="text-sm uppercase font-bold text-white tracking-wider flex items-center gap-2 border-b border-white/5 pb-2 print:text-black print:border-black">
              <Info className="w-4.5 h-4.5 text-primary print:text-black" />
              AI Room Analysis Report
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs text-gray-300 print:text-black">
              <div className="flex flex-col gap-2">
                <p><span className="font-bold text-gray-400 print:text-black uppercase text-[10px] tracking-wider block">Space Category</span> {room.room_analysis.roomType}</p>
                <p><span className="font-bold text-gray-400 print:text-black uppercase text-[10px] tracking-wider block">Estimated Square Footage</span> {room.room_analysis.dimensions}</p>
                <p><span className="font-bold text-gray-400 print:text-black uppercase text-[10px] tracking-wider block">Daylight Analysis</span> {room.room_analysis.lighting}</p>
              </div>

              <div className="flex flex-col gap-2">
                <div>
                  <span className="font-bold text-gray-400 print:text-black uppercase text-[10px] tracking-wider block mb-1">Recommended Color Codes</span>
                  <div className="flex gap-2">
                    {room.room_analysis.suggestedColors.map((color, i) => (
                      <span key={i} className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-[10px] font-mono print:border-black print:text-black">
                        {color}
                      </span>
                    ))}
                  </div>
                </div>
                <p className="mt-2"><span className="font-bold text-gray-400 print:text-black uppercase text-[10px] tracking-wider block">Spatial Obstacles</span> {room.room_analysis.detectedFeatures.join(', ')}</p>
              </div>
            </div>
          </div>

          {/* Designer Consult Feedback (If complete) */}
          {consultation && consultation.status === 'completed' && consultation.designer_modifications.feedback_notes && (
            <div className="glass-panel p-6 rounded-2xl border-primary/20 bg-primary/5 flex flex-col gap-4 print:border-black print:text-black print:bg-transparent">
              <h3 className="text-sm uppercase font-bold text-primary tracking-wider flex items-center gap-2 border-b border-primary/20 pb-2 print:text-black print:border-black">
                <MessageSquare className="w-4.5 h-4.5" />
                Designer Recommendations By {getDesignerName(consultation.designer_id)}
              </h3>
              <p className="text-xs text-gray-300 leading-relaxed italic print:text-black">
                &ldquo;{consultation.designer_modifications.feedback_notes}&rdquo;
              </p>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: BUDGET ESTIMATES & SHOPPING ASSISTANT */}
        <div className="lg:col-span-1 flex flex-col gap-8">
          
          {/* BUDGET PLANNER CARD */}
          <div className="glass-panel p-6 rounded-2xl border-white/5 bg-dark-800/40 flex flex-col gap-6 print:border-black print:text-black print:bg-transparent">
            <div className="flex justify-between items-center border-b border-white/5 pb-3 print:border-black">
              <h3 className="text-sm uppercase font-bold text-white tracking-wider flex items-center gap-2 print:text-black">
                <DollarSign className="w-4.5 h-4.5 text-primary print:text-black" />
                Budget Planner
              </h3>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest print:text-black">Project Cost</span>
            </div>

            {/* Budget tabs */}
            <div className="flex gap-1 bg-dark-900/60 p-1 rounded-xl border border-white/5 print:hidden">
              {(['low', 'medium', 'premium'] as BudgetLevel[]).map((level) => (
                <button
                  key={level}
                  onClick={() => setActiveBudget(level)}
                  className={`flex-1 text-center text-[10px] py-2 font-bold uppercase tracking-widest rounded-lg transition-all ${
                    activeBudget === level
                      ? 'bg-white text-dark-900 font-extrabold shadow-sm'
                      : 'hover:bg-white/5 text-gray-400'
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>

            {/* Cost Breakdowns */}
            <div className="flex flex-col gap-4 text-xs">
              <div className="flex flex-col gap-3">
                {activeBudgetItems.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-start border-b border-white/5 pb-2 last:border-b-0 print:border-black">
                    <div>
                      <p className="font-semibold text-white print:text-black">{item.category}</p>
                      {item.notes && <p className="text-[10px] text-gray-500 print:text-gray-700 mt-0.5">{item.notes}</p>}
                    </div>
                    <span className="font-mono font-bold text-accent print:text-black">{formatCurrency(item.amount)}</span>
                  </div>
                ))}
              </div>

              <div className="h-px bg-white/5 mt-2 print:bg-black"></div>

              <div className="flex justify-between items-center bg-white/2 p-3.5 rounded-xl border border-white/5 print:border-black print:bg-transparent">
                <span className="font-bold text-xs uppercase tracking-wider text-gray-400 print:text-black">Total Project Est.</span>
                <span className="text-lg font-extrabold text-white print:text-black font-mono">
                  {formatCurrency(budgetTotal)}
                </span>
              </div>
            </div>
          </div>

          {/* SHOPPING LIST CARD */}
          <div className="glass-panel p-6 rounded-2xl border-white/5 bg-dark-800/40 flex flex-col gap-6 print:border-black print:text-black print:bg-transparent">
            <div className="flex justify-between items-center border-b border-white/5 pb-3 print:border-black">
              <h3 className="text-sm uppercase font-bold text-white tracking-wider flex items-center gap-2 print:text-black">
                <ShoppingCart className="w-4.5 h-4.5 text-primary print:text-black" />
                Shopping Assistant
              </h3>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest print:text-black">Procurement</span>
            </div>

            {/* Shopping List Items Checkbox list */}
            <div className="flex flex-col gap-4.5">
              {displayedItems.map((item) => {
                const checked = selectedShopIds.includes(item.id);
                return (
                  <div
                    key={item.id}
                    className="flex justify-between items-center border-b border-white/5 pb-3 last:border-0 last:pb-0 print:border-black"
                  >
                    <div className="flex items-center gap-3">
                      {/* Checkbox */}
                      <button
                        onClick={() => toggleShopItem(item.id)}
                        className="text-primary hover:text-white transition-colors flex-shrink-0 print:hidden"
                      >
                        {checked ? (
                          <CheckSquare className="w-4.5 h-4.5 fill-primary/10" />
                        ) : (
                          <Square className="w-4.5 h-4.5 text-gray-500" />
                        )}
                      </button>

                      <div className="flex flex-col">
                        <span className={`text-xs font-semibold ${checked ? 'text-white print:text-black' : 'text-gray-500 line-through'}`}>
                          {item.name}
                        </span>
                        <span className="text-[9px] uppercase tracking-widest text-gray-500 print:text-gray-700 mt-0.5">
                          {item.category} • {item.brand}
                        </span>
                      </div>
                    </div>

                    <div className="text-right flex flex-col gap-1 items-end">
                      <span className={`font-mono text-xs font-bold ${checked ? 'text-accent print:text-black' : 'text-gray-600 line-through'}`}>
                        {formatCurrency(item.price)}
                      </span>
                      {checked && (
                        <a
                          href={item.product_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[9px] text-primary hover:underline font-bold print:hidden"
                        >
                          Buy Item
                        </a>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="h-px bg-white/5 my-1 print:bg-black"></div>

            {/* Dynamic Total */}
            <div className="flex justify-between items-center bg-primary/5 p-3.5 rounded-xl border border-primary/10 print:border-black print:bg-transparent">
              <span className="font-bold text-xs uppercase tracking-wider text-primary print:text-black">Selected items total</span>
              <span className="text-base font-extrabold text-white print:text-black font-mono">
                {formatCurrency(shoppingTotal)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* --- DESIGNER CONSULTATION MODAL DIALOG --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-dark-900/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-panel border-primary/25 bg-dark-800 max-w-md w-full p-6.5 rounded-3xl flex flex-col gap-5 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <h2 className="text-lg font-serif font-bold text-white flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-primary" />
                Book Certified Designer Review
              </h2>
              <p className="text-xs text-gray-400 mt-1">
                Your selected designer will inspect your space and AI proposal, modify budget elements, replace products with premium items, and provide a final review report.
              </p>
            </div>

            <form onSubmit={handleBookConsultation} className="flex flex-col gap-4">
              {/* Designer Select */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] uppercase font-bold tracking-widest text-gray-400">Select Specialist</label>
                <select
                  value={selectedDesignerId}
                  onChange={(e) => setSelectedDesignerId(e.target.value)}
                  className="glass-input text-xs px-3 py-2 border-white/10"
                >
                  {designers.map(d => (
                    <option key={d.id} value={d.id}>{d.full_name} ({d.bio.split('specializing in')[1]?.split('.')[0] || 'Interior Design'}) - ${d.hourly_rate}/hr</option>
                  ))}
                </select>
              </div>

              {/* Slot Scheduler */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] uppercase font-bold tracking-widest text-gray-400">Select Scheduling Slot (Video Consultation)</label>
                <select
                  value={scheduleSlot}
                  onChange={(e) => setScheduleSlot(e.target.value)}
                  className="glass-input text-xs px-3 py-2 border-white/10"
                  required
                >
                  <option value="">-- Choose a Slot --</option>
                  <option value="June 22, 2026 at 2:00 PM EST">June 22, 2026 at 2:00 PM EST</option>
                  <option value="June 23, 2026 at 11:00 AM EST">June 23, 2026 at 11:00 AM EST</option>
                  <option value="June 25, 2026 at 4:30 PM EST">June 25, 2026 at 4:30 PM EST</option>
                </select>
              </div>

              {/* Comments Brief */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] uppercase font-bold tracking-widest text-gray-400">Provide Design Brief / Notes</label>
                <textarea
                  value={clientNote}
                  onChange={(e) => setClientNote(e.target.value)}
                  placeholder="Tell the designer what you like, what furniture you want to keep, or style restrictions..."
                  className="glass-input text-xs px-3 py-2 border-white/10 h-24 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full text-center bg-gold-gradient text-dark-900 font-extrabold text-xs tracking-widest uppercase py-3 rounded-xl hover:shadow-lg hover:shadow-primary/20 transition-all mt-2"
              >
                Submit Consultation Request ($199)
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
