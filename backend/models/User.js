const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name:       { type: String, required: true },
  email:      { type: String, required: true, unique: true },
  password:   { type: String, required: true },
  role:       { type: String, enum: ['admin', 'faculty', 'student'], required: true },
  department: { type: String },
  rollNumber: { type: String },
  employeeId: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
