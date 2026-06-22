const errorHandler = require('./middleware/errorHandler');
const monitorRoutes = require('./routes/monitorRoutes');

// ... rest of your code
require('./config/db');

const express = require('express');
const app = express();
const port = 3000;

// 1. Import monitorRoutes
//const monitorRoutes = require('./routes/monitorRoutes');

// 2. Add the JSON middleware
app.use(express.json());

console.log("Attempting to start server..."); // Added for debugging


// 3. Use the routes
app.use('/api', monitorRoutes);
app.use(errorHandler);


app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});