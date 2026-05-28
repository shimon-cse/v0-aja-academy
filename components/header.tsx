'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Moon, Sun, Menu, X } from 'lucide-react'
import { useTheme } from 'next-themes'

export default function Header() {
  const { theme, setTheme } = useTheme()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) return null // theme লোড না হওয়া পর্যন্ত কিছু রেন্ডার করো না

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <div className="text-2xl font-bold text-primary">AJA</div>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="#about" className="text-slate-700 dark:text-slate-300 hover:text-primary transition"> About </Link>
            <Link href="#courses" className="text-slate-700 dark:text-slate-300 hover:text-primary transition"> Courses </Link>
            <Link href="#facilities" className="text-slate-700 dark:text-slate-300 hover:text-primary transition"> Facilities </Link>
            <Link href="#contact" className="text-slate-700 dark:text-slate-300 hover:text-primary transition"> Contact </Link>
          </nav>

          {/* Right side buttons */}
          <div className="hidden md:flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </Button>
            <Link href="/auth/login">
              <Button variant="outline">Student Login</Button>
            </Link>
            <Link href="/auth/sign-up">
              <Button className="bg-accent text-accent-foreground hover:bg-orange-600">Apply Now</Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </Button>
            <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden pb-4 space-y-3">
            <Link href="#about" className="block text-slate-700 dark:text-slate-300 hover:text-primary"> About </Link>
            <Link href="#courses" className="block text-slate-700 dark:text-slate-300 hover:text-primary"> Courses </Link>
            <Link href="#facilities" className="block text-slate-700 dark:text-slate-300 hover:text-primary"> Facilities </Link>
            <Link href="#contact" className="block text-slate-700 dark:text-slate-300 hover:text-primary"> Contact </Link>
            <div className="flex gap-2 pt-2">
              <Link href="/auth/login" className="flex-1">
                <Button variant="outline" className="w-full">Student Login</Button>
              </Link>
              <Link href="/auth/sign-up" className="flex-1">
                <Button className="w-full bg-accent text-accent-foreground">Apply Now</Button>
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}