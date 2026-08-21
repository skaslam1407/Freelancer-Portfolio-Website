"use client";

import { useState } from "react";
import { Heading, Button, Card, CardContent, Badge, Input } from "@/components";
import { AdminDataTable, Column } from "@/components/AdminDataTable";
import { Plus, Search, Edit, Trash2, Star } from "lucide-react";
import { useToast } from "@/components/Toast";
import Link from "next/link";

const mockTestimonials = [
  { id: "1", name: "Sarah Chen", role: "CTO", company: "TechStart", quote: "Exceptional technical skills...", rating: 5, status: "published", sort_order: 1 },
  { id: "2", name: "Marcus Johnson", role: "Product Manager", company: "InnovateCo", quote: "Deep understanding of both frontend...", rating: 5, status: "published", sort_order: 2 },
  { id: "3", name: "Emily Rodriguez", role: "Founder", company: "GrowthLab", quote: "Reliable, skilled, and a pleasure...", rating: 5, status: "draft", sort_order: 3 },
];

export default function AdminTestimonialsContent() {
  const [search, setSearch] = useState("");
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set());
  const { addToast } = useToast();

  const columns: Column<typeof mockTestimonials[0]>[] = [
    { key: "name", header: "Name", accessor: (t) => <div><p className="font-medium">{t.name}</p><p className="text-xs text-muted-foreground">{t.role} @ {t.company}</p></div>, sortable: true },
    { key: "quote", header: "Quote", accessor: (t) => <span className="text-sm text-muted-foreground max-w-xs truncate block">{t.quote}</span> },
    { key: "rating", header: "Rating", accessor: (t) => <div className="flex gap-0.5">{Array.from({length: t.rating}).map((_,i)=><Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />)}</div> },
    { key: "status", header: "Status", accessor: (t) => <Badge variant={t.status === "published" ? "success" : "secondary"} size="sm">{t.status}</Badge>, sortable: true },
    { key: "sort_order", header: "Order", accessor: (t) => <span className="font-mono">{t.sort_order}</span>, sortable: true },
  ];

  const filtered = mockTestimonials.filter(t => t.name.toLowerCase().includes(search.toLowerCase()) || t.company.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><Heading level={1} variant="display" className="mb-2">Testimonials</Heading><p className="text-muted-foreground">Manage client testimonials</p></div>
        <Button asChild><Link href="/admin/testimonials/new"><Plus className="mr-2 h-4 w-4" />Add Testimonial</Link></Button>
      </div>
      <Card variant="outlined" padding="md"><CardContent className="pt-0"><div className="flex gap-4"><div className="relative flex-1 max-w-md"><Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" /><Input placeholder="Search testimonials..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" /></div></div></CardContent></Card>
      <Card variant="outlined" padding="none"><CardContent className="pt-0"><AdminDataTable columns={columns} data={filtered} keyAccessor={(t) => t.id} selectable selectedKeys={selectedKeys} onSelectionChange={setSelectedKeys} actions={(t) => (<div className="flex items-center justify-end gap-1"><Button variant="ghost" size="icon" asChild><Link href={`/admin/testimonials/${t.id}/edit`}><Edit className="h-4 w-4" /></Link></Button><Button variant="ghost" size="icon" onClick={() => { if (confirm("Delete?")) addToast({ title: "Deleted", type: "success" })}}><Trash2 className="h-4 w-4" /></Button></div>)} emptyMessage="No testimonials found" /></CardContent></Card>
    </div>
  );
}