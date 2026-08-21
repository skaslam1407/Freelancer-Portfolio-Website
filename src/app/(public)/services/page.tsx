import { Metadata } from "next";
import { Section, Container, Heading, Card, CardContent, Badge, Button } from "@/components";
import { Code, Server, Database, Cloud, MessageSquare, Shield, ArrowRight, Check } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Services",
  description: "Professional web development services including custom web applications, API development, database design, and DevOps consulting.",
};

const services = [
  {
    icon: Code,
    title: "Custom Web Development",
    description: "End-to-end development of modern web applications using React, Next.js, and TypeScript. From MVP to production-ready products.",
    features: [
      "Single Page Applications (SPAs)",
      "Server-Side Rendering (SSR)",
      "Static Site Generation (SSG)",
      "Progressive Web Apps (PWAs)",
      "Component Libraries & Design Systems",
      "Performance Optimization",
    ],
    price: "Starting at $5,000",
  },
  {
    icon: Server,
    title: "API Design & Development",
    description: "Robust, well-documented APIs built with best practices for security, scalability, and developer experience.",
    features: [
      "RESTful API Design",
      "GraphQL Schema & Resolvers",
      "Authentication & Authorization",
      "Rate Limiting & Throttling",
      "API Documentation (OpenAPI/Swagger)",
      "Testing & Monitoring",
    ],
    price: "Starting at $3,000",
  },
  {
    icon: Database,
    title: "Database Architecture",
    description: "Scalable database design, optimization, and migration services for relational and document databases.",
    features: [
      "Data Modeling & Schema Design",
      "Performance Tuning & Indexing",
      "Migration & Refactoring",
      "Replication & Backup Strategies",
      "Query Optimization",
      "PostgreSQL, MySQL, MongoDB",
    ],
    price: "Starting at $2,500",
  },
  {
    icon: Cloud,
    title: "DevOps & Cloud Infrastructure",
    description: "Modern CI/CD pipelines, containerization, and cloud infrastructure setup for reliable deployments.",
    features: [
      "CI/CD Pipeline Setup (GitHub Actions, GitLab)",
      "Docker Containerization",
      "Kubernetes Orchestration",
      "AWS/GCP/Azure Configuration",
      "Infrastructure as Code (Terraform)",
      "Monitoring & Logging",
    ],
    price: "Starting at $4,000",
  },
  {
    icon: MessageSquare,
    title: "Technical Consulting",
    description: "Strategic technology guidance, architecture reviews, and team mentoring for engineering organizations.",
    features: [
      "Architecture Reviews & Audits",
      "Technology Stack Selection",
      "Code Quality Assessment",
      "Team Mentoring & Training",
      "Technical Due Diligence",
      "Performance Audits",
    ],
    price: "$200/hr",
  },
  {
    icon: Shield,
    title: "Code Audits & Security",
    description: "Comprehensive security and code quality audits to identify vulnerabilities and improve maintainability.",
    features: [
      "Security Vulnerability Assessment",
      "OWASP Top 10 Review",
      "Dependency Scanning",
      "Code Quality Analysis",
      "Performance Bottleneck Detection",
      "Remediation Recommendations",
    ],
    price: "Starting at $3,000",
  },
];

const process = [
  { step: "01", title: "Discovery", description: "Understanding your requirements, goals, and constraints through detailed discussions." },
  { step: "02", title: "Planning", description: "Creating a detailed project plan with timeline, milestones, and technical specifications." },
  { step: "03", title: "Development", description: "Building the solution with regular updates, code reviews, and iterative feedback." },
  { step: "04", title: "Testing & QA", description: "Comprehensive testing including unit, integration, and end-to-end tests." },
  { step: "05", title: "Deployment", description: "Smooth production deployment with monitoring and rollback procedures." },
  { step: "06", title: "Support", description: "Post-launch support, maintenance, and iterative improvements." },
];

export default function ServicesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Section padding="xl">
        <Container size="lg">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <Heading level={1} variant="display" className="mb-6">
              Services
            </Heading>
            <p className="text-lg text-muted-foreground">
              Comprehensive development services to bring your ideas to life. From concept to deployment and beyond.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {services.map((service) => (
              <Card key={service.title} variant="outlined" padding="lg" className="h-full">
                <CardContent className="pt-0">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <service.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                  <p className="text-muted-foreground mb-6">{service.description}</p>
                  
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm">
                        <Check className="h-4 w-4 text-primary shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="flex items-center justify-between pt-4 border-t">
                    <span className="font-semibold">{service.price}</span>
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/contact">
                        Inquire
                        <ArrowRight className="ml-1 h-3 w-3" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <Section padding="xl" variant="muted">
        <Container size="lg">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <Heading level={2} variant="section" className="mb-4">
              My Process
            </Heading>
            <p className="text-muted-foreground text-lg">
              A structured approach to deliver quality software on time and within budget.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {process.map((item) => (
              <div key={item.step} className="relative pl-12">
                <div className="text-3xl font-bold text-primary/20 mb-2">{item.step}</div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section padding="xl" variant="bordered">
        <Container size="lg">
          <div className="text-center max-w-2xl mx-auto">
            <Heading level={2} variant="section" className="mb-4">
              Ready to start a project?
            </Heading>
            <p className="text-muted-foreground text-lg mb-8">
              Let&apos;s discuss your requirements and find the best solution for your needs.
            </p>
            <Button size="lg" asChild>
              <Link href="/contact">
                Get a Quote
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </Container>
      </Section>
    </div>
  );
}