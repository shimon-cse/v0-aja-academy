/**
 * Supabase client utilities for authentication and database operations
 * 
 * Usage:
 * - In client components: import { createClient } from '@/lib/supabase'
 * - In server components: import { createServerClient } from '@/lib/supabase/server'
 * - For auth callbacks: import { createClient as createAuthClient } from '@/lib/supabase/client'
 */

export { createClient } from './supabase/client'
export { createServerClient } from './supabase/server'
export { updateSession } from './supabase/proxy'
