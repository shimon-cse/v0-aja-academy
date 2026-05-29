'use client'

export const dynamic = 'force-dynamic'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { AlertCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    const supabase = createClient()

    try {
      // Login with email and password
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (signInError) throw signInError

      // Check if user is admin (this would be stored in user metadata)
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (user?.user_metadata?.is_admin) {
        router.push('/admin/dashboard')
      } else {
        setError('Access denied. Admin credentials required.')
        await supabase.auth.signOut()
      }
    } catch (err: any) {
      setError(err.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8">
        <Link href="/" className="text-2xl font-bold text-primary mb-8 block text-center">
          EA Admin
        </Link>

        <h1 className="text-3xl font-bold text-foreground mb-2 text-center">Admin Login</h1>
        <p className="text-slate-600 dark:text-slate-400 text-center mb-8">Manage students and academy data</p>

        <form onSubmit={handleAdminLogin} className="space-y-6">
          {error && (
            <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0" />
              <p className="text-red-700 dark:text-red-400 text-sm">{error}</p>
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
              Email
            </label>
            <Input
              id="email"
              type="email"
              placeholder="admin@academy.edu"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
              Password
            </label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </Button>
        </form>

        <p className="text-center text-slate-600 dark:text-slate-400 mt-6 text-sm">
          Not an admin?{' '}
          <Link href="/auth/login" className="text-accent font-semibold hover:underline">
            Student Login
          </Link>
        </p>
      </Card>
    </div>
  )
}
