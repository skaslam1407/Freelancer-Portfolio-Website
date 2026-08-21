"use client";

import { useState } from "react";
import { Heading, Button, Card, CardContent, CardHeader, CardTitle, Input, Textarea, Select, Badge } from "@/components";
import { ArrowLeft, Loader2, Save, Image as ImageIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/Toast";
import Link from "next/link";
import { MediaUploader } from "@/components/MediaUploader";

const statusOptions = [
  { value: "draft", label: "Draft" },
  { value: "published", label: "Published" },
];

const technologyOptions = [
  "React", "Next.js", "TypeScript", "Node.js", "PostgreSQL", "MongoDB",
  "GraphQL", "REST API", "Docker", "AWS", "Vercel", "Tailwind CSS",
  "Prisma", "Supabase", "Redis", "Go", "Python", "Vue.js",
];

export default function NewProjectForm() {
  const router = useRouter();
  const { addToast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    short_description: "",
    description: "",
    role: "",
    client_name: "",
    project_url: "",
    repository_url: "",
    featured: false,
    status: "draft" as "draft" | "published",
    sort_order: 0,
    technologies: [] as string[],
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [mediaFiles, setMediaFiles] = useState<{ storage_path: string; media_type: "image" | "video" }[]>([]);
  const [coverMediaId, setCoverMediaId] = useState("");

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.slug.trim()) newErrors.slug = "Slug is required";
    else if (!/^[a-z0-9-]+$/.test(formData.slug)) newErrors.slug = "Slug must be lowercase alphanumeric with hyphens only";
    if (formData.project_url && !/^https?:\/\//.test(formData.project_url)) newErrors.project_url = "Invalid URL format";
    if (formData.repository_url && !/^https?:\/\//.test(formData.repository_url)) newErrors.repository_url = "Invalid URL format";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      addToast({ title: "Project created", description: "Project has been created successfully", type: "success" });
      router.push("/admin/projects");
      router.refresh();
    } catch {
      addToast({ title: "Failed to create", description: "Please try again", type: "error" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({ ...prev, [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleTechAdd = (tech: string) => {
    if (!formData.technologies.includes(tech)) {
      setFormData((prev) => ({ ...prev, technologies: [...prev.technologies, tech] }));
    }
  };

  const handleTechRemove = (tech: string) => {
    setFormData((prev) => ({ ...prev, technologies: prev.technologies.filter((t) => t !== tech) }));
  };

  const generateSlug = () => {
    const slug = formData.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    setFormData((prev) => ({ ...prev, slug }));
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/admin/projects">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <Heading level={1} variant="display" className="mb-1">
            New Project
          </Heading>
          <p className="text-muted-foreground">Create a new portfolio project</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card variant="outlined" padding="lg">
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="pt-0 space-y-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <Input
                label="Title *"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Project Title"
                error={errors.title}
                onBlur={generateSlug}
              />
              <Input
                label="Slug *"
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                placeholder="project-slug"
                error={errors.slug}
                hint="Auto-generated from title. Lowercase, alphanumeric, hyphens only."
              />
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <Input
                label="Role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                placeholder="Lead Developer"
              />
              <Input
                label="Client Name"
                name="client_name"
                value={formData.client_name}
                onChange={handleChange}
                placeholder="Client Company"
              />
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <Input
                label="Project URL"
                name="project_url"
                type="url"
                value={formData.project_url}
                onChange={handleChange}
                placeholder="https://example.com"
                error={errors.project_url}
              />
              <Input
                label="Repository URL"
                name="repository_url"
                type="url"
                value={formData.repository_url}
                onChange={handleChange}
                placeholder="https://github.com/user/repo"
                error={errors.repository_url}
              />
            </div>
          </CardContent>
        </Card>

        <Card variant="outlined" padding="lg">
          <CardHeader>
            <CardTitle>Descriptions</CardTitle>
          </CardHeader>
          <CardContent className="pt-0 space-y-6">
            <Textarea
              label="Short Description *"
              name="short_description"
              value={formData.short_description}
              onChange={handleChange}
              placeholder="A brief summary for project cards (max 500 chars)"
              rows={3}
              error={errors.short_description}
            />
            <Textarea
              label="Full Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Detailed project description with markdown support..."
              rows={8}
            />
          </CardContent>
        </Card>

        <Card variant="outlined" padding="lg">
          <CardHeader>
            <CardTitle>Technologies</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex flex-wrap gap-2 mb-4">
              {technologyOptions.map((tech) => (
                <Button
                  key={tech}
                  type="button"
                  variant={formData.technologies.includes(tech) ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleTechAdd(tech)}
                >
                  {tech}
                </Button>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.technologies.map((tech) => (
                <Badge key={tech} variant="default" className="gap-1" onClick={() => handleTechRemove(tech)}>
                  {tech}
                  <span onClick={(e) => { e.stopPropagation(); handleTechRemove(tech); }} className="cursor-pointer">×</span>
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card variant="outlined" padding="lg">
          <CardHeader>
            <CardTitle>Media</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <MediaUploader
              onUploadComplete={setMediaFiles}
              maxFiles={10}
              maxFileSize={50}
            />
            {mediaFiles.length > 0 && (
              <div className="mt-4">
                <label className="block text-sm font-medium mb-2">Cover Image</label>
                <select
                  value={coverMediaId}
                  onChange={(e) => setCoverMediaId(e.target.value)}
                  className="flex h-10 w-full max-w-md rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  <option value="">Select cover image</option>
                  {mediaFiles.map((m, i) => (
                    <option key={i} value={m.storage_path}>
                      {m.storage_path} ({m.media_type})
                    </option>
                  ))}
                </select>
              </div>
            )}
          </CardContent>
        </Card>

        <Card variant="outlined" padding="lg">
          <CardHeader>
            <CardTitle>Settings</CardTitle>
          </CardHeader>
          <CardContent className="pt-0 space-y-6">
            <div className="grid gap-6 sm:grid-cols-3">
              <Select
                label="Status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                options={statusOptions}
              />
              <Input
                label="Sort Order"
                name="sort_order"
                type="number"
                value={formData.sort_order}
                onChange={handleChange}
              />
              <div className="flex items-end">
                <div className="flex items-center space-x-2 w-full">
                  <input
                    type="checkbox"
                    name="featured"
                    checked={formData.featured}
                    onChange={handleChange}
                    className="h-4 w-4 rounded border-border text-primary focus:ring-2 focus:ring-ring"
                  />
                  <label className="text-sm font-medium cursor-pointer">Featured Project</label>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4">
          <Button variant="outline" asChild>
            <Link href="/admin/projects">Cancel</Link>
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
                Create Project
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}