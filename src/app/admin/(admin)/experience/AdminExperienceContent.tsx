"use client";

import { useState } from "react";
import { Heading, Button, Card, CardContent, Badge, Input } from "@/components";
import { AdminDataTable, Column } from "@/components/AdminDataTable";
import { Plus, Search, Edit, Trash2, Calendar } from "lucide-react";
import { useToast } from "@/components/Toast";
import Link from "next/link";

const mockExperience = [
  { id: "1", company: "Freelance", role: "Senior Full-Stack Developer", start_date: "2022-01", end_date: null, is_current: true, sort_order: 1 },
  { id: "2", company: "TechCorp Inc.", role: "Lead Developer", start_date: "2019-03", end_date: "2021-12", is_current: false, sort_order: 2 },
  { id: "3", company: "StartupXYZ", role: "Full-Stack Developer", start_date: "2017-06", end_date: "2019-02", is_current: false, sort_order: 3 },
];

export default function AdminExperienceContent() {
  const [search, setSearch] = useState("");
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set());
  const { addToast } = useToast();

  const columns: Column<typeof mockExperience[0]>[] = [
    { key: "company", header: "Company", accessor: (e) => e.company, sortable: true },
    { key: "role", header: "Role", accessor: (e) => e.role, sortable: true },
    { key: "period", header: "Period", accessor: (e) => `${new Date(e.start_date).toLocaleDateString("en-US", { month: "short", year: "numeric" })} – ${e.is_current ? "Present" : new Date(e.end_date!).toLocaleDateString("en-US", { month: "short", year: "numeric" })}` },
    { key: "current", header: "Current", accessor: (e) => <Badge variant={e.is_current ? "success" : "outline"} size="sm">{e.is_current ? "Yes" : "No"}</Badge> },
    { key: "sort_order", header: "Order", accessor: (e) => <span className="font-mono">{e.sort_order}</span>, sortable: true },
  ];

  const filtered = mockExperience.filter(e => e.company.toLowerCase().includes(search.toLowerCase()) || e.role.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><Heading level={1} variant="display" className="mb-2">Experience</Heading><p className="text-muted-foreground">Manage your professional experience</p></div>
        <Button asChild><Link href="/admin/experience/new"><Plus className="mr-2 h-4 w-4" />Add Experience</Link></Button>
      </div>
      <Card variant="outlined" padding="md"><CardContent className="pt-0"><div className="flex gap-4"><div className="relative flex-1 max-w-md"><Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" /><Input placeholder="Search experience..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" /></div></div></CardContent></Card>
      <Card variant="outlined" padding="none"><CardContent className="pt-0"><AdminDataTable columns={columns} data={filtered} keyAccessor={(e) => e.id} selectable selectedKeys={selectedKeys} onSelectionChange={setSelectedKeys} actions={(e) => (<div className="flex items-center justify-end gap-1"><Button variant="ghost" size="icon" asChild><Link href={`/admin/experience/${e.id}/edit`}><Edit className="h-4 w-4" /></Link></Button><Button variant="ghost" size="icon" onClick={() => { if (confirm("Delete?")) addToast({ title: "Deleted", type: "success" })}}><Trash2 className="h-4 w-4" /></Button></div>)} emptyMessage="No experience entries found" /></CardContent></Card>
    </div>
  );
}