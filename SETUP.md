# Quick Setup Guide

## Prerequisites
- Node.js v14+
- MongoDB installed and running

## Installation Steps

### 1. Backend Setup
```bash
cd backend
npm install
npm run seed-admin
npm run dev
```

### 2. Frontend Setup (in new terminal)
```bash
cd frontend
npm install
npm start
```

## Default Login Credentials

### Admin
- Email: admin@admin.com
- Password: admin123
- Access: http://localhost:3000/admin

### Create Faculty/Student
- Register at http://localhost:3000/login
- Select role (Faculty/Student)

## Key Features by Role

### Admin Dashboard
- System statistics
- User management
- Project monitoring

### Faculty Dashboard
- Project statistics with graphs
- Create projects with evaluation criteria
- Assign students to teams
- Track progress and activity logs
- View contribution reports
- Adjust marks
- Download reports

### Student Dashboard
- View assigned tasks
- Update task status
- Submit progress
- Peer evaluation

## Workflow

1. **Admin** - Monitor system
2. **Faculty** - Create project → Assign students → Create tasks
3. **Students** - Complete tasks → Submit progress → Evaluate peers
4. **Faculty** - View reports → Adjust marks → Close project
