'use client';

import { cn, formatRelativeDate, getStreakEmoji } from '@/lib/utils';
import { Tooltip } from '@/components/ui/Tooltip';
import { Calendar } from 'lucide-react';

interface StreakDisplayProps {
  streakCount: number;
  lastCompletionDate?: Date;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  className?: string;
}

export function StreakDisplay({ 
  streakCount, 
  lastCompletionDate, 
  size = 'md',
  showLabel = true,
  className 
}: StreakDisplayProps) {
  const sizeClasses = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-4xl',
  };
  
  const labelSizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  };
  
  return (
    <div className={cn('text-center', className)}>
      <div className="flex items-center justify-center space-x-2 mb-1">
        <span className={cn('font-bold text-foreground', sizeClasses[size])}>
          {streakCount}
        </span>
        <span className={sizeClasses[size]}>
          {getStreakEmoji(streakCount)}
        </span>
      </div>
      
      {showLabel && (
        <div className={cn('text-secondary-foreground', labelSizeClasses[size])}>
          Day{streakCount !== 1 ? 's' : ''} Streak
        </div>
      )}
      
      {lastCompletionDate && (
        <Tooltip content={`Last completed: ${formatRelativeDate(lastCompletionDate)}`}>
          <div className={cn(
            'flex items-center justify-center mt-1 text-secondary-foreground cursor-help',
            labelSizeClasses[size]
          )}>
            <Calendar className="w-3 h-3 mr-1" />
            {formatRelativeDate(lastCompletionDate)}
          </div>
        </Tooltip>
      )}
    </div>
  );
}
