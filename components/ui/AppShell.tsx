'use client';

import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface AppShellProps {
  children: ReactNode;
  className?: string;
  variant?: 'default';
}

export function AppShell({ children, className, variant = 'default' }: AppShellProps) {
  return (
    <div className={cn(
      'min-h-screen bg-background',
      variant === 'default' && 'container py-4',
      className
    )}>
      <div className="animate-fade-in">
        {children}
      </div>
    </div>
  );
}
