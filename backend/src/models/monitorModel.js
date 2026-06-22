const db=require('../config/db');//Importing the DB

const logHeartbeat = async (monitorId, status, latency) => {
    // 1. Check if monitorId is a number and > 0
    if (!Number.isInteger(monitorId) || monitorId <= 0) {
        throw new Error("Invalid monitorId: Must be a positive integer.");
    }

    // 2. Check if status is either 'up' or 'down'
    if (!['up', 'down'].includes(status)) {
        throw new Error("Invalid status: Must be either 'up' or 'down'.");
    }

    // 3. Check if latency is a number and >= 0
    if (typeof latency !== 'number' || latency < 0) {
        throw new Error("Invalid latency: Must be a non-negative number.");
    }

    console.log("Validation passed!");

    // Phase 2: Secure SQL Construction
    const sql = "INSERT INTO heartbeats (monitor_id, status, latency) VALUES (?, ?, ?)";

    // Variables in the same order as the columns
    const values = [monitorId, status, latency];

    console.log("SQL Prepared:", sql);
    console.log("Values to insert:", values);

    try {
        // Phase 3: Execute the query
        await db.execute(sql, values);

        console.log("Heartbeat saved successfully to DB");
    } catch (error) {
        // Handle DB errors (connection lost, etc.)
        console.error("Database Error:", error.message);
        throw error;
    }
};



//new function
const getHeartbeatsByMonitor = async (monitorId) => {
    // Validation
    if (!Number.isInteger(monitorId) || monitorId <= 0) {
        throw new Error("Invalid monitorId: Must be a positive integer.");
    }

    const sql = `
        SELECT status, latency, created_at
        FROM heartbeats
        WHERE monitor_id = ?
        ORDER BY created_at DESC
        LIMIT 10
    `;

    const [rows] = await db.execute(sql, [monitorId]);

    return rows;
};



//Third function
const getMonitorSummary = async (monitorId) => {
    // Validation
    if (!Number.isInteger(monitorId) || monitorId <= 0) {
        throw new Error("Invalid monitorId: Must be a positive integer.");
    }

    const sql = `SELECT
            COUNT(*) AS total_checks,
            AVG(latency) AS avg_latency,
            (SUM(CASE WHEN status = 'up' THEN 1 ELSE 0 END) * 100.0 / COUNT(*)) AS uptime_percent
        FROM heartbeats
        WHERE monitor_id = ?`;

    const [rows] = await db.execute(sql, [monitorId]);

    return rows[0];
};

module.exports = {
    logHeartbeat,
    getHeartbeatsByMonitor,
    getMonitorSummary
};