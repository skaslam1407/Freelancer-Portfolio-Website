# Architecture

## High-Level

```text
                    GitHub
                      |
                      v
                    Vercel
                      |
              +-------+-------+
              |   Next.js     |
              | App Router    |
              +-------+-------+
                      |
        +-------------+-------------+
        |             |             |
        v             v             v
   Supabase Auth  PostgreSQL     Storage
        |             |             |
        +-------------+-------------+
                      |
                  Public/Admin
                    UI flows
```

## Application Layers

- `app/`: routes and layouts.
- `components/`: reusable UI.
- `features/`: domain-specific UI and actions.
- `lib/supabase/`: Supabase clients and helpers.
- `lib/validation/`: schemas.
- `lib/seo/`: metadata helpers.
- `types/`: shared TypeScript types.
- `supabase/migrations/`: database migrations.

## Rendering Strategy

- Public content: Server Components + static/ISR where useful.
- Admin dashboard: authenticated dynamic routes.
- Interactive forms: Client Components only where needed.
- Media-heavy sections: lazy load below-the-fold content.

## Data Flow

Public:
`Browser -> Next.js Server Component -> Supabase -> Render`

Admin:
`Browser -> Authenticated Next.js route/action -> Supabase Auth/RLS -> Database/Storage`

## Architectural Principles

- Server-first.
- Least privilege.
- Database constraints over application-only assumptions.
- Reusable UI primitives.
- Feature isolation.
- Small dependencies.
- Cache public content; invalidate after publishing changes.
