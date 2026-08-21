# API and Server Actions

## Principle

Prefer Next.js Server Actions or server-side data access for internal admin CRUD rather than creating unnecessary REST endpoints.

## Public Reads

Public pages should read published data through server-side Supabase queries.

## Admin Mutations

Use server actions or route handlers for:
- Create project
- Update project
- Delete project
- Publish/unpublish
- Upload/delete media
- Manage services
- Manage skills
- Manage experience
- Manage testimonials
- Update site settings

## Validation

Every mutation:
1. Verify session.
2. Verify admin authorization.
3. Validate input.
4. Perform database/storage operation.
5. Revalidate affected paths/tags.
6. Return safe success/error state.

## Errors

Return user-friendly errors:

```text
ValidationError
Unauthorized
Forbidden
NotFound
Conflict
StorageError
InternalError
```

Do not expose raw SQL, stack traces, or secrets.

## Caching

Cache public content where beneficial.

Invalidate relevant pages after publish/update/delete.

Avoid caching private admin responses.
