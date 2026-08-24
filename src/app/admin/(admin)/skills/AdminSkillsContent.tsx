"use client";

import { useState } from "react";
import { Heading, Button, Card, CardContent, Badge, Input } from "@/components";
import { AdminDataTable, Column } from "@/components/AdminDataTable";
import { Plus, Search, Edit, Trash2 } from "lucide-react";
import { useToast } from "@/components/Toast";
import Link from "next/link";
import type { Skill } from "@/types";

interface AdminSkillsContentProps {
  initialSkills: Skill[];
}

export default function AdminSkillsContent({ initialSkills }: AdminSkillsContentProps) {
  const [search, setSearch] = useState("");
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set());
  const [skills, setSkills] = useState<Skill[]>(initialSkills);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const { addToast } = useToast();

  const filtered = skills.filter(s => s.name.toLowerCase().includes(search.toLowerCase()));

  const columns: Column<Skill>[] = [
    { key: "name", header: "Name", accessor: (s) => s.name, sortable: true },
    { key: "category", header: "Category", accessor: (s) => s.category || "-", sortable: true },
    { key: "icon", header: "Icon", accessor: (s) => <code className="text-sm">{s.icon}</code> },
    { key: "status", header: "Status", accessor: (s) => <Badge variant={s.status === "published" ? "success" : "secondary"} size="sm">{s.status}</Badge>, sortable: true },
    { key: "sort_order", header: "Order", accessor: (s) => <span className="font-mono">{s.sort_order}</span>, sortable: true },
  ];

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this skill?")) return;
    setDeletingId(id);
    try {
      const res = await fetch(`/api/admin/skills/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");
      setSkills((prev) => prev.filter((s) => s.id !== id));
      addToast({ title: "Skill deleted", type: "success" });
    } catch {
      addToast({ title: "Failed to delete", type: "error" });
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><Heading level={1} variant="display" className="mb-2">Skills</Heading><p className="text-muted-foreground">Manage your technology skills</p></div>
        <Button asChild><Link href="/admin/skills/new"><Plus className="mr-2 h-4 w-4" />Add Skill</Link></Button>
      </div>
      <Card variant="outlined" padding="md"><CardContent className="pt-0"><div className="flex gap-4"><div className="relative flex-1 max-w-md"><Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" /><Input placeholder="Search skills..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" /></div></div></CardContent></Card>
      <Card variant="outlined" padding="none"><CardContent className="pt-0"><AdminDataTable columns={columns} data={filtered} keyAccessor={(s) => s.id} selectable selectedKeys={selectedKeys} onSelectionChange={setSelectedKeys} actions={(s) => (<div className="flex items-center justify-end gap-1"><Button variant="ghost" size="icon" asChild><Link href={`/admin/skills/${s.id}/edit`}><Edit className="h-4 w-4" /></Link></Button><Button variant="ghost" size="icon" disabled={deletingId === s.id} onClick={() => handleDelete(s.id)}>{deletingId === s.id ? <span className="h-4 w-4 animate-spin">⏳</span> : <Trash2 className="h-4 w-4" />}</Button></div>)} emptyMessage="No skills found" /></CardContent></Card>
    </div>
  );
}