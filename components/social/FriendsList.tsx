'use client';

import { useState } from 'react';
import { User } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { formatRelativeDate } from '@/lib/utils';
import { ENCOURAGEMENT_MESSAGES } from '@/lib/constants';
import { Users, MessageCircle, Search, UserPlus } from 'lucide-react';

interface Friend extends User {
  currentStreak: number;
  longestStreak: number;
  lastActive: Date;
}

interface FriendsListProps {
  friends: Friend[];
  onSendEncouragement: (friendId: string, message: string) => void;
  onAddFriend: (friendId: string) => void;
  isLoading?: boolean;
}

export function FriendsList({ 
  friends, 
  onSendEncouragement, 
  onAddFriend, 
  isLoading = false 
}: FriendsListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFriend, setSelectedFriend] = useState<string | null>(null);
  
  const filteredFriends = friends.filter(friend =>
    friend.displayName.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleSendEncouragement = (friendId: string) => {
    const randomMessage = ENCOURAGEMENT_MESSAGES[
      Math.floor(Math.random() * ENCOURAGEMENT_MESSAGES.length)
    ];
    onSendEncouragement(friendId, randomMessage);
    setSelectedFriend(null);
  };
  
  if (friends.length === 0) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <Users className="w-12 h-12 text-secondary-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">
            No friends yet
          </h3>
          <p className="text-secondary-foreground mb-4">
            Connect with friends to share your habit journey and stay motivated together.
          </p>
          <Button onClick={() => onAddFriend('')}>
            <UserPlus className="w-4 h-4 mr-2" />
            Add Friends
          </Button>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Users className="w-5 h-5 mr-2" />
            Friends ({friends.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Input
            placeholder="Search friends..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="mb-4"
          />
          
          <div className="space-y-3">
            {filteredFriends.map((friend) => (
              <div
                key={friend.userId}
                className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-secondary/50 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    {friend.profilePictureUrl ? (
                      <img
                        src={friend.profilePictureUrl}
                        alt={friend.displayName}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      <span className="text-primary font-medium">
                        {friend.displayName.charAt(0).toUpperCase()}
                      </span>
                    )}
                  </div>
                  
                  <div>
                    <div className="font-medium text-foreground">
                      {friend.displayName}
                    </div>
                    <div className="text-sm text-secondary-foreground">
                      Active {formatRelativeDate(friend.lastActive)}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <div className="text-right">
                    <Badge variant="secondary" className="mb-1">
                      🔥 {friend.currentStreak}
                    </Badge>
                    <div className="text-xs text-secondary-foreground">
                      Best: {friend.longestStreak}
                    </div>
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSendEncouragement(friend.userId)}
                    disabled={isLoading}
                  >
                    <MessageCircle className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
          
          {filteredFriends.length === 0 && searchQuery && (
            <div className="text-center py-8 text-secondary-foreground">
              No friends found matching "{searchQuery}"
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
