# Testing Admin-Managed Login System

## How It Works
- Admin creates accounts for Faculty and Students
- Faculty/Students login with credentials provided by Admin
- All credentials are stored in browser localStorage

## Test Steps

### 1. Login as Admin
- Go to http://localhost:3000/login
- Email: `admin@example.com` (or any email with 'admin')
- Password: `anything` (any password works for admin)
- Click "Sign In"

### 2. Add a Student
- Navigate to "Student Management" from Admin Dashboard
- Click "Add Student"
- Fill in:
  - Name: John Doe
  - Email: john@student.com
  - Password: student123
  - Roll Number: CS001
  - Department: Computer Science
- Click "Add Student"
- You'll see the student in the table with their password visible

### 3. Add a Faculty
- Navigate to "Faculty Management" from Admin Dashboard
- Click "Add Faculty"
- Fill in:
  - Name: Dr. Smith
  - Email: smith@faculty.com
  - Password: faculty123
  - Employee ID: FAC001
  - Department: Computer Science
- Click "Add Faculty"
- You'll see the faculty in the table with their password visible

### 4. Test Student Login
- Logout from Admin
- Go to Login page
- Email: john@student.com
- Password: student123
- Click "Sign In"
- Should redirect to Student Dashboard

### 5. Test Faculty Login
- Logout
- Go to Login page
- Email: smith@faculty.com
- Password: faculty123
- Click "Sign In"
- Should redirect to Faculty Dashboard

## Features
- ✅ Admin can view all passwords
- ✅ Admin can Edit/Delete users
- ✅ Email validation (no duplicates)
- ✅ Password minimum 6 characters
- ✅ Students/Faculty can login with admin-provided credentials

## Troubleshooting
If login fails:
1. Check browser console for errors
2. Verify credentials match exactly (case-sensitive)
3. Clear localStorage and re-add users
4. Check that registeredUsers exists in localStorage
