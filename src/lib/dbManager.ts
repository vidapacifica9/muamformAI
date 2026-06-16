import { Room, Transformation, DesignerProfile, Consultation, Profile, Subscription, SubscriptionPlan, UserRole } from '@/types';
import { MOCK_USER, MOCK_DESIGNERS, MOCK_TRANSFORMATIONS, MOCK_ROOMS } from './mockData';

// Storage keys
const KEYS = {
  USER: 'muamform_user',
  SUBSCRIPTION: 'muamform_sub',
  ROOMS: 'muamform_rooms',
  TRANSFORMATIONS: 'muamform_transformations',
  CONSULTATIONS: 'muamform_consultations',
};

// Initialize DB helper
const getStorageItem = <T>(key: string, defaultValue: T): T => {
  if (typeof window === 'undefined') return defaultValue;
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (e) {
    return defaultValue;
  }
};

const setStorageItem = <T>(key: string, value: T): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error(`Error saving key "${key}" to localStorage:`, e);
  }
};

export const dbManager = {
  // --- Auth & User Profile ---
  getCurrentUser(): Profile {
    return getStorageItem<Profile>(KEYS.USER, MOCK_USER);
  },

  updateCurrentUser(profile: Partial<Profile>): Profile {
    const current = this.getCurrentUser();
    const updated = { ...current, ...profile };
    setStorageItem(KEYS.USER, updated);
    return updated;
  },

  switchUserRole(role: UserRole): Profile {
    // If designer, copy name/avatar of Saskia Vance
    if (role === 'designer') {
      const updated = this.updateCurrentUser({
        id: 'designer-456',
        full_name: 'Saskia Vance',
        avatar_url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200',
        role: 'designer'
      });
      return updated;
    } else if (role === 'admin') {
      return this.updateCurrentUser({
        id: 'admin-999',
        full_name: 'Admin Supervisor',
        avatar_url: null,
        role: 'admin'
      });
    } else {
      return this.updateCurrentUser({
        id: 'user-123',
        full_name: 'Alexander Sterling',
        avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
        role: 'user'
      });
    }
  },

  // --- Subscriptions ---
  getSubscription(): Subscription {
    const user = this.getCurrentUser();
    const defaultSub: Subscription = {
      id: 'sub-default',
      user_id: user.id,
      plan: 'free',
      status: 'active',
      current_period_end: new Date(Date.now() + 30 * 24 * 3600 * 1000).toISOString()
    };
    return getStorageItem<Subscription>(KEYS.SUBSCRIPTION, defaultSub);
  },

  updateSubscription(plan: SubscriptionPlan): Subscription {
    const sub = this.getSubscription();
    const updated: Subscription = {
      ...sub,
      plan,
      current_period_end: new Date(Date.now() + 30 * 24 * 3600 * 1000).toISOString()
    };
    setStorageItem(KEYS.SUBSCRIPTION, updated);
    return updated;
  },

  // --- Rooms ---
  getRooms(): Room[] {
    return getStorageItem<Room[]>(KEYS.ROOMS, MOCK_ROOMS);
  },

  getRoom(id: string): Room | undefined {
    return this.getRooms().find(r => r.id === id);
  },

  addRoom(room: Room): void {
    const rooms = this.getRooms();
    rooms.unshift(room);
    setStorageItem(KEYS.ROOMS, rooms);
  },

  // --- Transformations ---
  getTransformations(): Transformation[] {
    return getStorageItem<Transformation[]>(KEYS.TRANSFORMATIONS, MOCK_TRANSFORMATIONS);
  },

  getTransformation(id: string): Transformation | undefined {
    return this.getTransformations().find(t => t.id === id);
  },

  getTransformationsForRoom(roomId: string): Transformation[] {
    return this.getTransformations().filter(t => t.room_id === roomId);
  },

  addTransformation(t: Transformation): void {
    const transforms = this.getTransformations();
    transforms.unshift(t);
    setStorageItem(KEYS.TRANSFORMATIONS, transforms);
  },

  updateTransformation(id: string, fields: Partial<Transformation>): Transformation | undefined {
    const transforms = this.getTransformations();
    const index = transforms.findIndex(t => t.id === id);
    if (index === -1) return undefined;
    
    const updated = { ...transforms[index], ...fields };
    transforms[index] = updated;
    setStorageItem(KEYS.TRANSFORMATIONS, transforms);
    return updated;
  },

  // --- Designers ---
  getDesigners(): DesignerProfile[] {
    return MOCK_DESIGNERS; // Read-only marketplace directory
  },

  getDesigner(id: string): DesignerProfile | undefined {
    return MOCK_DESIGNERS.find(d => d.id === id);
  },

  getDesignerByUserId(userId: string): DesignerProfile | undefined {
    return MOCK_DESIGNERS.find(d => d.user_id === userId);
  },

  // --- Consultations ---
  getConsultations(): Consultation[] {
    return getStorageItem<Consultation[]>(KEYS.CONSULTATIONS, []);
  },

  getConsultationsForUser(userId: string): Consultation[] {
    return this.getConsultations().filter(c => c.user_id === userId);
  },

  getConsultationsForDesigner(designerId: string): Consultation[] {
    return this.getConsultations().filter(c => c.designer_id === designerId);
  },

  addConsultation(c: Consultation): void {
    const list = this.getConsultations();
    list.unshift(c);
    setStorageItem(KEYS.CONSULTATIONS, list);
  },

  updateConsultation(id: string, fields: Partial<Consultation>): Consultation | undefined {
    const list = this.getConsultations();
    const index = list.findIndex(c => c.id === id);
    if (index === -1) return undefined;

    const updated = { ...list[index], ...fields };
    list[index] = updated;
    setStorageItem(KEYS.CONSULTATIONS, list);
    return updated;
  }
};
