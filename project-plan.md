# Project Plan

## Objective

Build and launch a premium developer freelancer portfolio with a secure CMS-like admin dashboard.

## Phase 1 — Foundation

### Tasks
- Initialize Next.js + TypeScript.
- Configure GitHub repository.
- Create Supabase project.
- Configure environment variables.
- Establish project structure.
- Add base design tokens.
- Configure lint/typecheck.

### Exit Criteria
Application starts locally and production build succeeds.

## Phase 2 — Database and Security

### Tasks
- Create schema.
- Add indexes and constraints.
- Configure RLS.
- Configure Storage buckets.
- Configure admin authorization.
- Seed initial content.

### Exit Criteria
Public/admin access rules are verified.

## Phase 3 — Public Website

### Tasks
- Header/navigation.
- Premium hero.
- About.
- Services.
- Skills.
- Featured projects.
- Project detail.
- Experience.
- Testimonials.
- Contact.
- Footer.
- SEO metadata.
- Responsive behavior.
- Loading/error/empty states.

### Exit Criteria
All public pages work on mobile, tablet, and desktop.

## Phase 4 — Admin Dashboard

### Tasks
- Login.
- Protected layout.
- Dashboard overview.
- Project CRUD.
- Media manager.
- Services CRUD.
- Skills CRUD.
- Experience CRUD.
- Testimonials CRUD.
- Site settings.
- Publish/draft workflow.
- Reordering.

### Exit Criteria
Admin can manage all public content without direct database access.

## Phase 5 — Performance and Quality

### Tasks
- Optimize images/video.
- Reduce client JavaScript.
- Add caching/revalidation.
- Accessibility audit.
- SEO audit.
- Security review.
- E2E tests.
- Lighthouse/Core Web Vitals review.

### Exit Criteria
No critical security, accessibility, or functional issues.

## Phase 6 — Production

### Tasks
- Production Supabase.
- Vercel production project.
- Environment variables.
- Custom domain.
- GitHub branch protection.
- Monitoring/logging.
- Final content migration.
- Backup/recovery plan.

### Exit Criteria
Production site and admin dashboard are verified end-to-end.

## MVP Scope

Must have:
- Public portfolio
- Projects
- About/services/skills
- Contact
- Admin auth
- Project CRUD
- Media upload
- Publish/draft
- Supabase RLS
- Responsive design
- SEO
- Vercel deployment

Later:
- Blog/CMS
- Analytics dashboard
- Testimonials moderation
- Multi-admin roles
- MFA
- Advanced media processing
- Search
- Newsletter
- Case-study analytics

## Token-Optimization Rules

- Keep project instructions in `AGENTS.md`.
- Use focused docs instead of one giant specification.
- Load only the document relevant to the current task.
- Keep acceptance criteria explicit.
- Avoid repeating architecture in every file.
- Prefer links/references between docs over duplicated content.
- Use small feature-level tasks.
- Do not paste entire files into prompts when repository access is available.
- Ask coding agents to inspect existing code before proposing changes.
- Prefer minimal diffs and reuse existing components.

## Recommended Build Order

```text
AGENTS
  ↓
requirements
  ↓
architecture
  ↓
database
  ↓
content-model
  ↓
security
  ↓
design-system
  ↓
development
  ↓
public UI
  ↓
admin dashboard
  ↓
testing
  ↓
deployment
```
