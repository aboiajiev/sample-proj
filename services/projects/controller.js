const express = require('express');
const projectService = require('./service');

const router = express.Router();

// Fetch all projects
router.get('/', async (req, res) => {
  try {
    const projects = await projectService.getAllProjects();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
});

module.exports = router;
