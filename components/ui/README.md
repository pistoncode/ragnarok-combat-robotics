# UI Components

Core reusable UI components for the Ragnarok Combat Robotics website.

## Components

### Button
Primary, secondary, and ghost button variants with hover effects and glow.

```tsx
import { Button } from '@/components/ui';

<Button variant="primary">Click Me</Button>
<Button variant="secondary" size="lg">Large Button</Button>
<Button variant="ghost" size="sm">Small Ghost</Button>
```

### Card
Reusable card with hover lift and glow effect.

```tsx
import { Card } from '@/components/ui';

<Card>
  <h3>Card Title</h3>
  <p>Card content goes here...</p>
</Card>

<Card hoverable={false}>Static card without hover effect</Card>
```

### Badge
Badges for weight classes and status indicators.

```tsx
import { Badge, WeightClassBadge, StatusBadge } from '@/components/ui';

<WeightClassBadge weightClass="Beetleweight" />
<WeightClassBadge weightClass="Featherweight" />
<StatusBadge status="Active" />
<StatusBadge status="Retired" />
<Badge variant="default">Custom Badge</Badge>
```

### SectionHeader
Consistent section titles with optional subtitles.

```tsx
import { SectionHeader } from '@/components/ui';

<SectionHeader
  title="Our Robots"
  subtitle="Competition-ready combat machines"
  align="center"
/>
```

### StatCard
Card for displaying statistics with animated number counter.

```tsx
import { StatCard } from '@/components/ui';

<StatCard label="Total Fights" value={150} />
<StatCard label="Win Rate" value={75} suffix="%" />
<StatCard label="Budget" value={5000} prefix="$" duration={3} />
```

### VideoEmbed
YouTube embed wrapper component.

```tsx
import { VideoEmbed } from '@/components/ui';

<VideoEmbed
  videoId="dQw4w9WgXcQ"
  title="Robot Combat Video"
/>
```

### ImagePlaceholder
Styled placeholder for missing images.

```tsx
import { ImagePlaceholder } from '@/components/ui';

<ImagePlaceholder label="Robot Image Coming Soon" />
<ImagePlaceholder iconSize={64} />
```

## Styling

All components use CSS custom properties defined in `app/globals.css`:

- `--bg-primary`: Primary background color
- `--bg-secondary`: Secondary background color
- `--accent-primary`: Primary accent color
- `--accent-hover`: Hover state accent color
- `--accent-glow`: Glow effect color
- `--text-primary`: Primary text color
- `--text-secondary`: Secondary text color
- `--text-muted`: Muted text color
- `--border`: Border color

## TypeScript

All components are fully typed with TypeScript and export their prop interfaces for use in your application.
