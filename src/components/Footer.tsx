import Link from "next/link";
import { Github, Linkedin, Twitter, Mail, Code, Heart } from "lucide-react";
import { Button } from "@/components";

const footerLinks = {
  navigation: [
    { name: "Projects", href: "/projects" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Skills", href: "/skills" },
    { name: "Experience", href: "/experience" },
    { name: "Testimonials", href: "/testimonials" },
    { name: "Contact", href: "/contact" },
  ],
  social: [
    { name: "GitHub", href: "https://github.com", icon: Github },
    { name: "LinkedIn", href: "https://linkedin.com", icon: Linkedin },
    { name: "Twitter", href: "https://twitter.com", icon: Twitter },
    { name: "Email", href: "mailto:hello@example.com", icon: Mail },
  ],
};

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-muted/50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-8 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <Link href="/" className="font-display text-xl font-bold">
              <Code className="h-6 w-6 mr-2 inline-block" />
              Portfolio
            </Link>
            <p className="mt-4 text-sm text-muted-foreground max-w-xs">
              Senior Full-Stack Developer building scalable web applications with React, Next.js, TypeScript, and cloud-native architectures.
            </p>
            <div className="mt-6 flex gap-4">
              {footerLinks.social.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label={social.name}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider">Navigation</h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.navigation.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider">Services</h3>
            <ul className="mt-4 space-y-3">
              <li><Link href="/services#web-development" className="text-sm text-muted-foreground hover:text-primary transition-colors">Web Development</Link></li>
              <li><Link href="/services#api-development" className="text-sm text-muted-foreground hover:text-primary transition-colors">API Development</Link></li>
              <li><Link href="/services#database-design" className="text-sm text-muted-foreground hover:text-primary transition-colors">Database Design</Link></li>
              <li><Link href="/services#devops" className="text-sm text-muted-foreground hover:text-primary transition-colors">DevOps & Cloud</Link></li>
              <li><Link href="/services#consulting" className="text-sm text-muted-foreground hover:text-primary transition-colors">Technical Consulting</Link></li>
              <li><Link href="/services#audits" className="text-sm text-muted-foreground hover:text-primary transition-colors">Code Audits</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider">Connect</h3>
            <p className="mt-4 text-sm text-muted-foreground">
              Interested in working together? Let&apos;s chat about your project.
            </p>
            <Link href="/contact" className="mt-4 inline-block">
              <Button size="sm" variant="outline">
                Get In Touch
                <Mail className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © {currentYear} Portfolio. Built with Next.js, TypeScript, and Tailwind CSS.
            </p>
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              Made with <Heart className="h-4 w-4 text-red-500" /> by a developer
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}