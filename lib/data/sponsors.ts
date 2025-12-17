export interface Sponsor {
  id: string;
  name: string;
  tier: 'Platinum' | 'Gold' | 'Silver';
  logoUrl?: string;
  website?: string;
  description?: string;
}

export interface SponsorTier {
  name: string;
  benefits: string[];
  color: string;
  amount: string;
}

export interface SponsorshipImpactItem {
  category: string;
  percentage: number;
  description: string;
  color: string;
}

export const sponsors: Sponsor[] = [
  {
    id: 'techforge',
    name: 'TechForge Manufacturing',
    tier: 'Platinum',
    logoUrl: '/sponsors/techforge.png',
    website: 'https://techforge.example.com',
    description: 'Providing precision CNC machining and rapid prototyping services for all our robot builds.',
  },
  {
    id: 'titanmetals',
    name: 'Titan Metals Co.',
    tier: 'Platinum',
    logoUrl: '/sponsors/titanmetals.png',
    website: 'https://titanmetals.example.com',
    description: 'Supplying high-grade titanium and specialty alloys for our armor and weapon systems.',
  },
  {
    id: 'velocity',
    name: 'Velocity Batteries',
    tier: 'Gold',
    logoUrl: '/sponsors/velocity.png',
    website: 'https://velocitybatteries.example.com',
    description: 'High-performance LiPo batteries that power our combat robots.',
  },
  {
    id: 'precisioncnc',
    name: 'Precision CNC Solutions',
    tier: 'Gold',
    logoUrl: '/sponsors/precisioncnc.png',
    website: 'https://precisioncnc.example.com',
    description: 'Custom machined components with tolerances under 0.001".',
  },
  {
    id: 'sparkmotors',
    name: 'SparkMotors Inc.',
    tier: 'Gold',
    logoUrl: '/sponsors/sparkmotors.png',
    website: 'https://sparkmotors.example.com',
  },
  {
    id: 'armorplate',
    name: 'ArmorPlate Technologies',
    tier: 'Silver',
    logoUrl: '/sponsors/armorplate.png',
    website: 'https://armorplate.example.com',
  },
  {
    id: 'robotools',
    name: 'RoboTools Supply',
    tier: 'Silver',
    logoUrl: '/sponsors/robotools.png',
    website: 'https://robotools.example.com',
  },
  {
    id: 'carboncomp',
    name: 'Carbon Composites LLC',
    tier: 'Silver',
    logoUrl: '/sponsors/carboncomp.png',
    website: 'https://carboncomposites.example.com',
  },
];

export const sponsorTiers: SponsorTier[] = [
  {
    name: 'Platinum',
    benefits: [
      'Prominent logo placement on all robots',
      'Featured sponsor section on website',
      'Social media promotion and shoutouts',
      'VIP pit access at all competitions',
      'Monthly progress updates and behind-the-scenes content',
      'Custom robot demonstration at sponsor events',
    ],
    color: 'from-slate-300 to-slate-500',
    amount: '$5,000+',
  },
  {
    name: 'Gold',
    benefits: [
      'Logo placement on select robots',
      'Sponsor page listing with description',
      'Social media mentions',
      'Pit access at competitions',
      'Quarterly team updates',
    ],
    color: 'from-yellow-400 to-yellow-600',
    amount: '$2,500+',
  },
  {
    name: 'Silver',
    benefits: [
      'Logo on team banner and website',
      'Sponsor page listing',
      'Annual team newsletter',
      'General admission to team events',
    ],
    color: 'from-gray-300 to-gray-500',
    amount: '$1,000+',
  },
];

export const sponsorshipInfo = {
  description: 'Ragnarok Combat Robotics relies on the generous support of our sponsors to compete at the highest levels. Our sponsors provide materials, machining services, components, and financial support that make our ambitious designs possible.',
  contactEmail: 'sponsors@ragnarokcr.com',
  benefits: 'Sponsors gain exposure to a passionate community of engineers, makers, and robotics enthusiasts, while supporting the growth of combat robotics as a sport and educational platform.',
};

export const sponsorshipImpact: SponsorshipImpactItem[] = [
  {
    category: 'Materials & Parts',
    percentage: 40,
    description: 'High-grade metals, motors, electronics, and components for robot construction.',
    color: 'bg-[var(--accent-primary)]',
  },
  {
    category: 'Competition Fees',
    percentage: 25,
    description: 'Event registration, travel, and accommodation for competitions.',
    color: 'bg-blue-500',
  },
  {
    category: 'Tools & Equipment',
    percentage: 20,
    description: 'CNC time, 3D printing, welding equipment, and workshop supplies.',
    color: 'bg-green-500',
  },
  {
    category: 'Team Operations',
    percentage: 15,
    description: 'Safety gear, training, documentation, and community outreach.',
    color: 'bg-purple-500',
  },
];
