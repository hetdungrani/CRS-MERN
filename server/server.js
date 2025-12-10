const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// IMPORTANT: This loads your MONGO_URI and JWT_SECRET from the .env file
require('dotenv').config(); 

// Import the centralized route file where all endpoints are defined
const apiRoutes = require('./routes/api');

const app = express();
app.use(cors()); // Middleware to allow cross-origin requests from client/admin apps
app.use(express.json()); // Middleware to parse JSON body data from POST/PUT requests

// MongoDB Connection
// Connects to the URI provided in your .env file
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Connected to MongoDB Atlas"))
    // Displays a specific message if the connection fails (often due to MONGO_URI)
    .catch(err => console.log("Mongoose Connection Error:", err.message));

// Main API Routes
// All requests starting with /api (e.g., /api/register, /api/login, /api/students) are routed here
app.use('/api', apiRoutes);

const http = require('http');
const server = http.createServer(app);
// Initialize Socket.IO and attach to server
const socket = require('./socket');
const io = socket.init(server);

const PORT = 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));