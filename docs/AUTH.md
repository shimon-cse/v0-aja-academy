# Authentication Documentation

## Overview

The English Academy platform uses **Supabase Auth** for secure user authentication with support for student and admin roles. All authentication is handled through Supabase's email/password authentication system.

## Authentication Files

- **`lib/supabase.ts`** - Consolidated Supabase client exports
- **`lib/supabase/client.ts`** - Browser-side Supabase client
- **`lib/supabase/server.ts`** - Server-side Supabase client
- **`lib/supabase/proxy.ts`** - Token refresh and session management
- **`middleware.ts`** - Route protection and session validation

## Pages

### Student Authentication

#### `/auth/login`
- Email and password login form
- Error handling with user feedback
- Redirects to `/student/dashboard` on success
- Link to sign up page
- Uses Supabase `signInWithPassword()` method

#### `/auth/sign-up`
- Registration form with fields:
  - First Name (required)
  - Last Name (required)
  - Email (required, must be valid)
  - Class (required, e.g., "UG-01")
  - Roll Number (required, unique)
  - Password (required, minimum strength)
  - Confirm Password (required, must match)
- Validates password match before submission
- Creates student profile in database on signup
- Auto-creates attendance and fees records
- Sends confirmation email to user
- Redirects to success page after signup

#### `/auth/sign-up-success`
- Confirmation message after signup
- Instructs user to check email for confirmation
- Link to login page

#### `/auth/error`
- Error page for auth failures
- Displays error details
- Return to login link

#### `/auth/callback`
- OAuth/email confirmation callback route
- Exchanges authorization code for session
- Redirects to dashboard on success

### Admin Authentication

#### `/admin/login`
- Email and password form for admin users
- Checks `is_admin` flag in user metadata
- Redirects to `/admin/dashboard` on success
- Error handling for non-admin users

#### `/admin/dashboard`
- Admin-only dashboard
- View all students in table format
- Add new student (opens modal)
- Edit student info
- Manage attendance records
- Manage fees payments
- Post notices to student board
- Delete student accounts

## Protected Routes

The middleware protects the following routes:

- `/student/dashboard` - Requires student authentication
- `/student/*` - All student routes require auth
- `/admin/*` - All admin routes require admin role
- `/protected/*` - Generic protected routes

Unauthenticated users are redirected to `/auth/login`.

## Database Schema

### `students` Table
```sql
id UUID (PK, references auth.users)
email TEXT
first_name TEXT
last_name TEXT
class TEXT
roll_no TEXT (unique)
created_at TIMESTAMP
updated_at TIMESTAMP
```

### `attendance` Table
```sql
id UUID (PK)
student_id UUID (FK -> students)
attendance_percentage NUMERIC
total_classes INTEGER
classes_attended INTEGER
updated_at TIMESTAMP
```

### `fees` Table
```sql
id UUID (PK)
student_id UUID (FK -> students)
amount NUMERIC
paid_amount NUMERIC
status TEXT (pending/paid/partial)
due_date DATE
updated_at TIMESTAMP
```

### `notices` Table
```sql
id UUID (PK)
title TEXT
content TEXT
created_by UUID (FK -> students)
is_admin_notice BOOLEAN
created_at TIMESTAMP
updated_at TIMESTAMP
```

## Row Level Security (RLS)

All tables have RLS enabled:

- **Students Table**: Users can only see/update their own record
- **Attendance Table**: Users can only see their own attendance
- **Fees Table**: Users can only see their own fees
- **Notices Table**: All authenticated users can see notices

## Form Submission

### Login Form Flow
1. User enters email and password
2. Form validation (client-side)
3. Submit to Supabase Auth `signInWithPassword()`
4. If successful: redirect to `/student/dashboard`
5. If failed: display error message

### Signup Form Flow
1. User fills all fields (name, email, class, roll no, password)
2. Client-side validation: password match
3. Create Supabase Auth account with email/password
4. Create student profile record
5. Create attendance record (0% initially)
6. Create fees record (pending status)
7. Send confirmation email
8. Redirect to `/auth/sign-up-success`

## Environment Variables

Required environment variables (set via Supabase integration):

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL=http://localhost:3000/auth/callback
```

## Error Handling

All auth pages handle errors gracefully:

- Invalid credentials
- Network errors
- Validation errors
- Password mismatch
- Unique constraint violations (duplicate email/roll number)
- RLS policy violations

Errors are displayed as red text below the submit button with clear messaging.

## Session Management

- Sessions are stored in HTTP-only cookies (security best practice)
- Automatic token refresh via middleware
- Session persists across page reloads
- Logout clears session and cookies
- Middleware validates session on protected routes

## Testing the Auth Flow

1. **Signup**: Go to `/auth/sign-up` and create an account
2. **Confirmation**: Check email for confirmation link
3. **Login**: Go to `/auth/login` and enter credentials
4. **Dashboard**: View your profile, attendance, and fees
5. **Logout**: Click logout button in dashboard header

## Security Features

- Passwords hashed by Supabase with bcrypt
- HTTP-only cookies for session storage
- CSRF protection via middleware
- RLS prevents cross-user data access
- Email confirmation required for new accounts
- Server-side session validation
- Secure redirect URLs for OAuth callbacks
