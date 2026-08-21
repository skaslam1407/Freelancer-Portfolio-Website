export type Profile = {
  id: string
  display_name: string | null
  headline: string | null
  bio: string | null
  avatar_url: string | null
  resume_url: string | null
  created_at: string
  updated_at: string
}

export type Project = {
  id: string
  slug: string
  title: string
  short_description: string | null
  description: string | null
  role: string | null
  client_name: string | null
  project_url: string | null
  repository_url: string | null
  cover_media_id: string | null
  featured: boolean
  status: 'draft' | 'published'
  sort_order: number
  published_at: string | null
  created_at: string
  updated_at: string
}

export type ProjectMedia = {
  id: string
  project_id: string
  storage_path: string
  media_type: 'image' | 'video'
  alt_text: string | null
  caption: string | null
  sort_order: number
  created_at: string
  updated_at: string
}

export type Service = {
  id: string
  title: string
  description: string | null
  icon: string | null
  sort_order: number
  status: 'draft' | 'published'
  created_at: string
  updated_at: string
}

export type Skill = {
  id: string
  name: string
  category: string | null
  icon: string | null
  sort_order: number
  status: 'draft' | 'published'
  created_at: string
  updated_at: string
}

export type Experience = {
  id: string
  company: string
  role: string
  description: string | null
  start_date: string
  end_date: string | null
  is_current: boolean
  sort_order: number
  created_at: string
  updated_at: string
}

export type Testimonial = {
  id: string
  name: string
  role: string | null
  company: string | null
  quote: string
  avatar_url: string | null
  status: 'draft' | 'published'
  sort_order: number
  created_at: string
  updated_at: string
}

export type SiteSettings = {
  id: string
  profile_id: string
  contact_email: string | null
  contact_phone: string | null
  address: string | null
  social_links: Record<string, string> | null
  seo_defaults: Record<string, string> | null
  availability_text: string | null
  branding: Record<string, string> | null
  created_at: string
  updated_at: string
}

export type ProjectWithMedia = Project & {
  project_media: ProjectMedia[]
}

export type ProjectWithDetails = Project & {
  project_media: ProjectMedia[]
  technologies: string[]
}