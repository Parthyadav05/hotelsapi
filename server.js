const express = require('express');
const mongoose = require('mongoose');
const menuRouter = require('./routers/menuRouter');
const db = require('./db'); // MongoDB connection
require('dotenv').config();
const Menu = require('./models/menu'); // Capitalized model
const personRouter = require('./routers/personRouter');
const passport = require('./auth'); // Correct passport import

const app = express();

// ✅ Correct order of middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;

// ✅ Middleware applied globally
const logRequest = (req, res, next) => {
    console.log(`${new Date().toLocaleString()} Request made to: ${req.method} ${req.url}`);
    next();
};

app.use(logRequest);
app.use(passport.initialize());

const localAuthMiddleware = passport.authenticate('local', { session: false });

// ✅ Welcome Route
app.get('/', (req, res) => {
    res.send('Welcome to the World of API');
});

// ✅ Routers
app.use('/person', localAuthMiddleware, personRouter);
app.use('/menu', menuRouter); // Protected menu routes

// ✅ Start Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
