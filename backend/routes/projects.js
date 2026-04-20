const router = require('express').Router();
const auth = require('../middleware/auth');
const Project = require('../models/Project');
const Task = require('../models/Task');
const User = require('../models/User');

router.get('/', auth, async (req, res) => {
  try {
    let projects;
    if (req.user.role === 'student') {
      projects = await Project.find({ students: req.user.id }).populate('facultyId', 'name');
    } else if (req.user.role === 'faculty') {
      projects = await Project.find({ facultyId: req.user.id });
    } else {
      projects = await Project.find().populate('facultyId', 'name');
    }
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', auth, async (req, res) => {
  try {
    const { title, description, deadline, students } = req.body;
    const faculty = await User.findById(req.user.id);
    const project = await Project.create({ title, description, deadline, facultyId: req.user.id, facultyName: faculty.name, students: students || [] });
    res.status(201).json(project);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/stats/faculty', auth, async (req, res) => {
  try {
    const projects = await Project.find({ facultyId: req.user.id });
    const projectIds = projects.map(p => p._id);
    const totalStudents = new Set(projects.flatMap(p => p.students.map(s => s.toString()))).size;
    const tasks = await Task.find({ projectId: { $in: projectIds } });
    res.json({
      totalProjects: projects.length,
      activeProjects: projects.filter(p => p.status === 'active').length,
      totalStudents,
      totalTasks: tasks.length,
      completedTasks: tasks.filter(t => t.status === 'completed').length
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/:id', auth, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id).populate('facultyId', 'name').populate('students', 'name email');
    res.json(project);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put('/:id', auth, async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(project);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
