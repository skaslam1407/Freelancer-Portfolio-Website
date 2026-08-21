import { ImgHTMLAttributes, VideoHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface MediaProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt?: string;
  priority?: boolean;
  fill?: boolean;
  sizes?: string;
}

export const Image = forwardRef<HTMLImageElement, MediaProps>(
  ({ className, src, alt = "", priority = false, fill = false, sizes, ...props }, ref) => {
    const isExternal = src.startsWith("http") || src.startsWith("//");
    
    if (isExternal) {
      return (
        <img
          ref={ref}
          src={src}
          alt={alt}
          className={cn("max-w-full h-auto", fill ? "absolute inset-0 w-full h-full object-cover" : "", className)}
          loading={priority ? "eager" : "lazy"}
          sizes={sizes}
          {...props}
        />
      );
    }

    return (
      <img
        ref={ref}
        src={src}
        alt={alt}
        className={cn("max-w-full h-auto", fill ? "absolute inset-0 w-full h-full object-cover" : "", className)}
        loading={priority ? "eager" : "lazy"}
        sizes={sizes}
        {...props}
      />
    );
  }
);

Image.displayName = "Image";

export interface VideoProps extends VideoHTMLAttributes<HTMLVideoElement> {
  src: string;
  poster?: string;
}

export const Video = forwardRef<HTMLVideoElement, VideoProps>(
  ({ className, src, poster, ...props }, ref) => {
    const isExternal = src.startsWith("http") || src.startsWith("//");

    return (
      <video
        ref={ref}
        className={cn("max-w-full h-auto rounded-lg", className)}
        poster={poster}
        controls
        preload="metadata"
        {...props}
      >
        <source src={src} type="video/mp4" />
        <source src={src.replace(".mp4", ".webm")} type="video/webm" />
        Your browser does not support the video tag.
      </video>
    );
  }
);

Video.displayName = "Video";

export interface MediaGalleryProps {
  images: { src: string; alt: string; caption?: string }[];
  videos?: { src: string; poster?: string; caption?: string }[];
  className?: string;
}

export function MediaGallery({ images = [], videos = [], className }: MediaGalleryProps) {
  const allMedia = [
    ...images.map((img, i) => ({ ...img, type: "image" as const, index: i })),
    ...videos.map((vid, i) => ({ ...vid, type: "video" as const, index: images.length + i })),
  ];

  if (allMedia.length === 0) return null;

  return (
    <div className={cn("grid gap-4", className)}>
      {allMedia.map((media) =>
        media.type === "image" ? (
          <figure key={media.index} className="group relative">
            <Image
              src={media.src}
              alt={media.alt}
              className="w-full aspect-video object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
            />
            {media.caption && (
              <figcaption className="mt-2 text-sm text-muted-foreground text-center">
                {media.caption}
              </figcaption>
            )}
          </figure>
        ) : (
          <figure key={media.index} className="group relative">
            <Video
              src={media.src}
              poster={media.poster}
              className="w-full aspect-video rounded-lg"
            />
            {media.caption && (
              <figcaption className="mt-2 text-sm text-muted-foreground text-center">
                {media.caption}
              </figcaption>
            )}
          </figure>
        )
      )}
    </div>
  );
}