const express = require('express');
const router = express.Router();
const FailedRequest = require('../models/FailedRequest');
const sendAlertEmail = require('../utils/emailService');
const { verifyToken } = require('../utils/jwtService');

const ALERT_THRESHOLD = parseInt(process.env.ALERT_THRESHOLD) || 5;
const ALERT_TIME_WINDOW = parseInt(process.env.ALERT_TIME_WINDOW) || 10; // minutes

// In-memory object to track failed requests per IP
const failedRequests = {};

// Helper to clean up memory for expired IPs
function cleanUpExpiredIPs(ip) {
    const currentTime = Date.now();
    if (failedRequests[ip] && (currentTime - failedRequests[ip].firstAttempt) > ALERT_TIME_WINDOW * 60 * 1000) {
        delete failedRequests[ip];
    }
}

// POST Endpoint to monitor failed requests
router.post('/submit', async (req, res) => {
    const ip = req.ip;
    console.log(ip)
    const token = req.headers['authorization'];

    // Verify JWT
    const decoded = verifyToken(token);

    if (!decoded) {
        // Clean up old entries for this IP
        cleanUpExpiredIPs(ip);

        // Initialize tracking if first failure
        if (!failedRequests[ip]) {
            failedRequests[ip] = { count: 0, firstAttempt: Date.now() };
        }

        // Increment failure count
        failedRequests[ip].count++;

        // Log failure in MongoDB
        const logEntry = new FailedRequest({ ip, reason: 'Invalid or expired token' });
        await logEntry.save();

        // Trigger alert if threshold exceeded
        if (failedRequests[ip].count >= ALERT_THRESHOLD) {
            sendAlertEmail(ip, failedRequests[ip].count);
            delete failedRequests[ip]; // Optionally reset tracking after alert
        }

        return res.status(401).json({ message: 'Unauthorized request', ip });
    }

    res.status(200).json({ message: 'Request successful', userId: decoded.userId });
});

// GET Endpoint to fetch metrics
router.get('/metrics', async (req, res) => {
    try {
        const logs = await FailedRequest.find().sort({ timestamp: -1 });
        res.status(200).json(logs);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
