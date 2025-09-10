'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertCircle, Loader2 } from 'lucide-react';
import { JobCard } from './JobCard';
import { JobCardSkeleton } from './JobCardSkeleton';
import { useJobsStore } from '@/store/jobs-store';
import { jobsApi } from '@/lib/api';
import { cn } from '@/lib/utils';

export function JobsList() {
  const { filters, viewMode, sortBy, setSortBy } = useJobsStore();
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useInfiniteQuery({
    queryKey: ['jobs', filters, sortBy],
    queryFn: ({ pageParam = 1 }) => jobsApi.getJobs(filters, pageParam),
    getNextPageParam: (lastPage) => lastPage.hasMore ? lastPage.page + 1 : undefined,
    initialPageParam: 1,
  });

  // Auto-load more when user scrolls to bottom
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const allJobs = data?.pages.flatMap((page) => page.jobs) || [];
  const totalJobs = data?.pages[0]?.total || 0;

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="h-6 w-48 bg-muted animate-pulse rounded" />
          <div className="h-10 w-48 bg-muted animate-pulse rounded" />
        </div>
        <div className={cn(
          "grid gap-6",
          viewMode === 'grid' 
            ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-3" 
            : "grid-cols-1"
        )}>
          {Array.from({ length: 9 }).map((_, i) => (
            <JobCardSkeleton key={i} variant={viewMode} />
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center py-12 space-y-4">
        <AlertCircle className="h-12 w-12 text-muted-foreground" />
        <div className="text-center">
          <h3 className="text-lg font-semibold">Something went wrong</h3>
          <p className="text-muted-foreground">
            {error instanceof Error ? error.message : 'Failed to load jobs'}
          </p>
        </div>
        <Button onClick={() => refetch()}>Try Again</Button>
      </div>
    );
  }

  if (allJobs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 space-y-4">
        <div className="text-6xl">🔍</div>
        <div className="text-center">
          <h3 className="text-lg font-semibold">No jobs found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search criteria or filters
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="text-sm text-muted-foreground">
          {totalJobs.toLocaleString()} job{totalJobs !== 1 ? 's' : ''} found
        </div>
        
        <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="date">Sort by Date</SelectItem>
            <SelectItem value="company">Sort by Company</SelectItem>
            <SelectItem value="relevance">Sort by Relevance</SelectItem>
          </SelectContent>
        </Select>
      </div> */}

      <div className={cn(
        "grid gap-6",
        viewMode === 'grid' 
          ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-3" 
          : "grid-cols-1"
      )}>
        {allJobs.map((job) => (
          <JobCard key={job.id} job={job} variant={viewMode} />
        ))}
      </div>

      {/* Load more trigger */}
      <div ref={loadMoreRef} className="flex justify-center pt-6">
        {isFetchingNextPage && (
          <div className="flex items-center gap-2 text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" />
            Loading more jobs...
          </div>
        )}
        {!hasNextPage && allJobs.length > 0 && (
          <div className="text-muted-foreground text-sm">
            Youu are reached the end of the job listings
          </div>
        )}
      </div>
    </div>
  );
}