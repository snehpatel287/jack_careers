'use client';

import Link from 'next/link';
import { Search, Briefcase, Heart, Grid, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useJobsStore } from '@/store/jobs-store';
import { useState } from 'react';

export function Header() {
  const { filters, setFilters, viewMode, setViewMode, savedJobs } = useJobsStore();
  const [searchInput, setSearchInput] = useState(filters.search);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFilters({ search: searchInput });
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <img 
    src="/jack_career.png" 
    alt="Jack Careers Logo" 
    className="h-12 w-12"
  />
            <span className="text-xl font-bold text-primary">Jack Careers</span>
          </Link>

          <form onSubmit={handleSearchSubmit} className="flex-1 max-w-md mx-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search jobs, companies, skills..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="pl-10 pr-4"
              />
            </div>
          </form>

          <div className="flex items-center space-x-2">
            <div className="hidden md:flex items-center space-x-1 border rounded-md">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className="rounded-r-none"
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
                className="rounded-l-none"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>

            <Link href="/saved">
              <Button variant="outline" size="sm" className="relative">
                <Heart className="h-4 w-4" />
                <span className="hidden sm:inline-block ml-2">Saved</span>
                {savedJobs.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {savedJobs.length}
                  </span>
                )}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}