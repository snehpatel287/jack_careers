import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Job, JobFilters, JobType, ExperienceLevel } from '@/types/job';

interface JobsStore {
  // Filters
  filters: JobFilters;
  setFilters: (filters: Partial<JobFilters>) => void;
  resetFilters: () => void;
  
  // Saved jobs
  savedJobs: string[];
  saveJob: (jobId: string) => void;
  unsaveJob: (jobId: string) => void;
  isJobSaved: (jobId: string) => boolean;
  
  // UI State
  viewMode: 'grid' | 'list';
  setViewMode: (mode: 'grid' | 'list') => void;
  
  // Sort
  sortBy: 'date' | 'company' | 'relevance';
  setSortBy: (sort: 'date' | 'company' | 'relevance') => void;
}

const defaultFilters: JobFilters = {
  jobTypes: [],
  experienceLevel: null,
  remote: null,
  location: '',
  search: '',
};

export const useJobsStore = create<JobsStore>()(
  persist(
    (set, get) => ({
      // Filters
      filters: defaultFilters,
      setFilters: (newFilters) =>
        set((state) => ({
          filters: { ...state.filters, ...newFilters },
        })),
      resetFilters: () => set({ filters: defaultFilters }),

      // Saved jobs
      savedJobs: [],
      saveJob: (jobId) =>
        set((state) => ({
          savedJobs: state.savedJobs.includes(jobId) 
            ? state.savedJobs 
            : [...state.savedJobs, jobId],
        })),
      unsaveJob: (jobId) =>
        set((state) => ({
          savedJobs: state.savedJobs.filter((id) => id !== jobId),
        })),
      isJobSaved: (jobId) => get().savedJobs.includes(jobId),

      // UI State
      viewMode: 'grid',
      setViewMode: (mode) => set({ viewMode: mode }),

      // Sort
      sortBy: 'date',
      setSortBy: (sort) => set({ sortBy: sort }),
    }),
    {
      name: 'Jack Careers-storage',
      partialize: (state) => ({
        savedJobs: state.savedJobs,
        viewMode: state.viewMode,
        sortBy: state.sortBy,
      }),
    }
  )
);