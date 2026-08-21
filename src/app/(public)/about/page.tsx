import { Metadata } from "next";
import { Section, Container, Heading, Card, CardContent, Badge } from "@/components";
import { Code, Server, Database, Cloud, Globe, Award, BookOpen, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "About",
  description: "Learn more about my background, experience, and approach to software development.",
};

const stats = [
  { value: "8+", label: "Years Experience" },
  { value: "50+", label: "Projects Completed" },
  { value: "20+", label: "Happy Clients" },
  { value: "15+", label: "Technologies" },
];

const values = [
  { icon: Code, title: "Clean Code", description: "Writing maintainable, well-tested code that stands the test of time." },
  { icon: Server, title: "Performance First", description: "Optimizing for speed, scalability, and user experience." },
  { icon: Database, title: "Data Integrity", description: "Designing robust data models and ensuring consistency." },
  { icon: Cloud, title: "Cloud Native", description: "Building for modern cloud infrastructure and DevOps practices." },
  { icon: Globe, title: "Accessibility", description: "Creating inclusive experiences for all users." },
  { icon: Award, title: "Continuous Learning", description: "Staying current with evolving technologies and best practices." },
];

const timeline = [
  { year: "2022–Present", title: "Senior Freelance Developer", description: "Building custom web applications for clients across various industries. Specializing in React, Next.js, TypeScript, and cloud-native architectures." },
  { year: "2019–2021", title: "Lead Developer at TechCorp Inc.", description: "Led a team of 5 developers building SaaS products. Architected migration from monolith to microservices. Reduced deployment time by 80%." },
  { year: "2017–2019", title: "Full-Stack Developer at StartupXYZ", description: "Built and maintained customer-facing web applications. Implemented real-time features using WebSockets. Mentored junior developers." },
  { year: "2015–2017", title: "Junior Developer at Digital Agency", description: "Developed responsive websites and web applications for agency clients. Learned modern frontend practices and version control." },
];

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Section padding="xl">
        <Container size="lg">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <Heading level={1} variant="display" className="mb-6">
              About Me
            </Heading>
            <p className="text-lg text-muted-foreground mb-8">
              I&apos;m a Senior Full-Stack Developer with 8+ years of experience building scalable web applications.
              I specialize in React, Next.js, TypeScript, and cloud-native architectures.
            </p>
            <p className="text-muted-foreground">
              Throughout my career, I&apos;ve worked with startups, agencies, and enterprise companies,
              delivering projects that solve real business problems. I believe in clean code,
              thorough testing, and continuous learning.
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

          <Heading level={2} variant="section" className="mb-8 text-center">
            Core Values
          </Heading>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-16">
            {values.map((value) => (
              <Card key={value.title} variant="outlined" padding="lg">
                <CardContent className="pt-0">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <value.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{value.title}</h3>
                  <p className="text-muted-foreground text-sm">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Heading level={2} variant="section" className="mb-8 text-center">
            Journey
          </Heading>
          <div className="max-w-2xl mx-auto space-y-8">
            {timeline.map((item, index) => (
              <div key={item.year} className="relative pl-8 pb-8 border-l border-border last:border-0 last:pb-0">
                <div className="absolute left-0 top-0 w-4 h-4 rounded-full bg-primary border-4 border-background -translate-x-1/2" />
                <div className="text-sm font-medium text-primary mb-1">{item.year}</div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section padding="xl" variant="muted">
        <Container size="lg">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <Heading level={2} variant="section" className="mb-4">
              Education & Certifications
            </Heading>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: BookOpen, title: "B.Sc. Computer Science", org: "University of Technology", year: "2015" },
              { icon: Award, title: "AWS Certified Solutions Architect", org: "Amazon Web Services", year: "2021" },
              { icon: Users, title: "Scrum Master Certified", org: "Scrum Alliance", year: "2020" },
            ].map((edu) => (
              <Card key={edu.title} variant="outlined" padding="lg">
                <CardContent className="pt-0">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <edu.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-1">{edu.title}</h3>
                  <p className="text-muted-foreground text-sm mb-1">{edu.org}</p>
                  <p className="text-muted-foreground text-sm">{edu.year}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </Section>
    </div>
  );
}