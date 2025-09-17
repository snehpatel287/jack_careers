"use client";

import Link from "next/link";
import {
  Search,
  Heart,
  Grid,
  List,
  X,
  User,
  LogOut,
  Settings,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useJobsStore } from "@/store/jobs-store";
import { useState } from "react";
import Image from "next/image";
import clsx from "clsx";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export function Header() {
  const { filters, setFilters, viewMode, setViewMode, savedJobs } =
    useJobsStore();
  const [searchInput, setSearchInput] = useState(filters.search || "");
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const router = useRouter();

  // clear search input
  const handleClearSearch = () => {
    setSearchInput("");
    setFilters({ search: "" }); // only reset search
    setShowMobileSearch(false);
  };

  // update search filter
  const handleSearchChange = (value: string) => {
    setSearchInput(value);
    setFilters({ search: value }); // only update search
  };

  // handle logout
  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.replace("/");
    setShowLogoutModal(false);
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full   border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link href="/main" className="flex items-center space-x-2">
              <Image
                src="/jack_career.png"
                alt="Jack Careers Logo"
                width={40}
                height={40}
                className="h-10 w-10"
              />
              <span className="text-lg sm:text-xl font-bold text-primary">
                Jack Careers
              </span>
            </Link>

            {/* Search - Desktop */}
            <div className="hidden sm:flex flex-1 max-w-md mx-4">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search jobs, companies, or skills..."
                  value={searchInput}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  className="pl-10 pr-10"
                />
                {searchInput && (
                  <button
                    type="button"
                    onClick={handleClearSearch}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-2">
              {/* Search Toggle - Mobile */}
              <button
                onClick={() => setShowMobileSearch(!showMobileSearch)}
                className="sm:hidden p-2 rounded-md hover:bg-accent"
              >
                {showMobileSearch ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Search className="h-5 w-5" />
                )}
              </button>

              {/* Grid / List Toggle */}
              <div className="hidden md:flex items-center space-x-1 border rounded-md">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="rounded-r-none"
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="rounded-l-none"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>

              {/* Saved Jobs */}
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

              {/* Profile Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center"
                  >
                    <User className="h-4 w-4" />
                    <span className="hidden sm:inline-block ml-2">Profile</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="flex items-center gap-2">
                      <User className="h-4 w-4" /> View Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/setting" className="flex items-center gap-2">
                      <Settings className="h-4 w-4" /> Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="flex items-center gap-2 text-red-600 cursor-pointer"
                    onClick={() => setShowLogoutModal(true)}
                  >
                    <LogOut className="h-4 w-4" /> Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Search - Mobile */}
          <div
            className={clsx(
              "sm:hidden transition-all duration-300 overflow-hidden",
              showMobileSearch ? "max-h-16 mt-3 mb-3" : "max-h-0"
            )}
          >
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search jobs, companies, or skills..."
                value={searchInput}
                onChange={(e) => handleSearchChange(e.target.value)}
                autoFocus={showMobileSearch}
                className="pl-10 pr-10"
              />
              {searchInput && (
                <button
                  type="button"
                  onClick={handleClearSearch}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Logout Confirmation Modal */}
      <Dialog open={showLogoutModal} onOpenChange={setShowLogoutModal}>
  <DialogContent className="max-w-sm sm:max-w-md w-[90%] rounded-2xl p-4 sm:p-6">
    <DialogHeader>
      <DialogTitle className="text-lg sm:text-xl font-semibold">
        Confirm Logout
      </DialogTitle>
      <DialogDescription className="text-sm sm:text-base text-muted-foreground">
        Are you sure you want to log out?
      </DialogDescription>
    </DialogHeader>

    <DialogFooter className="flex flex-col-reverse sm:flex-row justify-end gap-2 mt-4">
      <Button
        variant="outline"
        className="w-full sm:w-auto"
        onClick={() => setShowLogoutModal(false)}
      >
        Cancel
      </Button>
      <Button
        variant="destructive"
        className="w-full sm:w-auto"
        onClick={handleLogout}
      >
        Logout
      </Button>
    </DialogFooter>
  </DialogContent>
</Dialog>

    </>
  );
}
