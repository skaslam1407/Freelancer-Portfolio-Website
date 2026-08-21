# Testing Strategy

## Test Layers

### Static
- TypeScript typecheck
- ESLint

### Unit
Test:
- validation schemas
- utility functions
- content formatting
- authorization helpers

### Integration
Test:
- Supabase queries
- RLS policies
- admin CRUD
- publishing workflow
- media metadata handling

### E2E
Test:
- public navigation
- project detail page
- admin login
- create/edit/publish project
- media upload
- logout
- unauthorized admin access

### Visual/Responsive
Verify:
- mobile
- tablet
- desktop
- keyboard navigation
- focus states
- loading/error/empty states

## Critical Security Tests

- Anonymous user cannot mutate content.
- Authenticated non-admin cannot mutate content.
- Admin can perform intended mutations.
- Anonymous user cannot read drafts.
- Storage policies prevent unauthorized access where required.

## Performance Checks

- Lighthouse/PageSpeed review.
- Image sizes.
- JavaScript shipped to client.
- LCP/INP/CLS.
- Slow network behavior.
