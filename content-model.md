# Content Model

## Publishing Model

Content uses:

```text
draft -> published
published -> draft
```

Deleted content is removed only when it is intentionally deleted.

## Project Content

Each project should support:
- Title
- Slug
- Summary
- Detailed description
- Problem
- Solution
- Results/impact
- Role
- Technologies
- Client (optional)
- Live URL
- Repository URL
- Cover image
- Gallery
- Video
- Featured flag
- Display order
- SEO title/description

## Media

Store binary files in Supabase Storage.

Store only metadata and storage paths in PostgreSQL.

Recommended buckets:
- `portfolio-images`
- `portfolio-videos`
- `profile-assets`

## Media Rules

- Validate MIME type and file size.
- Generate optimized image variants when appropriate.
- Prefer WebP/AVIF for images.
- Avoid huge videos; use compressed MP4/WebM or external streaming when appropriate.
- Provide alt text for meaningful images.
- Mark decorative images appropriately.

## Admin Editing

Forms should support:
- Create
- Edit
- Preview
- Publish/unpublish
- Delete
- Reorder
- Feature/unfeature
