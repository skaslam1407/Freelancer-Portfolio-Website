"use client";

import { useState } from "react";
import { Heading, Button, Card, CardContent, Badge, Input } from "@/components";
import { AdminDataTable, Column } from "@/components/AdminDataTable";
import { Plus, Search, Edit, Trash2, MoreVertical } from "lucide-react";
import { useToast } from "@/components/Toast";
import Link from "next/link";

const mockServices = [
  { id: "1", title: "Web Development", description: "Custom web applications", icon: "code", sort_order: 1, status: "published" },
  { id: "2", title: "API Development", description: "RESTful and GraphQL APIs", icon: "server", sort_order: 2, status: "published" },
  { id: "3", title: "Database Design", description: "Scalable database architecture", icon: "database", sort_order: 3, status: "published" },
  { id: "4", title: "DevOps & Cloud", description: "CI/CD and infrastructure", icon: "cloud", sort_order: 4, status: "published" },
  { id: "5", title: "Technical Consulting", description: "Architecture reviews", icon: "message-square", sort_order: 5, status: "published" },
  { id: "6", title: "Code Audits", description: "Security and performance reviews", icon: "shield", sort_order: 6, status: "draft" },
];

export default function AdminServicesContent() {
  const [search, setSearch] = useState("");
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set());
  const { addToast } = useToast();

  const columns: Column<typeof mockServices[0]>[] = [
    { key: "title", header: "Title", accessor: (s) => s.title, sortable: true },
    { key: "description", header: "Description", accessor: (s) => <span className="text-sm text-muted-foreground">{s.description}</span> },
    { key: "icon", header: "Icon", accessor: (s) => <code className="text-sm">{s.icon}</code> },
    { key: "status", header: "Status", accessor: (s) => <Badge variant={s.status === "published" ? "success" : "secondary"} size="sm">{s.status}</Badge>, sortable: true },
    { key: "sort_order", header: "Order", accessor: (s) => <span className="font-mono">{s.sort_order}</span>, sortable: true },
  ];

  const filtered = mockServices.filter(s => s.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Heading level={1} variant="display" className="mb-2">Services</Heading>
          <p className="text-muted-foreground">Manage your service offerings</p>
        </div>
        <Button asChild><Link href="/admin/services/new"><Plus className="mr-2 h-4 w-4" />Add Service</Link></Button>
      </div>

      <Card variant="outlined" padding="md">
        <CardContent className="pt-0">
          <div className="flex gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search services..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card variant="outlined" padding="none">
        <CardContent className="pt-0">
          <AdminDataTable
            columns={columns}
            data={filtered}
            keyAccessor={(s) => s.id}
            selectable
            selectedKeys={selectedKeys}
            onSelectionChange={setSelectedKeys}
            actions={(s) => (
              <div className="flex items-center justify-end gap-1">
                <Button variant="ghost" size="icon" asChild><Link href={`/admin/services/${s.id}/edit`}><Edit className="h-4 w-4" /></Link></Button>
                <Button variant="ghost" size="icon" onClick={() => { if (confirm("Delete?")) addToast({ title: "Deleted", type: "success" })}}><Trash2 className="h-4 w-4" /></Button>
              </div>
            )}
            emptyMessage="No services found"
          />
        </CardContent>
      </Card>
    </div>
  );
}