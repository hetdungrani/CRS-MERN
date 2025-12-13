const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv').config();
const apiRoutes = require('./routes/api');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Connected to MongoDB Atlas"))
    .catch(err => console.log("Mongoose Connection Error:", err.message));

app.use('/api', apiRoutes);

const http = require('http');
const server = http.createServer(app);
const socket = require('./socket');
const io = socket.init(server);

const PORT = 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));