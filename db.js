const mongoose = require('mongoose');

// Define the MongoDB database URL
const mongoUrl = 'mongodb://localhost:27017/hotel';

mongoose.connect(mongoUrl, {
    useNewUrlParser: true,  // ✅ Corrected option
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.error("Error connecting to MongoDB", err);
});

// Get the database connection instance
const db = mongoose.connection;

// Mongoose connection events
db.on('connected', () => {
    console.log("Mongoose connected to db");
});

db.on('error', (err) => {
    console.error("Mongoose connection error", err);
});

db.on('disconnected', () => {
    console.log("Mongoose disconnected");
});

module.exports = { db };
