// Import the mysql2 library
const mysql = require('mysql2');
// Load the hidden variables from our .env file
require('dotenv').config();
console.log("DEBUG: Connecting to host:", process.env.DB_HOST, "with user:", process.env.DB_USER);
// Create a Connection Pool (Industry Standard for DBMS performance)
const pool = mysql.createPool({
    socketPath: process.env.DB_SOCKET_PATH || undefined, //added socket path to connect to the database
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 3306,
    waitForConnections: true,
    connectionLimit: 10, // Max 10 concurrent DB connections
    queueLimit: 0
});

// We upgrade the pool to use Promises (Async/Await) instead of old Callbacks
const promisePool = pool.promise();

// Test the connection immediately when this file runs
promisePool.getConnection()
    .then((connection) => {
        console.log('✅ MySQL Database connected successfully via Pool!');
        connection.release(); // Always release the connection back to the pool!
    })
    .catch((err) => {
        console.error('❌ Database connection failed:', err);
    });

// Export the pool so other files can use it to query the DB
module.exports = promisePool;