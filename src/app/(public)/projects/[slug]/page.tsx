import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Section, Container, Heading, Button, Badge, Card, CardContent } from "@/components";
import { ArrowLeft, ExternalLink, Github, Calendar, Building2, Link as LinkIcon } from "lucide-react";
import Link from "next/link";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  
  if (!project) {
    return { title: "Project Not Found" };
  }

  return {
    title: project.title,
    description: project.short_description ?? project.description ?? "",
    openGraph: {
      title: project.title,
      description: project.short_description ?? project.description ?? "",
      type: "article",
    },
  };
}

function getProjectBySlug(slug: string) {
  const projects = [
    {
      id: "1",
      slug: "ecommerce-platform",
      title: "E-Commerce Platform",
      short_description: "A full-featured e-commerce solution with real-time inventory, payments, and admin dashboard.",
      description: "Built a scalable e-commerce platform handling 10k+ daily transactions. Features include real-time inventory management, Stripe integration, multi-vendor support, and a comprehensive admin dashboard. The platform was designed with a microservices architecture to ensure scalability and maintainability.",
      role: "Lead Developer",
      client_name: "RetailCorp",
      technologies: ["Next.js", "TypeScript", "PostgreSQL", "Stripe", "Tailwind CSS", "Redis", "Docker"],
      featured: true,
      project_url: "https://example.com",
      repository_url: "https://github.com",
      published_at: "2024-01-15",
    },
    {
      id: "2",
      slug: "task-management-app",
      title: "Task Management App",
      short_description: "Collaborative task management with real-time updates, teams, and analytics.",
      description: "A Trello-like application with real-time collaboration using WebSockets. Includes team workspaces, drag-and-drop boards, custom workflows, and reporting. The application supports real-time presence indicators, comments, attachments, and notifications.",
      role: "Full-Stack Developer",
      client_name: "StartupXYZ",
      technologies: ["React", "Node.js", "Socket.io", "MongoDB", "Redis", "TypeScript"],
      featured: true,
      project_url: "https://example.com",
      repository_url: "https://github.com",
      published_at: "2023-11-20",
    },
    {
      id: "3",
      slug: "analytics-dashboard",
      title: "Analytics Dashboard",
      short_description: "Real-time analytics dashboard with customizable widgets and data visualization.",
      description: "Built a comprehensive analytics platform for SaaS companies. Features include real-time metrics, custom dashboards, alerting, and integration with popular data sources. The dashboard supports multiple visualization types including charts, graphs, and heatmaps.",
      role: "Senior Developer",
      technologies: ["React", "TypeScript", "GraphQL", "PostgreSQL", "D3.js", "Apollo"],
      featured: false,
      project_url: "https://example.com",
      published_at: "2023-08-10",
    },
    {
      id: "4",
      slug: "api-gateway",
      title: "API Gateway Service",
      short_description: "High-performance API gateway with rate limiting, authentication, and monitoring.",
      description: "Designed and implemented a scalable API gateway handling millions of requests per day. Includes JWT authentication, rate limiting, request/response transformation, and distributed tracing. Built with Go for maximum performance.",
      role: "Backend Engineer",
      technologies: ["Go", "Kubernetes", "Redis", "Prometheus", "OpenTelemetry", "gRPC"],
      featured: false,
      repository_url: "https://github.com",
      published_at: "2023-05-01",
    },
    {
      id: "5",
      slug: "cms-platform",
      title: "Headless CMS",
      short_description: "Content management system with flexible content modeling and multi-channel publishing.",
      description: "Built a headless CMS for marketing teams. Features visual content editor, version control, workflow management, and multi-language support. The CMS provides a GraphQL API for content delivery and webhooks for integrations.",
      role: "Full-Stack Developer",
      technologies: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "AWS S3", "GraphQL"],
      featured: true,
      project_url: "https://example.com",
      published_at: "2024-03-01",
    },
    {
      id: "6",
      slug: "realtime-chat",
      title: "Real-Time Chat Application",
      short_description: "Scalable chat application with channels, direct messages, and file sharing.",
      description: "Developed a Slack-like chat application with real-time messaging, thread support, file uploads, search, and mobile push notifications. Supports end-to-end encryption for direct messages.",
      role: "Lead Developer",
      technologies: ["React Native", "Node.js", "WebSocket", "PostgreSQL", "Firebase", "TypeScript"],
      featured: false,
      project_url: "https://example.com",
      repository_url: "https://github.com",
      published_at: "2022-12-15",
    },
  ];

  return projects.find((p) => p.slug === slug);
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Section padding="xl">
        <Container size="lg">
          <Button variant="ghost" size="sm" asChild className="mb-8">
            <Link href="/projects">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Projects
            </Link>
          </Button>

          <div className="max-w-4xl mx-auto">
            <header className="mb-12">
              <div className="flex flex-wrap gap-2 mb-4">
                {project.featured && <Badge variant="default">Featured</Badge>}
                <Badge variant="secondary">{new Date(project.published_at).getFullYear()}</Badge>
              </div>
              <Heading level={1} variant="display" className="mb-4">
                {project.title}
              </Heading>
              <p className="text-lg text-muted-foreground mb-6">{project.short_description}</p>
              
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                {project.role && (
                  <div className="flex items-center gap-2">
                    <Building2 className="h-4 w-4" />
                    <span>{project.role}</span>
                  </div>
                )}
                {project.client_name && (
                  <div className="flex items-center gap-2">
                    <Building2 className="h-4 w-4" />
                    <span>Client: {project.client_name}</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>Published {new Date(project.published_at).toLocaleDateString("en-US", { month: "long", year: "numeric" })}</span>
                </div>
              </div>
            </header>

            <div className="aspect-video bg-muted rounded-xl mb-12 relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                Project Cover Image
              </div>
            </div>

            <div className="prose prose-slate dark:prose-invert max-w-none mb-12">
              <p className="text-lg text-muted-foreground mb-6">{project.description}</p>
              
              <h2 className="text-2xl font-semibold mb-4">Technologies Used</h2>
              <div className="flex flex-wrap gap-2 mb-8">
                {project.technologies.map((tech) => (
                  <Badge key={tech} variant="secondary">
                    {tech}
                  </Badge>
                ))}
              </div>

              {(project.project_url || project.repository_url) && (
                <div className="flex flex-wrap gap-4 pt-8 border-t">
                  {project.project_url && (
                    <Button asChild>
                      <a href={project.project_url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Live Demo
                      </a>
                    </Button>
                  )}
                  {project.repository_url && (
                    <Button variant="outline" asChild>
                      <a href={project.repository_url} target="_blank" rel="noopener noreferrer">
                        <Github className="mr-2 h-4 w-4" />
                        Source Code
                      </a>
                    </Button>
                  )}
                </div>
              )}
            </div>

            <Section variant="muted" padding="lg" className="rounded-xl">
              <Container size="full">
                <Heading level={3} variant="subsection" className="mb-6">
                  Project Details
                </Heading>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Card variant="outlined" padding="md">
                    <CardContent className="pt-0">
                      <h4 className="font-medium mb-2">Role</h4>
                      <p className="text-muted-foreground">{project.role || "Not specified"}</p>
                    </CardContent>
                  </Card>
                  <Card variant="outlined" padding="md">
                    <CardContent className="pt-0">
                      <h4 className="font-medium mb-2">Client</h4>
                      <p className="text-muted-foreground">{project.client_name || "Personal Project"}</p>
                    </CardContent>
                  </Card>
                  <Card variant="outlined" padding="md">
                    <CardContent className="pt-0">
                      <h4 className="font-medium mb-2">Status</h4>
                      <Badge variant="success">Completed</Badge>
                    </CardContent>
                  </Card>
                  <Card variant="outlined" padding="md">
                    <CardContent className="pt-0">
                      <h4 className="font-medium mb-2">Links</h4>
                      <div className="flex flex-wrap gap-2">
                        {project.project_url && (
                          <Button variant="ghost" size="sm" asChild>
                            <a href={project.project_url} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="mr-1 h-3 w-3" />
                              Live Demo
                            </a>
                          </Button>
                        )}
                        {project.repository_url && (
                          <Button variant="ghost" size="sm" asChild>
                            <a href={project.repository_url} target="_blank" rel="noopener noreferrer">
                              <Github className="mr-1 h-3 w-3" />
                              Repository
                            </a>
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </Container>
            </Section>
          </div>
        </Container>
      </Section>
    </div>
  );
}