export type UserRole = 'user' | 'designer' | 'admin';
export type SubscriptionPlan = 'free' | 'pro' | 'premium';
export type SubscriptionStatus = 'active' | 'canceled';
export type BudgetLevel = 'low' | 'medium' | 'premium';
export type DesignStyle = 'Modern' | 'Scandinavian' | 'Minimalist' | 'Luxury' | 'Industrial' | 'Bohemian' | 'Classic';
export type ConsultationStatus = 'requested' | 'review_in_progress' | 'completed';

export interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  role: UserRole;
  created_at: string;
}

export interface Subscription {
  id: string;
  user_id: string;
  plan: SubscriptionPlan;
  status: SubscriptionStatus;
  current_period_end: string;
}

export interface RoomAnalysis {
  roomType: string;
  detectedFeatures: string[];
  lighting: string;
  suggestedColors: string[];
  dimensions: string;
  clutterLevel: string;
}

export interface Room {
  id: string;
  user_id: string;
  original_image_url: string;
  room_analysis: RoomAnalysis;
  created_at: string;
}

export interface BudgetItem {
  category: string;
  amount: number;
  notes?: string;
}

export interface BudgetBreakdown {
  low: BudgetItem[];
  medium: BudgetItem[];
  premium: BudgetItem[];
}

export interface ShoppingItem {
  id: string;
  name: string;
  category: 'Furniture' | 'Lighting' | 'Decor';
  price: number;
  product_url: string;
  image_url?: string;
  brand: string;
}

export interface Transformation {
  id: string;
  room_id: string;
  style: DesignStyle;
  generated_image_url: string;
  budget_level: BudgetLevel;
  budget_breakdown: BudgetBreakdown;
  shopping_list: ShoppingItem[];
  is_selected: boolean;
  status: 'pending' | 'completed' | 'failed';
  created_at: string;
}

export interface DesignerProfile {
  id: string;
  user_id: string;
  full_name: string;
  avatar_url: string | null;
  bio: string;
  portfolio: { title: string; image_url: string; description: string }[];
  hourly_rate: number;
  rating: number;
  is_verified: boolean;
}

export interface Consultation {
  id: string;
  user_id: string;
  transformation_id: string;
  designer_id: string | null;
  status: ConsultationStatus;
  scheduled_slot: string | null;
  designer_modifications: {
    revised_shopping_list?: ShoppingItem[];
    revised_budget?: BudgetItem[];
    feedback_notes?: string;
  };
  created_at: string;
}
