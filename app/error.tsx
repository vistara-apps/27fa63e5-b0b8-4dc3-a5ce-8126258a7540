'use client';

import { useEffect } from 'react';
import { AppShell } from '@/components/ui/AppShell';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { AlertTriangle, RefreshCw } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('HabitSphere Error:', error);
  }, [error]);

  return (
    <AppShell>
      <div className="min-h-[60vh] flex items-center justify-center">
        <Card className="max-w-md w-full">
          <CardContent className="p-8 text-center">
            <AlertTriangle className="w-12 h-12 text-destructive mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Something went wrong!
            </h2>
            <p className="text-secondary-foreground mb-6">
              We encountered an error while loading your habits. Don't worry, your data is safe.
            </p>
            <div className="space-y-3">
              <Button onClick={reset} className="w-full">
                <RefreshCw className="w-4 h-4 mr-2" />
                Try again
              </Button>
              <Button 
                variant="outline" 
                onClick={() => window.location.href = '/'}
                className="w-full"
              >
                Go to Home
              </Button>
            </div>
            {error.digest && (
              <p className="text-xs text-secondary-foreground mt-4">
                Error ID: {error.digest}
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
