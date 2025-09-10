export interface Job {
  id: string;
  title: string;
  company: {
    name: string;
    logo: string;
    website?: string;
    linkedin?: string;
    twitter?: string;
  };
  location: {
    city: string;
    state: string;
    country: string;
    coordinates?: {
      latitude: number;
      longitude: number;
    };
  };
  jobType: JobType[];
  experienceLevel: ExperienceLevel;
  remote: boolean;
  publishedDate: string;
  applicationUrl: string;
  description: string;
  skills: string[];
  salary?: {
    min: number;
    max: number;
    currency: string;
  };
}

export type JobType = 'Full-time' | 'Part-time' | 'Contract' | 'Internship' | 'Freelance';
export type ExperienceLevel = 'Entry' | 'Mid' | 'Senior' | 'Lead' | 'Executive';

export interface JobFilters {
  jobTypes: JobType[];
  experienceLevel: ExperienceLevel | null;
  remote: boolean | null;
  location: string;
  search: string;
}

export interface JobsResponse {
  jobs: Job[];
  total: number;
  page: number;
  hasMore: boolean;
}