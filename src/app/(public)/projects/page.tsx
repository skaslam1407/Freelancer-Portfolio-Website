import { Metadata } from "next";
import { Section, Container, Heading, Card, CardContent, Button, Badge } from "@/components";
import { ArrowRight, Code, ExternalLink, Github } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Projects",
  description: "Browse my portfolio of web development projects, case studies, and open source contributions.",
};

const projects = [
  {
    id: "1",
    slug: "ecommerce-platform",
    title: "E-Commerce Platform",
    short_description: "A full-featured e-commerce solution with real-time inventory, payments, and admin dashboard.",
    description: "Built a scalable e-commerce platform handling 10k+ daily transactions. Features include real-time inventory management, Stripe integration, multi-vendor support, and a comprehensive admin dashboard.",
    role: "Lead Developer",
    technologies: ["Next.js", "TypeScript", "PostgreSQL", "Stripe", "Tailwind CSS"],
    featured: true,
    project_url: "https://example.com",
    repository_url: "https://github.com",
  },
  {
    id: "2",
    slug: "task-management-app",
    title: "Task Management App",
    short_description: "Collaborative task management with real-time updates, teams, and analytics.",
    description: "A Trello-like application with real-time collaboration using WebSockets. Includes team workspaces, drag-and-drop boards, custom workflows, and reporting.",
    role: "Full-Stack Developer",
    technologies: ["React", "Node.js", "Socket.io", "MongoDB", "Redis"],
    featured: true,
    project_url: "https://example.com",
    repository_url: "https://github.com",
  },
  {
    id: "3",
    slug: "analytics-dashboard",
    title: "Analytics Dashboard",
    short_description: "Real-time analytics dashboard with customizable widgets and data visualization.",
    description: "Built a comprehensive analytics platform for SaaS companies. Features include real-time metrics, custom dashboards, alerting, and integration with popular data sources.",
    role: "Senior Developer",
    technologies: ["React", "TypeScript", "GraphQL", "PostgreSQL", "D3.js"],
    featured: false,
    project_url: "https://example.com",
  },
  {
    id: "4",
    slug: "api-gateway",
    title: "API Gateway Service",
    short_description: "High-performance API gateway with rate limiting, authentication, and monitoring.",
    description: "Designed and implemented a scalable API gateway handling millions of requests per day. Includes JWT authentication, rate limiting, request/response transformation, and distributed tracing.",
    role: "Backend Engineer",
    technologies: ["Go", "Kubernetes", "Redis", "Prometheus", "OpenTelemetry"],
    featured: false,
    repository_url: "https://github.com",
  },
  {
    id: "5",
    slug: "cms-platform",
    title: "Headless CMS",
    short_description: "Content management system with flexible content modeling and multi-channel publishing.",
    description: "Built a headless CMS for marketing teams. Features visual content editor, version control, workflow management, and multi-language support.",
    role: "Full-Stack Developer",
    technologies: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "AWS S3"],
    featured: true,
    project_url: "https://example.com",
  },
  {
    id: "6",
    slug: "realtime-chat",
    title: "Real-Time Chat Application",
    short_description: "Scalable chat application with channels, direct messages, and file sharing.",
    description: "Developed a Slack-like chat application with real-time messaging, thread support, file uploads, search, and mobile push notifications.",
    role: "Lead Developer",
    technologies: ["React Native", "Node.js", "WebSocket", "PostgreSQL", "Firebase"],
    featured: false,
    project_url: "https://example.com",
    repository_url: "https://github.com",
  },
];

export default function ProjectsPage() {
  const featuredProjects = projects.filter((p) => p.featured);
  const otherProjects = projects.filter((p) => !p.featured);

  return (
    <div className="flex flex-col min-h-screen">
      <Section padding="xl">
        <Container size="lg">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <Heading level={1} variant="display" className="mb-4">
              Projects
            </Heading>
            <p className="text-muted-foreground text-lg">
              A collection of projects I&apos;ve worked on, from commercial products to open source contributions.
            </p>
          </div>

          {featuredProjects.length > 0 && (
            <div className="mb-16">
              <Heading level={2} variant="section" className="mb-8">
                Featured Projects
              </Heading>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {featuredProjects.map((project) => (
                  <Card key={project.id} variant="outlined" padding="none" className="h-full overflow-hidden">
                    <div className="aspect-video bg-muted relative overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                        {project.title}
                      </div>
                    </div>
                    <CardContent className="pt-6">
                      <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                      <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                        {project.short_description}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies.slice(0, 4).map((tech) => (
                          <Badge key={tech} variant="secondary" size="sm">
                            {tech}
                          </Badge>
                        ))}
                        {project.technologies.length > 4 && (
                          <Badge variant="outline" size="sm">
                            +{project.technologies.length - 4} more
                          </Badge>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={`/projects/${project.slug}`}>
                            View Details
                            <ArrowRight className="ml-1 h-3 w-3" />
                          </Link>
                        </Button>
                        {project.project_url && (
                          <Button variant="ghost" size="sm" asChild>
                            <a href={project.project_url} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="h-3 w-3" />
                              <span className="sr-only">Live Demo</span>
                            </a>
                          </Button>
                        )}
                        {project.repository_url && (
                          <Button variant="ghost" size="sm" asChild>
                            <a href={project.repository_url} target="_blank" rel="noopener noreferrer">
                              <Github className="h-3 w-3" />
                              <span className="sr-only">Source Code</span>
                            </a>
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          <div>
            <Heading level={2} variant="section" className="mb-8">
              All Projects
            </Heading>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {otherProjects.map((project) => (
                <Card key={project.id} variant="outlined" padding="none" className="h-full overflow-hidden">
                  <div className="aspect-video bg-muted relative overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                      {project.title}
                    </div>
                  </div>
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                      {project.short_description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.slice(0, 4).map((tech) => (
                        <Badge key={tech} variant="secondary" size="sm">
                          {tech}
                        </Badge>
                      ))}
                      {project.technologies.length > 4 && (
                        <Badge variant="outline" size="sm">
                          +{project.technologies.length - 4} more
                        </Badge>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={`/projects/${project.slug}`}>
                          View Details
                          <ArrowRight className="ml-1 h-3 w-3" />
                        </Link>
                      </Button>
                      {project.project_url && (
                        <Button variant="ghost" size="sm" asChild>
                          <a href={project.project_url} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        </Button>
                      )}
                      {project.repository_url && (
                        <Button variant="ghost" size="sm" asChild>
                          <a href={project.repository_url} target="_blank" rel="noopener noreferrer">
                            <Github className="h-3 w-3" />
                          </a>
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}