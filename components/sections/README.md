# Home Page Section Components

This directory contains all the section components for the Ragnarok Combat Robotics website home page.

## Components

### 1. Hero.tsx
Full viewport hero section with:
- Large animated tagline: "Engineering Victory"
- Subtitle with team description
- Primary CTA: "Partner With Us" (mailto:sponsor@ragnarok.com)
- Secondary CTA: "View Our Robots" (links to /robots)
- Framer Motion text reveal animations
- Scroll indicator

**Usage:**
```tsx
import { Hero } from '@/components/sections';

<Hero />
```

### 2. Stats.tsx
Horizontal stats bar displaying:
- Competitions: 15+
- Win Rate: 78%
- Weight Classes: 4
- Years Active: 5+

Features:
- CountUp animation for numbers
- Horizontal scroll on mobile
- Monospace font for numbers
- Icons for each stat

**Usage:**
```tsx
import { Stats } from '@/components/sections';

<Stats />
```

### 3. FeaturedRobot.tsx
Showcase section for the flagship robot:
- Large card with parallax hover effect
- Robot name, weight class badge
- Win/loss record
- Quick specs (weapon, drive, armor)
- "View Full Specs" link
- Uses first robot from lib/data/robots

**Usage:**
```tsx
import { FeaturedRobot } from '@/components/sections';

<FeaturedRobot />
```

### 4. CompetitionHighlights.tsx
Recent competition carousel:
- Shows 3 most recent competitions
- Cards with event name, date, location
- Results summary with placement badges
- Video thumbnail placeholder
- Horizontal scroll/carousel on mobile

**Usage:**
```tsx
import { CompetitionHighlights } from '@/components/sections';

<CompetitionHighlights />
```

### 5. SponsorCTA.tsx
"Why Partner With Ragnarok?" section:
- Grid of 4 value proposition cards:
  - Arena Exposure
  - Social Reach
  - Event Presence
  - Engineering Excellence
- Prominent email CTA button
- Hover effects on cards

**Usage:**
```tsx
import { SponsorCTA } from '@/components/sections';

<SponsorCTA />
```

## Complete Home Page Example

```tsx
import {
  Hero,
  Stats,
  FeaturedRobot,
  CompetitionHighlights,
  SponsorCTA,
} from '@/components/sections';

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Stats />
      <FeaturedRobot />
      <CompetitionHighlights />
      <SponsorCTA />
    </main>
  );
}
```

## Design Features

All components include:
- TypeScript interfaces for type safety
- "use client" directive where needed (Hero, Stats, FeaturedRobot, CompetitionHighlights, SponsorCTA)
- Tailwind CSS styling using design system colors
- Framer Motion animations
- Lucide React icons
- Responsive design (mobile-first)
- Proper accessibility considerations

## Dependencies

These components use:
- `framer-motion` - animations
- `lucide-react` - icons
- `@/components/animations/CountUp` - number animations
- `@/components/animations/ParallaxCard` - 3D hover effects
- `@/components/ui/Button` - button component
- `@/components/ui/Badge` - badge components
- `@/components/ui/Card` - card component
- `@/lib/data/robots` - robot data
- `@/lib/data/competitions` - competition data

## Data Sources

Components fetch data from:
- `/lib/data/robots.ts` - Robot information
- `/lib/data/competitions.ts` - Competition results
