# Complete Setup Guide

## Current Status
✅ Frontend is ready (React app)
✅ Backend structure created (Node.js + Express + MongoDB)
✅ Admin-managed login system implemented

## Setup Instructions

### Frontend (Already Working)
The frontend uses localStorage for now, so it works without backend.

1. Navigate to frontend:
```bash
cd frontend
```

2. Install dependencies (if not done):
```bash
npm install
```

3. Start frontend:
```bash
npm start
```

Frontend runs on: http://localhost:3000

### Backend (Optional - For MongoDB Integration)

1. Navigate to backend:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Install MongoDB:
   - Download from: https://www.mongodb.com/try/download/community
   - Or use MongoDB Atlas (cloud): https://www.mongodb.com/cloud/atlas

4. Update `.env` file:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/group_project_db
JWT_SECRET=your_secret_key_here
```

5. Start MongoDB (if local):
```bash
mongod
```

6. Start backend:
```bash
npm start
```

Backend runs on: http://localhost:5000

## Current Working System (Frontend Only)

### Admin Login
- Email: admin@example.com (or any email with 'admin')
- Password: anything

### Admin Can:
1. Add Students with credentials
2. Add Faculty with credentials
3. View all passwords
4. Edit/Delete users

### Students/Faculty Login
- Use credentials provided by admin
- Email and password must match exactly

## Testing the System

1. **Login as Admin**
   - Go to http://localhost:3000/login
   - Use admin@example.com / any password

2. **Add a Student**
   - Go to Student Management
   - Add: john@student.com / student123

3. **Test Student Login**
   - Logout
   - Login with: john@student.com / student123
   - Should see Student Dashboard

4. **Add a Faculty**
   - Login as admin again
   - Go to Faculty Management
   - Add: smith@faculty.com / faculty123

5. **Test Faculty Login**
   - Logout
   - Login with: smith@faculty.com / faculty123
   - Should see Faculty Dashboard

## Data Storage
Currently using **localStorage** (browser storage):
- `registeredUsers` - All users (students, faculty)
- `user` - Current logged-in user
- `token` - Authentication token

## Next Steps
- Backend is ready but optional
- To integrate backend, just start both frontend and backend
- Frontend API calls are already configured for http://localhost:5000
