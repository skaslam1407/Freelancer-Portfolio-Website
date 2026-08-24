-- Admin User Creation Script
-- Run this in Supabase Dashboard → SQL Editor after creating an auth user
-- 
-- Steps:
-- 1. Go to Authentication → Users → "Add User" → Create new user with email/password
-- 2. Copy the User UUID from the auth user
-- 3. Replace YOUR_USER_UUID_HERE below with the actual UUID
-- 4. Replace 'Your Name' with your desired display name
-- 5. Run this script

-- Insert admin profile (replace UUID and name)
INSERT INTO profiles (id, display_name, headline, is_admin)
VALUES (
  'YOUR_USER_UUID_HERE',  -- Replace with auth user UUID
  'Your Name',             -- Replace with your name
  'Portfolio Administrator',
  true
)
ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  headline = EXCLUDED.headline,
  is_admin = EXCLUDED.is_admin;

-- Verify the admin user was created
SELECT id, display_name, headline, is_admin, created_at
FROM profiles
WHERE is_admin = true;