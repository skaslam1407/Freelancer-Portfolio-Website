"use client";

import { useState } from "react";
import { Heading, Button, Card, CardContent, CardHeader, CardTitle, Input, Textarea, Select } from "@/components";
import { ArrowLeft, Loader2, Save, Star } from "lucide-react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/Toast";
import Link from "next/link";

const statusOptions = [
  { value: "draft", label: "Draft" },
  { value: "published", label: "Published" },
];

const ratingOptions = [1, 2, 3, 4, 5].map(n => ({ value: String(n), label: `${n} Star${n > 1 ? 's' : ''}` }));

export default function NewTestimonialForm() {
  const router = useRouter();
  const { addToast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    company: "",
    quote: "",
    avatar_url: "",
    rating: 5,
    sort_order: 0,
    status: "draft" as "draft" | "published",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.quote.trim()) newErrors.quote = "Quote is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/admin/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "Failed to create testimonial");
      }

      addToast({ title: "Testimonial created", description: "Testimonial has been created successfully", type: "success" });
      router.push("/admin/testimonials");
      router.refresh();
    } catch (err: any) {
      addToast({ title: "Failed to create", description: err.message || "Please try again", type: "error" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const parsedValue = type === "number" ? Number(value) : (type === "checkbox" ? (e.target as HTMLInputElement).checked : value);
    setFormData((prev) => ({ ...prev, [name]: parsedValue }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/admin/testimonials">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <Heading level={1} variant="display" className="mb-1">
            New Testimonial
          </Heading>
          <p className="text-muted-foreground">Add a new client testimonial</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card variant="outlined" padding="lg">
          <CardHeader>
            <CardTitle>Testimonial Details</CardTitle>
          </CardHeader>
          <CardContent className="pt-0 space-y-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <Input
                label="Client Name *"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Client Name"
                error={errors.name}
              />
              <Input
                label="Role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                placeholder="e.g., CTO, Product Manager"
              />
            </div>

            <Input
              label="Company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="Company Name"
            />

            <Textarea
              label="Quote *"
              name="quote"
              value={formData.quote}
              onChange={handleChange}
              placeholder="Client testimonial quote..."
              rows={4}
              error={errors.quote}
            />

            <Input
              label="Avatar URL (optional)"
              name="avatar_url"
              value={formData.avatar_url}
              onChange={handleChange}
              placeholder="https://example.com/avatar.jpg"
            />

            <div className="grid gap-6 sm:grid-cols-3">
              <Select
                label="Rating"
                name="rating"
                value={formData.rating}
                onChange={handleChange}
                options={ratingOptions}
              />

              <Input
                label="Sort Order"
                name="sort_order"
                type="number"
                value={formData.sort_order}
                onChange={handleChange}
              />

              <Select
                label="Status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                options={statusOptions}
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4">
          <Button variant="outline" asChild>
            <Link href="/admin/testimonials">Cancel</Link>
          </Button>
          <Button type="submit" size="lg" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Create Testimonial
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}