import { AppShell } from '@/components/ui/AppShell';

export default function Loading() {
  return (
    <AppShell>
      <div className="animate-pulse space-y-6">
        {/* Header skeleton */}
        <div className="space-y-4">
          <div className="h-8 bg-secondary rounded w-3/4"></div>
          <div className="h-4 bg-secondary rounded w-1/2"></div>
        </div>
        
        {/* Stats skeleton */}
        <div className="bg-surface rounded-lg p-6 border border-border">
          <div className="grid grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="text-center space-y-2">
                <div className="h-8 bg-secondary rounded w-16 mx-auto"></div>
                <div className="h-4 bg-secondary rounded w-20 mx-auto"></div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Navigation skeleton */}
        <div className="flex space-x-1 bg-secondary rounded-lg p-1">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex-1 h-10 bg-secondary rounded"></div>
          ))}
        </div>
        
        {/* Content skeleton */}
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-surface rounded-lg p-6 border border-border">
              <div className="space-y-3">
                <div className="h-6 bg-secondary rounded w-1/3"></div>
                <div className="h-4 bg-secondary rounded w-2/3"></div>
                <div className="h-4 bg-secondary rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
