// Core data model types for HabitSphere

export interface User {
  userId: string;
  displayName: string;
  profilePictureUrl?: string;
  friends: string[];
  totalPoints: number;
  joinDate: Date;
}

export interface Habit {
  habitId: string;
  userId: string;
  name: string;
  description?: string;
  creationDate: Date;
  startDate: Date;
  streakCount: number;
  lastCompletionDate?: Date;
  goalType: 'build' | 'break';
  isActive: boolean;
  category?: string;
}

export interface HabitEntry {
  entryId: string;
  habitId: string;
  completionDate: Date;
  status: 'completed' | 'missed';
  notes?: string;
}

export interface Challenge {
  challengeId: string;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  isPublic: boolean;
  creatorId: string;
  maxParticipants?: number;
  category?: string;
}

export interface ChallengeParticipant {
  challengeParticipantId: string;
  challengeId: string;
  userId: string;
  joinDate: Date;
  currentStreakInChallenge: number;
  isActive: boolean;
}

export interface Badge {
  badgeId: string;
  name: string;
  description: string;
  iconUrl: string;
  requirement: string;
  points: number;
}

export interface UserBadge {
  userBadgeId: string;
  userId: string;
  badgeId: string;
  earnedDate: Date;
}

export interface Friendship {
  friendshipId: string;
  userId1: string;
  userId2: string;
  status: 'pending' | 'accepted' | 'blocked';
  createdDate: Date;
}

// UI Component Props
export interface HabitCardProps {
  habit: Habit;
  onMarkComplete: (habitId: string) => void;
  onEdit: (habit: Habit) => void;
  isLoading?: boolean;
}

export interface StreakDisplayProps {
  streakCount: number;
  lastCompletionDate?: Date;
  size?: 'sm' | 'md' | 'lg';
}

export interface ProgressCircleProps {
  progress: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
}

export interface ChallengeCardProps {
  challenge: Challenge;
  participantCount: number;
  userParticipating: boolean;
  onJoin: (challengeId: string) => void;
  onLeave: (challengeId: string) => void;
}

// API Response types
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  error?: string;
}

export interface HabitStats {
  totalHabits: number;
  activeHabits: number;
  longestStreak: number;
  totalCompletions: number;
  weeklyProgress: number;
}

export interface LeaderboardEntry {
  userId: string;
  displayName: string;
  profilePictureUrl?: string;
  streakCount: number;
  totalPoints: number;
  rank: number;
}
