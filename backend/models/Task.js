const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  projectId:      { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
  title:          { type: String, required: true },
  description:    { type: String },
  assignedTo:     { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  assignedToName: { type: String },
  status:         { type: String, default: 'pending' },
  deadline:       { type: String },
  file:           { type: String },
  comment:        { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Task', TaskSchema);
