# Security

## Authentication

Use Supabase Auth for admin login.

Recommended:
- Email/password initially.
- Optional MFA later.
- Protected admin route group.
- Server-side session verification.

## Authorization

Authentication is not authorization.

Use a database role/profile or dedicated admin authorization mechanism and enforce it with RLS.

Example policy intent:

```text
Public:
  SELECT published content only

Admin:
  SELECT/INSERT/UPDATE/DELETE protected content
```

## Secrets

Never expose:
- Supabase service-role key
- private API keys
- deployment credentials

Browser-safe:
- Supabase project URL
- Supabase anonymous/publishable key, subject to RLS

## Input Security

- Validate all forms with a schema.
- Sanitize/render rich text safely.
- Validate URLs.
- Restrict upload MIME types and sizes.
- Prevent arbitrary HTML/script injection.
- Use secure HTTP-only sessions through the framework's supported Supabase integration.

## Abuse Protection

- Add rate limiting to contact submission/login-sensitive endpoints.
- Add spam protection to contact form.
- Avoid returning internal database errors to users.
- Log actionable server-side errors without secrets.

## Security Checklist

- RLS enabled on every exposed table.
- No service-role key in client bundle.
- Admin routes protected.
- Admin authorization enforced in database policies.
- Upload restrictions enabled.
- Dependencies audited.
- Production environment variables configured securely.
