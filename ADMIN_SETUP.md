# Admin User Setup Guide

This guide explains how to create an admin user to access the portfolio admin dashboard.

## Prerequisites

You need a **Supabase project** with the database migrations applied.

### 1. Create a Supabase Project

1. Go to [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. Click "New Project"
3. Choose your organization
4. Enter project details:
   - **Name**: Your project name (e.g., "dev-portfolio")
   - **Database Password**: Generate a strong password (save it!)
   - **Region**: Choose closest to your users
5. Wait for project creation (~2 minutes)

### 2. Get API Credentials

1. In your Supabase Dashboard, go to **Settings → API**
2. Copy these values:
   - **Project URL** (e.g., `https://xxxxx.supabase.co`)
   - **Project API Keys → `service_role`** (secret, never expose to browser)
   - **Project API Keys → `anon` / `publishable`** (public, safe for browser)

### 3. Configure Environment Variables

Edit `c:\Projects\dev-portfolio\.env.local`:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-anon-key

# Server-only (never expose to browser)
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

### 4. Run Database Migrations

```bash
cd c:\Projects\dev-portfolio
npx supabase db push
```

This applies all migrations in `supabase/migrations/` to your Supabase project.

### 5. Create Admin User

Run the admin creation script:

```bash
cd c:\Projects\dev-portfolio
npx tsx scripts/create-admin-user.ts admin@example.com "your-secure-password" "Your Name"
```

**Arguments:**
- `email` - Admin email (default: `admin@example.com`)
- `password` - Admin password (default: `admin123456`) - **Use a strong password!**
- `displayName` - Display name (default: `Admin User`)

**Example with custom credentials:**
```bash
npx tsx scripts/create-admin-user.ts me@mydomain.com "SuperSecurePass123!" "John Developer"
```

### 6. Verify Setup

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Open http://localhost:3000/admin/login

3. Sign in with your admin credentials

## Alternative: Create Admin via Supabase Dashboard

If you prefer not to use the script, you can create the admin user manually:

### Step 1: Create Auth User
1. Go to **Authentication → Users** in Supabase Dashboard
2. Click "Add User" → "Create New User"
3. Enter email and password
4. Enable "Auto Confirm User" (or confirm via email)
5. Save

### Step 2: Create Profile with Admin Flag
1. Go to **Table Editor → profiles**
2. Click "Insert Row"
3. Fill in:
   - `id`: Copy the UUID from the auth user you just created
   - `display_name`: Your name
   - `headline`: Portfolio Administrator
   - `is_admin`: `true` (checkbox)
4. Save

## Troubleshooting

### "Invalid API key" error
- Verify `SUPABASE_SERVICE_ROLE_KEY` is correct in `.env.local`
- Ensure you're using the `service_role` key, not the `anon` key

### "supabaseUrl is required" error
- Verify `NEXT_PUBLIC_SUPABASE_URL` is set in `.env.local`
- Check for typos in the URL

### "Email already exists" error
- Use a different email address
- Or delete the existing user in Supabase Dashboard → Authentication → Users

### Migration errors
- Ensure you ran `npx supabase db push` after creating the project
- Check Supabase Dashboard → Database → Migrations for status

### Can't access /admin after login
- Verify the `is_admin` column is `true` in the `profiles` table
- Check browser console for errors
- Ensure middleware is working (check `src/middleware.ts`)

## Security Notes

- **Never commit `.env.local`** to version control (it's in `.gitignore`)
- Use a **strong password** for the admin account
- The `service_role` key has full database access - keep it secret
- Consider enabling 2FA in Supabase Auth settings for additional security

## Next Steps

After creating the admin user:
1. Customize your profile in **Admin → Settings → Profile**
2. Add projects, services, skills, experiences, testimonials
3. Configure site settings (contact info, SEO, branding)
4. Deploy to Vercel with production Supabase credentials