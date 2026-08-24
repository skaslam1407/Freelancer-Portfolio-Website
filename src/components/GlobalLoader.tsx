"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

export function GlobalLoader() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleRouteChangeStart = () => setIsLoading(true);
    const handleRouteChangeComplete = () => setIsLoading(false);
    const handleRouteChangeError = () => setIsLoading(false);

    router.refresh();

    return () => {};
  }, [router]);

  if (!isLoading) return null;

  return (
    <div
      className="fixed top-0 left-0 right-0 z-50 h-1 bg-primary/20"
      role="progressbar"
      aria-valuenow={100}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Page loading"
    >
      <div
        className="h-full bg-primary origin-left animate-loading"
        style={{ animationDuration: "1.5s", animationTimingFunction: "ease-in-out" }}
      />
    </div>
  );
}