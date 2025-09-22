'use client';

import { Habit } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { ProgressCircle } from '@/components/ui/ProgressCircle';
import { Tooltip } from '@/components/ui/Tooltip';
import { formatRelativeDate, getStreakEmoji, isStreakActive } from '@/lib/utils';
import { HABIT_CATEGORIES } from '@/lib/constants';
import { Check, Edit3, Calendar, Target } from 'lucide-react';

interface HabitCardProps {
  habit: Habit;
  onMarkComplete: (habitId: string) => void;
  onEdit: (habit: Habit) => void;
  isLoading?: boolean;
}

export function HabitCard({ habit, onMarkComplete, onEdit, isLoading = false }: HabitCardProps) {
  const category = HABIT_CATEGORIES.find(cat => cat.id === habit.category);
  const streakActive = isStreakActive(habit.lastCompletionDate);
  const completedToday = habit.lastCompletionDate && 
    new Date(habit.lastCompletionDate).toDateString() === new Date().toDateString();
  
  // Calculate progress percentage (example: streak out of 30 days)
  const targetDays = 30;
  const progressPercentage = Math.min((habit.streakCount / targetDays) * 100, 100);
  
  return (
    <Card className="hover:shadow-md transition-shadow duration-200">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg mb-2">{habit.name}</CardTitle>
            {habit.description && (
              <p className="text-sm text-secondary-foreground mb-3">
                {habit.description}
              </p>
            )}
            <div className="flex items-center gap-2 flex-wrap">
              {category && (
                <Badge variant="secondary" className={category.color}>
                  <span className="mr-1">{category.icon}</span>
                  {category.name}
                </Badge>
              )}
              <Badge variant={habit.goalType === 'build' ? 'default' : 'outline'}>
                <Target className="w-3 h-3 mr-1" />
                {habit.goalType === 'build' ? 'Build' : 'Break'}
              </Badge>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onEdit(habit)}
            className="ml-2"
          >
            <Edit3 className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">
                {habit.streakCount}
              </div>
              <div className="text-xs text-secondary-foreground">
                Day Streak
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <span className="text-2xl">{getStreakEmoji(habit.streakCount)}</span>
              <ProgressCircle 
                progress={progressPercentage} 
                size={50}
                className="text-accent"
              />
            </div>
          </div>
          
          <div className="text-right">
            <Tooltip content={`Started ${formatRelativeDate(habit.startDate)}`}>
              <div className="flex items-center text-xs text-secondary-foreground">
                <Calendar className="w-3 h-3 mr-1" />
                {formatRelativeDate(habit.startDate)}
              </div>
            </Tooltip>
            {habit.lastCompletionDate && (
              <div className="text-xs text-secondary-foreground mt-1">
                Last: {formatRelativeDate(habit.lastCompletionDate)}
              </div>
            )}
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${
              streakActive ? 'bg-accent' : 'bg-secondary'
            }`} />
            <span className="text-sm text-secondary-foreground">
              {streakActive ? 'Active streak' : 'Streak broken'}
            </span>
          </div>
          
          <Button
            onClick={() => onMarkComplete(habit.habitId)}
            disabled={completedToday || isLoading}
            variant={completedToday ? 'secondary' : 'primary'}
            size="sm"
            isLoading={isLoading}
          >
            {completedToday ? (
              <>
                <Check className="w-4 h-4 mr-1" />
                Completed
              </>
            ) : (
              'Mark Complete'
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
