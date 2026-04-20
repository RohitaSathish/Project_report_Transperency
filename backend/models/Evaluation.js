const mongoose = require('mongoose');

const EvaluationSchema = new mongoose.Schema({
  projectId:   { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
  evaluatorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  evaluateeId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  rating:      { type: Number, min: 1, max: 5 },
  feedback:    { type: String },
  anonymous:   { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Evaluation', EvaluationSchema);
