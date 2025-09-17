"use client";

import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  MapPin,
  ExternalLink,
  Heart,
  Linkedin,
  Twitter,
  ArrowLeft,
  DollarSign,
  Clock,
  Briefcase,
  Award,
  Globe,
} from "lucide-react";
import Link from "next/link";
import { jobsApi } from "@/lib/api";
import { useJobsStore } from "@/store/jobs-store";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";

export default function JobDetailClient({ jobId }: { jobId: string }) {
  const { saveJob, unsaveJob, isJobSaved } = useJobsStore();

  const {
    data: job,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["job", jobId],
    queryFn: () => jobsApi.getJob(jobId),
    enabled: !!jobId,
  });

  const saved = job ? isJobSaved(job.id) : false;

  const toggleSave = () => {
    if (!job) return;
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
      return "Recently posted";
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <Skeleton className="h-10 w-32" />
        <Card>
          <CardHeader>
            <Skeleton className="h-8 w-64" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-20 w-full" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isError || !job) {
    return (
      <div className="max-w-4xl mx-auto text-center py-12">
        <p className="text-xl font-semibold">Job not found</p>
        <Link href="/">
          <Button className="mt-4">Back to Jobs</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-4">
      <div className="relative flex items-center">
        <Link href="/main">
          <Button variant="outline" size="sm" className="w-fit">
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden xs:inline">Back to Jobs</span>
            <span className="xs:hidden">Back</span>
          </Button>
        </Link>
        <h1 className="absolute left-1/2 -translate-x-1/2 text-xl sm:text-2xl font-bold">
          Job Details
        </h1>
      </div>

      {/* Job Card */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <img
                src={job.company.logo}
                alt={`${job.company.name} logo`}
                className="h-16 w-16 rounded-lg object-cover"
              />
              <div>
                <h1 className="text-2xl font-bold">{job.title}</h1>
                <p className="text-xl text-muted-foreground font-medium">
                  {job.company.name}
                </p>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={toggleSave}>
              <Heart
                className={cn(
                  "h-4 w-4 mr-0",
                  saved && "fill-red-500 text-red-500"
                )}
              />
              {/* {saved ? 'Saved' : 'Save Job'} */}
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Location */}
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="h-4 w-4" />
            {job.location.city}, {job.location.state}, {job.location.country}
            {job.remote && <Badge variant="secondary">Remote</Badge>}
          </div>

          {/* Published Date */}
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="h-4 w-4" />
            {formatPublishedDate(job.publishedDate)}
          </div>

          {/* Salary */}
          {job.salary && (
            <div className="flex items-center gap-2 text-green-600 font-semibold">
              <DollarSign className="h-4 w-4" />$
              {job.salary.min.toLocaleString()} - $
              {job.salary.max.toLocaleString()}
            </div>
          )}

          {/* Job Type & Experience */}
          <div className="flex flex-wrap gap-2">
            {job.jobType.map((type) => (
              <Badge key={type} variant="outline">
                <Briefcase className="h-3 w-3 mr-1" /> {type}
              </Badge>
            ))}
            <Badge variant="secondary">
              <Award className="h-3 w-3 mr-1" /> {job.experienceLevel} Level
            </Badge>
          </div>

          {/* Skills */}
          <div>
            <h3 className="font-semibold mb-2">Required Skills</h3>
            <div className="flex flex-wrap gap-2">
              {job.skills.map((skill) => (
                <Badge key={skill} variant="secondary">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="font-semibold mb-2">Description</h3>
            <div
              className="prose prose-sm max-w-none"
              dangerouslySetInnerHTML={{ __html: job.description }}
            />
          </div>

          {/* Company Links */}
          <div className="flex gap-4 pt-4">
            <a
              href={job.company.website}
              target="_blank"
              className="flex items-center gap-1 text-blue-600"
            >
              <Globe className="h-4 w-4" /> Website
            </a>
            <a
              href={job.company.linkedin}
              target="_blank"
              className="flex items-center gap-1 text-blue-600"
            >
              <Linkedin className="h-4 w-4" /> LinkedIn
            </a>
            <a
              href={job.company.twitter}
              target="_blank"
              className="flex items-center gap-1 text-blue-600"
            >
              <Twitter className="h-4 w-4" /> Twitter
            </a>
          </div>

          {/* Apply Button */}
          <div className="pt-6">
            <a href={job.applicationUrl} target="_blank">
              <Button className="w-full">
                <ExternalLink className="h-4 w-4 mr-2" />
                Apply Now
              </Button>
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
