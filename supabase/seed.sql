-- Seed initial data for development
-- This will be run after migrations

-- Insert a default profile (will be linked to auth user on signup)
-- Note: Profile is created via trigger on auth.users, so we don't insert here

-- Insert sample services
INSERT INTO services (title, description, icon, sort_order, status) VALUES
  ('Web Development', 'Custom web applications built with modern frameworks', 'code', 1, 'published'),
  ('API Design & Development', 'RESTful and GraphQL APIs with proper documentation', 'server', 2, 'published'),
  ('Database Architecture', 'Scalable database design and optimization', 'database', 3, 'published'),
  ('DevOps & Cloud', 'CI/CD pipelines, containerization, and cloud infrastructure', 'cloud', 4, 'published'),
  ('Technical Consulting', 'Architecture reviews and technology strategy', 'message-square', 5, 'published'),
  ('Code Audits', 'Security and performance code reviews', 'shield', 6, 'published')
ON CONFLICT DO NOTHING;

-- Insert sample skills
INSERT INTO skills (name, category, icon, sort_order, status) VALUES
  ('TypeScript', 'Language', 'typescript', 1, 'published'),
  ('React', 'Frontend', 'react', 2, 'published'),
  ('Next.js', 'Frontend', 'nextjs', 3, 'published'),
  ('Node.js', 'Backend', 'nodejs', 4, 'published'),
  ('PostgreSQL', 'Database', 'postgresql', 5, 'published'),
  ('Supabase', 'Backend', 'supabase', 6, 'published'),
  ('Docker', 'DevOps', 'docker', 7, 'published'),
  ('AWS', 'Cloud', 'aws', 8, 'published'),
  ('GraphQL', 'API', 'graphql', 9, 'published'),
  ('REST APIs', 'API', 'api', 10, 'published'),
  ('Tailwind CSS', 'Frontend', 'tailwind', 11, 'published'),
  ('Prisma', 'Database', 'prisma', 12, 'published'),
  ('Git', 'Tools', 'git', 13, 'published'),
  ('CI/CD', 'DevOps', 'github-actions', 14, 'published'),
  ('Testing', 'Quality', 'jest', 15, 'published')
ON CONFLICT DO NOTHING;

-- Insert sample experiences
INSERT INTO experiences (company, role, description, start_date, end_date, is_current, sort_order) VALUES
  ('Freelance', 'Senior Full-Stack Developer', 'Building custom web applications for clients across various industries. Specializing in React, Next.js, TypeScript, and cloud-native architectures.', '2022-01', NULL, TRUE, 1),
  ('TechCorp Inc.', 'Lead Developer', 'Led a team of 5 developers building SaaS products. Architected migration from monolith to microservices. Reduced deployment time by 80%.', '2019-03', '2021-12', FALSE, 2),
  ('StartupXYZ', 'Full-Stack Developer', 'Built and maintained customer-facing web applications. Implemented real-time features using WebSockets. Mentored junior developers.', '2017-06', '2019-02', FALSE, 3),
  ('Digital Agency', 'Junior Developer', 'Developed responsive websites and web applications for agency clients. Learned modern frontend practices and version control.', '2015-09', '2017-05', FALSE, 4)
ON CONFLICT DO NOTHING;

-- Insert sample testimonials
INSERT INTO testimonials (name, role, company, quote, avatar_url, status, sort_order) VALUES
  ('Sarah Chen', 'CTO', 'TechStart', 'Exceptional technical skills and great communication. Delivered our project ahead of schedule with clean, maintainable code.', NULL, 'published', 1),
  ('Marcus Johnson', 'Product Manager', 'InnovateCo', 'Deep understanding of both frontend and backend. Proactive about suggesting improvements and catching issues early.', NULL, 'published', 2),
  ('Emily Rodriguez', 'Founder', 'GrowthLab', 'Reliable, skilled, and a pleasure to work with. Takes ownership of projects and delivers quality results consistently.', NULL, 'published', 3)
ON CONFLICT DO NOTHING;