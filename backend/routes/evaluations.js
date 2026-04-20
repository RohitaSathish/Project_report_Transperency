const router = require('express').Router();
const auth = require('../middleware/auth');
const Evaluation = require('../models/Evaluation');

router.post('/', auth, async (req, res) => {
  try {
    const { project_id, evaluatee_id, rating, feedback, anonymous } = req.body;
    const evaluation = await Evaluation.create({ projectId: project_id, evaluatorId: req.user.id, evaluateeId: evaluatee_id, rating, feedback, anonymous });
    res.status(201).json(evaluation);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/project/:projectId', auth, async (req, res) => {
  try {
    const evaluations = await Evaluation.find({ projectId: req.params.projectId })
      .populate('evaluatorId', 'name')
      .populate('evaluateeId', 'name');
    res.json(evaluations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
