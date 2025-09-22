# HabitSphere - Base MiniApp

A gamified Base MiniApp that helps users build or break habits through streaks, rewards, and social connections.

## Features

### 🎯 Core Habit Tracking
- **Streak Tracking & Visualization**: Visual streak counters and calendar views for immediate feedback
- **Daily Check-ins**: Simple one-tap habit completion with instant streak updates
- **Habit Categories**: Organize habits by Health, Mindfulness, Productivity, Learning, and more
- **Goal Types**: Support for both building new habits and breaking bad ones

### 🏆 Gamification & Rewards
- **Points System**: Earn points for each completed habit day
- **Achievement Badges**: Unlock milestones like "Week Warrior" and "Century Club"
- **Streak Milestones**: Special rewards for 7, 30, 100+ day streaks
- **Progress Visualization**: Beautiful progress circles and charts

### 👥 Social Features
- **Friend System**: Connect with friends and view their public progress
- **Encouragement Messages**: Send motivational messages to friends
- **Group Challenges**: Join or create habit challenges with friends
- **Leaderboards**: Friendly competition within challenges

### 📊 Analytics & Insights
- **Personal Statistics**: Track total habits, longest streaks, and completion rates
- **Weekly Progress**: Visual progress tracking with percentage completion
- **Habit History**: Complete calendar view of your habit journey

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS with custom design system
- **Components**: Custom UI components with TypeScript
- **Base Integration**: MiniKit for Base App integration
- **Icons**: Lucide React for consistent iconography

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/habitsphere.git
cd habitsphere
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Add your environment variables:
```env
NEXT_PUBLIC_MINIKIT_API_KEY=your_minikit_api_key
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
habitsphere/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles and Tailwind
│   ├── layout.tsx         # Root layout with providers
│   ├── page.tsx           # Main dashboard page
│   ├── loading.tsx        # Loading UI
│   ├── error.tsx          # Error boundary
│   └── providers.tsx      # MiniKit provider setup
├── components/            # Reusable UI components
│   ├── ui/               # Base UI components
│   ├── habits/           # Habit-specific components
│   ├── social/           # Social feature components
│   ├── challenges/       # Challenge components
│   └── dashboard/        # Dashboard components
├── lib/                  # Utilities and types
│   ├── types.ts          # TypeScript type definitions
│   ├── utils.ts          # Utility functions
│   └── constants.ts      # App constants
└── public/               # Static assets
```

## Key Components

### Habit Management
- `HabitCard`: Individual habit display with streak info and actions
- `HabitForm`: Create/edit habit form with categories and goal types
- `StreakDisplay`: Visual streak counter with emoji indicators

### Social Features
- `FriendsList`: Display friends with their progress and encouragement options
- `ChallengeCard`: Challenge display with participation options

### UI Components
- `AppShell`: Main app layout wrapper
- `Card`: Flexible card component with variants
- `Button`: Consistent button component with multiple variants
- `ProgressCircle`: Animated circular progress indicator

## Data Model

### Core Entities
- **User**: Profile, friends, points, join date
- **Habit**: Name, description, category, goal type, streak data
- **HabitEntry**: Daily completion records
- **Challenge**: Group challenges with participants
- **Badge**: Achievement system

## Customization

### Design System
The app uses a comprehensive design system defined in `tailwind.config.ts`:
- **Colors**: Primary, accent, surface, and semantic colors
- **Typography**: Consistent text scales and weights
- **Spacing**: Standardized spacing scale
- **Animations**: Smooth transitions and micro-interactions

### Adding New Features
1. Define types in `lib/types.ts`
2. Create components in appropriate directories
3. Add constants to `lib/constants.ts`
4. Update the main page to integrate new features

## Deployment

### Base MiniApp Deployment
1. Build the application:
```bash
npm run build
```

2. Deploy to your hosting platform (Vercel, Netlify, etc.)

3. Update the manifest.json with your production URLs

4. Submit to Base App for review

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, email support@habitsphere.app or join our community Discord.

---

Built with ❤️ for the Base ecosystem
