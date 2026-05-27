import Header from '@/components/header'
import { HeroSection, AboutSection, CoursesSection, FacilitiesSection, ContactSection } from '@/components/landing-sections'

export default function Home() {
  return (
    <main>
      <Header />
      <HeroSection />
      <AboutSection />
      <CoursesSection />
      <FacilitiesSection />
      <ContactSection />
    </main>
  )
}
