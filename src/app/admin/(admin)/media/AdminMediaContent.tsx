"use client";

import { useState } from "react";
import { Heading, Button, Card, CardContent, Badge, Input } from "@/components";
import { Upload, Search, Image as ImageIcon, Video, Trash2, MoreVertical, Eye, Download } from "lucide-react";
import { useToast } from "@/components/Toast";
import { MediaUploader } from "@/components/MediaUploader";

const mockMedia = [
  { id: "1", name: "project-1-cover.jpg", type: "image", size: "2.4 MB", url: "/placeholder.jpg", uploaded: "2024-01-15" },
  { id: "2", name: "project-1-screenshot.png", type: "image", size: "1.8 MB", url: "/placeholder.jpg", uploaded: "2024-01-15" },
  { id: "3", name: "demo-video.mp4", type: "video", size: "15.2 MB", url: "/placeholder.mp4", uploaded: "2024-01-10" },
];

export default function AdminMediaContent() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set());
  const { addToast } = useToast();

  const filtered = mockMedia.filter(m => 
    m.name.toLowerCase().includes(search.toLowerCase()) &&
    (filter === "all" || m.type === filter)
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Heading level={1} variant="display" className="mb-2">Media Library</Heading>
          <p className="text-muted-foreground">Manage your images and videos</p>
        </div>
        <Button asChild>
          <a href="#" onClick={(e) => e.preventDefault()}>
            <Upload className="mr-2 h-4 w-4" />
            Upload Files
          </a>
        </Button>
      </div>

      <Card variant="outlined" padding="md">
        <CardContent className="pt-0">
          <MediaUploader onUploadComplete={(files) => addToast({ title: "Uploaded", description: `${files.length} file(s) uploaded`, type: "success" })} />
        </CardContent>
      </Card>

      <Card variant="outlined" padding="md">
        <CardContent className="pt-0">
          <div className="flex flex-wrap gap-4 mb-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search media..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
            </div>
            <select value={filter} onChange={(e) => setFilter(e.target.value)} className="flex h-10 w-[150px] rounded-md border border-input bg-background px-3 py-2 text-sm">
              <option value="all">All Types</option>
              <option value="image">Images</option>
              <option value="video">Videos</option>
            </select>
          </div>
        </CardContent>
      </Card>

      <Card variant="outlined" padding="none">
        <CardContent className="pt-0">
          {filtered.length === 0 ? (
            <div className="p-12 text-center text-muted-foreground">No media files found</div>
          ) : (
            <div className="grid gap-4 p-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filtered.map((media) => (
                <div key={media.id} className="relative group rounded-lg border overflow-hidden bg-muted/50">
                  <div className="aspect-video relative overflow-hidden">
                    {media.type === "image" ? (
                      <div className="w-full h-full bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                        <ImageIcon className="h-12 w-12 text-muted-foreground" />
                      </div>
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-purple-100 to-purple-5 flex items-center justify-center">
                        <Video className="h-12 w-12 text-muted-foreground" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <Button variant="ghost" size="icon" className="bg-white"><Eye className="h-4 w-4" /></Button>
                      <Button variant="ghost" size="icon" className="bg-white"><Download className="h-4 w-4" /></Button>
                      <Button variant="ghost" size="icon" className="bg-white text-destructive" onClick={() => { if (confirm("Delete?")) addToast({ title: "Deleted", type: "success" })}}><Trash2 className="h-4 w-4" /></Button>
                    </div>
                    <Badge variant="outline" className="absolute top-2 left-2">{media.type}</Badge>
                  </div>
                  <div className="p-3">
                    <p className="font-medium text-sm truncate">{media.name}</p>
                    <p className="text-xs text-muted-foreground">{media.size} • {new Date(media.uploaded).toLocaleDateString()}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}