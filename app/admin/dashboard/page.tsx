'use client'

export const dynamic = 'force-dynamic'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { LogOut, Plus, Edit2, Trash2, X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface Student {
  id: string
  first_name: string
  last_name: string
  email: string
  class: string
  roll_no: string
}

interface FormData {
  first_name: string
  last_name: string
  email: string
  class: string
  roll_no: string
  password?: string
}

interface AttendanceFormData {
  attendance_percentage: number
  total_classes: number
  classes_attended: number
}

interface FeesFormData {
  amount: number
  paid_amount: number
  status: 'pending' | 'paid' | 'partial'
}

interface NoticeFormData {
  title: string
  content: string
}

export default function AdminDashboard() {
  const [students, setStudents] = useState<Student[]>([])
  const [loading, setLoading] = useState(true)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isAttendanceModalOpen, setIsAttendanceModalOpen] = useState(false)
  const [isFeesModalOpen, setIsFeesModalOpen] = useState(false)
  const [isNoticeModalOpen, setIsNoticeModalOpen] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)
  const [formData, setFormData] = useState<FormData>({ first_name: '', last_name: '', email: '', class: '', roll_no: '' })
  const [attendanceData, setAttendanceData] = useState<AttendanceFormData>({ attendance_percentage: 0, total_classes: 0, classes_attended: 0 })
  const [feesData, setFeesData] = useState<FeesFormData>({ amount: 0, paid_amount: 0, status: 'pending' })
  const [noticeData, setNoticeData] = useState<NoticeFormData>({ title: '', content: '' })
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const checkAdminAndFetchStudents = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser()

        if (!user || !user.user_metadata?.is_admin) {
          router.push('/admin/login')
          return
        }

        const { data, error } = await supabase.from('students').select('*').order('created_at', { ascending: false })

        if (error) throw error
        setStudents(data || [])
      } catch (error) {
        console.error('Error fetching students:', error)
      } finally {
        setLoading(false)
      }
    }

    checkAdminAndFetchStudents()
  }, [router, supabase])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  const handleAddStudent = async () => {
    try {
      if (!formData.password) {
        alert('Password is required')
        return
      }

      // Create auth user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            first_name: formData.first_name,
            last_name: formData.last_name,
          },
        },
      })

      if (authError) throw authError

      if (authData.user) {
        // Create student record
        const { error: studentError } = await supabase.from('students').insert({
          id: authData.user.id,
          first_name: formData.first_name,
          last_name: formData.last_name,
          email: formData.email,
          class: formData.class,
          roll_no: formData.roll_no,
        })

        if (studentError) throw studentError

        // Create attendance record
        await supabase.from('attendance').insert({
          student_id: authData.user.id,
          attendance_percentage: 0,
        })

        // Create fees record
        await supabase.from('fees').insert({
          student_id: authData.user.id,
          amount: 0,
          paid_amount: 0,
          status: 'pending',
        })

        setStudents([...students, { id: authData.user.id, ...formData }])
        setFormData({ first_name: '', last_name: '', email: '', class: '', roll_no: '' })
        setIsAddModalOpen(false)
        alert('Student added successfully!')
      }
    } catch (error: any) {
      alert('Error adding student: ' + error.message)
    }
  }

  const handleUpdateAttendance = async () => {
    if (!selectedStudent) return
    try {
      const { error } = await supabase
        .from('attendance')
        .update(attendanceData)
        .eq('student_id', selectedStudent.id)

      if (error) throw error
      setIsAttendanceModalOpen(false)
      alert('Attendance updated successfully!')
    } catch (error: any) {
      alert('Error updating attendance: ' + error.message)
    }
  }

  const handleUpdateFees = async () => {
    if (!selectedStudent) return
    try {
      const { error } = await supabase
        .from('fees')
        .update(feesData)
        .eq('student_id', selectedStudent.id)

      if (error) throw error
      setIsFeesModalOpen(false)
      alert('Fees updated successfully!')
    } catch (error: any) {
      alert('Error updating fees: ' + error.message)
    }
  }

  const handlePostNotice = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { error } = await supabase.from('notices').insert({
        ...noticeData,
        created_by: user.id,
        is_admin_notice: true,
      })

      if (error) throw error
      setNoticeData({ title: '', content: '' })
      setIsNoticeModalOpen(false)
      alert('Notice posted successfully!')
    } catch (error: any) {
      alert('Error posting notice: ' + error.message)
    }
  }

  const handleDeleteStudent = async (studentId: string) => {
    if (!confirm('Are you sure you want to delete this student?')) return
    try {
      const { error } = await supabase.from('students').delete().eq('id', studentId)
      if (error) throw error
      setStudents(students.filter((s) => s.id !== studentId))
      alert('Student deleted successfully!')
    } catch (error: any) {
      alert('Error deleting student: ' + error.message)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center">
        <p className="text-slate-600 dark:text-slate-400">Loading...</p>
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
              EA Admin
            </Link>
            <Button variant="outline" onClick={handleLogout} className="gap-2">
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-primary">Admin Dashboard</h1>
          <div className="flex gap-2">
            <Button onClick={() => setIsAddModalOpen(true)} className="gap-2 bg-accent text-accent-foreground hover:bg-orange-600">
              <Plus className="w-4 h-4" />
              Add Student
            </Button>
            <Button onClick={() => setIsNoticeModalOpen(true)} variant="outline" className="gap-2">
              <Plus className="w-4 h-4" />
              Post Notice
            </Button>
          </div>
        </div>

        {/* Students Table */}
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-100 dark:bg-slate-800">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Name</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Email</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Class</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Roll No</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                {students.map((student) => (
                  <tr key={student.id} className="hover:bg-slate-50 dark:hover:bg-slate-800">
                    <td className="px-6 py-4 text-foreground">{student.first_name} {student.last_name}</td>
                    <td className="px-6 py-4 text-foreground text-sm">{student.email}</td>
                    <td className="px-6 py-4 text-foreground">{student.class}</td>
                    <td className="px-6 py-4 text-foreground">{student.roll_no}</td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setSelectedStudent(student)
                            setIsAttendanceModalOpen(true)
                          }}
                          className="gap-1"
                        >
                          <Edit2 className="w-4 h-4" />
                          Attendance
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setSelectedStudent(student)
                            setIsFeesModalOpen(true)
                          }}
                          className="gap-1"
                        >
                          <Edit2 className="w-4 h-4" />
                          Fees
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDeleteStudent(student.id)}
                          className="gap-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {students.length === 0 && (
          <Card className="p-8 text-center">
            <p className="text-slate-600 dark:text-slate-400">No students enrolled yet.</p>
          </Card>
        )}
      </main>

      {/* Add Student Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-foreground">Add Student</h2>
              <Button variant="ghost" size="icon" onClick={() => setIsAddModalOpen(false)}>
                <X className="w-5 h-5" />
              </Button>
            </div>
            <div className="space-y-4">
              <Input
                placeholder="First Name"
                value={formData.first_name}
                onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
              />
              <Input
                placeholder="Last Name"
                value={formData.last_name}
                onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
              />
              <Input
                placeholder="Email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
              <Input
                placeholder="Password"
                type="password"
                value={formData.password || ''}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
              <Input
                placeholder="Class"
                value={formData.class}
                onChange={(e) => setFormData({ ...formData, class: e.target.value })}
              />
              <Input
                placeholder="Roll No"
                value={formData.roll_no}
                onChange={(e) => setFormData({ ...formData, roll_no: e.target.value })}
              />
              <div className="flex gap-2 pt-4">
                <Button onClick={handleAddStudent} className="flex-1 bg-accent text-accent-foreground hover:bg-orange-600">
                  Add
                </Button>
                <Button onClick={() => setIsAddModalOpen(false)} variant="outline" className="flex-1">
                  Cancel
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Attendance Modal */}
      {isAttendanceModalOpen && selectedStudent && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-foreground">Update Attendance - {selectedStudent.first_name}</h2>
              <Button variant="ghost" size="icon" onClick={() => setIsAttendanceModalOpen(false)}>
                <X className="w-5 h-5" />
              </Button>
            </div>
            <div className="space-y-4">
              <Input
                type="number"
                placeholder="Attendance %"
                min="0"
                max="100"
                value={attendanceData.attendance_percentage}
                onChange={(e) => setAttendanceData({ ...attendanceData, attendance_percentage: parseFloat(e.target.value) })}
              />
              <Input
                type="number"
                placeholder="Total Classes"
                value={attendanceData.total_classes}
                onChange={(e) => setAttendanceData({ ...attendanceData, total_classes: parseInt(e.target.value) })}
              />
              <Input
                type="number"
                placeholder="Classes Attended"
                value={attendanceData.classes_attended}
                onChange={(e) => setAttendanceData({ ...attendanceData, classes_attended: parseInt(e.target.value) })}
              />
              <div className="flex gap-2 pt-4">
                <Button onClick={handleUpdateAttendance} className="flex-1 bg-accent text-accent-foreground hover:bg-orange-600">
                  Update
                </Button>
                <Button onClick={() => setIsAttendanceModalOpen(false)} variant="outline" className="flex-1">
                  Cancel
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Fees Modal */}
      {isFeesModalOpen && selectedStudent && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-foreground">Update Fees - {selectedStudent.first_name}</h2>
              <Button variant="ghost" size="icon" onClick={() => setIsFeesModalOpen(false)}>
                <X className="w-5 h-5" />
              </Button>
            </div>
            <div className="space-y-4">
              <Input
                type="number"
                placeholder="Total Amount"
                step="0.01"
                value={feesData.amount}
                onChange={(e) => setFeesData({ ...feesData, amount: parseFloat(e.target.value) })}
              />
              <Input
                type="number"
                placeholder="Amount Paid"
                step="0.01"
                value={feesData.paid_amount}
                onChange={(e) => setFeesData({ ...feesData, paid_amount: parseFloat(e.target.value) })}
              />
              <select
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-md bg-white dark:bg-slate-900 text-foreground"
                value={feesData.status}
                onChange={(e) => setFeesData({ ...feesData, status: e.target.value as 'pending' | 'paid' | 'partial' })}
              >
                <option value="pending">Pending</option>
                <option value="partial">Partial</option>
                <option value="paid">Paid</option>
              </select>
              <div className="flex gap-2 pt-4">
                <Button onClick={handleUpdateFees} className="flex-1 bg-accent text-accent-foreground hover:bg-orange-600">
                  Update
                </Button>
                <Button onClick={() => setIsFeesModalOpen(false)} variant="outline" className="flex-1">
                  Cancel
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Notice Modal */}
      {isNoticeModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-foreground">Post Notice</h2>
              <Button variant="ghost" size="icon" onClick={() => setIsNoticeModalOpen(false)}>
                <X className="w-5 h-5" />
              </Button>
            </div>
            <div className="space-y-4">
              <Input
                placeholder="Notice Title"
                value={noticeData.title}
                onChange={(e) => setNoticeData({ ...noticeData, title: e.target.value })}
              />
              <Textarea
                placeholder="Notice Content"
                rows={4}
                value={noticeData.content}
                onChange={(e) => setNoticeData({ ...noticeData, content: e.target.value })}
              />
              <div className="flex gap-2 pt-4">
                <Button onClick={handlePostNotice} className="flex-1 bg-accent text-accent-foreground hover:bg-orange-600">
                  Post
                </Button>
                <Button onClick={() => setIsNoticeModalOpen(false)} variant="outline" className="flex-1">
                  Cancel
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}
