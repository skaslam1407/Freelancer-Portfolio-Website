"use client";

import { useState } from "react";
import { Section, Container, Heading, Card, CardContent, Button, Input, Textarea, Badge } from "@/components";
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { useToast } from "@/components/Toast";

const contactInfo = [
  { icon: Mail, label: "Email", value: "hello@example.com", href: "mailto:hello@example.com" },
  { icon: Phone, label: "Phone", value: "+1 (555) 123-4567", href: "tel:+15551234567" },
  { icon: MapPin, label: "Location", value: "San Francisco, CA", href: null },
];

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    projectType: "",
    budget: "",
    timeline: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const { addToast } = useToast();

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Invalid email format";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    else if (formData.message.trim().length < 20) newErrors.message = "Message must be at least 20 characters";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSubmitStatus("success");
      setFormData({
        name: "",
        email: "",
        company: "",
        projectType: "",
        budget: "",
        timeline: "",
        message: "",
      });
      addToast({ title: "Message sent!", description: "I'll get back to you within 24 hours.", type: "success" });
    } catch {
      setSubmitStatus("error");
      addToast({ title: "Failed to send", description: "Please try again or email directly.", type: "error" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Section padding="xl">
        <Container size="lg">
          <div className="grid gap-12 lg:grid-cols-3">
            <div className="lg:col-span-1">
              <Heading level={1} variant="display" className="mb-6">
                Get In Touch
              </Heading>
              <p className="text-lg text-muted-foreground mb-10">
                Have a project in mind? Questions about my services? I&apos;d love to hear from you.
                Fill out the form or reach out directly through any of the channels below.
              </p>

              <div className="space-y-6">
                {contactInfo.map((item) => (
                  <div key={item.label} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <item.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{item.label}</p>
                      {item.href ? (
                        <a href={item.href} className="text-muted-foreground hover:text-primary transition-colors">
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-muted-foreground">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10 pt-8 border-t">
                <h3 className="font-semibold mb-4">Typical Response Time</h3>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>Within 24 hours on business days</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2">
              <Card variant="outlined" padding="lg">
                <CardContent className="pt-0">
                  {submitStatus === "success" ? (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">Message Sent!</h3>
                      <p className="text-muted-foreground mb-6">
                        Thank you for reaching out. I&apos;ll get back to you within 24 hours.
                      </p>
                      <Button onClick={() => setSubmitStatus("idle")}>
                        Send Another Message
                      </Button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid gap-6 sm:grid-cols-2">
                        <Input
                          label="Name *"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="John Doe"
                          error={errors.name}
                        />
                        <Input
                          label="Email *"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="john@example.com"
                          error={errors.email}
                        />
                      </div>

                      <div className="grid gap-6 sm:grid-cols-2">
                        <Input
                          label="Company"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          placeholder="Acme Inc."
                        />
                        <select
                          name="projectType"
                          value={formData.projectType}
                          onChange={handleChange}
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <option value="">Project Type</option>
                          <option value="web-app">Web Application</option>
                          <option value="api">API Development</option>
                          <option value="database">Database Design</option>
                          <option value="devops">DevOps/Cloud</option>
                          <option value="consulting">Technical Consulting</option>
                          <option value="audit">Code Audit</option>
                          <option value="other">Other</option>
                        </select>
                      </div>

                      <div className="grid gap-6 sm:grid-cols-2">
                        <select
                          name="budget"
                          value={formData.budget}
                          onChange={handleChange}
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <option value="">Budget Range</option>
                          <option value="5k-10k">$5,000 - $10,000</option>
                          <option value="10k-25k">$10,000 - $25,000</option>
                          <option value="25k-50k">$25,000 - $50,000</option>
                          <option value="50k-100k">$50,000 - $100,000</option>
                          <option value="100k+">$100,000+</option>
                          <option value="hourly">Hourly Consulting</option>
                        </select>
                        <select
                          name="timeline"
                          value={formData.timeline}
                          onChange={handleChange}
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <option value="">Timeline</option>
                          <option value="asap">ASAP</option>
                          <option value="1-month">1 Month</option>
                          <option value="2-3-months">2-3 Months</option>
                          <option value="3-6-months">3-6 Months</option>
                          <option value="6-months+">6+ Months</option>
                          <option value="flexible">Flexible</option>
                        </select>
                      </div>

                      <Textarea
                        label="Message *"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell me about your project, goals, and any specific requirements..."
                        rows={6}
                        error={errors.message}
                        hint="Minimum 20 characters"
                      />

                      {submitStatus === "error" && (
                        <div className="flex items-center gap-2 p-4 rounded-lg bg-destructive/10 text-destructive">
                          <AlertCircle className="h-5 w-5" />
                          <span>Failed to send message. Please try again or email directly.</span>
                        </div>
                      )}

                      <Button type="submit" size="lg" className="w-full sm:w-auto" disabled={isSubmitting}>
                        {isSubmitting ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            Send Message
                            <Send className="ml-2 h-4 w-4" />
                          </>
                        )}
                      </Button>

                      <p className="text-xs text-muted-foreground text-center">
                        By submitting this form, you agree to my privacy policy. No spam, ever.
                      </p>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </Container>
      </Section>

      <Section padding="xl" variant="muted">
        <Container size="lg">
          <div className="text-center max-w-2xl mx-auto">
            <Heading level={2} variant="section" className="mb-4">
              Frequently Asked Questions
            </Heading>
            <div className="space-y-6 text-left max-w-xl mx-auto">
              {[
                { q: "What's your typical project timeline?", a: "Most projects take 2-6 months from discovery to deployment. Smaller projects like API development or audits can be completed in 2-4 weeks." },
                { q: "Do you work with existing teams?", a: "Yes, I frequently join existing teams as a senior developer or technical lead. I'm experienced in code reviews, mentoring, and establishing best practices." },
                { q: "What's your availability?", a: "I typically book 4-6 weeks in advance for new projects. For urgent needs, I may have capacity for shorter engagements. Let's discuss your timeline." },
                { q: "Do you provide ongoing support?", a: "Yes, I offer maintenance retainers for ongoing support, updates, and feature development after project launch. Terms are flexible based on your needs." },
              ].map((faq, i) => (
                <div key={i} className="p-4 rounded-lg bg-background border border-border">
                  <p className="font-medium mb-1">{faq.q}</p>
                  <p className="text-muted-foreground text-sm">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}