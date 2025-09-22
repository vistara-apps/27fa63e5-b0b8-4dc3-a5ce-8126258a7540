'use client';

import { User, HabitStats } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { StreakDisplay } from '@/components/habits/StreakDisplay';
import { formatRelativeDate } from '@/lib/utils';
import { Trophy, Calendar, Target } from 'lucide-react';

interface DashboardHeaderProps {
  user: User;
  stats: HabitStats;
  className?: string;
}

export function DashboardHeader({ user, stats, className }: DashboardHeaderProps) {
  return (
    <div className={className}>
      {/* Welcome Section */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Welcome back, {user.displayName}! 👋
        </h1>
        <p className="text-secondary-foreground">
          Keep building those amazing habits. You're doing great!
        </p>
      </div>
      
      {/* Stats Overview */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Total Points */}
            <div className="text-center">
              <div className="text-2xl font-bold text-primary mb-1">
                {user.totalPoints.toLocaleString()}
              </div>
              <div className="text-sm text-secondary-foreground flex items-center justify-center">
                <Trophy className="w-3 h-3 mr-1" />
                Total Points
              </div>
            </div>
            
            {/* Longest Streak */}
            <div className="text-center">
              <StreakDisplay 
                streakCount={stats.longestStreak}
                size="md"
                showLabel={false}
              />
              <div className="text-sm text-secondary-foreground mt-1">
                Longest Streak
              </div>
            </div>
            
            {/* Active Habits */}
            <div className="text-center">
              <div className="text-2xl font-bold text-accent mb-1">
                {stats.activeHabits}
              </div>
              <div className="text-sm text-secondary-foreground flex items-center justify-center">
                <Target className="w-3 h-3 mr-1" />
                Active Habits
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Quick Stats */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <Badge variant="secondary" className="text-sm">
            <Calendar className="w-3 h-3 mr-1" />
            Joined {formatRelativeDate(user.joinDate)}
          </Badge>
          <Badge variant="outline" className="text-sm">
            {stats.totalCompletions} completions
          </Badge>
        </div>
        
        <div className="text-sm text-secondary-foreground">
          {stats.weeklyProgress}% this week
        </div>
      </div>
    </div>
  );
}
