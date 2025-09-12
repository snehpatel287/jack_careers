"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { X, Filter } from "lucide-react";
import { useJobsStore } from "@/store/jobs-store";
import { JobType, ExperienceLevel } from "@/types/job";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

// Job & Experience data
const jobTypes: JobType[] = [
  "Full-time",
  "Part-time",
  "Contract",
  "Internship",
  "Freelance",
];
const experienceLevels: ExperienceLevel[] = [
  "Entry",
  "Mid",
  "Senior",
  "Lead",
  "Executive",
];

export function JobFilters() {
  const { filters, setFilters, resetFilters } = useJobsStore();
  const [locationInput, setLocationInput] = useState(filters.location);
  const [isOpen, setIsOpen] = useState(false);

  // Sync locationInput with store after debounce
  useEffect(() => {
    const timeout = setTimeout(() => {
      setFilters({ location: locationInput });
    }, 200);
    return () => clearTimeout(timeout);
  }, [locationInput, setFilters]);

  // Job Type change
  const handleJobTypeChange = (jobType: JobType, checked: boolean) => {
    const newJobTypes = checked
      ? [...filters.jobTypes, jobType]
      : filters.jobTypes.filter((type) => type !== jobType);
    setFilters({ jobTypes: newJobTypes });
  };

  // Remote change
  const handleRemoteChange = (value: string) => {
    setFilters({ remote: value === "all" ? null : value === "true" });
  };

  // Experience change
  const handleExperienceLevelChange = (value: string) => {
    setFilters({
      experienceLevel: value === "all" ? null : (value as ExperienceLevel),
    });
  };

  // Clear individual filters
  const clearFilter = (filterKey: keyof typeof filters, value?: string) => {
    switch (filterKey) {
      case "jobTypes":
        if (value) {
          // remove single type
          setFilters({
            jobTypes: filters.jobTypes.filter((t) => t !== value),
          });
        } else {
          // remove all types
          setFilters({ jobTypes: [] });
        }
        break;
      case "experienceLevel":
        setFilters({ experienceLevel: null });
        break;
      case "remote":
        setFilters({ remote: null });
        break;
      case "location":
        setLocationInput("");
        setFilters({ location: "" });
        break;
    }
  };

  const hasActiveFilters =
    filters.jobTypes.length > 0 ||
    filters.experienceLevel !== null ||
    filters.remote !== null ||
    filters.location !== "";

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Location */}
      <div>
        <Label className="text-base font-semibold">Location</Label>
        <Input
          placeholder="City, State, Country..."
          value={locationInput}
          onChange={(e) => setLocationInput(e.target.value)}
          className="mt-2"
        />
      </div>

      {/* Job Type */}
      <div>
        <Label className="text-base font-semibold">Job Type</Label>
        <div className="mt-2 space-y-2">
          {jobTypes.map((jobType) => (
            <div key={jobType} className="flex items-center space-x-2">
              <Checkbox
                id={jobType}
                checked={filters.jobTypes.includes(jobType)}
                onCheckedChange={(checked) =>
                  handleJobTypeChange(jobType, !!checked)
                }
              />
              <Label htmlFor={jobType}>{jobType}</Label>
            </div>
          ))}
        </div>
      </div>

      {/* Experience Level */}
      <div>
        <Label className="text-base font-semibold">Experience Level</Label>
        <Select
          value={filters.experienceLevel || "all"}
          onValueChange={handleExperienceLevelChange}
        >
          <SelectTrigger className="mt-2">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Levels</SelectItem>
            {experienceLevels.map((level) => (
              <SelectItem key={level} value={level}>
                {level}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Remote */}
      <div>
        <Label className="text-base font-semibold">Remote Work</Label>
        <Select
          value={filters.remote === null ? "all" : filters.remote.toString()}
          onValueChange={handleRemoteChange}
        >
          <SelectTrigger className="mt-2">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Jobs</SelectItem>
            <SelectItem value="true">Remote Only</SelectItem>
            <SelectItem value="false">On-site Only</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Clear All */}
      {hasActiveFilters && (
        <Button variant="outline" onClick={resetFilters} className="w-full">
          Clear All Filters
        </Button>
      )}
    </div>
  );

  return (
    <>
      {/* Desktop Filters */}
      <Card className="hidden lg:block">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <FilterContent />
        </CardContent>
      </Card>

      {/* Mobile Filters */}
      <div className="lg:hidden">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" className="w-full">
              <Filter className="h-4 w-4 mr-2" />
              Filters
              {hasActiveFilters && (
                <Badge variant="secondary" className="ml-2">
                  Active
                </Badge>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-80">
            <SheetHeader>
              <SheetTitle>Filters</SheetTitle>
            </SheetHeader>
            <div className="mt-6">
              <FilterContent />
            </div>
          </SheetContent>
        </Sheet>

        {/* Active Filters Display */}
        {hasActiveFilters && (
          <div className="flex flex-wrap gap-2 mt-2">
            {filters.jobTypes.map((type) => (
              <Badge key={type} variant="secondary" className="gap-1">
                {type}
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-auto p-0 hover:bg-transparent"
                  onClick={() => clearFilter("jobTypes", type)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            ))}
            {filters.experienceLevel && (
              <Badge variant="secondary" className="gap-1">
                {filters.experienceLevel}
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-auto p-0 hover:bg-transparent"
                  onClick={() => clearFilter("experienceLevel")}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            )}
            {filters.remote !== null && (
              <Badge variant="secondary" className="gap-1">
                {filters.remote ? "Remote" : "On-site"}
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-auto p-0 hover:bg-transparent"
                  onClick={() => clearFilter("remote")}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            )}
            {filters.location && (
              <Badge variant="secondary" className="gap-1">
                {filters.location}
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-auto p-0 hover:bg-transparent"
                  onClick={() => clearFilter("location")}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            )}
          </div>
        )}
      </div>
    </>
  );
}
