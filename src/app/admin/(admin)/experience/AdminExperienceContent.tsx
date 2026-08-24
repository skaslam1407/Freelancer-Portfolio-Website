"use client";

import { useState } from "react";
import { Heading, Button, Card, CardContent, Badge, Input } from "@/components";
import { AdminDataTable, Column } from "@/components/AdminDataTable";
import { Plus, Search, Edit, Trash2, Calendar } from "lucide-react";
import { useToast } from "@/components/Toast";
import Link from "next/link";
import type { Experience } from "@/types";

interface AdminExperienceContentProps {
  initialExperiences: Experience[];
}

export default function AdminExperienceContent({ initialExperiences }: AdminExperienceContentProps) {
  const [search, setSearch] = useState("");
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set());
  const [experiences, setExperiences] = useState<Experience[]>(initialExperiences);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const { addToast } = useToast();

  const filtered = experiences.filter(e => e.company.toLowerCase().includes(search.toLowerCase()) || e.role.toLowerCase().includes(search.toLowerCase()));

  const columns: Column<Experience>[] = [
    { key: "company", header: "Company", accessor: (e) => e.company, sortable: true },
    { key: "role", header: "Role", accessor: (e) => e.role, sortable: true },
    { key: "period", header: "Period", accessor: (e) => `${new Date(e.start_date).toLocaleDateString("en-US", { month: "short", year: "numeric" })} – ${e.is_current ? "Present" : e.end_date ? new Date(e.end_date).toLocaleDateString("en-US", { month: "short", year: "numeric" }) : ""}` },
    { key: "current", header: "Current", accessor: (e) => <Badge variant={e.is_current ? "success" : "outline"} size="sm">{e.is_current ? "Yes" : "No"}</Badge> },
    { key: "sort_order", header: "Order", accessor: (e) => <span className="font-mono">{e.sort_order}</span>, sortable: true },
  ];

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this experience?")) return;
    setDeletingId(id);
    try {
      const res = await fetch(`/api/admin/experiences/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");
      setExperiences((prev) => prev.filter((e) => e.id !== id));
      addToast({ title: "Experience deleted", type: "success" });
    } catch {
      addToast({ title: "Failed to delete", type: "error" });
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><Heading level={1} variant="display" className="mb-2">Experience</Heading><p className="text-muted-foreground">Manage your professional experience</p></div>
        <Button asChild><Link href="/admin/experience/new"><Plus className="mr-2 h-4 w-4" />Add Experience</Link></Button>
      </div>
      <Card variant="outlined" padding="md"><CardContent className="pt-0"><div className="flex gap-4"><div className="relative flex-1 max-w-md"><Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" /><Input placeholder="Search experience..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" /></div></div></CardContent></Card>
      <Card variant="outlined" padding="none"><CardContent className="pt-0"><AdminDataTable columns={columns} data={filtered} keyAccessor={(e) => e.id} selectable selectedKeys={selectedKeys} onSelectionChange={setSelectedKeys} actions={(e) => (<div className="flex items-center justify-end gap-1"><Button variant="ghost" size="icon" asChild><Link href={`/admin/experience/${e.id}/edit`}><Edit className="h-4 w-4" /></Link></Button><Button variant="ghost" size="icon" disabled={deletingId === e.id} onClick={() => handleDelete(e.id)}>{deletingId === e.id ? <span className="h-4 w-4 animate-spin">⏳</span> : <Trash2 className="h-4 w-4" />}</Button></div>)} emptyMessage="No experience entries found" /></CardContent></Card>
    </div>
  );
}