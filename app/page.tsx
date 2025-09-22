'use client';

import { useState, useEffect } from 'react';
import { Habit, User, HabitStats, Challenge } from '@/lib/types';
import { AppShell } from '@/components/ui/AppShell';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { HabitCard } from '@/components/habits/HabitCard';
import { HabitForm } from '@/components/habits/HabitForm';
import { HabitStatsDisplay } from '@/components/habits/HabitStats';
import { FriendsList } from '@/components/social/FriendsList';
import { ChallengeCard } from '@/components/challenges/ChallengeCard';
import { generateHabitId, calculateStreak, calculatePoints } from '@/lib/utils';
import { SAMPLE_HABITS } from '@/lib/constants';
import { Plus, Target, Users, Trophy, TrendingUp } from 'lucide-react';

// Mock data - in a real app, this would come from your API/database
const mockUser: User = {
  userId: 'user-1',
  displayName: 'Alex Chen',
  profilePictureUrl: undefined,
  friends: ['user-2', 'user-3'],
  totalPoints: 12000,
  joinDate: new Date('2024-01-15'),
};

const mockStats: HabitStats = {
  totalHabits: 5,
  activeHabits: 3,
  longestStreak: 28,
  totalCompletions: 156,
  weeklyProgress: 85,
};

const mockHabits: Habit[] = [
  {
    habitId: 'habit-1',
    userId: 'user-1',
    name: 'Drink 8 glasses of water',
    description: 'Stay hydrated throughout the day',
    category: 'health',
    goalType: 'build',
    creationDate: new Date('2024-01-20'),
    startDate: new Date('2024-01-20'),
    streakCount: 12,
    lastCompletionDate: new Date('2024-01-31'),
    isActive: true,
  },
  {
    habitId: 'habit-2',
    userId: 'user-1',
    name: 'Meditate for 10 minutes',
    description: 'Daily mindfulness practice',
    category: 'mindfulness',
    goalType: 'build',
    creationDate: new Date('2024-01-18'),
    startDate: new Date('2024-01-18'),
    streakCount: 8,
    lastCompletionDate: new Date('2024-01-30'),
    isActive: true,
  },
];

const mockChallenges: Challenge[] = [
  {
    challengeId: 'challenge-1',
    name: '30-Day Hydration Challenge',
    description: 'Drink at least 8 glasses of water every day for 30 days',
    startDate: new Date('2024-02-01'),
    endDate: new Date('2024-03-01'),
    isPublic: true,
    creatorId: 'user-1',
    category: 'health',
  },
];

type ActiveTab = 'habits' | 'challenges' | 'friends' | 'stats';

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('habits');
  const [habits, setHabits] = useState<Habit[]>(mockHabits);
  const [showHabitForm, setShowHabitForm] = useState(false);
  const [editingHabit, setEditingHabit] = useState<Habit | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  
  // Mock friends data
  const mockFriends = [
    {
      ...mockUser,
      userId: 'user-2',
      displayName: 'Sarah Johnson',
      currentStreak: 15,
      longestStreak: 42,
      lastActive: new Date('2024-01-31'),
    },
    {
      ...mockUser,
      userId: 'user-3',
      displayName: 'Mike Wilson',
      currentStreak: 7,
      longestStreak: 21,
      lastActive: new Date('2024-01-30'),
    },
  ];
  
  const handleMarkComplete = async (habitId: string) => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setHabits(prevHabits =>
      prevHabits.map(habit => {
        if (habit.habitId === habitId) {
          const today = new Date();
          const newStreakCount = habit.streakCount + 1;
          
          return {
            ...habit,
            streakCount: newStreakCount,
            lastCompletionDate: today,
          };
        }
        return habit;
      })
    );
    
    setIsLoading(false);
  };
  
  const handleSaveHabit = async (habitData: Habit) => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (editingHabit) {
      // Update existing habit
      setHabits(prevHabits =>
        prevHabits.map(habit =>
          habit.habitId === habitData.habitId ? habitData : habit
        )
      );
    } else {
      // Add new habit
      setHabits(prevHabits => [...prevHabits, habitData]);
    }
    
    setShowHabitForm(false);
    setEditingHabit(undefined);
    setIsLoading(false);
  };
  
  const handleEditHabit = (habit: Habit) => {
    setEditingHabit(habit);
    setShowHabitForm(true);
  };
  
  const handleSendEncouragement = async (friendId: string, message: string) => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // In a real app, this would send a notification to the friend
    console.log(`Sent encouragement to ${friendId}: ${message}`);
    
    setIsLoading(false);
  };
  
  const handleJoinChallenge = async (challengeId: string) => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log(`Joined challenge: ${challengeId}`);
    
    setIsLoading(false);
  };
  
  const handleLeaveChallenge = async (challengeId: string) => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log(`Left challenge: ${challengeId}`);
    
    setIsLoading(false);
  };
  
  const renderTabContent = () => {
    switch (activeTab) {
      case 'habits':
        return (
          <div className="space-y-4">
            {showHabitForm ? (
              <HabitForm
                habit={editingHabit}
                onSave={handleSaveHabit}
                onCancel={() => {
                  setShowHabitForm(false);
                  setEditingHabit(undefined);
                }}
                isLoading={isLoading}
              />
            ) : (
              <>
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-foreground">
                    Your Habits ({habits.length})
                  </h2>
                  <Button onClick={() => setShowHabitForm(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Habit
                  </Button>
                </div>
                
                {habits.length === 0 ? (
                  <Card>
                    <CardContent className="p-8 text-center">
                      <Target className="w-12 h-12 text-secondary-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-foreground mb-2">
                        No habits yet
                      </h3>
                      <p className="text-secondary-foreground mb-4">
                        Start building better habits today! Create your first habit to begin your journey.
                      </p>
                      <Button onClick={() => setShowHabitForm(true)}>
                        <Plus className="w-4 h-4 mr-2" />
                        Create Your First Habit
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="space-y-4">
                    {habits.map((habit) => (
                      <HabitCard
                        key={habit.habitId}
                        habit={habit}
                        onMarkComplete={handleMarkComplete}
                        onEdit={handleEditHabit}
                        isLoading={isLoading}
                      />
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        );
        
      case 'challenges':
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-foreground">
                Challenges
              </h2>
              <Button variant="outline">
                <Plus className="w-4 h-4 mr-2" />
                Create Challenge
              </Button>
            </div>
            
            <div className="space-y-4">
              {mockChallenges.map((challenge) => (
                <ChallengeCard
                  key={challenge.challengeId}
                  challenge={challenge}
                  participantCount={24}
                  userParticipating={false}
                  userProgress={0}
                  onJoin={handleJoinChallenge}
                  onLeave={handleLeaveChallenge}
                  isLoading={isLoading}
                />
              ))}
            </div>
          </div>
        );
        
      case 'friends':
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">
              Social Feed
            </h2>
            <FriendsList
              friends={mockFriends}
              onSendEncouragement={handleSendEncouragement}
              onAddFriend={(friendId) => console.log('Add friend:', friendId)}
              isLoading={isLoading}
            />
          </div>
        );
        
      case 'stats':
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">
              Your Statistics
            </h2>
            <HabitStatsDisplay stats={mockStats} />
          </div>
        );
        
      default:
        return null;
    }
  };
  
  return (
    <AppShell>
      <DashboardHeader user={mockUser} stats={mockStats} className="mb-6" />
      
      {/* Navigation Tabs */}
      <div className="flex space-x-1 mb-6 bg-secondary rounded-lg p-1">
        {[
          { id: 'habits' as const, label: 'Habits', icon: Target },
          { id: 'challenges' as const, label: 'Challenges', icon: Trophy },
          { id: 'friends' as const, label: 'Friends', icon: Users },
          { id: 'stats' as const, label: 'Stats', icon: TrendingUp },
        ].map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`flex-1 flex items-center justify-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === id
                ? 'bg-surface text-foreground shadow-sm'
                : 'text-secondary-foreground hover:text-foreground'
            }`}
          >
            <Icon className="w-4 h-4 mr-2" />
            {label}
          </button>
        ))}
      </div>
      
      {/* Tab Content */}
      <div className="animate-fade-in">
        {renderTabContent()}
      </div>
    </AppShell>
  );
}
