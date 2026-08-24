"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/Button";
import { Menu, X, Code, LayoutDashboard } from "lucide-react";
import { useState, useEffect } from "react";

const navigation = [
  { name: "Projects", href: "/projects" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Skills", href: "/skills" },
  { name: "Experience", href: "/experience" },
  { name: "Testimonials", href: "/testimonials" },
  { name: "Contact", href: "/contact" },
];

export function Header() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [branding, setBranding] = useState<{ 
    logo_light?: string; 
    logo_dark?: string; 
    site_name?: string;
    primary_color?: string;
    accent_color?: string;
    favicon?: string;
  } | null>(null);

  useEffect(() => {
    const fetchBranding = async () => {
      try {
        const res = await fetch("/api/admin/settings");
        if (res.ok) {
          const { data } = await res.json();
          if (data?.branding) {
            setBranding(data.branding);
          }
        }
      } catch {
        // ignore
      }
    };
    fetchBranding();
  }, []);

  // Apply theme colors to CSS variables
  useEffect(() => {
    if (branding?.primary_color && typeof document !== "undefined") {
      document.documentElement.style.setProperty("--primary", branding.primary_color);
      document.documentElement.style.setProperty("--ring", branding.primary_color);
    }
    if (branding?.accent_color && typeof document !== "undefined") {
      document.documentElement.style.setProperty("--accent", branding.accent_color);
    }
    // Update favicon
    if (branding?.favicon && typeof document !== "undefined") {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const faviconUrl = `${supabaseUrl}/storage/v1/object/public/portfolio-media/${branding.favicon}`;
      let link = document.querySelector('link[rel="icon"]') as HTMLLinkElement;
      if (!link) {
        link = document.createElement("link");
        link.rel = "icon";
        document.head.appendChild(link);
      }
      link.href = faviconUrl;
    }
  }, [branding]);

  const isDark = searchParams.get("theme") === "dark" || 
    (typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches);

  const logoUrl = isDark ? branding?.logo_dark : branding?.logo_light;
  const siteName = branding?.site_name || "Portfolio";

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-background/95 backdrop-blur-md border-b border-border shadow-sm"
          : "bg-transparent"
      )}
      onScroll={() => setScrolled(window.scrollY > 10)}
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Main navigation">
        <div className="flex h-16 md:h-18 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="font-display text-xl md:text-2xl font-bold tracking-tight flex items-center gap-2" aria-label="Home">
              {logoUrl ? (
                <img
                  src={logoUrl}
                  alt={siteName}
                  className="h-8 w-auto"
                  loading="lazy"
                />
              ) : (
                <Code className="h-6 w-6 text-primary" />
              )}
              {siteName}
            </Link>
          </div>

          <div className="hidden md:flex md:items-center md:gap-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200",
                  pathname === item.href || pathname.startsWith(item.href + "/")
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                {item.name}
              </Link>
            ))}
            <Link href="/admin" className="ml-2">
              <Button variant="ghost" size="sm" className="gap-1.5">
                <span className="hidden sm:inline">Admin</span>
                <LayoutDashboard className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="flex md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        <div
          id="mobile-menu"
          className={cn(
            "md:hidden overflow-hidden transition-all duration-300 ease-out",
            mobileMenuOpen ? "max-h-96 opacity-100 pt-4" : "max-h-0 opacity-0"
          )}
        >
          <div className="space-y-1 pb-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "block px-3 py-2.5 text-base font-medium rounded-lg transition-all duration-200",
                  pathname === item.href || pathname.startsWith(item.href + "/")
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <Link href="/admin" onClick={() => setMobileMenuOpen(false)} className="mt-2 block">
              <Button variant="outline" className="w-full justify-start gap-2">
                <Code className="h-4 w-4" />
                Admin Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}