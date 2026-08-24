"use client";

import { useState, useCallback, DragEvent, ChangeEvent } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/Button";
import { Upload, X, Image as ImageIcon, Video as VideoIcon, Loader2, CheckCircle } from "lucide-react";
import { useToast } from "@/components/Toast";

interface MediaItem {
  id: string;
  file: File;
  preview: string;
  type: "image" | "video";
  progress: number;
  status: "pending" | "uploading" | "completed" | "error";
  error?: string;
  storage_path?: string;
  public_url?: string;
}

interface MediaUploaderProps {
  onUploadComplete?: (media: { storage_path: string; media_type: "image" | "video"; public_url: string }[]) => void;
  maxFiles?: number;
  maxFileSize?: number; // in MB
  acceptedTypes?: string[];
  className?: string;
  bucket?: string;
}

export function MediaUploader({
  onUploadComplete,
  maxFiles = 10,
  maxFileSize = 50,
  acceptedTypes = ["image/*", "video/mp4", "video/webm"],
  className,
  bucket = "portfolio-media",
}: MediaUploaderProps) {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const { addToast } = useToast();

  const validateFile = (file: File): string | null => {
    const validTypes = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/svg+xml", "image/x-icon", "video/mp4", "video/webm"];
    if (!validTypes.includes(file.type)) {
      return "Invalid file type. Only JPEG, PNG, WebP, GIF, SVG, ICO, MP4, and WebM are allowed.";
    }
    if (file.size > maxFileSize * 1024 * 1024) {
      return `File size exceeds ${maxFileSize}MB limit.`;
    }
    return null;
  };

  const createMediaItem = (file: File): MediaItem => {
    const type = file.type.startsWith("image/") ? "image" : "video";
    return {
      id: Math.random().toString(36).slice(2, 9),
      file,
      preview: URL.createObjectURL(file),
      type,
      progress: 0,
      status: "pending",
    };
  };

  const handleFiles = useCallback(
    (files: FileList | File[]) => {
      const fileArray = Array.from(files);
      const remainingSlots = maxFiles - mediaItems.length;
      const filesToAdd = fileArray.slice(0, remainingSlots);

      filesToAdd.forEach((file) => {
        const error = validateFile(file);
        if (error) {
          addToast({ title: "Invalid file", description: error, type: "error" });
          return;
        }
        const newItem = createMediaItem(file);
        setMediaItems((prev) => [...prev, newItem]);
      });
    },
    [maxFiles, mediaItems.length, addToast]
  );

  const handleDragOver = useCallback((e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
      if (e.dataTransfer.files) {
        handleFiles(e.dataTransfer.files);
      }
    },
    [handleFiles]
  );

  const handleFileChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        handleFiles(e.target.files);
      }
    },
    [handleFiles]
  );

  const removeMedia = useCallback((id: string) => {
    setMediaItems((prev) => {
      const item = prev.find((m) => m.id === id);
      if (item) URL.revokeObjectURL(item.preview);
      return prev.filter((m) => m.id !== id);
    });
  }, []);

  const uploadMedia = async () => {
    const pendingItems = mediaItems.filter((m) => m.status === "pending");
    if (pendingItems.length === 0) return;

    for (const item of pendingItems) {
      setMediaItems((prev) =>
        prev.map((m) => (m.id === item.id ? { ...m, status: "uploading" as const } : m))
      );

      try {
        const formData = new FormData();
        formData.append("file", item.file);
        formData.append("bucket", bucket);

        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Upload failed");
        }

        setMediaItems((prev) =>
          prev.map((m) =>
            m.id === item.id
              ? { ...m, status: "completed" as const, progress: 100, storage_path: data.storage_path, public_url: data.public_url }
              : m
          )
        );
      } catch (error: any) {
        setMediaItems((prev) =>
          prev.map((m) =>
            m.id === item.id
              ? { ...m, status: "error" as const, error: error.message }
              : m
          )
        );
        addToast({ title: "Upload failed", description: error.message, type: "error" });
      }
    }

    const completed = mediaItems.filter((m) => m.status === "completed");
    if (onUploadComplete && completed.length > 0) {
      onUploadComplete(
        completed.map((m) => ({
          storage_path: m.storage_path!,
          public_url: m.public_url!,
          media_type: m.type,
        }))
      );
    }
  };

  const hasPending = mediaItems.some((m) => m.status === "pending");
  const hasErrors = mediaItems.some((m) => m.status === "error");

  return (
    <div className={cn("border-2 border-dashed rounded-xl p-8 transition-colors", isDragging && "border-primary bg-primary/5", className)}>
      <input
        type="file"
        multiple
        accept={acceptedTypes.join(",")}
        onChange={handleFileChange}
        className="hidden"
        id="media-uploader-input"
        disabled={mediaItems.length >= maxFiles}
      />
      <div
        className="text-center"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => document.getElementById("media-uploader-input")?.click()}
      >
        <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
        <p className="mt-4 text-lg font-medium">
          {isDragging ? "Drop files here..." : "Drag & drop files here, or click to select"}
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          Supports: JPEG, PNG, WebP, GIF, SVG, ICO, MP4, WebM (max {maxFileSize}MB each)
        </p>
      </div>

      {mediaItems.length > 0 && (
        <div className="mt-6 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-medium">Selected Files ({mediaItems.length}/{maxFiles})</h3>
            {hasPending && (
              <Button onClick={uploadMedia} disabled={!hasPending}>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Upload All
              </Button>
            )}
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {mediaItems.map((item) => (
              <div
                key={item.id}
                className={cn(
                  "relative group rounded-lg border p-3 transition-colors",
                  item.status === "error" && "border-destructive bg-destructive/5",
                  item.status === "completed" && "border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950"
                )}
              >
                <div className="relative aspect-video rounded-md overflow-hidden bg-muted">
                  {item.type === "image" ? (
                    <img src={item.preview} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <video src={item.preview} className="w-full h-full object-cover" muted />
                  )}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
                    {item.status === "uploading" && (
                      <Loader2 className="h-8 w-8 text-white animate-spin" />
                    )}
                    {item.status === "completed" && (
                      <CheckCircle className="h-8 w-8 text-white" />
                    )}
                    {item.status === "error" && (
                      <span className="text-white font-medium">Error</span>
                    )}
                  </div>
                  {item.status === "uploading" && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
                      <div
                        className="h-full bg-primary transition-all"
                        style={{ width: `${item.progress}%` }}
                      />
                    </div>
                  )}
                </div>
                <div className="mt-2 flex items-center justify-between text-sm">
                  <span className="truncate flex-1 mr-2">{item.file.name}</span>
                  <span className="text-muted-foreground">
                    {(item.file.size / 1024 / 1024).toFixed(1)} MB
                  </span>
                </div>
                {item.error && (
                  <p className="mt-1 text-xs text-destructive">{item.error}</p>
                )}
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeMedia(item.id);
                  }}
                  aria-label="Remove file"
                >
                  <X className="h-4 w-4" />
                </Button>
                {item.type === "image" && (
                  <ImageIcon className="absolute bottom-2 left-2 h-4 w-4 text-muted-foreground" />
                )}
                {item.type === "video" && (
                  <VideoIcon className="absolute bottom-2 left-2 h-4 w-4 text-muted-foreground" />
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}