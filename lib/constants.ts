// App constants and configuration

export const APP_CONFIG = {
  name: 'HabitSphere',
  tagline: 'Forge lasting habits, powered by community and gamification',
  version: '1.0.0',
  maxHabitsPerUser: 10,
  maxChallengesPerUser: 5,
  pointsPerCompletion: 10,
  streakBonusMultiplier: 1.5,
} as const;

export const HABIT_CATEGORIES = [
  { id: 'health', name: 'Health & Fitness', icon: '💪', color: 'bg-green-100 text-green-800' },
  { id: 'mindfulness', name: 'Mindfulness', icon: '🧘', color: 'bg-purple-100 text-purple-800' },
  { id: 'productivity', name: 'Productivity', icon: '⚡', color: 'bg-blue-100 text-blue-800' },
  { id: 'learning', name: 'Learning', icon: '📚', color: 'bg-yellow-100 text-yellow-800' },
  { id: 'social', name: 'Social', icon: '👥', color: 'bg-pink-100 text-pink-800' },
  { id: 'creativity', name: 'Creativity', icon: '🎨', color: 'bg-orange-100 text-orange-800' },
  { id: 'finance', name: 'Finance', icon: '💰', color: 'bg-emerald-100 text-emerald-800' },
  { id: 'other', name: 'Other', icon: '📝', color: 'bg-gray-100 text-gray-800' },
] as const;

export const STREAK_MILESTONES = [
  { days: 3, name: 'First Steps', badge: '🌟', points: 50 },
  { days: 7, name: 'Week Warrior', badge: '🎯', points: 100 },
  { days: 14, name: 'Two Week Champion', badge: '🔥', points: 200 },
  { days: 30, name: 'Monthly Master', badge: '⭐', points: 500 },
  { days: 50, name: 'Golden Streak', badge: '🏆', points: 750 },
  { days: 100, name: 'Century Club', badge: '💎', points: 1500 },
  { days: 365, name: 'Year Legend', badge: '👑', points: 5000 },
] as const;

export const CHALLENGE_TYPES = [
  { id: 'daily', name: 'Daily Challenge', duration: 30, description: 'Complete your habit every day for 30 days' },
  { id: 'weekly', name: 'Weekly Challenge', duration: 84, description: 'Complete your habit 5 days a week for 12 weeks' },
  { id: 'monthly', name: 'Monthly Challenge', duration: 90, description: 'Build consistency over 3 months' },
  { id: 'custom', name: 'Custom Challenge', duration: 0, description: 'Set your own timeline and goals' },
] as const;

export const SAMPLE_HABITS = [
  { name: 'Drink 8 glasses of water', category: 'health', goalType: 'build' as const },
  { name: 'Meditate for 10 minutes', category: 'mindfulness', goalType: 'build' as const },
  { name: 'Read for 30 minutes', category: 'learning', goalType: 'build' as const },
  { name: 'Exercise for 30 minutes', category: 'health', goalType: 'build' as const },
  { name: 'Write in journal', category: 'mindfulness', goalType: 'build' as const },
  { name: 'No social media before noon', category: 'productivity', goalType: 'break' as const },
  { name: 'No smoking', category: 'health', goalType: 'break' as const },
  { name: 'No junk food', category: 'health', goalType: 'break' as const },
] as const;

export const ENCOURAGEMENT_MESSAGES = [
  "Keep it up! You're doing amazing! 🌟",
  "Your consistency is inspiring! 💪",
  "One day at a time, you've got this! 🔥",
  "Your streak is looking fantastic! ⚡",
  "Stay strong, you're building something great! 🏆",
  "Every day counts, and you're counting them all! 📈",
  "Your dedication is paying off! 🎯",
  "You're on fire with this habit! 🔥",
] as const;

export const NOTIFICATION_TYPES = {
  STREAK_MILESTONE: 'streak_milestone',
  FRIEND_ENCOURAGEMENT: 'friend_encouragement',
  CHALLENGE_REMINDER: 'challenge_reminder',
  HABIT_REMINDER: 'habit_reminder',
  BADGE_EARNED: 'badge_earned',
} as const;

export const UI_CONSTANTS = {
  ANIMATION_DURATION: 300,
  FAST_ANIMATION_DURATION: 150,
  DEBOUNCE_DELAY: 500,
  MAX_MOBILE_WIDTH: 768,
  CARD_BORDER_RADIUS: 12,
  BUTTON_BORDER_RADIUS: 8,
} as const;

export const COLORS = {
  PRIMARY: 'hsl(240 80% 50%)',
  ACCENT: 'hsl(120 70% 45%)',
  SUCCESS: 'hsl(120 70% 45%)',
  WARNING: 'hsl(45 90% 55%)',
  ERROR: 'hsl(0 80% 45%)',
  BACKGROUND: 'hsl(220 20% 98%)',
  SURFACE: 'hsl(0 0% 100%)',
  BORDER: 'hsl(220 16% 92%)',
} as const;
