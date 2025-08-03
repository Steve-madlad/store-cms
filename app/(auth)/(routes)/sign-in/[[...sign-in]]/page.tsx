"use client";

import { SignIn, useUser } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";

export default function Page() {
  const { isLoaded } = useUser();
  return (
    <div className="flex-center min-h-[calc(100vh-4rem)]">
      {isLoaded ? (
        <SignIn />
      ) : (
        <div className="bg-input flex-center h-120 w-100 animate-pulse gap-2 rounded-lg shadow-lg">
          <Loader2 className="animate-spin" />
          <p>Loading...</p>
        </div>
      )}
    </div>
  );
}
