const express = require('express');
const timeLogService = require('./service');

const router = express.Router();

// Fetch all timelogs
router.get('/', async (req, res) => {
  try {
    const logs = await timeLogService.getAllTimeLogs();
    res.json(logs);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve timelogs.' });
  }
});

// Fetch timelogs by date (and audit log the result)
router.get('/by-date', async (req, res) => {
  const { date } = req.query;

  if (!date) {
    return res.status(400).json({ error: "Missing 'date' parameter." });
  }

  try {
    const logs = await timeLogService.getTimeLogsByDate(date);
    res.json({ success: true, logs });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
