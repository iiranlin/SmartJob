export interface Review {
  id: string;
  user: string;
  avatar: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Institution {
  id: string;
  name: string;
  category: string;
  rating: number;
  students: number;
  address: string;
  phone: string;
  description: string;
  features: string[];
  imageUrl: string;
  courses: string[];
  priceRange: string;
  reviews: Review[];
}

export interface Expert {
  id: string;
  name: string;
  title: string;
  company: string;
  avatarUrl: string;
  expertise: string[];
  yearsExperience: number;
  phone: string;
  bio: string;
  rating: number;
  availability: string;
  reviews: Review[];
}

export interface Article {
  id: string;
  title: string;
  tag: string;
  summary: string;
  views: number;
  date: string;
  imageUrl: string;
}

export enum Tab {
  TRAINING = 'training',
  GUIDANCE = 'guidance',
  AI_ADVISOR = 'ai_advisor'
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}