'use client'

export const dynamic = 'force-dynamic'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { LogOut, BookOpen, DollarSign, Bell } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface StudentData {
  first_name: string
  last_name: string
  email: string
  class: string
  roll_no: string
}

interface AttendanceData {
  attendance_percentage: number
}

interface FeesData {
  amount: number
  paid_amount: number
  status: 'paid' | 'pending' | 'partial'
}

interface Notice {
  id: string
  title: string
  content: string
  created_at: string
  is_admin_notice: boolean
}

export default function StudentDashboard() {
  const [student, setStudent] = useState<StudentData | null>(null)
  const [attendance, setAttendance] = useState<AttendanceData | null>(null)
  const [fees, setFees] = useState<FeesData | null>(null)
  const [notices, setNotices] = useState<Notice[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser()

        if (!user) {
          router.push('/auth/login')
          return
        }

        // Fetch student data
        const { data: studentData, error: studentError } = await supabase
          .from('students')
          .select('*')
          .eq('id', user.id)
          .single()

        if (studentError) throw studentError
        setStudent(studentData)

        // Fetch attendance
        const { data: attendanceData, error: attendanceError } = await supabase
          .from('attendance')
          .select('*')
          .eq('student_id', user.id)
          .single()

        if (!attendanceError) {
          setAttendance(attendanceData)
        }

        // Fetch fees
        const { data: feesData, error: feesError } = await supabase
          .from('fees')
          .select('*')
          .eq('student_id', user.id)
          .single()

        if (!feesError) {
          setFees(feesData)
        }

        // Fetch notices
        const { data: noticesData, error: noticesError } = await supabase
          .from('notices')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(5)

        if (!noticesError) {
          setNotices(noticesData || [])
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [router, supabase])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-600 dark:text-slate-400">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Header */}
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-primary">
              EA
            </Link>
            <div className="flex items-center gap-4">
              <span className="text-foreground font-medium">{student?.first_name} {student?.last_name}</span>
              <Button variant="outline" onClick={handleLogout} className="gap-2">
                <LogOut className="w-4 h-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-primary mb-8">Student Dashboard</h1>

        {/* Profile Card */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card className="p-6">
            <h2 className="text-2xl font-bold text-foreground mb-6">Profile Information</h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Full Name</p>
                <p className="text-lg font-semibold text-foreground">{student?.first_name} {student?.last_name}</p>
              </div>
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Email</p>
                <p className="text-lg font-semibold text-foreground">{student?.email}</p>
              </div>
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Class</p>
                <p className="text-lg font-semibold text-foreground">{student?.class}</p>
              </div>
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Roll Number</p>
                <p className="text-lg font-semibold text-foreground">{student?.roll_no}</p>
              </div>
            </div>
          </Card>

          {/* Attendance Card */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <BookOpen className="w-6 h-6 text-accent" />
              <h2 className="text-2xl font-bold text-foreground">Attendance</h2>
            </div>
            {attendance ? (
              <div>
                <div className="mb-6">
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">Attendance Percentage</p>
                  <div className="flex items-baseline gap-2">
                    <p className="text-4xl font-bold text-primary">{attendance.attendance_percentage}%</p>
                  </div>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3">
                  <div
                    className="bg-accent h-3 rounded-full transition-all"
                    style={{ width: `${attendance.attendance_percentage}%` }}
                  />
                </div>
              </div>
            ) : (
              <p className="text-slate-600 dark:text-slate-400">No attendance data available</p>
            )}
          </Card>
        </div>

        {/* Fees Card */}
        <div className="mb-12">
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <DollarSign className="w-6 h-6 text-accent" />
              <h2 className="text-2xl font-bold text-foreground">Fees Status</h2>
            </div>
            {fees ? (
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Total Amount</p>
                  <p className="text-2xl font-bold text-foreground">${fees.amount.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Amount Paid</p>
                  <p className="text-2xl font-bold text-accent">${fees.paid_amount.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Status</p>
                  <div className="flex gap-2">
                    <span className={`px-4 py-2 rounded-full font-semibold text-sm ${
                      fees.status === 'paid'
                        ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100'
                        : fees.status === 'partial'
                        ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-100'
                        : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-100'
                    }`}>
                      {fees.status.charAt(0).toUpperCase() + fees.status.slice(1)}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-slate-600 dark:text-slate-400">No fees data available</p>
            )}
          </Card>
        </div>

        {/* Notice Board */}
        <div>
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <Bell className="w-6 h-6 text-accent" />
              <h2 className="text-2xl font-bold text-foreground">Notice Board</h2>
            </div>
            {notices.length > 0 ? (
              <div className="space-y-4">
                {notices.map((notice) => (
                  <div key={notice.id} className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-lg font-semibold text-foreground">{notice.title}</h3>
                      {notice.is_admin_notice && (
                        <span className="px-2 py-1 bg-accent/10 text-accent text-xs font-semibold rounded">ADMIN</span>
                      )}
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 mb-2">{notice.content}</p>
                    <p className="text-sm text-slate-500 dark:text-slate-500">
                      {new Date(notice.created_at).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-slate-600 dark:text-slate-400">No notices available</p>
            )}
          </Card>
        </div>
      </main>
    </div>
  )
}
