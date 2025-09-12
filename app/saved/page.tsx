'use client';

import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Briefcase } from 'lucide-react';
import { JobCard } from '@/components/jobs/JobCard';
import { useJobsStore } from '@/store/jobs-store';
import { jobsApi } from '@/lib/api';

export default function SavedJobsPage() {
  const { savedJobs, viewMode } = useJobsStore();

  const { data: allJobs } = useQuery({
    queryKey: ['all-jobs-for-saved'],
    queryFn: () => jobsApi.getJobs({ search: '', jobTypes: [], experienceLevel: null, remote: null, location: '' }, 1),
    select: (data) => data.jobs.filter(job => savedJobs.includes(job.id)),
  });

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* <div className="flex items-center gap-4">
        <Link href="/">
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Jobs
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">Saved Jobs</h1>
      </div> */}
      <div className="relative flex items-center">
        <Link href="/">
          <Button variant="outline" size="sm" className="w-fit">
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden xs:inline">Back to Jobs</span>
            <span className="xs:hidden">Back</span>
          </Button>
        </Link>
        <h1 className="absolute left-1/2 -translate-x-1/2 text-xl sm:text-2xl font-bold">
          Saved Jobs
        </h1>
      </div>

      {savedJobs.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 space-y-4">
          <Briefcase className="h-16 w-16 text-muted-foreground" />
          <div className="text-center">
            <h3 className="text-lg font-semibold">No saved jobs yet</h3>
            <p className="text-muted-foreground">
              Start browsing jobs and save the ones you are interested in
            </p>
          </div>
          <Link href="/">
            <Button>Browse Jobs</Button>
          </Link>
        </div>
      ) : (
        <>
          <div className="text-sm text-muted-foreground">
            {savedJobs.length} saved job{savedJobs.length !== 1 ? 's' : ''}
          </div>
          
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
            {allJobs?.map((job) => (
              <JobCard key={job.id} job={job} variant="grid" />
            ))}
          </div>
        </>
      )}
    </div>
  );
}