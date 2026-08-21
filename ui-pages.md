# UI Pages and Routes

## Public Routes

```text
/
 /about
 /services
 /portfolio
 /portfolio/[slug]
 /contact
```

Optional:
```text
 /blog
 /blog/[slug]
```

## Admin Routes

```text
/admin
/admin/login
/admin/projects
/admin/projects/new
/admin/projects/[id]
/admin/services
/admin/skills
/admin/experience
/admin/testimonials
/admin/media
/admin/settings
```

## Page Responsibilities

### Home
Hero, value proposition, featured work, services, proof, CTA.

### Portfolio
Filterable/listed projects.

### Project Detail
Case-study narrative, technology, media, results, links.

### Admin Dashboard
Quick stats, recent content, shortcuts.

### Admin Project Editor
Validated form with content, SEO, status, ordering, and media management.

## UX States

Every data-driven page should define:
- Loading
- Empty
- Error
- Success
- Unauthorized
- Not found

Admin destructive actions require confirmation.
