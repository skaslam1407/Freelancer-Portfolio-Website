import { Metadata } from "next";
import { Section, Container, Heading, Button, Card, CardContent, Badge } from "@/components";
import { ArrowRight, Code, Server, Database, Cloud, Sparkles, Zap, Shield, Terminal } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Full-Stack Developer",
  description: "Senior Full-Stack Developer specializing in React, Next.js, TypeScript, and cloud-native architectures.",
};

const services = [
  {
    icon: Code,
    title: "Web Development",
    description: "Custom web applications built with modern frameworks like React, Next.js, and TypeScript.",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: Server,
    title: "API Development",
    description: "RESTful and GraphQL APIs with proper documentation, validation, and error handling.",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    icon: Database,
    title: "Database Design",
    description: "Scalable database architecture using PostgreSQL, Supabase, and modern ORMs like Prisma.",
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    icon: Cloud,
    title: "DevOps & Cloud",
    description: "CI/CD pipelines, containerization with Docker, and cloud infrastructure on AWS.",
    gradient: "from-orange-500 to-red-500",
  },
];

const techStack = [
  { name: "TypeScript", category: "Language", color: "bg-blue-500" },
  { name: "React", category: "Frontend", color: "bg-cyan-500" },
  { name: "Next.js", category: "Framework", color: "bg-gray-800 dark:bg-gray-200" },
  { name: "Node.js", category: "Backend", color: "bg-green-600" },
  { name: "PostgreSQL", category: "Database", color: "bg-blue-700" },
  { name: "Supabase", category: "Backend", color: "bg-green-500" },
  { name: "Docker", category: "DevOps", color: "bg-blue-600" },
  { name: "AWS", category: "Cloud", color: "bg-orange-500" },
  { name: "GraphQL", category: "API", color: "bg-pink-500" },
  { name: "Tailwind CSS", category: "Styling", color: "bg-cyan-400" },
  { name: "Prisma", category: "ORM", color: "bg-indigo-500" },
  { name: "Git", category: "Version Control", color: "bg-orange-600" },
];

const featuredProjects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "Full-featured e-commerce solution with real-time inventory, payment processing, and admin dashboard.",
    technologies: ["Next.js", "TypeScript", "PostgreSQL", "Stripe"],
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=450&fit=crop",
    link: "/projects/ecommerce-platform",
  },
  {
    id: 2,
    title: "Task Management App",
    description: "Collaborative task management with real-time updates, team workspaces, and advanced filtering.",
    technologies: ["React", "Node.js", "MongoDB", "Socket.io"],
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=450&fit=crop",
    link: "/projects/task-management",
  },
  {
    id: 3,
    title: "Analytics Dashboard",
    description: "Real-time analytics dashboard with customizable widgets, data visualization, and export features.",
    technologies: ["React", "TypeScript", "GraphQL", "D3.js"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=450&fit=crop",
    link: "/projects/analytics-dashboard",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <Section padding="xl" variant="default" className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
        <Container size="lg">
          <div className="max-w-3xl relative animate-slide-up">
            <Badge variant="primary" dot size="lg" className="mb-6 animate-fade-in">
              Available for freelance & contract work
            </Badge>
            <p className="text-primary font-medium mb-4 text-sm sm:text-base animate-slide-up" style={{ animationDelay: "100ms" }}>
              Senior Full-Stack Developer
            </p>
            <Heading level={1} variant="display" className="mb-6 animate-slide-up" style={{ animationDelay: "200ms" }}>
              Building <span className="gradient-text">scalable web applications</span> with modern technology
            </Heading>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl animate-slide-up" style={{ animationDelay: "300ms" }}>
              I specialize in React, Next.js, TypeScript, and cloud-native architectures.
              With 8+ years of experience, I help companies build robust, maintainable,
              and performant web applications.
            </p>
            <div className="flex flex-wrap gap-4 animate-slide-up" style={{ animationDelay: "400ms" }}>
              <Button size="lg" asChild className="group">
                <Link href="/projects">
                  View Projects
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="group">
                <Link href="/contact">
                  Get In Touch
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
            <div className="mt-10 flex flex-wrap items-center gap-6 text-sm text-muted-foreground animate-fade-in" style={{ animationDelay: "500ms" }}>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span>Currently accepting new projects</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-primary" />
                <span>Typical response: under 24 hours</span>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Services Section */}
      <Section padding="xl" variant="muted">
        <Container size="lg">
          <div className="text-center max-w-2xl mx-auto mb-16 animate-slide-up">
            <Badge variant="muted" className="mb-4">What I Do</Badge>
            <Heading level={2} variant="section" className="mb-4">
              Services
            </Heading>
            <p className="text-muted-foreground text-lg">
              Comprehensive development services tailored to your needs
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => (
              <Card
                key={service.title}
                variant="outlined"
                padding="lg"
                className="h-full card-hover relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-5 transition-opacity" style={{ background: service.gradient }} />
                <CardContent className="pt-0 relative">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300" style={{ background: service.gradient }}>
                    <service.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* Tech Stack Section */}
      <Section padding="xl" variant="default">
        <Container size="lg">
          <div className="text-center max-w-2xl mx-auto mb-12 animate-slide-up">
            <Badge variant="muted" className="mb-4">Tech Stack</Badge>
            <Heading level={2} variant="section" className="mb-4">
              Technologies I Work With
            </Heading>
            <p className="text-muted-foreground text-lg">
              Modern tools and frameworks for building exceptional products
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {techStack.map((tech) => (
              <Link
                key={tech.name}
                href={`/skills#${tech.name.toLowerCase()}`}
                className="group relative flex items-center gap-3 p-4 rounded-xl bg-muted/50 border border-border hover:border-primary/30 hover:bg-muted transition-all duration-300"
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`} style={{ backgroundColor: tech.color }}>
                  <span className="text-white font-medium text-sm">{tech.name.charAt(0)}</span>
                </div>
                <div className="text-left min-w-0">
                  <p className="font-medium text-sm truncate">{tech.name}</p>
                  <p className="text-xs text-muted-foreground">{tech.category}</p>
                </div>
                <ArrowRight className="ml-auto h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      {/* Featured Projects Section */}
      <Section padding="xl" variant="muted">
        <Container size="lg">
          <div className="flex items-center justify-between mb-12 animate-slide-up">
            <div>
              <Badge variant="muted" className="mb-3">Featured Work</Badge>
              <Heading level={2} variant="section" className="mb-2">
                Featured Projects
              </Heading>
              <p className="text-muted-foreground">A selection of my recent work</p>
            </div>
            <Button variant="outline" asChild className="group">
              <Link href="/projects">
                View All
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.map((project) => (
              <Card key={project.id} variant="default" padding="none" className="h-full card-hover overflow-hidden">
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <CardContent className="p-6">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {project.technologies.map((tech) => (
                      <Badge key={tech} variant="outline" size="sm" className="bg-background/80 backdrop-blur-sm">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">{project.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{project.description}</p>
                  <Button variant="ghost" size="sm" asChild className="group w-full justify-start">
                    <Link href={project.link}>
                      View Project
                      <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* Stats Section */}
      <Section padding="xl" variant="default" className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
        <Container size="lg">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { value: "8+", label: "Years Experience", icon: Sparkles },
              { value: "50+", label: "Projects Delivered", icon: Zap },
              { value: "20+", label: "Technologies", icon: Terminal },
              { value: "100%", label: "Client Satisfaction", icon: Shield },
            ].map((stat) => (
              <div key={stat.label} className="text-center p-6 animate-slide-up">
                <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-primary/10 flex items-center justify-center">
                  <stat.icon className="h-7 w-7 text-primary" />
                </div>
                <p className="text-4xl sm:text-5xl font-bold tracking-tight gradient-text">{stat.value}</p>
                <p className="mt-2 text-muted-foreground text-sm font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* CTA Section */}
      <Section padding="xl" variant="bordered" className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5" />
        <Container size="lg">
          <div className="text-center max-w-2xl mx-auto relative animate-slide-up">
            <Badge variant="primary" className="mb-4">Let's Work Together</Badge>
            <Heading level={2} variant="section" className="mb-4">
              Ready to start your next project?
            </Heading>
            <p className="text-muted-foreground text-lg mb-8">
              I&apos;m always open to discussing new projects, freelance opportunities,
              or just chatting about technology.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" asChild className="group">
                <Link href="/contact">
                  Let&apos;s Talk
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/projects">
                  View My Work
                </Link>
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}