export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  imageUrl?: string;
}

export interface Milestone {
  id: string;
  year: number;
  title: string;
  description: string;
}

export const teamMembers: TeamMember[] = [
  {
    id: 'fikri-hafizz',
    name: 'Fikri Hafizzadin Bin Abdul Hamid ',
    role: 'Lead Engineer & Pilot',
    bio: 'Fikri oversees the design and fabrication of our robot fleet while also piloting them in competition. With a background in mechanical engineering, he combines technical expertise with strategic driving to maximize our robots\' performance in the arena.',
    imageUrl: '/team/fikri.webp',
  },
  {
    id: 'hariiharahn-rajendran',
    name: 'Hariiharahn P. Rajendran',
    role: 'Mechanical & Electronics',
    bio: 'Hariiharahn is a dedicated engineer with a passion for building robots. He is responsible for the design and fabrication of our robot fleet. He is also responsible for the electronics systems of our robots.',
    imageUrl: '/team/harii.webp',
  },
  {
    id: 'willy-wong',
    name: 'Willy Wong',
    role: 'Mechanical & Battery',
    bio: 'Willy is a dedicated engineer with a passion for building robots. He is responsible for the design and fabrication of our robot fleet. He is also responsible for the battery systems of our robots.',
    imageUrl: '/team/willy.jpg',
  }
];

export const milestones: Milestone[] = [
  {
    id: 'founded-2019',
    year: 2019,
    title: 'Team Founded',
    description: 'Ragnarok Combat Robotics was established with a vision to compete at the highest levels of robot combat while promoting the sport to new audiences.',
  },
  {
    id: 'first-competition-2021',
    year: 2021,
    title: 'Competition Debut',
    description: 'Made our competitive debut at YRoboC21 in IKM Johor Bahru, marking the beginning of our journey in Malaysian combat robotics.',
  },
  {
    id: 'continued-growth-2022',
    year: 2022,
    title: 'Continued Competition',
    description: 'Participated in YRoboc22 at IKM Johor Bahru, building experience and refining our robot designs through active competition.',
  },
  {
    id: 'multiple-events-2023',
    year: 2023,
    title: 'Expanded Participation',
    description: 'Competed in multiple events including Robot Tempur 2023 and Robot Tempur Bergu 2023, expanding our competitive experience across different tournament formats.',
  },
  {
    id: 'venue-expansion-2024',
    year: 2024,
    title: 'Venue Expansion',
    description: 'Expanded competition presence to TARUMT, participating in YRoboC24, Robot Tempur 2024, and IIT Techfest 2024, establishing our presence at new venues.',
  },
  {
    id: 'future-2025',
    year: 2025,
    title: 'Looking Forward',
    description: 'Continuing our competitive journey with YRoboC25 and Robot Tempur (3lb) 2025, while developing Project HADES for future competition seasons.',
  },
];

export const teamInfo = {
  name: 'Ragnarok Combat Robotics',
  founded: 2019,
  location: 'San Francisco Bay Area, California',
  mission: 'To push the boundaries of combat robotics through innovative engineering, strategic competition, and passionate dedication to the sport.',
  philosophy: 'We believe in the power of iterative design, rigorous testing, and learning from both victories and defeats. Every competition teaches us something new, and we apply those lessons to build better, more effective robots.',
};
