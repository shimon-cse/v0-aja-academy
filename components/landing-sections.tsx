'use client'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { BookOpen, Wifi, Zap, Users, Mail, Phone, MapPin } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

export function HeroSection() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-slate-50 dark:from-slate-950 dark:to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-primary mb-6 text-balance">
          Empower Your Child with the gift of Confidence
        </h1>
        <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 mb-12 max-w-2xl mx-auto text-balance">
          Boost your child's confidence and eliminate English speaking anxiety with our unique program. We use fun activities and games to help children speak in English accurately and fluently.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/auth/sign-up">
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-orange-600">
              Apply Now
            </Button>
          </Link>
          <Link href="/auth/login">
            <Button size="lg" variant="outline">
              Student Login
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

export function AboutSection() {
  return (
    <section id="about" className="py-20 bg-white dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-primary mb-4">About Our Academy</h2>
          <p className="text-lg text-slate-600 dark:text-slate-400">Learn from the best, grow with us</p>
        </div>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-2xl font-bold mb-4 text-foreground">Who We Are</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              Our English Academy is dedicated to providing world-class language education with a focus on practical communication skills and cultural understanding.
            </p>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              With experienced faculty and modern teaching methodologies, we prepare students for global opportunities.
            </p>
            <ul className="space-y-2 text-slate-600 dark:text-slate-400">
              <li className="flex items-start gap-2">
                <span className="text-accent">✓</span> 
                <span><strong>Conversational Approach:</strong> Encourages speaking through real-time practice rather than memorizing word lists.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent">✓</span> 
                <span><strong>Interactive Learning:</strong> Utilizes phonics, quizzes, flashcards, and storytelling to retain attention.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent">✓</span> 
                <span><strong>Confidence Building:</strong> Shifts focus from error-free grammar to expressing thoughts without hesitation or fear.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent">✓</span> 
                <span>Industry-recognized certifications</span>
              </li>
            </ul>
          </div>
          <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg p-8 h-64 flex items-center justify-center">
            <p className="text-primary dark:text-accent font-semibold text-center">Academy Building Image</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export function CoursesSection() {
  const courses = [
    {
      category: 'Undergraduate Programs',
      items: [
        { title: 'Bachelor of Arts in English', duration: '4 Years' },
        { title: 'Diploma in English Communication', duration: '2 Years' },
        { title: 'Certificate in Business English', duration: '1 Year' },
      ]
    },
    {
      category: 'Postgraduate Programs',
      items: [
        { title: 'Master of Arts in English', duration: '2 Years' },
        { title: 'Master of Philosophy (M.Phil)', duration: '2 Years' },
        { title: 'Doctor of Philosophy (Ph.D)', duration: '3 Years' },
      ]
    }
  ]

  return (
    <section id="courses" className="py-20 bg-slate-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-primary mb-4">Our Courses</h2>
          <p className="text-lg text-slate-600 dark:text-slate-400">Choose from our diverse range of programs</p>
        </div>
        <div className="grid md:grid-cols-2 gap-12">
          {courses.map((course, idx) => (
            <Card key={idx} className="p-6">
              <h3 className="text-2xl font-bold mb-6 text-primary">{course.category}</h3>
              <ul className="space-y-4">
                {course.items.map((item, i) => (
                  <li key={i} className="flex justify-between items-center border-b border-slate-200 dark:border-slate-700 pb-2">
                    <span className="text-foreground">{item.title}</span>
                    <span className="text-sm text-slate-500">{item.duration}</span>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}