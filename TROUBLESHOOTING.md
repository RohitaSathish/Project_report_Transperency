# Troubleshooting Guide

## Common Issues & Solutions

### 1. MongoDB Connection Error
**Error:** `MongoDB connection error`

**Solution:**
- Ensure MongoDB is running: `mongod`
- Check MONGODB_URI in `.env` file
- Default: `mongodb://localhost:27017/group_project_db`

### 2. Port Already in Use
**Error:** `Port 5000 already in use`

**Solution:**
- Change PORT in backend `.env` file
- Update API baseURL in `frontend/src/services/api.js`

### 3. Admin Login Not Working
**Error:** `Invalid credentials`

**Solution:**
- Run seed script: `cd backend && npm run seed-admin`
- Use credentials: admin@admin.com / admin123

### 4. CORS Error
**Error:** `Access-Control-Allow-Origin`

**Solution:**
- Ensure backend is running on port 5000
- Check cors configuration in `backend/server.js`

### 5. Token Invalid Error
**Error:** `Invalid token`

**Solution:**
- Clear localStorage in browser
- Logout and login again
- Check JWT_SECRET in `.env`

### 6. Students Not Showing in Create Project
**Error:** No students in dropdown

**Solution:**
- Register students first
- Ensure role is set to 'student' during registration
- Check admin dashboard to verify users

### 7. Analytics Not Loading
**Error:** Empty analytics page

**Solution:**
- Ensure tasks are created and assigned
- Students should complete some tasks
- Peer evaluations should be submitted

### 8. Graph Not Displaying
**Error:** Chart not visible

**Solution:**
- Check browser console for errors
- Ensure recharts is installed: `npm install recharts`
- Verify data is being fetched

## Development Tips

### Reset Database
```bash
# Connect to MongoDB
mongo
use group_project_db
db.dropDatabase()
```

### Check Backend Logs
- Look at terminal running `npm run dev`
- Check for error messages

### Check Frontend Logs
- Open browser DevTools (F12)
- Check Console tab for errors
- Check Network tab for API calls

### Test API Endpoints
Use Postman or curl:
```bash
# Test login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@admin.com","password":"admin123"}'
```

## Need Help?
- Check README.md for setup instructions
- Review FEATURES.md for feature details
- Ensure all dependencies are installed
