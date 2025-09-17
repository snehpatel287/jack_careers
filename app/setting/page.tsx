"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function Page() {
  const router = useRouter();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Top bar with back button + centered title */}
      <div className="relative flex items-center">
        <Button
          variant="outline"
          size="sm"
          onClick={() => router.back()}
          className="w-fit"
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="hidden xs:inline">Back</span>
        </Button>

        <h1 className="absolute left-1/2 -translate-x-1/2 text-xl sm:text-2xl font-bold">
          Settings
        </h1>
      </div>

      {/* Settings content */}
      <Card>
        <CardHeader>
          <CardTitle>Account Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <span>Email Notifications</span>
            <Button size="sm" variant="outline">
              Manage
            </Button>
          </div>
          <div className="flex justify-between items-center">
            <span>Change Password</span>
            <Button size="sm" variant="outline">
              Update
            </Button>
          </div>
          <div className="flex justify-between items-center">
            <span>Privacy Settings</span>
            <Button size="sm" variant="outline">
              Edit
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>App Preferences</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <span>Dark Mode</span>
            <Button size="sm" variant="outline">
              Toggle
            </Button>
          </div>
          <div className="flex justify-between items-center">
            <span>Language</span>
            <Button size="sm" variant="outline">
              Change
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
