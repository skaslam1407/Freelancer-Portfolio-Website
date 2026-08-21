# Requirements

## Goal

Build a premium developer freelancer portfolio that is fast, responsive, accessible, SEO-friendly, easy to maintain, and manageable through a secure admin dashboard.

## Functional Requirements

### Public
- Display hero/profile information.
- Display services.
- Display featured and all portfolio projects.
- Project pages support rich text, images, video, technology tags, links, and results.
- Display skills/technologies.
- Display professional experience.
- Display testimonials.
- Provide contact form.
- Support SEO metadata and Open Graph data.
- Provide custom 404 and error states.

### Admin
- Secure admin authentication.
- Dashboard overview.
- CRUD for:
  - Projects
  - Project media
  - Services
  - Skills
  - Experience
  - Testimonials
  - Site/profile settings
- Draft/published state for public content.
- Media upload/delete.
- Ordering/featured controls.
- Form validation and useful error states.

## Non-Functional Requirements

- Mobile-first responsive design.
- WCAG 2.2 AA-oriented accessibility.
- Strong Core Web Vitals.
- Server-side rendering/static generation where appropriate.
- Secure RLS policies.
- No service-role credentials in client code.
- SEO-friendly URLs and metadata.
- Minimal client JavaScript.
- Optimized media and lazy loading.
- Production-ready error handling and logging.

## Acceptance Criteria

A public visitor can browse portfolio content without authentication.

An authorized admin can log in and create, edit, publish, unpublish, reorder, and delete portfolio content.

Unauthorized users cannot access admin data or mutate protected records.

Media can be uploaded to Supabase Storage and associated with content.

The application builds successfully and passes lint/type checks.

The production deployment works on Vercel with production environment variables.
