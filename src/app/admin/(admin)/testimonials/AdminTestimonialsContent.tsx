"use client";

import { useState } from "react";
import { Heading, Button, Card, CardContent, Badge, Input } from "@/components";
import { AdminDataTable, Column } from "@/components/AdminDataTable";
import { Plus, Search, Edit, Trash2, Star } from "lucide-react";
import { useToast } from "@/components/Toast";
import Link from "next/link";
import type { Testimonial } from "@/types";

interface AdminTestimonialsContentProps {
  initialTestimonials: Testimonial[];
}

export default function AdminTestimonialsContent({ initialTestimonials }: AdminTestimonialsContentProps) {
  const [search, setSearch] = useState("");
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set());
  const [testimonials, setTestimonials] = useState<Testimonial[]>(initialTestimonials);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const { addToast } = useToast();

  const filtered = testimonials.filter(t => t.name.toLowerCase().includes(search.toLowerCase()) || t.company?.toLowerCase().includes(search.toLowerCase()));

  const columns: Column<Testimonial>[] = [
    { key: "name", header: "Name", accessor: (t) => <div><p className="font-medium">{t.name}</p><p className="text-xs text-muted-foreground">{t.role} @ {t.company}</p></div>, sortable: true },
    { key: "quote", header: "Quote", accessor: (t) => <span className="text-sm text-muted-foreground max-w-xs truncate block">{t.quote}</span> },
    { key: "status", header: "Status", accessor: (t) => <Badge variant={t.status === "published" ? "success" : "secondary"} size="sm">{t.status}</Badge>, sortable: true },
    { key: "sort_order", header: "Order", accessor: (t) => <span className="font-mono">{t.sort_order}</span>, sortable: true },
  ];

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this testimonial?")) return;
    setDeletingId(id);
    try {
      const res = await fetch(`/api/admin/testimonials/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");
      setTestimonials((prev) => prev.filter((t) => t.id !== id));
      addToast({ title: "Testimonial deleted", type: "success" });
    } catch {
      addToast({ title: "Failed to delete", type: "error" });
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><Heading level={1} variant="display" className="mb-2">Testimonials</Heading><p className="text-muted-foreground">Manage client testimonials</p></div>
        <Button asChild><Link href="/admin/testimonials/new"><Plus className="mr-2 h-4 w-4" />Add Testimonial</Link></Button>
      </div>
      <Card variant="outlined" padding="md"><CardContent className="pt-0"><div className="flex gap-4"><div className="relative flex-1 max-w-md"><Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" /><Input placeholder="Search testimonials..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" /></div></div></CardContent></Card>
      <Card variant="outlined" padding="none"><CardContent className="pt-0"><AdminDataTable columns={columns} data={filtered} keyAccessor={(t) => t.id} selectable selectedKeys={selectedKeys} onSelectionChange={setSelectedKeys} actions={(t) => (<div className="flex items-center justify-end gap-1"><Button variant="ghost" size="icon" asChild><Link href={`/admin/testimonials/${t.id}/edit`}><Edit className="h-4 w-4" /></Link></Button><Button variant="ghost" size="icon" disabled={deletingId === t.id} onClick={() => handleDelete(t.id)}>{deletingId === t.id ? <span className="h-4 w-4 animate-spin">⏳</span> : <Trash2 className="h-4 w-4" />}</Button></div>)} emptyMessage="No testimonials found" /></CardContent></Card>
    </div>
  );
}