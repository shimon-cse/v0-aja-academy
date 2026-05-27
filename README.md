# English Academy - Modern Student Portal

A comprehensive, full-stack English Academy management system built with Next.js 16, Supabase, and modern web technologies.

## Features

### Public Pages
- **Landing Page**: Professional hero section, academy information, courses showcase, facilities overview, and contact form
- **Dark/Light Mode Toggle**: Theme switching across the entire application
- **Responsive Design**: Mobile-first approach with adaptive layouts for all devices
- **Professional Styling**: Clean, modern design using Tailwind CSS with navy blue, white, and orange accent colors

### Student Portal
- **Student Authentication**: 
  - Sign up with email and password
  - Email confirmation flow
  - Secure login
  - Auto-creation of student profile on signup
  
- **Student Dashboard**:
  - Profile Information: Display name, email, class, and roll number
  - Attendance Tracking: Visual attendance percentage with progress bar
  - Fees Management: View total fees, paid amount, and payment status with color-coded badges
  - Notice Board: Real-time display of academy and admin notices
  - Data Privacy: Row Level Security (RLS) ensures students only see their own data

### Admin Portal
- **Admin Authentication**: Secure admin-only login
- **Student Management Dashboard**:
  - View all enrolled students in a clean table layout
  - Add new students with automatic account creation
  - Edit student attendance records (percentage, total classes, attended classes)
  - Manage fees (total amount, paid amount, status updates)
  - Delete student records
  - Post announcements and notices visible to all students
  - Modal-based forms for intuitive data entry

## Tech Stack

- **Frontend**: Next.js 16 (App Router), React 19, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **Database**: Supabase PostgreSQL with Row Level Security
- **Authentication**: Supabase Auth with email/password
- **Icons**: Lucide React icons
- **Theme**: next-themes for dark/light mode support
- **Client Library**: @supabase/supabase-js, @supabase/ssr

## Database Schema

### Tables
1. **students**: Core student profile data with auth reference
   - id (UUID, PK, ref to auth.users)
   - email, first_name, last_name, class, roll_no
   - created_at, updated_at

2. **attendance**: Student attendance tracking
   - id (UUID, PK)
   - student_id (FK to students)
   - attendance_percentage, total_classes, classes_attended
   - updated_at

3. **fees**: Fee management for students
   - id (UUID, PK)
   - student_id (FK to students, unique)
   - amount, paid_amount, status (pending/paid/partial)
   - due_date, updated_at

4. **notices**: Academy announcements
   - id (UUID, PK)
   - title, content, created_by (FK to students)
   - is_admin_notice (boolean), created_at, updated_at

### Row Level Security (RLS)
- **Students**: Can only view/edit their own profile
- **Attendance**: Can only view their own attendance records
- **Fees**: Can only view their own fee information
- **Notices**: All students can view all notices

## Project Structure

```
app/
├── page.tsx                           # Landing page
├── layout.tsx                         # Root layout with theme provider
├── globals.css                        # Theme colors and styles
├── auth/
│   ├── login/page.tsx                 # Student login
│   ├── sign-up/page.tsx               # Student signup
│   ├── error/page.tsx                 # Auth error page
│   ├── callback/route.ts              # Supabase auth callback
│   └── sign-up-success/page.tsx        # Signup success page
├── student/
│   └── dashboard/page.tsx             # Student dashboard
├── admin/
│   ├── login/page.tsx                 # Admin login
│   └── dashboard/page.tsx             # Admin dashboard
├── api/                               # API routes (if needed)
└── middleware.ts                      # Auth middleware

lib/
├── supabase/
│   ├── client.ts                      # Browser client
│   ├── server.ts                      # Server client
│   └── proxy.ts                       # Session management
└── utils.ts                           # Utility functions

components/
├── header.tsx                         # Navigation header
├── landing-sections.tsx               # Landing page sections
├── theme-provider.tsx                 # Theme provider wrapper
└── ui/                                # shadcn/ui components
    ├── button.tsx
    ├── card.tsx
    ├── input.tsx
    ├── textarea.tsx
    └── ...
```

## Setup & Installation

### Prerequisites
- Node.js 18+
- pnpm (or npm/yarn)
- Supabase account and project

### Installation

1. **Clone and install dependencies**:
   ```bash
   pnpm install
   ```

2. **Configure Supabase**:
   - Set up a new Supabase project
   - Create the database schema using the SQL commands in the database section
   - Add environment variables:
     ```
     NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
     NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
     ```

3. **Run the development server**:
   ```bash
   pnpm dev
   ```
   Visit `http://localhost:3000`

## Usage

### Student Flow
1. Visit the landing page
2. Click "Apply Now" to sign up
3. Fill in your details (name, email, class, roll number, password)
4. Confirm your email
5. Log in to access your dashboard
6. View attendance, fees, and academy notices

### Admin Flow
1. Log in at `/admin/login` with admin credentials
2. Access the admin dashboard
3. Add/edit/delete students
4. Update student attendance and fees
5. Post announcements for students

## Color Scheme

- **Primary**: Navy Blue (#0f172a) - Main brand color
- **Secondary**: White (#ffffff) - Clean backgrounds
- **Accent**: Orange (#ff6b35) - Call-to-action buttons and highlights
- **Neutrals**: Various grays for text and borders

## Security Features

- **Row Level Security (RLS)**: Enforced at database level
- **Email Confirmation**: Required before account activation
- **Password Hashing**: Handled by Supabase Auth
- **Session Management**: Secure HTTP-only cookies via Supabase SSR
- **Protected Routes**: Middleware-based route protection
- **Admin Verification**: Role-based access control

## Performance Optimizations

- Next.js 16 with Turbopack for fast builds
- Server-Side Rendering (SSR) for faster initial loads
- Client Components for interactive features
- Optimized images and assets
- Efficient database queries with proper indexing

## Browser Support

- Chrome/Chromium (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Deployment

### Deploy to Vercel

1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variables in Vercel dashboard:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Deploy

### Custom Server

1. Build the project: `pnpm build`
2. Start server: `pnpm start`
3. Configure reverse proxy and SSL as needed

## Support & Documentation

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [shadcn/ui Components](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)

## License

All rights reserved. English Academy Management System.
