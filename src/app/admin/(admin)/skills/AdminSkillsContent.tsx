"use client";

import { useState } from "react";
import { Heading, Button, Card, CardContent, Badge, Input } from "@/components";
import { AdminDataTable, Column } from "@/components/AdminDataTable";
import { Plus, Search, Edit, Trash2 } from "lucide-react";
import { useToast } from "@/components/Toast";
import Link from "next/link";

const mockSkills = [
  { id: "1", name: "TypeScript", category: "Language", icon: "typescript", sort_order: 1, status: "published" },
  { id: "2", name: "React", category: "Frontend", icon: "react", sort_order: 2, status: "published" },
  { id: "3", name: "Next.js", category: "Frontend", icon: "nextjs", sort_order: 3, status: "published" },
  { id: "4", name: "Node.js", category: "Backend", icon: "nodejs", sort_order: 4, status: "published" },
  { id: "5", name: "PostgreSQL", category: "Database", icon: "postgresql", sort_order: 5, status: "published" },
];

export default function AdminSkillsContent() {
  const [search, setSearch] = useState("");
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set());
  const { addToast } = useToast();

  const columns: Column<typeof mockSkills[0]>[] = [
    { key: "name", header: "Name", accessor: (s) => s.name, sortable: true },
    { key: "category", header: "Category", accessor: (s) => s.category || "-", sortable: true },
    { key: "icon", header: "Icon", accessor: (s) => <code className="text-sm">{s.icon}</code> },
    { key: "status", header: "Status", accessor: (s) => <Badge variant={s.status === "published" ? "success" : "secondary"} size="sm">{s.status}</Badge>, sortable: true },
    { key: "sort_order", header: "Order", accessor: (s) => <span className="font-mono">{s.sort_order}</span>, sortable: true },
  ];

  const filtered = mockSkills.filter(s => s.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><Heading level={1} variant="display" className="mb-2">Skills</Heading><p className="text-muted-foreground">Manage your technology skills</p></div>
        <Button asChild><Link href="/admin/skills/new"><Plus className="mr-2 h-4 w-4" />Add Skill</Link></Button>
      </div>
      <Card variant="outlined" padding="md"><CardContent className="pt-0"><div className="flex gap-4"><div className="relative flex-1 max-w-md"><Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" /><Input placeholder="Search skills..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" /></div></div></CardContent></Card>
      <Card variant="outlined" padding="none"><CardContent className="pt-0"><AdminDataTable columns={columns} data={filtered} keyAccessor={(s) => s.id} selectable selectedKeys={selectedKeys} onSelectionChange={setSelectedKeys} actions={(s) => (<div className="flex items-center justify-end gap-1"><Button variant="ghost" size="icon" asChild><Link href={`/admin/skills/${s.id}/edit`}><Edit className="h-4 w-4" /></Link></Button><Button variant="ghost" size="icon" onClick={() => { if (confirm("Delete?")) addToast({ title: "Deleted", type: "success" })}}><Trash2 className="h-4 w-4" /></Button></div>)} emptyMessage="No skills found" /></CardContent></Card>
    </div>
  );
}