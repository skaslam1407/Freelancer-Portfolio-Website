"use client";

import { useState } from "react";
import { Heading, Button, Card, CardContent, Badge, Input } from "@/components";
import { AdminDataTable, Column } from "@/components/AdminDataTable";
import { Plus, Search, Edit, Trash2 } from "lucide-react";
import { useToast } from "@/components/Toast";
import Link from "next/link";
import type { Service } from "@/types";

interface AdminServicesContentProps {
  initialServices: Service[];
}

export default function AdminServicesContent({ initialServices }: AdminServicesContentProps) {
  const [search, setSearch] = useState("");
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set());
  const [services, setServices] = useState<Service[]>(initialServices);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const { addToast } = useToast();

  const filtered = services.filter(s => s.title.toLowerCase().includes(search.toLowerCase()));

  const columns: Column<Service>[] = [
    { key: "title", header: "Title", accessor: (s) => s.title, sortable: true },
    { key: "description", header: "Description", accessor: (s) => <span className="text-sm text-muted-foreground">{s.description}</span> },
    { key: "icon", header: "Icon", accessor: (s) => <code className="text-sm">{s.icon}</code> },
    { key: "status", header: "Status", accessor: (s) => <Badge variant={s.status === "published" ? "success" : "secondary"} size="sm">{s.status}</Badge>, sortable: true },
    { key: "sort_order", header: "Order", accessor: (s) => <span className="font-mono">{s.sort_order}</span>, sortable: true },
  ];

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this service?")) return;
    setDeletingId(id);
    try {
      const res = await fetch(`/api/admin/services/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");
      setServices((prev) => prev.filter((s) => s.id !== id));
      addToast({ title: "Service deleted", type: "success" });
    } catch {
      addToast({ title: "Failed to delete", type: "error" });
    } finally {
      setDeletingId(null);
    }
  };

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
                <Button variant="ghost" size="icon" disabled={deletingId === s.id} onClick={() => handleDelete(s.id)}>
                  {deletingId === s.id ? <span className="h-4 w-4 animate-spin">⏳</span> : <Trash2 className="h-4 w-4" />}
                </Button>
              </div>
            )}
            emptyMessage="No services found"
          />
        </CardContent>
      </Card>
    </div>
  );
}