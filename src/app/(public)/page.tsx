import { Metadata } from "next";
import { Section, Container, Heading, Button, Card, CardContent } from "@/components";
import { ArrowRight, Code, Server, Database, Cloud, Globe } from "lucide-react";
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
  },
  {
    icon: Server,
    title: "API Development",
    description: "RESTful and GraphQL APIs with proper documentation, validation, and error handling.",
  },
  {
    icon: Database,
    title: "Database Design",
    description: "Scalable database architecture using PostgreSQL, Supabase, and modern ORMs like Prisma.",
  },
  {
    icon: Cloud,
    title: "DevOps & Cloud",
    description: "CI/CD pipelines, containerization with Docker, and cloud infrastructure on AWS.",
  },
];

const techStack = [
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "PostgreSQL",
  "Supabase",
  "Docker",
  "AWS",
  "GraphQL",
  "Tailwind CSS",
  "Prisma",
  "Git",
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <Section padding="xl" variant="default">
        <Container size="lg">
          <div className="max-w-3xl">
            <p className="text-primary font-medium mb-4 text-sm sm:text-base">
              Senior Full-Stack Developer
            </p>
            <Heading level={1} variant="display" className="mb-6">
              Building scalable web applications with modern technology
            </Heading>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl">
              I specialize in React, Next.js, TypeScript, and cloud-native architectures.
              With 8+ years of experience, I help companies build robust, maintainable,
              and performant web applications.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" asChild>
                <Link href="/projects">
                  View Projects
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/contact">
                  Get In Touch
                </Link>
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      {/* Services Section */}
      <Section padding="xl" variant="muted">
        <Container size="lg">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <Heading level={2} variant="section" className="mb-4">
              Services
            </Heading>
            <p className="text-muted-foreground text-lg">
              Comprehensive development services tailored to your needs
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => (
              <Card key={service.title} variant="outlined" padding="lg" className="h-full">
                <CardContent className="pt-0">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <service.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
                  <p className="text-muted-foreground text-sm">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* Tech Stack Section */}
      <Section padding="xl" variant="default">
        <Container size="lg">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <Heading level={2} variant="section" className="mb-4">
              Tech Stack
            </Heading>
            <p className="text-muted-foreground text-lg">
              Technologies I work with daily
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {techStack.map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 rounded-full bg-muted text-sm font-medium border border-border"
              >
                {tech}
              </span>
            ))}
          </div>
        </Container>
      </Section>

      {/* Featured Projects Section */}
      <Section padding="xl" variant="muted">
        <Container size="lg">
          <div className="flex items-center justify-between mb-12">
            <div>
              <Heading level={2} variant="section" className="mb-2">
                Featured Projects
              </Heading>
              <p className="text-muted-foreground">A selection of my recent work</p>
            </div>
            <Button variant="outline" asChild>
              <Link href="/projects">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <Card key={i} variant="outlined" padding="none" className="h-full overflow-hidden">
                <div className="aspect-video bg-muted relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                    Project Image
                  </div>
                </div>
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold mb-2">Project Title</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    A brief description of the project and its key features.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {["React", "TypeScript", "Next.js"].map((tech) => (
                      <span key={tech} className="px-2 py-1 text-xs rounded bg-muted border border-border">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="/projects/project-slug">
                      View Project
                      <ArrowRight className="ml-1 h-3 w-3" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* CTA Section */}
      <Section padding="xl" variant="bordered">
        <Container size="lg">
          <div className="text-center max-w-2xl mx-auto">
            <Heading level={2} variant="section" className="mb-4">
              Ready to work together?
            </Heading>
            <p className="text-muted-foreground text-lg mb-8">
              I&apos;m always open to discussing new projects, freelance opportunities,
              or just chatting about technology.
            </p>
            <Button size="lg" asChild>
              <Link href="/contact">
                Let&apos;s Talk
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </Container>
      </Section>
    </div>
  );
}