import Link from "next/link";
import { Heading } from "@/components/Heading";
import { Button } from "@/components/Button";
import { Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="text-center max-w-md">
        <h1 className="text-9xl font-bold text-primary/20">404</h1>
        <Heading level={1} variant="display" className="mt-4 mb-4">
          Page Not Found
        </Heading>
        <p className="text-muted-foreground mb-8">
          Sorry, we couldn&apos;t find the page you&apos;re looking for. It might have been moved or doesn&apos;t exist.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild>
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Go Home
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/projects">
              <Search className="mr-2 h-4 w-4" />
              Browse Projects
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}