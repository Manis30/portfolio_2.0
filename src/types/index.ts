export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  longDescription?: string;
  technologies: string[];
  image: string;
  liveUrl?: string;
  githubUrl?: string;
  demoUrl?: string;
  isDomoRequestOnly?: boolean;
  highlights?: string[];
  features?: string[];
  workflowSteps?: string[];
  problem?: string;
  solution?: string;
  architecture?: string;
  modules?: { name: string; description: string }[];
  featured?: boolean;
}

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  period: string;
  description: string;
  trainingAreas?: {
    category: string;
    skills: string;
  }[];
  highlights?: string[];
  certificateUrl?: string;
}

export interface TechCategory {
  title: string;
  skills: string[];
}

export interface EducationItem {
  id: string;
  title: string;
  institution: string;
  period?: string;
  score: string;
  details?: string;
  isPrimary?: boolean;
}

export interface AchievementItem {
  id: string;
  metric: string;
  title: string;
  subtitle?: string;
  link?: string;
  linkLabel?: string;
  certificateImage?: string;
}
