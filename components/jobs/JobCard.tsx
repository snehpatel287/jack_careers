'use client';

import Link from 'next/link';
import { MapPin, Calendar, Heart, ExternalLink, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Job } from '@/types/job';
import { useJobsStore } from '@/store/jobs-store';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';

interface JobCardProps {
  job: Job;
  variant?: 'grid' | 'list';
}

export function JobCard({ job, variant = 'grid' }: JobCardProps) {
  const { saveJob, unsaveJob, isJobSaved } = useJobsStore();
  const saved = isJobSaved(job.id);

  const toggleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (saved) {
      unsaveJob(job.id);
    } else {
      saveJob(job.id);
    }
  };

  const formatPublishedDate = (date: string) => {
    try {
      return formatDistanceToNow(new Date(date), { addSuffix: true });
    } catch {
      return 'Recently posted';
    }
  };

  if (variant === 'list') {
    return (
      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <img
              src={job.company.logo}
              alt={`${job.company.name} logo`}
              className="h-12 w-12 rounded-lg object-cover flex-shrink-0"
            />
            
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <Link href={`/jobs/${job.id}`}>
                    <h3 className="text-lg font-semibold hover:text-primary transition-colors line-clamp-1">
                      {job.title}
                    </h3>
                  </Link>
                  <p className="text-muted-foreground font-medium">{job.company.name}</p>
                </div>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleSave}
                  className="flex-shrink-0"
                >
                  <Heart className={cn("h-4 w-4", saved && "fill-red-500 text-red-500")} />
                </Button>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-3">
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {job.location.city}, {job.location.state}
                  {job.remote && <Badge variant="secondary" className="ml-2">Remote</Badge>}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {formatPublishedDate(job.publishedDate)}
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 mb-3">
                {job.jobType.map((type) => (
                  <Badge key={type} variant="outline">
                    {type}
                  </Badge>
                ))}
                <Badge variant="secondary">{job.experienceLevel}</Badge>
                {job.salary && (
                  <Badge variant="outline">
                    ${job.salary.min.toLocaleString()} - ${job.salary.max.toLocaleString()}
                  </Badge>
                )}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-1">
                  {job.skills.slice(0, 3).map((skill) => (
                    <Badge key={skill} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                  {job.skills.length > 3 && (
                    <Badge variant="secondary" className="text-xs">
                      +{job.skills.length - 3} more
                    </Badge>
                  )}
                </div>
                
                <div className="flex gap-2">
                  <Link href={`/jobs/${job.id}`}>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </Link>
                  <a
                    href={job.applicationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Button size="sm">
                      Apply <ExternalLink className="ml-1 h-3 w-3" />
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
  <Card className="group hover:shadow-lg transition-all duration-200 hover:-translate-y-1 h-full">
    <CardContent className="p-6 flex flex-col h-full">
      <div className="flex items-start justify-between mb-4">
        <img
          src={job.company.logo}
          alt={`${job.company.name} logo`}
          className="h-12 w-12 rounded-lg object-cover"
        />
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleSave}
          className="opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Heart className={cn("h-4 w-4", saved && "fill-red-500 text-red-500")} />
        </Button>
      </div>

      <div className="space-y-3 flex-1">
        <div>
          <Link href={`/jobs/${job.id}`}>
            <h3 className="text-lg font-semibold hover:text-primary transition-colors line-clamp-2">
              {job.title}
            </h3>
          </Link>
          <p className="text-muted-foreground font-medium">{job.company.name}</p>
        </div>

        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4" />
          {job.location.city}, {job.location.state}
          {job.remote && <Badge variant="secondary" className="ml-2">Remote</Badge>}
        </div>

        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          {formatPublishedDate(job.publishedDate)}
        </div>

        <div className="flex flex-wrap gap-2">
          {job.jobType.map((type) => (
            <Badge key={type} variant="outline" className="text-xs">
              {type}
            </Badge>
          ))}
          <Badge variant="secondary" className="text-xs">{job.experienceLevel}</Badge>
        </div>

        {job.salary && (
          <div className="text-sm font-medium text-green-600">
            ${job.salary.min.toLocaleString()} - ${job.salary.max.toLocaleString()}
          </div>
        )}

        <div className="flex flex-wrap gap-1">
          {job.skills.slice(0, 2).map((skill) => (
            <Badge key={skill} variant="secondary" className="text-xs">
              {skill}
            </Badge>
          ))}
          {job.skills.length > 2 && (
            <Badge variant="secondary" className="text-xs">
              +{job.skills.length - 2}
            </Badge>
          )}
        </div>
      </div>

      {/* ✅ Buttons always stick to bottom */}
      <div className="flex gap-2 pt-2 mt-2">
        <Link href={`/jobs/${job.id}`} className="flex-1">
          <Button variant="outline" className="w-full">
            View Details
          </Button>
        </Link>
        <a
          href={job.applicationUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="flex-1"
        >
          <Button className="w-full">
            Apply <ExternalLink className="ml-1 h-3 w-3" />
          </Button>
        </a>
      </div>
    </CardContent>
  </Card>
);

}