"use client";

import { useState } from "react";
import { Heading, Button, Card, CardContent, Badge, Input } from "@/components";
import { AdminDataTable, Column } from "@/components/AdminDataTable";
import { Plus, Search, MoreVertical, Edit, Trash2, Eye, ExternalLink, Copy } from "lucide-react";
import { useToast } from "@/components/Toast";
import Link from "next/link";
import type { Project } from "@/types";

const statusOptions = [
  { value: "", label: "All Status" },
  { value: "published", label: "Published" },
  { value: "draft", label: "Draft" },
];

interface AdminProjectsContentProps {
  initialProjects: Project[];
}

export default function AdminProjectsContent({ initialProjects }: AdminProjectsContentProps) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set());
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const { addToast } = useToast();

  const filteredProjects = projects.filter((p) => {
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.slug.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = !statusFilter || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const columns: Column<Project>[] = [
    {
      key: "title",
      header: "Title",
      accessor: (p) => (
        <div>
          <p className="font-medium">{p.title}</p>
          <p className="text-xs text-muted-foreground">{p.slug}</p>
        </div>
      ),
      sortable: true,
    },
    {
      key: "description",
      header: "Description",
      accessor: (p) => <p className="text-sm text-muted-foreground max-w-xs truncate">{p.short_description}</p>,
    },
    {
      key: "status",
      header: "Status",
      accessor: (p) => (
        <Badge variant={p.status === "published" ? "success" : "secondary"} size="sm">
          {p.status.charAt(0).toUpperCase() + p.status.slice(1)}
        </Badge>
      ),
      sortable: true,
    },
    {
      key: "featured",
      header: "Featured",
      accessor: (p) => (
        <Badge variant={p.featured ? "default" : "outline"} size="sm">
          {p.featured ? "Yes" : "No"}
        </Badge>
      ),
      sortable: true,
    },
    {
      key: "sort_order",
      header: "Order",
      accessor: (p) => <span className="font-mono">{p.sort_order}</span>,
      sortable: true,
    },
    {
      key: "updated_at",
      header: "Updated",
      accessor: (p) => <span className="text-sm text-muted-foreground">{new Date(p.updated_at).toLocaleDateString()}</span>,
      sortable: true,
    },
  ];

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    setDeletingId(id);
    try {
      const res = await fetch(`/api/admin/projects/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");
      setProjects((prev) => prev.filter((p) => p.id !== id));
      addToast({ title: "Project deleted", type: "success" });
    } catch {
      addToast({ title: "Failed to delete", type: "error" });
    } finally {
      setDeletingId(null);
    }
  };

  const handleDuplicate = async (id: string) => {
    try {
      const project = projects.find((p) => p.id === id);
      if (!project) return;
      
      const res = await fetch("/api/admin/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...project,
          title: `${project.title} (Copy)`,
          slug: `${project.slug}-copy`,
          status: "draft",
          id: undefined,
          created_at: undefined,
          updated_at: undefined,
        }),
      });
      
      if (!res.ok) throw new Error("Failed to duplicate");
      
      const { data } = await res.json();
      setProjects((prev) => [data, ...prev]);
      addToast({ title: "Project duplicated", type: "success" });
    } catch {
      addToast({ title: "Failed to duplicate", type: "error" });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Heading level={1} variant="display" className="mb-2">
            Projects
          </Heading>
          <p className="text-muted-foreground">Manage your portfolio projects</p>
        </div>
        <Button asChild>
          <Link href="/admin/projects/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Project
          </Link>
        </Button>
      </div>

      <Card variant="outlined" padding="md">
        <CardContent className="pt-0">
          <div className="flex flex-wrap gap-4">
            <div className="relative flex-1 min-w-[250px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search projects..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="flex h-10 w-[180px] rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {statusOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
        </CardContent>
      </Card>

      <Card variant="outlined" padding="none">
        <CardContent className="pt-0">
          <AdminDataTable
            columns={columns}
            data={filteredProjects}
            keyAccessor={(p) => p.id}
            selectable
            selectedKeys={selectedKeys}
            onSelectionChange={setSelectedKeys}
            onRowClick={(p) => {}}
            actions={(p) => (
              <div className="flex items-center justify-end gap-1">
                <Button variant="ghost" size="icon" asChild>
                  <Link href={`/admin/projects/${p.id}`}>
                    <Eye className="h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="ghost" size="icon" asChild>
                  <Link href={`/admin/projects/${p.id}/edit`}>
                    <Edit className="h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="ghost" size="icon" asChild>
                  <a href={`/projects/${p.slug}`} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
                <Button variant="ghost" size="icon" disabled={deletingId === p.id} onClick={() => handleDelete(p.id)}>
                  {deletingId === p.id ? <span className="h-4 w-4 animate-spin">⏳</span> : <Trash2 className="h-4 w-4" />}
                </Button>
              </div>
            )}
            emptyMessage="No projects found"
          />
        </CardContent>
      </Card>

      {selectedKeys.size > 0 && (
        <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
          <span className="text-sm font-medium">{selectedKeys.size} selected</span>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => handleDuplicate(Array.from(selectedKeys)[0])}>
              <Copy className="mr-2 h-3 w-3" />
              Duplicate
            </Button>
            <Button variant="destructive" size="sm" onClick={() => handleDelete(Array.from(selectedKeys)[0])}>
              <Trash2 className="mr-2 h-3 w-3" />
              Delete
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}