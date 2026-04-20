# Start Backend with MongoDB

## Step 1: Install MongoDB
Download and install MongoDB from: https://www.mongodb.com/try/download/community

Or use MongoDB Atlas (cloud): https://www.mongodb.com/cloud/atlas

## Step 2: Start MongoDB
Open a terminal and run:
```bash
mongod
```

Keep this terminal open.

## Step 3: Install Backend Dependencies
Open a new terminal:
```bash
cd backend
npm install
```

## Step 4: Start Backend Server
```bash
npm start
```

You should see:
```
Server running on port 5000
MongoDB connected
```

## Step 5: Test Backend
Open browser and go to: http://localhost:5000/api/auth/login

You should see an error (this is normal - it means backend is running)

## Step 6: Start Frontend
Open another terminal:
```bash
cd frontend
npm start
```

Now register and login - all data will be saved to MongoDB!

## Troubleshooting

### MongoDB not starting?
- Windows: Install MongoDB as a service
- Or use MongoDB Atlas (cloud) and update .env file

### Backend not connecting to MongoDB?
Check backend/.env file:
```
MONGODB_URI=mongodb://localhost:27017/group_project_db
```

### Port 5000 already in use?
Change PORT in backend/.env to 5001 and update frontend API URL
