"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  FolderKanban,
  Briefcase,
  Code,
  Image,
  Calendar,
  MessageSquare,
  Settings,
  LogOut,
} from "lucide-react";

const navigation = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Projects", href: "/admin/projects", icon: FolderKanban },
  { name: "Services", href: "/admin/services", icon: Briefcase },
  { name: "Skills", href: "/admin/skills", icon: Code },
  { name: "Experience", href: "/admin/experience", icon: Calendar },
  { name: "Testimonials", href: "/admin/testimonials", icon: MessageSquare },
  { name: "Media", href: "/admin/media", icon: Image },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-border bg-card flex flex-col">
      <div className="flex h-16 items-center justify-between px-6 border-b border-border">
        <Link href="/admin" className="font-display text-xl font-bold">
          Admin
        </Link>
      </div>
      <nav className="flex-1 space-y-1 p-4 overflow-y-auto">
        {navigation.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              )}
            >
              <item.icon className="h-5 w-5" aria-hidden="true" />
              {item.name}
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-border p-4">
        <a
          href="/api/auth/signout"
          className={cn(
            "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
          )}
        >
          <LogOut className="h-5 w-5" aria-hidden="true" />
          Sign Out
        </a>
      </div>
    </aside>
  );
}