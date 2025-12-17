export interface Competition {
  slug: string;
  name: string;
  date: string;
  location: string;
  organizer: string;
  robotsEntered: string[];
  results: { robotSlug: string; placement: string; wins: number; losses: number }[];
  description: string;
  videoIds?: string[];
}

export const competitions: Competition[] = [
  {
    slug: 'robot-tempur-3lb-2025',
    name: 'Robot Tempur (3lb) 2025',
    date: '2025-01-01',
    location: 'Private',
    organizer: 'Private',
    robotsEntered: [],
    results: [],
    description: 'Private competition event.',
  },
  {
    slug: 'yroboc25',
    name: 'YRoboC25',
    date: '2025-07-01',
    location: 'Private',
    organizer: 'Private',
    robotsEntered: [],
    results: [],
    description: 'Private competition event.',
  },
  {
    slug: 'iit-techfest-2024',
    name: 'IIT Techfest 2024',
    date: '2024-12-01',
    location: 'Tarumt',
    organizer: 'IIT Techfest',
    robotsEntered: [],
    results: [],
    description: 'Competition held at Tarumt.',
  },
  {
    slug: 'robot-tempur-2024',
    name: 'Robot Tempur 2024',
    date: '2024-09-01',
    location: 'Tarumt',
    organizer: 'Robot Tempur',
    robotsEntered: [],
    results: [],
    description: 'Competition held at Tarumt.',
  },
  {
    slug: 'yroboc24',
    name: 'YRoboC24',
    date: '2024-07-01',
    location: 'Tarumt',
    organizer: 'YRoboC',
    robotsEntered: [],
    results: [],
    description: 'Competition held at Tarumt.',
  },
  {
    slug: 'robot-tempur-bergu-2023',
    name: 'Robot Tempur Bergu 2023',
    date: '2023-11-01',
    location: 'Tarumt',
    organizer: 'Robot Tempur',
    robotsEntered: [],
    results: [],
    description: 'Competition held at Tarumt.',
  },
  {
    slug: 'robot-tempur-2023',
    name: 'Robot Tempur 2023',
    date: '2023-08-01',
    location: 'IKM Johor Bahru',
    organizer: 'Robot Tempur',
    robotsEntered: [],
    results: [],
    description: 'Competition held at IKM Johor Bahru.',
  },
  {
    slug: 'yroboc22',
    name: 'YRoboc22',
    date: '2022-07-01',
    location: 'IKM Johor Bahru',
    organizer: 'YRoboC',
    robotsEntered: [],
    results: [],
    description: 'Competition held at IKM Johor Bahru.',
  },
  {
    slug: 'yroboc21',
    name: 'YRoboC21',
    date: '2021-11-01',
    location: 'IKM Johor Bahru',
    organizer: 'YRoboC',
    robotsEntered: [],
    results: [],
    description: 'Competition held at IKM Johor Bahru.',
  },
];

export function getCompetitionBySlug(slug: string): Competition | undefined {
  return competitions.find((comp) => comp.slug === slug);
}

export function getAllCompetitionSlugs(): string[] {
  return competitions.map((comp) => comp.slug);
}

export function getCompetitionStats() {
  const totalCompetitions = competitions.length;

  let totalWins = 0;
  let totalLosses = 0;
  let firstPlaceCount = 0;

  competitions.forEach((comp) => {
    comp.results.forEach((result) => {
      totalWins += result.wins;
      totalLosses += result.losses;
      if (result.placement === '1st Place') {
        firstPlaceCount++;
      }
    });
  });

  return {
    totalCompetitions,
    totalWins,
    totalLosses,
    firstPlaceCount,
    winRate: totalWins + totalLosses > 0 ? Math.round((totalWins / (totalWins + totalLosses)) * 100) : 0,
  };
}
