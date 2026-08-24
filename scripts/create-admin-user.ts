import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
dotenv.config({ path: path.resolve(__dirname, '../.env.local') })

import { createServiceClient } from '@/lib/supabase/service'

async function createAdminUser(email: string, password: string, displayName: string) {
  // Validate environment variables
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !serviceRoleKey) {
    console.error('❌ Missing required environment variables!')
    console.error('')
    console.error('Please ensure .env.local contains:')
    console.error('  NEXT_PUBLIC_SUPABASE_URL=your-project-url')
    console.error('  SUPABASE_SERVICE_ROLE_KEY=your-service-role-key')
    console.error('')
    console.error('Get these from your Supabase Dashboard: Settings → API')
    process.exit(1)
  }

  if (supabaseUrl.includes('your-project') || serviceRoleKey.includes('your-service-role')) {
    console.error('❌ Environment variables contain placeholder values!')
    console.error('')
    console.error('Please update .env.local with your actual Supabase project credentials.')
    console.error('Get these from: https://supabase.com/dashboard/project/_/settings/api')
    process.exit(1)
  }

  const supabase = createServiceClient()

  console.log('🔐 Creating admin user...')
  console.log(`   Email: ${email}`)
  console.log(`   Display Name: ${displayName}`)
  console.log('')

  // Step 1: Create the auth user
  const { data: authData, error: authError } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true, // Auto-confirm email
    user_metadata: {
      display_name: displayName,
    },
  })

  if (authError) {
    console.error('❌ Error creating auth user:', authError.message)
    console.error('')
    console.error('Common issues:')
    console.error('  - Email already exists (try a different email)')
    console.error('  - Weak password (min 6 characters)')
    console.error('  - Invalid API credentials (check .env.local)')
    process.exit(1)
  }

  console.log('✅ Auth user created:', authData.user?.id)

  // Step 2: Create the profile with is_admin = true
  const { error: profileError } = await supabase
    .from('profiles')
    .insert({
      id: authData.user!.id,
      display_name: displayName,
      headline: 'Portfolio Administrator',
      is_admin: true,
    })

  if (profileError) {
    console.error('❌ Error creating profile:', profileError.message)
    // Try to clean up the auth user if profile creation fails
    await supabase.auth.admin.deleteUser(authData.user!.id)
    process.exit(1)
  }

  console.log('✅ Admin profile created successfully!')
  console.log('')
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  console.log('🎉 Admin user ready!')
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  console.log('Login credentials:')
  console.log(`  Email:    ${email}`)
  console.log(`  Password: ${password}`)
  console.log('')
  console.log('Next steps:')
  console.log('  1. Run the dev server: npm run dev')
  console.log('  2. Visit http://localhost:3000/admin/login')
  console.log('  3. Sign in with the credentials above')
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
}

// Get credentials from command line args or use defaults
const email = process.argv[2] || 'admin@example.com'
const password = process.argv[3] || 'admin123456'
const displayName = process.argv[4] || 'Admin User'

createAdminUser(email, password, displayName).catch((err) => {
  console.error('Unexpected error:', err)
  process.exit(1)
})