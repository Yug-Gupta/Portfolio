export interface SocialLinks {
  github?: string;
  linkedin?: string;
  twitter?: string;
  email?: string;
  medium?: string;
  website?: string;
}

export interface UserStat {
  label: string;
  value: string;
  description: string;
}

export interface UserProfile {
  name: string;
  title: string;
  tagline: string;
  location: string;
  email: string;
  phone?: string;
  availability: 'Available for full-time' | 'Open to consulting' | 'Booked';
  bioParagraphs: string[];
  stats: UserStat[];
  socialLinks: SocialLinks;
  resumeDownloadUrl?: string;
  interests: string[];
}

export type ProjectCategory = 'All' | 'Full Stack' | 'Cloud & Systems' | 'AI & Tools' | 'Web & UI';

export interface Project {
  id: string;
  title: string;
  tagline: string;
  category: 'Full Stack' | 'Cloud & Systems' | 'AI & Tools' | 'Web & UI';
  description: string;
  fullDescription: string;
  technologies: string[];
  features: string[];
  metrics?: { label: string; value: string }[];
  demoUrl?: string;
  githubUrl?: string;
  featured: boolean;
  year: string;
  role?: string;
}

export interface Skill {
  name: string;
  level: number; // 1 to 100
  category: string;
  experienceYears: string;
  isKey?: boolean;
}

export interface SkillCategory {
  title: string;
  description: string;
  skills: Skill[];
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  companyUrl?: string;
  location: string;
  period: string;
  type: 'Full-time' | 'Contract' | 'Open Source' | 'Internship' | 'Leadership';
  description: string;
  highlights: string[];
  technologies: string[];
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  location: string;
  period: string;
  details?: string;
  grade?: string;
  description?: string;
  achievements?: string[];
}
