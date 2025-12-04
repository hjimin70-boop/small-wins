export interface Mission {
  id: number;
  category: 'self_care' | 'cleaning' | 'connection';
  title: string;
  difficulty_level: number;
  xp_reward: number;
  completed: boolean;
  level: 1 | 2; // 1: Small Win, 2: Big Step
}

export interface Mood {
  id: string;
  emoji: string;
  label: string;
  color: string;
}

export interface GalleryItem {
  id: number;
  url: string;
  author: string;
  caption: string;
  likes: number;
}

export interface UserStats {
  streak: number;
  totalTimeOutside: number; // in minutes (simulated)
  xp: number;
}

export interface Friend {
  id: number;
  name: string;
  avatar: string;
  isOnline: boolean;
  statusMessage?: string;
  studyTimeToday: number; // minutes
  warmth: number; // New: social warmth score
}

export interface ActivityLog {
  id: number;
  message: string;
  timeAgo: string;
}

export interface DailyKeyword {
  word: string;
  meaning: string;
}