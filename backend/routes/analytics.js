const router = require('express').Router();
const auth = require('../middleware/auth');
const Project = require('../models/Project');
const Task = require('../models/Task');
const Evaluation = require('../models/Evaluation');

router.get('/project/:projectId', auth, async (req, res) => {
  try {
    const project = await Project.findById(req.params.projectId).populate('students', 'name');

    const analytics = await Promise.all(project.students.map(async (student) => {
      const tasks = await Task.find({ projectId: req.params.projectId, assignedTo: student._id });
      const evals = await Evaluation.find({ projectId: req.params.projectId, evaluateeId: student._id });
      const avgPeerScore = evals.length ? evals.reduce((sum, e) => sum + e.rating, 0) / evals.length : 0;

      return {
        name: student.name,
        tasksCompleted: tasks.filter(t => t.status === 'completed').length,
        tasksTotal: tasks.length,
        submissions: tasks.filter(t => t.file).length,
        avgPeerScore
      };
    }));

    res.json(analytics);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put('/project/:projectId/marks', auth, async (req, res) => {
  res.json({ message: 'Marks updated successfully' });
});

module.exports = router;
