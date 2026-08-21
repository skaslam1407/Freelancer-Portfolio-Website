# Database Design

## Core Tables

### profiles
- `id` UUID PK/FK to auth user
- `display_name`
- `headline`
- `bio`
- `avatar_url`
- `resume_url`
- timestamps

### projects
- `id`
- `slug` unique
- `title`
- `short_description`
- `description`
- `role`
- `client_name` optional
- `project_url` optional
- `repository_url` optional
- `cover_media_id` optional
- `featured`
- `status` (`draft`, `published`)
- `sort_order`
- `published_at`
- timestamps

### project_media
- `id`
- `project_id`
- `storage_path`
- `media_type` (`image`, `video`)
- `alt_text`
- `caption`
- `sort_order`
- timestamps

### services
- `id`
- `title`
- `description`
- `icon`
- `sort_order`
- `status`

### skills
- `id`
- `name`
- `category`
- `icon`
- `sort_order`
- `status`

### experiences
- `id`
- `company`
- `role`
- `description`
- `start_date`
- `end_date`
- `is_current`
- `sort_order`

### testimonials
- `id`
- `name`
- `role`
- `company`
- `quote`
- `avatar_url`
- `status`
- `sort_order`

### site_settings
- singleton-style configuration for contact details, social links, SEO defaults, availability text, and branding.

## Relationships

```text
profiles 1---1 site_settings
projects 1---N project_media
```

## Database Rules

- Use UUID primary keys.
- Add indexes for slug, status, featured, and sort order where useful.
- Use foreign keys for relationships.
- Add unique constraints for slugs.
- Use timestamps consistently.
- Use RLS on every application table.
- Public SELECT should only expose published content.
- Admin mutations require authenticated admin authorization.
