"use client";

import { Suspense } from "react";
import { Loader2 } from "lucide-react";
import { VerifyOTPForm } from "./VerifyOTPForm";

export default function VerifyOTPPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-muted/30">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      }
    >
      <VerifyOTPForm username="" />
    </Suspense>
  );
}
