import { Metadata } from "next";
import { Section, Container, Heading, Card, CardContent, Badge } from "@/components";
import { Star, MessageSquare, User, Linkedin, Twitter, Github } from "lucide-react";

export const metadata: Metadata = {
  title: "Testimonials",
  description: "What clients and colleagues say about working with me.",
};

const testimonials = [
  {
    id: "1",
    name: "Sarah Chen",
    role: "CTO",
    company: "TechStart",
    quote: "Exceptional technical skills and great communication. Delivered our project ahead of schedule with clean, maintainable code. The attention to detail and proactive approach to problem-solving made a huge difference.",
    avatar: null,
    rating: 5,
    project: "E-Commerce Platform",
  },
  {
    id: "2",
    name: "Marcus Johnson",
    role: "Product Manager",
    company: "InnovateCo",
    quote: "Deep understanding of both frontend and backend. Proactive about suggesting improvements and catching issues early. Always delivers quality work and is a pleasure to collaborate with.",
    avatar: null,
    rating: 5,
    project: "Task Management App",
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    role: "Founder",
    company: "GrowthLab",
    quote: "Reliable, skilled, and a pleasure to work with. Takes ownership of projects and delivers quality results consistently. The best freelance developer I've worked with in 10 years of running startups.",
    avatar: null,
    rating: 5,
    project: "Analytics Dashboard",
  },
  {
    id: "4",
    name: "David Park",
    role: "Engineering Manager",
    company: "DataFlow",
    quote: "Outstanding backend engineering skills. Designed a scalable API gateway that handles millions of requests daily. Great documentation and knowledge transfer to our internal team.",
    avatar: null,
    rating: 5,
    project: "API Gateway Service",
  },
  {
    id: "5",
    name: "Lisa Thompson",
    role: "VP of Engineering",
    company: "CloudScale",
    quote: "Transformed our development workflow with modern DevOps practices. Set up CI/CD, containerization, and monitoring that our team still uses today. Highly recommended for infrastructure projects.",
    avatar: null,
    rating: 5,
    project: "DevOps Transformation",
  },
  {
    id: "6",
    name: "James Wilson",
    role: "Technical Director",
    company: "Creative Agency",
    quote: "Perfect balance of technical excellence and business awareness. Delivers features that actually move the needle. Great at explaining complex technical concepts to non-technical stakeholders.",
    avatar: null,
    rating: 5,
    project: "Headless CMS",
  },
];

const stats = [
  { value: "6", label: "5-Star Reviews" },
  { value: "100%", label: "Client Satisfaction" },
  { value: "80%", label: "Repeat Clients" },
  { value: "4.9/5", label: "Average Rating" },
];

export default function TestimonialsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Section padding="xl">
        <Container size="lg">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <Heading level={1} variant="display" className="mb-6">
              Testimonials
            </Heading>
            <p className="text-lg text-muted-foreground">
              Feedback from clients and colleagues I&apos;ve had the pleasure of working with.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-16">
            {stats.map((stat) => (
              <Card key={stat.label} variant="outlined" padding="lg" className="text-center">
                <CardContent className="pt-0">
                  <div className="text-4xl font-bold text-primary mb-2">{stat.value}</div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} variant="outlined" padding="lg" className="h-full">
                <CardContent className="pt-0">
                  <div className="flex items-center gap-2 mb-4">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-lg mb-6">&ldquo;{testimonial.quote}&rdquo;</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role} at {testimonial.company}</p>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t">
                    <Badge variant="secondary" size="sm">
                      {testimonial.project}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <Section padding="xl" variant="muted">
        <Container size="lg">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <Heading level={2} variant="section" className="mb-4">
              Work With Me
            </Heading>
            <p className="text-muted-foreground text-lg">
              Ready to start your next project? Let&apos;s discuss how I can help.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="/contact" className="px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors">
              Get In Touch
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="px-6 py-3 rounded-lg border border-border bg-background font-medium hover:bg-accent transition-colors flex items-center gap-2">
              <Linkedin className="h-4 w-4" />
              LinkedIn
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="px-6 py-3 rounded-lg border border-border bg-background font-medium hover:bg-accent transition-colors flex items-center gap-2">
              <Github className="h-4 w-4" />
              GitHub
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="px-6 py-3 rounded-lg border border-border bg-background font-medium hover:bg-accent transition-colors flex items-center gap-2">
              <Twitter className="h-4 w-4" />
              Twitter
            </a>
          </div>
        </Container>
      </Section>
    </div>
  );
}