-- Create profiles table
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT NOT NULL,
  headline TEXT,
  bio TEXT,
  avatar_url TEXT,
  resume_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create projects table
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  short_description TEXT,
  description TEXT,
  role TEXT,
  client_name TEXT,
  project_url TEXT,
  repository_url TEXT,
  cover_media_id UUID,
  featured BOOLEAN DEFAULT FALSE,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  sort_order INTEGER DEFAULT 0,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create project_media table
CREATE TABLE project_media (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  storage_path TEXT NOT NULL,
  media_type TEXT NOT NULL CHECK (media_type IN ('image', 'video')),
  alt_text TEXT,
  caption TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create services table
CREATE TABLE services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  sort_order INTEGER DEFAULT 0,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create skills table
CREATE TABLE skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  category TEXT,
  icon TEXT,
  sort_order INTEGER DEFAULT 0,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create experiences table
CREATE TABLE experiences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company TEXT NOT NULL,
  role TEXT NOT NULL,
  description TEXT,
  start_date DATE NOT NULL,
  end_date DATE,
  is_current BOOLEAN DEFAULT FALSE,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create testimonials table
CREATE TABLE testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  role TEXT,
  company TEXT,
  quote TEXT NOT NULL,
  avatar_url TEXT,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create site_settings table (singleton)
CREATE TABLE site_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  contact_email TEXT,
  contact_phone TEXT,
  address TEXT,
  social_links JSONB,
  seo_defaults JSONB,
  availability_text TEXT,
  branding JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(profile_id)
);

-- Add foreign key for cover_media_id after both tables exist
ALTER TABLE projects
ADD CONSTRAINT fk_projects_cover_media
FOREIGN KEY (cover_media_id) REFERENCES project_media(id) ON DELETE SET NULL;

-- Create indexes
CREATE INDEX idx_projects_slug ON projects(slug);
CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_projects_featured ON projects(featured);
CREATE INDEX idx_projects_sort_order ON projects(sort_order);
CREATE INDEX idx_projects_published_at ON projects(published_at);
CREATE INDEX idx_project_media_project_id ON project_media(project_id);
CREATE INDEX idx_services_status ON services(status);
CREATE INDEX idx_services_sort_order ON services(sort_order);
CREATE INDEX idx_skills_status ON skills(status);
CREATE INDEX idx_skills_sort_order ON skills(sort_order);
CREATE INDEX idx_experiences_sort_order ON experiences(sort_order);
CREATE INDEX idx_testimonials_status ON testimonials(status);
CREATE INDEX idx_testimonials_sort_order ON testimonials(sort_order);

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_media ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- Public read policies (only published content)
CREATE POLICY "Public profiles are viewable by everyone" ON profiles
  FOR SELECT USING (true);

CREATE POLICY "Published projects are viewable by everyone" ON projects
  FOR SELECT USING (status = 'published');

CREATE POLICY "Published project media are viewable by everyone" ON project_media
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM projects
      WHERE projects.id = project_media.project_id
      AND projects.status = 'published'
    )
  );

CREATE POLICY "Published services are viewable by everyone" ON services
  FOR SELECT USING (status = 'published');

CREATE POLICY "Published skills are viewable by everyone" ON skills
  FOR SELECT USING (status = 'published');

CREATE POLICY "Experiences are viewable by everyone" ON experiences
  FOR SELECT USING (true);

CREATE POLICY "Published testimonials are viewable by everyone" ON testimonials
  FOR SELECT USING (status = 'published');

CREATE POLICY "Site settings are viewable by everyone" ON site_settings
  FOR SELECT USING (true);

-- Admin policies (require authenticated admin)
-- We'll use a helper function to check admin status
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN (
    SELECT EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.is_admin = true
    )
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Admin full access policies
CREATE POLICY "Admins can manage profiles" ON profiles
  FOR ALL USING (is_admin());

CREATE POLICY "Admins can manage projects" ON projects
  FOR ALL USING (is_admin());

CREATE POLICY "Admins can manage project media" ON project_media
  FOR ALL USING (is_admin());

CREATE POLICY "Admins can manage services" ON services
  FOR ALL USING (is_admin());

CREATE POLICY "Admins can manage skills" ON skills
  FOR ALL USING (is_admin());

CREATE POLICY "Admins can manage experiences" ON experiences
  FOR ALL USING (is_admin());

CREATE POLICY "Admins can manage testimonials" ON testimonials
  FOR ALL USING (is_admin());

CREATE POLICY "Admins can manage site settings" ON site_settings
  FOR ALL USING (is_admin());

-- Storage buckets will be created via Supabase dashboard or API
-- But we can define the bucket policies here for reference