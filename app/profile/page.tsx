"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function Page() {
  const router = useRouter();

  return (
    <div className="max-w-4xl mx-auto space-y-4">
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
      </div>

      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-lg text-muted-foreground">
          Your profile details will be shown here.
        </p>
      </div>
    </div>
  );
}
