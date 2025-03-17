const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const menuRouter = require('./routers/menuRouter');
const db = require('./db'); // MongoDB connection
require('dotenv').config();
const Menu = require('./models/menu'); // Capitalized model
const personRouter = require('./routers/personRouter');

const app = express();

// ✅ Correct order of middleware
app.use(express.json()); // Correct way to parse JSON
app.use(express.urlencoded({ extended: true })); 
const PORT = process.env.PORT || 3000;
// ✅ Welcome Route
app.get('/', (req, res) => {
    res.send('Welcome to the World of API');
});
app.use('/person' , personRouter);
app.use('/menu' , menuRouter);

// ✅ Start Server

app.listen(PORT, () => {
    console.log("Server is running on port 3000");
});
