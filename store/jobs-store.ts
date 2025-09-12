import { create } from "zustand";
import { persist } from "zustand/middleware";
import { JobFilters } from "@/types/job";

interface JobsStore {
  filters: JobFilters;
  setFilters: (filters: Partial<JobFilters>) => void;
  resetFilters: () => void;

  savedJobs: string[];
  saveJob: (jobId: string) => void;
  unsaveJob: (jobId: string) => void;
  isJobSaved: (jobId: string) => boolean;

  viewMode: "grid" | "list";
  setViewMode: (mode: "grid" | "list") => void;

  sortBy: "date" | "company" | "relevance";
  setSortBy: (sort: "date" | "company" | "relevance") => void;
}

const defaultFilters: JobFilters = {
  jobTypes: [],
  experienceLevel: null,
  remote: null,
  location: "",
  search: "",
};

export const useJobsStore = create<JobsStore>()(
  persist(
    (set, get) => ({
      filters: { ...defaultFilters },
      setFilters: (newFilters) =>
        set((state) => ({ filters: { ...state.filters, ...newFilters } })),
      resetFilters: () => set({ filters: { ...defaultFilters } }),

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

      viewMode: "grid",
      setViewMode: (mode) => set({ viewMode: mode }),

      sortBy: "date",
      setSortBy: (sort) => set({ sortBy: sort }),
    }),
    {
      name: "JackCareers-storage",
      partialize: (state) => ({
        savedJobs: state.savedJobs,
        viewMode: state.viewMode,
        sortBy: state.sortBy,
      }),
    }
  )
);
