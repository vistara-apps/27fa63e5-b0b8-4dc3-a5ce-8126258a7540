'use client';

import { HabitStats } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { ProgressCircle } from '@/components/ui/ProgressCircle';
import { Badge } from '@/components/ui/Badge';
import { TrendingUp, Target, Calendar, Award } from 'lucide-react';

interface HabitStatsProps {
  stats: HabitStats;
  className?: string;
}

export function HabitStatsDisplay({ stats, className }: HabitStatsProps) {
  return (
    <div className={className}>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-foreground mb-1">
              {stats.totalHabits}
            </div>
            <div className="text-sm text-secondary-foreground flex items-center justify-center">
              <Target className="w-3 h-3 mr-1" />
              Total Habits
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-accent mb-1">
              {stats.activeHabits}
            </div>
            <div className="text-sm text-secondary-foreground flex items-center justify-center">
              <TrendingUp className="w-3 h-3 mr-1" />
              Active
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Weekly Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-2xl font-bold text-foreground">
                {stats.longestStreak}
              </div>
              <div className="text-sm text-secondary-foreground">
                Longest Streak
              </div>
            </div>
            
            <ProgressCircle 
              progress={stats.weeklyProgress} 
              size={60}
              showPercentage
              className="text-accent"
            />
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center text-secondary-foreground">
              <Calendar className="w-3 h-3 mr-1" />
              {stats.totalCompletions} completions
            </div>
            <Badge variant="secondary">
              <Award className="w-3 h-3 mr-1" />
              {Math.floor(stats.totalCompletions / 7)} weeks
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
