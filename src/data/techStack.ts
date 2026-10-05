export type TechCategory = 'frontend' | 'backend' | 'database' | 'devops' | 'language' | 'architecture';

export interface TechNodeItem {
  id: string;
  name: string;
  category: TechCategory;
  color: string;
  position: [number, number, number]; // [x, y, z] in 3D units
  speed: number;
  phase: number;
}

// 9 Technologies arranged in an organic orbital system around the core.
// Calibrated strictly within |x| <= 1.35 and |y| <= 1.85 so that no node ever crosses
// or touches viewport boundaries, even on 1280px or 1366px screens.
export const HERO_TECH_NODES: TechNodeItem[] = [
  // 1. TypeScript (Top Apex)
  {
    id: 'ts',
    name: 'TypeScript',
    category: 'language',
    color: '#3178C6',
    position: [0.0, 1.55, -0.1],
    speed: 0.35,
    phase: 0.0,
  },
  // 2. React (Upper Left)
  {
    id: 'react',
    name: 'React',
    category: 'frontend',
    color: '#61DAFB',
    position: [-1.30, 0.95, 0.25],
    speed: 0.32,
    phase: 1.2,
  },
  // 3. Node.js (Upper Right)
  {
    id: 'node',
    name: 'Node.js',
    category: 'backend',
    color: '#68A063',
    position: [1.30, 0.95, 0.25],
    speed: 0.34,
    phase: 2.1,
  },
  // 4. REST API (Mid-Left Inner)
  {
    id: 'api',
    name: 'REST API',
    category: 'architecture',
    color: '#A855F7',
    position: [-0.95, 0.20, -0.25],
    speed: 0.28,
    phase: 3.3,
  },
  // 5. Express.js (Mid-Right Inner)
  {
    id: 'express',
    name: 'Express.js',
    category: 'backend',
    color: '#E4E4E7',
    position: [0.95, 0.20, -0.25],
    speed: 0.30,
    phase: 4.2,
  },
  // 6. Git (Lower Left)
  {
    id: 'git',
    name: 'Git',
    category: 'devops',
    color: '#F05032',
    position: [-1.30, -0.65, 0.2],
    speed: 0.36,
    phase: 1.8,
  },
  // 7. MongoDB (Lower Right)
  {
    id: 'mongo',
    name: 'MongoDB',
    category: 'database',
    color: '#22C55E',
    position: [1.30, -0.65, -0.15],
    speed: 0.32,
    phase: 3.8,
  },
  // 8. Docker (Bottom Center-Left)
  {
    id: 'docker',
    name: 'Docker',
    category: 'devops',
    color: '#38BDF8',
    position: [-0.40, -1.45, 0.2],
    speed: 0.34,
    phase: 0.8,
  },
  // 9. Appwrite (Bottom Center-Right Outer)
  {
    id: 'appwrite',
    name: 'Appwrite',
    category: 'backend',
    color: '#FD366E',
    position: [0.55, -1.85, -0.1],
    speed: 0.30,
    phase: 2.8,
  },
];

// Dedicated 6-node set for Mobile (<768px): zero collisions, guaranteed inside bounds
export const MOBILE_HERO_NODES = [
  { id: 'ts', name: 'TypeScript', angle: -Math.PI / 2, dist: 98 },
  { id: 'react', name: 'React', angle: -Math.PI * 0.82, dist: 104 },
  { id: 'node', name: 'Node.js', angle: -Math.PI * 0.18, dist: 104 },
  { id: 'api', name: 'REST API', angle: Math.PI * 0.95, dist: 96 },
  { id: 'git', name: 'Git', angle: Math.PI * 0.65, dist: 100 },
  { id: 'mongo', name: 'MongoDB', angle: Math.PI * 0.30, dist: 100 },
];
