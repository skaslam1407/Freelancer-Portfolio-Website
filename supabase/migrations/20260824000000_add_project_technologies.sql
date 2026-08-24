-- Create project_technologies table
CREATE TABLE IF NOT EXISTS project_technologies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_project_technologies_project_id ON project_technologies(project_id);

ALTER TABLE project_technologies ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public project technologies are viewable by everyone" ON project_technologies
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM projects
      WHERE projects.id = project_technologies.project_id
      AND projects.status = 'published'
    )
  );

CREATE POLICY "Admins can manage project technologies" ON project_technologies
  FOR ALL USING (is_admin());