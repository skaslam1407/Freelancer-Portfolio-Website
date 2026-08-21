import { Metadata } from "next";
import { Section, Container, Heading, Badge, Card, CardContent } from "@/components";
import { Code, Server, Database, Cloud, Globe, Layers } from "lucide-react";

export const metadata: Metadata = {
  title: "Skills",
  description: "Technical skills and technologies I work with, including frontend, backend, database, DevOps, and more.",
};

const skillCategories = [
  {
    category: "Frontend",
    icon: Code,
    skills: [
      { name: "React", level: 95 },
      { name: "Next.js", level: 90 },
      { name: "TypeScript", level: 95 },
      { name: "Tailwind CSS", level: 90 },
      { name: "HTML5/CSS3", level: 95 },
      { name: "Vue.js", level: 70 },
      { name: "Svelte", level: 60 },
      { name: "React Native", level: 75 },
    ],
  },
  {
    category: "Backend",
    icon: Server,
    skills: [
      { name: "Node.js", level: 90 },
      { name: "Express/NestJS", level: 85 },
      { name: "Go", level: 75 },
      { name: "Python", level: 70 },
      { name: "GraphQL", level: 85 },
      { name: "REST APIs", level: 95 },
      { name: "WebSockets", level: 80 },
      { name: "Serverless", level: 80 },
    ],
  },
  {
    category: "Database",
    icon: Database,
    skills: [
      { name: "PostgreSQL", level: 90 },
      { name: "MySQL", level: 85 },
      { name: "MongoDB", level: 80 },
      { name: "Redis", level: 85 },
      { name: "Prisma ORM", level: 90 },
      { name: "Drizzle ORM", level: 75 },
      { name: "Supabase", level: 85 },
      { name: "Database Design", level: 90 },
    ],
  },
  {
    category: "DevOps & Cloud",
    icon: Cloud,
    skills: [
      { name: "Docker", level: 90 },
      { name: "Kubernetes", level: 75 },
      { name: "AWS", level: 85 },
      { name: "Vercel", level: 95 },
      { name: "GitHub Actions", level: 90 },
      { name: "Terraform", level: 70 },
      { name: "CI/CD Pipelines", level: 90 },
      { name: "Monitoring/Logging", level: 80 },
    ],
  },
  {
    category: "Tools & Practices",
    icon: Globe,
    skills: [
      { name: "Git", level: 95 },
      { name: "Testing (Jest, Cypress)", level: 85 },
      { name: "TypeScript", level: 95 },
      { name: "Agile/Scrum", level: 90 },
      { name: "Code Review", level: 95 },
      { name: "Documentation", level: 85 },
      { name: "Mentoring", level: 85 },
      { name: "Technical Writing", level: 80 },
    ],
  },
  {
    category: "Architecture",
    icon: Layers,
    skills: [
      { name: "Microservices", level: 85 },
      { name: "System Design", level: 90 },
      { name: "Event-Driven Architecture", level: 80 },
      { name: "Domain-Driven Design", level: 75 },
      { name: "Clean Architecture", level: 85 },
      { name: "API Gateway Patterns", level: 80 },
      { name: "Caching Strategies", level: 85 },
      { name: "Security Best Practices", level: 90 },
    ],
  },
];

const proficiencyLevels = [
  { level: "Expert", range: "90-100%", description: "Deep expertise, can architect and lead complex projects" },
  { level: "Advanced", range: "75-89%", description: "Strong practical experience, can work independently" },
  { level: "Intermediate", range: "60-74%", description: "Solid understanding, can contribute effectively" },
  { level: "Learning", range: "Below 60%", description: "Actively learning, basic practical experience" },
];

export default function SkillsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Section padding="xl">
        <Container size="lg">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <Heading level={1} variant="display" className="mb-6">
              Skills & Technologies
            </Heading>
            <p className="text-lg text-muted-foreground">
              A comprehensive overview of the technologies and practices I work with daily.
              Proficiency levels are based on years of professional experience.
            </p>
          </div>

          <div className="space-y-12">
            {skillCategories.map((category) => (
              <div key={category.category}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <category.icon className="h-5 w-5 text-primary" />
                  </div>
                  <Heading level={2} variant="subsection" className="mb-0">
                    {category.category}
                  </Heading>
                </div>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {category.skills.map((skill) => (
                    <Card key={skill.name} variant="outlined" padding="md" className="text-center">
                      <CardContent className="pt-0">
                        <h4 className="font-semibold mb-2">{skill.name}</h4>
                        <div className="w-full h-2 bg-muted rounded-full overflow-hidden mb-2">
                          <div
                            className="h-full bg-primary rounded-full transition-all duration-500"
                            style={{ width: `${skill.level}%` }}
                          />
                        </div>
                        <Badge
                          variant={skill.level >= 90 ? "default" : skill.level >= 75 ? "secondary" : "outline"}
                          size="sm"
                        >
                          {skill.level}%
                        </Badge>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section padding="xl" variant="muted">
        <Container size="lg">
          <Heading level={2} variant="section" className="mb-8 text-center">
            Proficiency Levels
          </Heading>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {proficiencyLevels.map((level) => (
              <Card key={level.level} variant="outlined" padding="lg" className="text-center">
                <CardContent className="pt-0">
                  <div className="text-2xl font-bold text-primary mb-2">{level.level}</div>
                  <div className="text-muted-foreground text-sm mb-2">{level.range}</div>
                  <p className="text-sm">{level.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <Section padding="xl" variant="bordered">
        <Container size="lg">
          <div className="text-center max-w-2xl mx-auto">
            <Heading level={2} variant="section" className="mb-4">
              Always Learning
            </Heading>
            <p className="text-muted-foreground text-lg mb-8">
              Technology evolves rapidly. I&apos;m constantly exploring new tools, frameworks, and paradigms
              to deliver better solutions for my clients.
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {["Rust", "WebAssembly", "Edge Computing", "AI/ML Integration", "React Server Components"].map((tech) => (
                <Badge key={tech} variant="secondary">
                  Exploring: {tech}
                </Badge>
              ))}
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}