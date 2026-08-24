"use client";

import { useState } from "react";
import { Heading, Button, Card, CardContent, CardHeader, CardTitle, Input, Textarea, Select } from "@/components";
import { ArrowLeft, Loader2, Save } from "lucide-react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/Toast";
import Link from "next/link";

const iconOptions = [
  "code", "server", "database", "cloud", "cpu", "hard-drive",
  "globe", "layers", "terminal", "git-branch", "shield", "zap",
  "box", "network", "monitor", "smartphone", "tablet", "laptop",
];

const statusOptions = [
  { value: "draft", label: "Draft" },
  { value: "published", label: "Published" },
];

export default function NewServiceForm() {
  const router = useRouter();
  const { addToast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    icon: "code",
    sort_order: 0,
    status: "draft" as "draft" | "published",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.description.trim()) newErrors.description = "Description is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/admin/services", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "Failed to create service");
      }

      addToast({ title: "Service created", description: "Service has been created successfully", type: "success" });
      router.push("/admin/services");
      router.refresh();
    } catch (err: any) {
      addToast({ title: "Failed to create", description: err.message || "Please try again", type: "error" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({ ...prev, [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/admin/services">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <Heading level={1} variant="display" className="mb-1">
            New Service
          </Heading>
          <p className="text-muted-foreground">Create a new service offering</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card variant="outlined" padding="lg">
          <CardHeader>
            <CardTitle>Service Details</CardTitle>
          </CardHeader>
          <CardContent className="pt-0 space-y-6">
            <Input
              label="Title *"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Service Title"
              error={errors.title}
            />

            <Textarea
              label="Description *"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe your service offering..."
              rows={5}
              error={errors.description}
            />

            <div className="grid gap-6 sm:grid-cols-2">
              <Select
                label="Icon"
                name="icon"
                value={formData.icon}
                onChange={handleChange}
                options={iconOptions.map(i => ({ value: i, label: i }))}
              />

              <Input
                label="Sort Order"
                name="sort_order"
                type="number"
                value={formData.sort_order}
                onChange={handleChange}
              />
            </div>

            <Select
              label="Status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              options={statusOptions}
            />
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4">
          <Button variant="outline" asChild>
            <Link href="/admin/services">Cancel</Link>
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
                Create Service
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}