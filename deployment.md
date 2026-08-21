# Deployment

## Production Architecture

```text
GitHub
  -> Vercel
      -> Next.js production deployment
          -> Supabase
              -> PostgreSQL
              -> Auth
              -> Storage
```

## Vercel Setup

1. Import GitHub repository.
2. Configure project root if needed.
3. Configure environment variables.
4. Deploy.
5. Verify build.
6. Configure custom domain.
7. Enable production monitoring/analytics as required.

## Supabase Setup

1. Create production project.
2. Apply migrations.
3. Configure Auth.
4. Create Storage buckets.
5. Apply RLS and Storage policies.
6. Create initial admin account.
7. Verify production data access.

## GitHub

Use pull requests and protected `main`.

Recommended checks:
- install
- lint
- typecheck
- test
- build

## Deployment Checklist

- [ ] Production Supabase project configured.
- [ ] Database migrations applied.
- [ ] RLS policies verified.
- [ ] Storage policies verified.
- [ ] Vercel environment variables configured.
- [ ] Production build passes.
- [ ] Custom domain configured.
- [ ] HTTPS verified.
- [ ] Admin login verified.
- [ ] Public draft isolation verified.
- [ ] Contact form verified.
- [ ] SEO metadata verified.

## Rollback

Use Vercel deployment rollback for application releases and database migration rollback procedures for schema changes.

Never manually edit production data as a substitute for a migration when the change is structural.
