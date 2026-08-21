"use client";

import { Heading } from "@/components/Heading";
import { Button } from "@/components/Button";
import { Home, RefreshCw } from "lucide-react";
import Link from "next/link";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <head>
        <title>Error - Developer Portfolio</title>
      </head>
      <body className="flex min-h-screen items-center justify-center bg-background px-4">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-6">
            <RefreshCw className="h-8 w-8 text-destructive" />
          </div>
          <Heading level={1} variant="display" className="mb-4">
            Something went wrong
          </Heading>
          <p className="text-muted-foreground mb-8">
            We encountered an unexpected error. Please try refreshing the page or go back to the homepage.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={reset}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Try Again
            </Button>
            <Button variant="outline" asChild>
              <Link href="/">
                <Home className="mr-2 h-4 w-4" />
                Go Home
              </Link>
            </Button>
          </div>
          {process.env.NODE_ENV === "development" && (
            <details className="mt-8 text-left p-4 bg-muted rounded-lg text-sm">
              <summary className="font-medium cursor-pointer">Error Details</summary>
              <pre className="mt-2 overflow-auto">{error.message}</pre>
              {error.digest && <p className="mt-2">Digest: {error.digest}</p>}
            </details>
          )}
        </div>
      </body>
    </html>
  );
}