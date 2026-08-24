"use client";

import { useState } from "react";
import { Heading, Button, Card, CardContent, CardHeader, CardTitle, Input, Textarea, Select } from "@/components";
import { ArrowLeft, Loader2, Save, Calendar } from "lucide-react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/Toast";
import Link from "next/link";

const statusOptions = [
  { value: "draft", label: "Draft" },
  { value: "published", label: "Published" },
];

export default function NewExperienceForm() {
  const router = useRouter();
  const { addToast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    company: "",
    role: "",
    description: "",
    start_date: "",
    end_date: "",
    is_current: false,
    sort_order: 0,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.company.trim()) newErrors.company = "Company is required";
    if (!formData.role.trim()) newErrors.role = "Role is required";
    if (!formData.start_date) newErrors.start_date = "Start date is required";
    if (!formData.is_current && !formData.end_date) newErrors.end_date = "End date is required unless current position";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/admin/experiences", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "Failed to create experience");
      }

      addToast({ title: "Experience created", description: "Experience has been created successfully", type: "success" });
      router.push("/admin/experience");
      router.refresh();
    } catch (err: any) {
      addToast({ title: "Failed to create", description: err.message || "Please try again", type: "error" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined;
    setFormData((prev) => ({ ...prev, [name]: checked !== undefined ? checked : value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/admin/experience">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <Heading level={1} variant="display" className="mb-1">
            New Experience
          </Heading>
          <p className="text-muted-foreground">Add a new work experience entry</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card variant="outlined" padding="lg">
          <CardHeader>
            <CardTitle>Experience Details</CardTitle>
          </CardHeader>
          <CardContent className="pt-0 space-y-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <Input
                label="Company *"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="Company Name"
                error={errors.company}
              />
              <Input
                label="Role *"
                name="role"
                value={formData.role}
                onChange={handleChange}
                placeholder="Your Role/Title"
                error={errors.role}
              />
            </div>

            <Textarea
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe your responsibilities and achievements..."
              rows={4}
            />

            <div className="grid gap-6 sm:grid-cols-3">
              <div>
                <label className="block text-sm font-medium mb-1.5">Start Date *</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="month"
                    name="start_date"
                    value={formData.start_date}
                    onChange={handleChange}
                    className="flex h-10 w-full rounded-md border border-input bg-background pl-10 pr-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    required
                  />
                </div>
                {errors.start_date && <p className="mt-1 text-sm text-destructive">{errors.start_date}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">End Date</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="month"
                    name="end_date"
                    value={formData.end_date}
                    onChange={handleChange}
                    className="flex h-10 w-full rounded-md border border-input bg-background pl-10 pr-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    disabled={formData.is_current}
                  />
                </div>
                {errors.end_date && <p className="mt-1 text-sm text-destructive">{errors.end_date}</p>}
              </div>
              <div className="flex items-end">
                <div className="flex items-center space-x-2 w-full">
                  <input
                    type="checkbox"
                    name="is_current"
                    checked={formData.is_current}
                    onChange={handleChange}
                    className="h-4 w-4 rounded border-border text-primary focus:ring-2 focus:ring-ring"
                  />
                  <label className="text-sm font-medium cursor-pointer">Current Position</label>
                </div>
              </div>
            </div>

            <Input
              label="Sort Order"
              name="sort_order"
              type="number"
              value={formData.sort_order}
              onChange={handleChange}
            />
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4">
          <Button variant="outline" asChild>
            <Link href="/admin/experience">Cancel</Link>
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
                Create Experience
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}