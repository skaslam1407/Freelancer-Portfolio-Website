# AGENTS.md

## Project
Premium developer freelancer portfolio built with Next.js, Supabase, Vercel, and GitHub.

## Rules
- Use TypeScript and strict typing.
- Prefer Server Components; use Client Components only when interactivity requires them.
- Keep Supabase access server-side by default.
- Never expose service-role keys to the browser.
- Enforce authorization with Supabase Auth + Row Level Security (RLS).
- Store media in Supabase Storage; store metadata/URLs in PostgreSQL.
- Optimize images/video, Core Web Vitals, accessibility, SEO, and responsive behavior.
- Keep components reusable and feature-oriented.
- Avoid unnecessary dependencies and abstractions.
- Validate all admin inputs server-side.
- Never commit secrets, `.env*` files containing credentials, or generated build artifacts.
- Every feature must have acceptance criteria and focused verification.

## Definition of Done
- Feature implemented according to requirements.
- TypeScript/lint/build checks pass.
- Auth/RLS behavior verified for admin and public users.
- Responsive and accessibility checks completed.
- SEO metadata checked for public pages.
- No secrets or unnecessary dependencies introduced.
