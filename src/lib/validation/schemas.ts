import { z } from 'zod'

export const projectSchema = z.object({
  slug: z.string().min(1).max(100).regex(/^[a-z0-9-]+$/),
  title: z.string().min(1).max(200),
  short_description: z.string().max(500).optional().nullable(),
  description: z.string().optional().nullable(),
  role: z.string().max(100).optional().nullable(),
  client_name: z.string().max(100).optional().nullable(),
  project_url: z.string().url().optional().nullable(),
  repository_url: z.string().url().optional().nullable(),
  cover_media_id: z.string().uuid().optional().nullable(),
  featured: z.boolean().default(false),
  status: z.enum(['draft', 'published']).default('draft'),
  sort_order: z.number().int().default(0),
})

export const projectMediaSchema = z.object({
  project_id: z.string().uuid(),
  storage_path: z.string().min(1),
  media_type: z.enum(['image', 'video']),
  alt_text: z.string().max(200).optional().nullable(),
  caption: z.string().max(500).optional().nullable(),
  sort_order: z.number().int().default(0),
})

export const serviceSchema = z.object({
  title: z.string().min(1).max(100),
  description: z.string().max(500).optional().nullable(),
  icon: z.string().max(100).optional().nullable(),
  sort_order: z.number().int().default(0),
  status: z.enum(['draft', 'published']).default('draft'),
})

export const skillSchema = z.object({
  name: z.string().min(1).max(50),
  category: z.string().max(50).optional().nullable(),
  icon: z.string().max(100).optional().nullable(),
  sort_order: z.number().int().default(0),
  status: z.enum(['draft', 'published']).default('draft'),
})

export const experienceSchema = z.object({
  company: z.string().min(1).max(100),
  role: z.string().min(1).max(100),
  description: z.string().max(1000).optional().nullable(),
  start_date: z.string().regex(/^\d{4}-\d{2}$/),
  end_date: z.string().regex(/^\d{4}-\d{2}$/).optional().nullable(),
  is_current: z.boolean().default(false),
  sort_order: z.number().int().default(0),
})

export const testimonialSchema = z.object({
  name: z.string().min(1).max(100),
  role: z.string().max(100).optional().nullable(),
  company: z.string().max(100).optional().nullable(),
  quote: z.string().min(1).max(1000),
  avatar_url: z.string().url().optional().nullable(),
  status: z.enum(['draft', 'published']).default('draft'),
  sort_order: z.number().int().default(0),
})

export const siteSettingsSchema = z.object({
  contact_email: z.string().email().optional().nullable(),
  contact_phone: z.string().max(30).optional().nullable(),
  address: z.string().max(200).optional().nullable(),
  social_links: z.record(z.string().url()).optional().nullable(),
  seo_defaults: z.record(z.string()).optional().nullable(),
  availability_text: z.string().max(500).optional().nullable(),
  branding: z.record(z.string()).optional().nullable(),
})

export const profileSchema = z.object({
  display_name: z.string().min(1).max(100),
  headline: z.string().max(200).optional().nullable(),
  bio: z.string().max(2000).optional().nullable(),
  avatar_url: z.string().url().optional().nullable(),
  resume_url: z.string().url().optional().nullable(),
})

export type ProjectInput = z.infer<typeof projectSchema>
export type ProjectMediaInput = z.infer<typeof projectMediaSchema>
export type ServiceInput = z.infer<typeof serviceSchema>
export type SkillInput = z.infer<typeof skillSchema>
export type ExperienceInput = z.infer<typeof experienceSchema>
export type TestimonialInput = z.infer<typeof testimonialSchema>
export type SiteSettingsInput = z.infer<typeof siteSettingsSchema>
export type ProfileInput = z.infer<typeof profileSchema>