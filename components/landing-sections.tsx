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
          Master English with Excellence
        </h1>
        <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 mb-12 max-w-2xl mx-auto text-balance">
          Elevate your English skills with our comprehensive undergraduate and postgraduate programs
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
              <li className="flex items-center gap-2">
                <span className="text-accent">✓</span> Expert faculty with international exposure
              </li>
              <li className="flex items-center gap-2">
                <span className="text-accent">✓</span> Modern curriculum focused on practical skills
              </li>
              <li className="flex items-center gap-2">
                <span className="text-accent">✓</span> Personalized learning experience
              </li>
              <li className="flex items-center gap-2">
                <span className="text-accent">✓</span> Industry-recognized certifications
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
          {courses.map((courseGroup, idx) => (
            <div key={idx}>
              <h3 className="text-2xl font-bold text-primary mb-6">{courseGroup.category}</h3>
              <div className="space-y-4">
                {courseGroup.items.map((course, cidx) => (
                  <Card key={cidx} className="p-6 border-l-4 border-accent hover:shadow-lg transition">
                    <h4 className="font-semibold text-lg text-foreground mb-2">{course.title}</h4>
                    <p className="text-slate-600 dark:text-slate-400">Duration: {course.duration}</p>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function FacilitiesSection() {
  const facilities = [
    { icon: BookOpen, title: 'Modern Library', description: 'Extensive collection of books and digital resources' },
    { icon: Zap, title: 'Digital Classroom', description: 'State-of-the-art learning management system' },
    { icon: Wifi, title: 'High-Speed WiFi', description: 'Campus-wide connectivity for seamless learning' },
  ]

  return (
    <section id="facilities" className="py-20 bg-white dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-primary mb-4">Our Facilities</h2>
          <p className="text-lg text-slate-600 dark:text-slate-400">Everything you need for success</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {facilities.map((facility, idx) => {
            const Icon = facility.icon
            return (
              <Card key={idx} className="p-8 text-center hover:shadow-lg transition border-none bg-slate-50 dark:bg-slate-900">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center">
                    <Icon className="w-8 h-8 text-accent" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{facility.title}</h3>
                <p className="text-slate-600 dark:text-slate-400">{facility.description}</p>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export function ContactSection() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <section id="contact" className="py-20 bg-slate-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            <h2 className="text-4xl font-bold text-primary mb-8">Get In Touch</h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <Phone className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Phone</h4>
                  <p className="text-slate-600 dark:text-slate-400">01537-452383</p>
                </div>
              </div>
              <div className="flex gap-4">
                <Mail className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Email</h4>
                  <p className="text-slate-600 dark:text-slate-400">AJA@academy.edu</p>
                </div>
              </div>
              <div className="flex gap-4">
                <MapPin className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Address</h4>
                  <p className="text-slate-600 dark:text-slate-400">2nd Floor Saima Plaza,Chakaria,Cox'sbazar</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Name</label>
              <Input
                type="text"
                placeholder="Your name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Email</label>
              <Input
                type="email"
                placeholder="Your email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Message</label>
              <Textarea
                placeholder="Your message"
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
              />
            </div>
            <Button type="submit" className="w-full bg-accent text-accent-foreground hover:bg-orange-600">
              Send Message
            </Button>
            {submitted && (
              <p className="text-green-600 text-center">Thank you! We&apos;ll get back to you soon.</p>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}
