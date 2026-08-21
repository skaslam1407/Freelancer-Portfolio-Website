import { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { Section, Container, Heading, Card, CardContent, Badge, Button } from "@/components";
import { FolderKanban, Briefcase, Code, Calendar, MessageSquare, Image, Users, TrendingUp, ArrowRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Admin dashboard overview.",
};

const stats = [
  { label: "Projects", value: "12", change: "+2 this month", icon: FolderKanban, href: "/admin/projects", color: "text-blue-600" },
  { label: "Services", value: "6", change: "Active", icon: Briefcase, href: "/admin/services", color: "text-green-600" },
  { label: "Skills", value: "15", change: "Published", icon: Code, href: "/admin/skills", color: "text-purple-600" },
  { label: "Experience", value: "4", change: "Entries", icon: Calendar, href: "/admin/experience", color: "text-orange-600" },
  { label: "Testimonials", value: "3", change: "Published", icon: MessageSquare, href: "/admin/testimonials", color: "text-pink-600" },
  { label: "Media Files", value: "24", change: "Uploaded", icon: Image, href: "/admin/media", color: "text-indigo-600" },
];

const recentActivity = [
  { action: "Published", item: "E-Commerce Platform", type: "project", time: "2 hours ago" },
  { action: "Created", item: "New Service: AI Consulting", type: "service", time: "1 day ago" },
  { action: "Updated", item: "React Skill Level", type: "skill", time: "2 days ago" },
  { action: "Uploaded", item: "5 new images", type: "media", time: "3 days ago" },
  { action: "Published", item: "Testimonial from Sarah Chen", type: "testimonial", time: "1 week ago" },
];

const quickActions = [
  { label: "Add Project", href: "/admin/projects/new", icon: FolderKanban, description: "Create a new portfolio project" },
  { label: "Add Service", href: "/admin/services/new", icon: Briefcase, description: "Add a new service offering" },
  { label: "Upload Media", href: "/admin/media", icon: Image, description: "Upload images and videos" },
  { label: "Manage Skills", href: "/admin/skills", icon: Code, description: "Update your technology stack" },
];

export default async function AdminDashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <Heading level={1} variant="display" className="mb-2">
            Dashboard
          </Heading>
          <p className="text-muted-foreground">
            Welcome back, {user?.email?.split("@")[0] || "Admin"}. Here&apos;s an overview of your portfolio.
          </p>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {stats.map((stat) => (
          <Card key={stat.label} variant="outlined" padding="lg" className="hover:shadow-md transition-shadow">
            <CardContent className="pt-0">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                  <p className="text-3xl font-bold mt-1">{stat.value}</p>
                  <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
                </div>
                <div className={cn("w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center", stat.color)}>
                  <stat.icon className="h-6 w-6" />
                </div>
              </div>
              <Button variant="ghost" size="sm" className="mt-4 w-full" asChild>
                <Link href={stat.href}>
                  Manage
                  <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card variant="outlined" padding="lg">
          <CardContent className="pt-0">
            <div className="flex items-center justify-between mb-6">
              <Heading level={3} variant="subsection">Recent Activity</Heading>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/admin/activity">View All</Link>
              </Button>
            </div>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <TrendingUp className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm">
                      <span className="text-foreground">{activity.action}</span>{" "}
                      <span className="text-muted-foreground">{activity.item}</span>
                    </p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                  <Badge variant="secondary" size="sm">{activity.type}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card variant="outlined" padding="lg">
          <CardContent className="pt-0">
            <Heading level={3} variant="subsection" className="mb-6">Quick Actions</Heading>
            <div className="grid gap-4 sm:grid-cols-2">
              {quickActions.map((action) => (
                <Button
                  key={action.label}
                  variant="outline"
                  className="h-auto p-4 text-left justify-start gap-3"
                  asChild
                >
                  <Link href={action.href}>
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                      <action.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium">{action.label}</p>
                      <p className="text-xs text-muted-foreground">{action.description}</p>
                    </div>
                  </Link>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card variant="outlined" padding="lg">
        <CardContent className="pt-0">
          <Heading level={3} variant="subsection" className="mb-6">Portfolio Status</Heading>
          <div className="grid gap-6 sm:grid-cols-3">
            <div className="text-center p-4 rounded-lg bg-muted/50">
              <p className="text-3xl font-bold text-green-600">92%</p>
              <p className="text-sm text-muted-foreground">Content Published</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-muted/50">
              <p className="text-3xl font-bold text-blue-600">12</p>
              <p className="text-sm text-muted-foreground">Total Projects</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-muted/50">
              <p className="text-3xl font-bold text-purple-600">3</p>
              <p className="text-sm text-muted-foreground">Draft Projects</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}