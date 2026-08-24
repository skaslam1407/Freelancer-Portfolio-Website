-- Create storage bucket for portfolio media
-- Run this in Supabase Dashboard → SQL Editor

-- Create the bucket
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'portfolio-media',
  'portfolio-media',
  true,
  52428800, -- 50MB
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml', 'image/x-icon', 'image/vnd.microsoft.icon', 'video/mp4', 'video/webm']
)
ON CONFLICT (id) DO UPDATE SET
  public = EXCLUDED.public,
  file_size_limit = EXCLUDED.file_size_limit,
  allowed_mime_types = EXCLUDED.allowed_mime_types;

-- Create policies for the bucket
-- Public read access
CREATE POLICY "Public read access for portfolio-media"
ON storage.objects FOR SELECT
USING (bucket_id = 'portfolio-media');

-- Admin full access
CREATE POLICY "Admin full access for portfolio-media"
ON storage.objects FOR ALL
USING (
  bucket_id = 'portfolio-media'
  AND (
    SELECT EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.is_admin = true
    )
  )
);

-- Authenticated users can upload
CREATE POLICY "Authenticated upload for portfolio-media"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'portfolio-media'
  AND auth.role() = 'authenticated'
);