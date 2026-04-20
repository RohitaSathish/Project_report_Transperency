const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  title:       { type: String, required: true },
  description: { type: String },
  facultyId:   { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  facultyName: { type: String },
  students:    [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  deadline:    { type: String },
  status:      { type: String, default: 'active' }
}, { timestamps: true });

module.exports = mongoose.model('Project', ProjectSchema);
