import { Mission, Mood, Friend, ActivityLog, DailyKeyword } from './types';

export const INITIAL_MISSIONS: Mission[] = [
  { id: 1, category: 'self_care', title: '물 한 잔 천천히 마시기', difficulty_level: 1, xp_reward: 10, completed: false, level: 1 },
  { id: 2, category: 'cleaning', title: '베개 정돈하기', difficulty_level: 1, xp_reward: 15, completed: false, level: 1 },
  { id: 3, category: 'connection', title: '창문 열고 5분간 바람 느끼기', difficulty_level: 2, xp_reward: 20, completed: false, level: 1 },
  { id: 4, category: 'self_care', title: '거울 보고 나에게 미소 짓기', difficulty_level: 2, xp_reward: 20, completed: false, level: 1 },
  { id: 5, category: 'cleaning', title: '책상 위 쓰레기 하나 줍기', difficulty_level: 1, xp_reward: 10, completed: false, level: 1 },
];

export const LEVEL_2_MISSIONS: Mission[] = [
  { id: 101, category: 'self_care', title: '좋아하는 노래 1곡 듣기', difficulty_level: 3, xp_reward: 30, completed: false, level: 2 },
  { id: 102, category: 'cleaning', title: '서랍 한 칸 정리하기', difficulty_level: 3, xp_reward: 35, completed: false, level: 2 },
  { id: 103, category: 'connection', title: '친구에게 이모티콘 보내기', difficulty_level: 3, xp_reward: 40, completed: false, level: 2 },
  { id: 104, category: 'self_care', title: '가벼운 스트레칭 1분', difficulty_level: 3, xp_reward: 30, completed: false, level: 2 },
];

export const MOODS: Mood[] = [
  { id: 'calm', emoji: '🌿', label: '편안해요', color: 'text-emerald-400' },
  { id: 'gloomy', emoji: '☁️', label: '흐려요', color: 'text-slate-400' },
  { id: 'tired', emoji: '🌙', label: '지쳤어요', color: 'text-indigo-400' },
  { id: 'anxious', emoji: '🔥', label: '복잡해요', color: 'text-amber-400' },
];

export const ONBOARDING_MESSAGES = [
  "어서오세요.\n이 숲은 당신을 기다리고 있었어요.",
  "여기서는 아무것도\n증명하지 않아도 괜찮아요.",
  "그저 잠시 머무르며,\n따뜻한 불을 쬐고 가세요."
];

export const MOCK_FRIENDS: Friend[] = [
  { id: 1, name: '새벽별', avatar: '🦉', isOnline: true, statusMessage: '책 읽는 중...', studyTimeToday: 145, warmth: 42 },
  { id: 2, name: '작은나무', avatar: '🌲', isOnline: true, statusMessage: '명상 중', studyTimeToday: 80, warmth: 15 },
  { id: 3, name: '달토끼', avatar: '🐇', isOnline: false, statusMessage: '잠시 휴식', studyTimeToday: 210, warmth: 88 },
  { id: 4, name: '구름이', avatar: '☁️', isOnline: false, statusMessage: '', studyTimeToday: 30, warmth: 5 },
];

export const ACTIVITY_LOGS: ActivityLog[] = [
  { id: 1, message: "'새벽별'님이 물을 한 잔 마셨어요.", timeAgo: "방금 전" },
  { id: 2, message: "'작은나무'님이 숲속 도서관에 입장했어요.", timeAgo: "5분 전" },
  { id: 3, message: "'달토끼'님이 기분이 편안해졌어요.", timeAgo: "12분 전" },
  { id: 4, message: "누군가 갤러리에 하늘 사진을 올렸어요.", timeAgo: "20분 전" },
];

export const DAILY_KEYWORDS: DailyKeyword[] = [
  { word: "여유", meaning: "서두르지 않고 천천히 가도 괜찮은 마음" },
  { word: "용기", meaning: "아주 작은 문 하나를 열어보는 힘" },
  { word: "온기", meaning: "나 자신을 따뜻하게 안아주는 순간" },
  { word: "휴식", meaning: "잠시 멈춰 서서 숨을 고르는 시간" },
];

export const FOG_CHALLENGE = {
  total: 5000,
  current: 3420,
};