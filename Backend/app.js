const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectToDb = require('./db/db');
const userRoutes = require('./routes/user.routes');
const captainRoutes = require('./routes/captain.routes');

const app = express();

// Connect to the database
connectToDb();

// CORS configuration
app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173', // Allow the frontend origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed HTTP methods
    credentials: true, // Allow cookies and Authorization headers
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); // For parsing cookies

// Default route
app.get('/', (req, res) => {
    res.send('Hello world');
});

// Route handlers
app.use('/users', userRoutes);
app.use('/captain', captainRoutes);

// Export the app for use in the server
module.exports = app;
