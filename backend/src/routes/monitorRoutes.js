const express = require('express');
const router = express.Router();

// CHECK THIS BLOCK! You are likely missing 'getSummary' here
const {
    createHeartbeat,
    getMonitorLogs,
    getSummary  // <--- ADD THIS LINE
} = require('../controllers/monitorController');

// Define the POST route
router.post('/heartbeat', createHeartbeat);

// Define the GET routes
router.get('/heartbeat/:monitorId', getMonitorLogs);
router.get('/heartbeat/:monitorId/summary', getSummary); // <--- It was failing here

module.exports = router;