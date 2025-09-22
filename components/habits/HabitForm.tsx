'use client';

import { useState } from 'react';
import { Habit } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { validateHabitName, generateHabitId } from '@/lib/utils';
import { HABIT_CATEGORIES, SAMPLE_HABITS } from '@/lib/constants';
import { X, Plus, Target, Calendar } from 'lucide-react';

interface HabitFormProps {
  habit?: Habit;
  onSave: (habit: Habit) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export function HabitForm({ habit, onSave, onCancel, isLoading = false }: HabitFormProps) {
  const [formData, setFormData] = useState({
    name: habit?.name || '',
    description: habit?.description || '',
    category: habit?.category || 'other',
    goalType: habit?.goalType || 'build' as 'build' | 'break',
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showSuggestions, setShowSuggestions] = useState(!habit && formData.name === '');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    const newErrors: Record<string, string> = {};
    const nameError = validateHabitName(formData.name);
    if (nameError) newErrors.name = nameError;
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    // Create or update habit
    const habitData: Habit = {
      habitId: habit?.habitId || generateHabitId(),
      userId: habit?.userId || 'current-user', // This would come from auth context
      name: formData.name.trim(),
      description: formData.description.trim() || undefined,
      category: formData.category,
      goalType: formData.goalType,
      creationDate: habit?.creationDate || new Date(),
      startDate: habit?.startDate || new Date(),
      streakCount: habit?.streakCount || 0,
      lastCompletionDate: habit?.lastCompletionDate,
      isActive: habit?.isActive ?? true,
    };
    
    onSave(habitData);
  };
  
  const handleSuggestionClick = (suggestion: typeof SAMPLE_HABITS[0]) => {
    setFormData({
      name: suggestion.name,
      description: '',
      category: suggestion.category,
      goalType: suggestion.goalType,
    });
    setShowSuggestions(false);
    setErrors({});
  };
  
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>
            {habit ? 'Edit Habit' : 'Create New Habit'}
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onCancel}>
            <X className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Habit Name"
            value={formData.name}
            onChange={(e) => {
              setFormData({ ...formData, name: e.target.value });
              setErrors({ ...errors, name: '' });
              setShowSuggestions(false);
            }}
            onFocus={() => setShowSuggestions(!habit && formData.name === '')}
            error={errors.name}
            placeholder="e.g., Drink 8 glasses of water"
            required
          />
          
          {showSuggestions && (
            <div className="space-y-2">
              <p className="text-sm text-secondary-foreground">Popular habits:</p>
              <div className="flex flex-wrap gap-2">
                {SAMPLE_HABITS.slice(0, 6).map((suggestion, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    type="button"
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="text-xs"
                  >
                    <Plus className="w-3 h-3 mr-1" />
                    {suggestion.name}
                  </Button>
                ))}
              </div>
            </div>
          )}
          
          <Input
            label="Description (Optional)"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Add more details about your habit..."
          />
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Category</label>
            <div className="flex flex-wrap gap-2">
              {HABIT_CATEGORIES.map((category) => (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => setFormData({ ...formData, category: category.id })}
                  className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                    formData.category === category.id
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                  }`}
                >
                  <span className="mr-1">{category.icon}</span>
                  {category.name}
                </button>
              ))}
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Goal Type</label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, goalType: 'build' })}
                className={`flex-1 flex items-center justify-center px-4 py-3 rounded-md text-sm font-medium transition-colors ${
                  formData.goalType === 'build'
                    ? 'bg-accent text-accent-foreground'
                    : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                }`}
              >
                <Target className="w-4 h-4 mr-2" />
                Build Habit
              </button>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, goalType: 'break' })}
                className={`flex-1 flex items-center justify-center px-4 py-3 rounded-md text-sm font-medium transition-colors ${
                  formData.goalType === 'break'
                    ? 'bg-destructive text-destructive-foreground'
                    : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                }`}
              >
                <X className="w-4 h-4 mr-2" />
                Break Habit
              </button>
            </div>
          </div>
          
          <div className="flex gap-2 pt-4">
            <Button
              type="submit"
              className="flex-1"
              isLoading={isLoading}
            >
              {habit ? 'Update Habit' : 'Create Habit'}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={isLoading}
            >
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
