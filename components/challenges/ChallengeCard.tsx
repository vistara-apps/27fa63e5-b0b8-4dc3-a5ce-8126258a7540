'use client';

import { Challenge, ChallengeParticipant } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { ProgressCircle } from '@/components/ui/ProgressCircle';
import { formatDate, formatRelativeDate } from '@/lib/utils';
import { Users, Calendar, Trophy, Target } from 'lucide-react';

interface ChallengeCardProps {
  challenge: Challenge;
  participantCount: number;
  userParticipating: boolean;
  userProgress?: number; // 0-100
  onJoin: (challengeId: string) => void;
  onLeave: (challengeId: string) => void;
  isLoading?: boolean;
}

export function ChallengeCard({
  challenge,
  participantCount,
  userParticipating,
  userProgress = 0,
  onJoin,
  onLeave,
  isLoading = false,
}: ChallengeCardProps) {
  const isActive = new Date() >= challenge.startDate && new Date() <= challenge.endDate;
  const isUpcoming = new Date() < challenge.startDate;
  const isCompleted = new Date() > challenge.endDate;
  
  const daysRemaining = Math.ceil(
    (challenge.endDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  );
  
  const getStatusBadge = () => {
    if (isUpcoming) return <Badge variant="outline">Upcoming</Badge>;
    if (isActive) return <Badge variant="default">Active</Badge>;
    if (isCompleted) return <Badge variant="secondary">Completed</Badge>;
    return null;
  };
  
  return (
    <Card className="hover:shadow-md transition-shadow duration-200">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg mb-2">{challenge.name}</CardTitle>
            <p className="text-sm text-secondary-foreground mb-3">
              {challenge.description}
            </p>
            <div className="flex items-center gap-2 flex-wrap">
              {getStatusBadge()}
              {challenge.isPublic && (
                <Badge variant="outline">
                  <Users className="w-3 h-3 mr-1" />
                  Public
                </Badge>
              )}
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="text-center">
                <div className="text-lg font-bold text-foreground">
                  {participantCount}
                </div>
                <div className="text-xs text-secondary-foreground">
                  Participants
                </div>
              </div>
              
              {userParticipating && (
                <div className="flex items-center space-x-2">
                  <ProgressCircle 
                    progress={userProgress} 
                    size={40}
                    className="text-accent"
                  />
                  <div className="text-sm">
                    <div className="font-medium text-foreground">
                      {Math.round(userProgress)}%
                    </div>
                    <div className="text-xs text-secondary-foreground">
                      Complete
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="text-right">
              <div className="flex items-center text-sm text-secondary-foreground mb-1">
                <Calendar className="w-3 h-3 mr-1" />
                {formatDate(challenge.startDate)}
              </div>
              <div className="text-xs text-secondary-foreground">
                to {formatDate(challenge.endDate)}
              </div>
              {isActive && daysRemaining > 0 && (
                <div className="text-xs text-accent font-medium mt-1">
                  {daysRemaining} days left
                </div>
              )}
            </div>
          </div>
          
          {userParticipating && (
            <div className="bg-secondary/50 rounded-lg p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Trophy className="w-4 h-4 text-accent" />
                  <span className="text-sm font-medium text-foreground">
                    You're participating!
                  </span>
                </div>
                <div className="text-sm text-secondary-foreground">
                  Keep it up! 🔥
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter>
        <div className="flex gap-2 w-full">
          {userParticipating ? (
            <Button
              variant="outline"
              onClick={() => onLeave(challenge.challengeId)}
              disabled={isLoading || isCompleted}
              className="flex-1"
              isLoading={isLoading}
            >
              Leave Challenge
            </Button>
          ) : (
            <Button
              onClick={() => onJoin(challenge.challengeId)}
              disabled={isLoading || isCompleted}
              className="flex-1"
              isLoading={isLoading}
            >
              <Target className="w-4 h-4 mr-2" />
              Join Challenge
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
