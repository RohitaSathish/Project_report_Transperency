# Backend Setup - PostgreSQL

## Prerequisites
- Node.js (v14+)
- PostgreSQL installed and running

## Setup Steps

### 1. Create PostgreSQL Database
Open pgAdmin or psql and run:
```sql
CREATE DATABASE group_project_db;
```

### 2. Update .env file
```
PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=group_project_db
DB_USER=postgres
DB_PASSWORD=your_actual_postgres_password
JWT_SECRET=your_secret_key
```

### 3. Start Backend
```bash
npm start
```

Tables are created automatically on first run.

You should see:
```
Server running on port 5000
PostgreSQL connected
All tables created successfully
```

## Tables Created Automatically
- users
- projects
- project_students
- tasks
- task_submissions
- evaluations
