import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'HabitSphere - Forge lasting habits',
  description: 'A gamified Base MiniApp that helps users build or break habits through streaks, rewards, and social connections.',
  openGraph: {
    title: 'HabitSphere',
    description: 'Forge lasting habits, powered by community and gamification.',
    images: ['/og-image.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
