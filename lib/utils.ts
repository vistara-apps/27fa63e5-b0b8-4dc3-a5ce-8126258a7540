import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
}

export function formatRelativeDate(date: Date): string {
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  
  if (diffInDays === 0) return 'Today';
  if (diffInDays === 1) return 'Yesterday';
  if (diffInDays < 7) return `${diffInDays} days ago`;
  if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
  return formatDate(date);
}

export function calculateStreak(entries: { completionDate: Date; status: 'completed' | 'missed' }[]): number {
  if (entries.length === 0) return 0;
  
  // Sort entries by date (most recent first)
  const sortedEntries = entries.sort((a, b) => b.completionDate.getTime() - a.completionDate.getTime());
  
  let streak = 0;
  for (const entry of sortedEntries) {
    if (entry.status === 'completed') {
      streak++;
    } else {
      break;
    }
  }
  
  return streak;
}

export function isStreakActive(lastCompletionDate?: Date): boolean {
  if (!lastCompletionDate) return false;
  
  const now = new Date();
  const diffInMs = now.getTime() - lastCompletionDate.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  
  // Streak is active if completed today or yesterday
  return diffInDays <= 1;
}

export function getStreakEmoji(streakCount: number): string {
  if (streakCount === 0) return '🌱';
  if (streakCount < 7) return '🔥';
  if (streakCount < 30) return '⚡';
  if (streakCount < 100) return '💎';
  return '👑';
}

export function calculatePoints(streakCount: number, habitType: 'build' | 'break'): number {
  const basePoints = habitType === 'build' ? 10 : 15; // Breaking bad habits is harder
  const streakBonus = Math.floor(streakCount / 7) * 5; // Bonus every week
  return basePoints + streakBonus;
}

export function getBadgeForStreak(streakCount: number): string | null {
  if (streakCount >= 100) return '💎 Century Club';
  if (streakCount >= 50) return '🏆 Golden Streak';
  if (streakCount >= 30) return '⭐ Monthly Master';
  if (streakCount >= 14) return '🔥 Two Week Warrior';
  if (streakCount >= 7) return '🎯 Week Winner';
  if (streakCount >= 3) return '🌟 Triple Threat';
  return null;
}

export function generateHabitId(): string {
  return `habit_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

export function generateChallengeId(): string {
  return `challenge_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

export function validateHabitName(name: string): string | null {
  if (!name.trim()) return 'Habit name is required';
  if (name.length < 3) return 'Habit name must be at least 3 characters';
  if (name.length > 50) return 'Habit name must be less than 50 characters';
  return null;
}

export function getProgressPercentage(current: number, target: number): number {
  if (target === 0) return 0;
  return Math.min(Math.round((current / target) * 100), 100);
}

export function getWeekDates(): Date[] {
  const today = new Date();
  const currentDay = today.getDay();
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - currentDay);
  
  const weekDates = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date(startOfWeek);
    date.setDate(startOfWeek.getDate() + i);
    weekDates.push(date);
  }
  
  return weekDates;
}

export function isSameDay(date1: Date, date2: Date): boolean {
  return date1.getFullYear() === date2.getFullYear() &&
         date1.getMonth() === date2.getMonth() &&
         date1.getDate() === date2.getDate();
}
