const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const personSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        age: { type: Number },
        password: { type: String, required: true },
        username: { type: String, required: true, unique: true }, // Ensuring uniqueness
        work: { type: String, enum: ['chef', 'waiter', 'manager'], required: true },
        mobile: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        address: { type: String },
        salary: { type: Number, required: true }
    }
);

// ✅ Hash password before saving
personSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

const Person = mongoose.model('Person', personSchema);
module.exports = Person;
