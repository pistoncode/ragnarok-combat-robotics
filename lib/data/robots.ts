export interface Robot {
  slug: string;
  name: string;
  weightClass: 'Beetleweight' | 'Hobbyweight' | 'Featherweight' | 'Middleweight';
  status: 'Active' | 'Retired';
  archetype: string;
  wins: number;
  losses: number;
  weight: string;
  materials: string[];
  description: string;
  specs: { label: string; value: string }[];
  imageUrl?: string;
}

export const robots: Robot[] = [
  {
    slug: 'long',
    name: 'Long (龙)',
    weightClass: 'Featherweight',
    status: 'Active',
    archetype: 'Vertical Spinner',
    wins: 12,
    losses: 0,
    weight: '30 lbs/16 kg',
    materials: ['7075 Aluminum', 'Hardened Steel', 'UHMW Polyethylene'],
    description: 'Taking its name from the mythical Chinese dragon, Long (龙) is a fierce vertical spinner designed for power and agility. This featherweight combines precision engineering and relentless aggression to deliver electrifying performances in the arena.',
    specs: [
      { label: 'Weapon Speed', value: '8,000 RPM' },
      { label: 'Motor', value: 'Scorpion SII-2206-2150KV' },
      { label: 'Battery', value: '4S 850mAh LiPo' },
      { label: 'Drive System', value: 'Quad Gearmotors Drive' },
      { label: 'Blade Material', value: 'Hardened Steel' },
      { label: 'Top Speed', value: '8 mph' },
    ],
    imageUrl: '/robots/long.png',
  },
  {
    slug: 'ace',
    name: 'ACE',
    weightClass: 'Featherweight',
    status: 'Retired',
    archetype: 'Horizontal Spinner',
    wins: 18,
    losses: 5,
    weight: '30 lbs/16 kg',
    materials: ['Titanium', 'AR500 Steel', 'Carbon Fiber'],
    description: 'ACE soars into battle with a powerful horizontal spinner that launches opponents into the air. This featherweight combines speed, power, and precision engineering to dominate the competition.',
    specs: [
      { label: 'Weapon Speed', value: '10,000 RPM' },
      { label: 'Motor', value: 'Turnigy SK3-4250-450KV' },
      { label: 'Battery', value: '6S 2200mAh LiPo' },
      { label: 'Drive System', value: 'Dual Fingertech SILVER SPARK Motors' },
      { label: 'Drum Material', value: 'AR500 Steel' },
      { label: 'Top Speed', value: '12 mph' },
    ],
    imageUrl: '/robots/ace.jpg',
  },
  {
    slug: 'reze',
    name: 'REZE',
    weightClass: 'Beetleweight',
    status: 'Active',
    archetype: 'Vertical Lifter',
    wins: 3,
    losses: 1,
    weight: '3lbs/1.5kg',
    materials: ['6061 Aluminum', 'Hardened Steel', 'TPU'],
    description: 'REZE is a beetleweight vertical lifter designed to lift opponents into the air. This beetleweight is designed to be fast and agile, with a focus on lifting opponents into the air.',
    specs: [
      { label: 'Lifting Force', value: '1000 lbs' },
      { label: 'Motor', value: 'Turnigy D3530-1700KV' },
      { label: 'Battery', value: '4S 1500mAh LiPo' },
      { label: 'Drive System', value: 'Dual N20 Motors' },
      { label: 'Lifting Speed', value: '10 mph' },
    ],
    imageUrl: '/robots/reze.png',
  },
  // {
  //   slug: 'odin',
  //   name: 'Odin',
  //   weightClass: 'Middleweight',
  //   status: 'Retired',
  //   archetype: 'Wedge',
  //   wins: 15,
  //   losses: 8,
  //   weight: '120 lbs',
  //   materials: ['Titanium', 'AR500 Steel', 'Aluminum'],
  //   description: 'The All-Father of our fleet, Odin was a strategic wedge bot designed to control fights through superior driving and armor. Though now retired, this middleweight paved the way for our current competitive robots.',
  //   specs: [
  //     { label: 'Armor Thickness', value: '0.5 inch AR500' },
  //     { label: 'Motor', value: 'Dual AmpFlow A28-400' },
  //     { label: 'Battery', value: '8S 5000mAh LiPo' },
  //     { label: 'Top Speed', value: '15 mph' },
  //     { label: 'Wedge Angle', value: '15 degrees' },
  //     { label: 'Traction', value: 'Custom foam tires' },
  //   ],
  //   imageUrl: '/robots/odin.jpg',
  // },
  // {
  //   slug: 'loki',
  //   name: 'Loki',
  //   weightClass: 'Beetleweight',
  //   status: 'Active',
  //   archetype: 'Vertical Spinner',
  //   wins: 6,
  //   losses: 4,
  //   weight: '3 lbs',
  //   materials: ['Carbon Fiber', 'Hardened Steel', 'HDPE'],
  //   description: 'True to its namesake, Loki is unpredictable and crafty. This compact vertical spinner uses unconventional geometry and aggressive driving to outmaneuver opponents.',
  //   specs: [
  //     { label: 'Weapon Speed', value: '18,000 RPM' },
  //     { label: 'Motor', value: 'Scorpion SII-2205-2350KV' },
  //     { label: 'Battery', value: '4S 650mAh LiPo' },
  //     { label: 'Drive System', value: 'Dual N20 High-Speed Motors' },
  //     { label: 'Blade Design', value: 'Asymmetric Twin Bar' },
  //     { label: 'Weight Distribution', value: '60% Weapon' },
  //   ],
  //   imageUrl: '/robots/loki.jpg',
  // },
];

export function getRobotBySlug(slug: string): Robot | undefined {
  return robots.find((robot) => robot.slug === slug);
}

export function getRobotsByWeightClass(weightClass: string): Robot[] {
  if (weightClass === 'All') return robots;
  return robots.filter((robot) => robot.weightClass === weightClass);
}

export function getRobotsByStatus(status: string): Robot[] {
  if (status === 'All') return robots;
  return robots.filter((robot) => robot.status === status);
}
