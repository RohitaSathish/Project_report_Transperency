# Debug Steps - Can't Login Issue

## Step 1: Open Browser Console
Press **F12** to open Developer Tools

## Step 2: Check localStorage
In the Console tab, type:
```javascript
JSON.parse(localStorage.getItem('registeredUsers'))
```

This will show all registered users.

## Step 3: Add a Test Student Manually
In the Console, run:
```javascript
const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
users.push({
  id: 'test-' + Date.now(),
  name: 'Test Student',
  email: 'test@student.com',
  password: 'test123',
  role: 'student',
  department: 'Computer Science',
  rollNumber: 'TEST001'
});
localStorage.setItem('registeredUsers', JSON.stringify(users));
console.log('Test student added!');
```

## Step 4: Try Login
- Email: `test@student.com`
- Password: `test123`

## Step 5: Check Login Debug
When you try to login, check the console for:
```
=== LOGIN DEBUG ===
All registered users: [...]
Login attempt - Email: ...
Login attempt - Password: ...
```

## Common Issues:

### Issue 1: No users in localStorage
**Solution:** Login as admin first and add students through the UI

### Issue 2: Email/Password mismatch
**Solution:** Check for:
- Extra spaces (now fixed with trim())
- Case sensitivity (email must match exactly)
- Wrong password

### Issue 3: localStorage cleared
**Solution:** Re-add users through admin panel

## Quick Test Commands

### Clear all data:
```javascript
localStorage.clear();
```

### View current user:
```javascript
JSON.parse(localStorage.getItem('user'))
```

### View all registered users:
```javascript
JSON.parse(localStorage.getItem('registeredUsers'))
```
