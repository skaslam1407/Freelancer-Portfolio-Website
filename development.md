# Development Guide

## Suggested Structure

```text
src/
  app/
    (public)/
    admin/
    api/
  components/
  features/
    projects/
    services/
    skills/
    testimonials/
    experience/
  lib/
    supabase/
    validation/
    seo/
  types/

supabase/
  migrations/
  seed.sql

public/
```

## Development Workflow

1. Create issue/feature.
2. Define acceptance criteria.
3. Create feature branch.
4. Implement smallest complete change.
5. Run typecheck/lint.
6. Run focused tests.
7. Verify responsive UI.
8. Review security/RLS implications.
9. Commit with clear message.
10. Open PR.
11. Verify Vercel preview.
12. Merge after review.

## Git

Recommended branches:
- `main`: production
- `develop`: optional integration
- `feature/*`
- `fix/*`

Commit examples:

```text
feat: add project management
fix: prevent unpublished projects from public pages
feat: add portfolio media uploader
```

## Environment Variables

Maintain `.env.example` with variable names only.

Typical variables:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`

Only add server-only variables when strictly required.

## Dependency Policy

Before adding a dependency:
- Confirm native Next.js/React capability is insufficient.
- Check maintenance and bundle cost.
- Prefer small, focused packages.
