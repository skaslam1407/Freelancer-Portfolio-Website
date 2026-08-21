import { Metadata } from "next";
import { Section, Container, Heading, Card, CardContent, Badge } from "@/components";
import { Building2, Calendar, MapPin, CheckCircle, Briefcase } from "lucide-react";

export const metadata: Metadata = {
  title: "Experience",
  description: "Professional experience and career history in software development and engineering leadership.",
};

const experiences = [
  {
    id: "1",
    company: "Freelance",
    role: "Senior Full-Stack Developer",
    description: "Building custom web applications for clients across various industries including e-commerce, SaaS, fintech, and healthcare. Specializing in React, Next.js, TypeScript, and cloud-native architectures. Leading projects from discovery through deployment and ongoing maintenance.",
    start_date: "2022-01",
    end_date: null,
    is_current: true,
    location: "Remote",
    achievements: [
      "Delivered 20+ production applications with 99.9% uptime",
      "Reduced client development costs by 40% through reusable components",
      "Implemented CI/CD pipelines reducing deployment time from hours to minutes",
      "Mentored 5 junior developers who advanced to mid-level roles",
    ],
    technologies: ["React", "Next.js", "TypeScript", "PostgreSQL", "AWS", "Docker", "GraphQL"],
  },
  {
    id: "2",
    company: "TechCorp Inc.",
    role: "Lead Developer",
    description: "Led a team of 5 developers building B2B SaaS products. Responsible for technical architecture, code reviews, and delivery management. Championed the migration from a monolithic Rails application to a modern microservices architecture.",
    start_date: "2019-03",
    end_date: "2021-12",
    is_current: false,
    location: "San Francisco, CA",
    achievements: [
      "Architected and led migration to microservices, reducing deployment time by 80%",
      "Established engineering standards: testing, code review, documentation",
      "Introduced GraphQL federation unifying 8 backend services",
      "Reduced infrastructure costs by 45% through container optimization",
      "Built internal developer platform improving team velocity by 60%",
    ],
    technologies: ["React", "Node.js", "GraphQL", "Kubernetes", "PostgreSQL", "Redis", "Go"],
  },
  {
    id: "3",
    company: "StartupXYZ",
    role: "Full-Stack Developer",
    description: "Built and maintained customer-facing web applications for a Series B startup. Worked closely with product and design teams to deliver features on a two-week sprint cycle. Implemented real-time collaboration features using WebSockets.",
    start_date: "2017-06",
    end_date: "2019-02",
    is_current: false,
    location: "New York, NY",
    achievements: [
      "Built real-time collaborative editor supporting 100+ concurrent users",
      "Reduced page load times by 60% through code splitting and caching",
      "Implemented comprehensive testing strategy achieving 85% coverage",
      "Mentored 3 junior developers and conducted technical interviews",
    ],
    technologies: ["React", "Redux", "Node.js", "MongoDB", "Socket.io", "AWS"],
  },
  {
    id: "4",
    company: "Digital Agency",
    role: "Junior Developer",
    description: "Developed responsive websites and web applications for diverse agency clients including retail, hospitality, and non-profit organizations. Learned modern frontend practices, version control, and client communication.",
    start_date: "2015-09",
    end_date: "2017-05",
    is_current: false,
    location: "Chicago, IL",
    achievements: [
      "Delivered 30+ client projects on time and within budget",
      "Built reusable component library reducing development time by 30%",
      "Implemented automated testing and deployment workflows",
      "Collaborated with designers to create pixel-perfect implementations",
    ],
    technologies: ["HTML/CSS", "JavaScript", "jQuery", "WordPress", "PHP", "MySQL"],
  },
];

const education = [
  {
    degree: "Bachelor of Science in Computer Science",
    school: "University of Technology",
    year: "2015",
    honors: "Magna Cum Laude",
    details: "Focus: Software Engineering, Algorithms, Database Systems. Capstone: Distributed Task Queue System.",
  },
];

const certifications = [
  { name: "AWS Certified Solutions Architect – Associate", issuer: "Amazon Web Services", year: "2021" },
  { name: "Certified Scrum Master (CSM)", issuer: "Scrum Alliance", year: "2020" },
  { name: "Google Cloud Professional Developer", issuer: "Google Cloud", year: "2022" },
];

export default function ExperiencePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Section padding="xl">
        <Container size="lg">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <Heading level={1} variant="display" className="mb-6">
              Experience
            </Heading>
            <p className="text-lg text-muted-foreground">
              8+ years of professional software development experience across startups, agencies, and enterprise environments.
            </p>
          </div>

          <div className="space-y-8 max-w-3xl mx-auto">
            {experiences.map((exp, index) => (
              <Card key={exp.id} variant="outlined" padding="lg" className="relative">
                {exp.is_current && (
                  <div className="absolute -top-3 -right-3">
                    <Badge variant="success" className="flex items-center gap-1">
                      <CheckCircle className="h-3 w-3" />
                      Current
                    </Badge>
                  </div>
                )}
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Briefcase className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-baseline gap-2 mb-2">
                      <h3 className="text-xl font-semibold">{exp.role}</h3>
                      <span className="text-muted-foreground">at</span>
                      <span className="font-semibold">{exp.company}</span>
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-2">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(exp.start_date).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                        {" – "}
                        {exp.is_current ? "Present" : new Date(exp.end_date!).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {exp.location}
                      </span>
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground mb-4">{exp.description}</p>
                
                <div className="mb-4">
                  <h4 className="font-medium mb-2">Key Achievements</h4>
                  <ul className="space-y-1 text-sm">
                    {exp.achievements.map((achievement, i) => (
                      <li key={i} className="flex items-start gap-2 text-muted-foreground">
                        <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap gap-2">
                  {exp.technologies.map((tech) => (
                    <Badge key={tech} variant="secondary" size="sm">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <Section padding="xl" variant="muted">
        <Container size="lg">
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <Heading level={2} variant="section" className="mb-6">Education</Heading>
              <div className="space-y-6">
                {education.map((edu) => (
                  <Card key={edu.degree} variant="outlined" padding="lg">
                    <CardContent className="pt-0">
                      <h3 className="text-lg font-semibold mb-1">{edu.degree}</h3>
                      <p className="text-muted-foreground mb-1">{edu.school}</p>
                      <p className="text-sm text-muted-foreground mb-2">{edu.year} • {edu.honors}</p>
                      <p className="text-sm">{edu.details}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div>
              <Heading level={2} variant="section" className="mb-6">Certifications</Heading>
              <div className="space-y-4">
                {certifications.map((cert) => (
                  <Card key={cert.name} variant="outlined" padding="md">
                    <CardContent className="pt-0">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                          <CheckCircle className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-medium">{cert.name}</h4>
                          <p className="text-sm text-muted-foreground">{cert.issuer} • {cert.year}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}