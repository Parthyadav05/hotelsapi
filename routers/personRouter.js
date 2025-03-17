const express = require('express');
const Person = require('../models/person');
const router = express.Router();
router.post('/', async (req, res) => {
    try {
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ error: "Invalid or empty JSON body" });
        }

        const newPerson = new Person(req.body);
        const response = await newPerson.save();
        console.log(response);
        res.status(201).json(response);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// ✅ GET: Fetch People by Work Type
router.get('/:workType', async (req, res) => {
    try {
        const workType = req.params.workType.toLowerCase(); // Case insensitive match
        const allowedWorkTypes = ['manager', 'waiter', 'chef'];

        if (!allowedWorkTypes.includes(workType)) {
            return res.status(404).json({ error: "404 Not Found" });
        }

        const data = await Person.find({ work: workType });
        console.log('Person data fetched');
        res.status(200).json(data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
router.put('/:id', async (req, res) => {
    try {
        const personId = req.params.id;
        const updatedData = await Person.findByIdAndUpdate(personId, req.body, {
            new: true,
            runValidators: true
        });
        res.status(200).json(updatedData);
        console.log("data updated");
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
})
// ✅ GET: Fetch All People
router.get('/', async (req, res) => {
    try {
        const data = await Person.find();
        console.log('Person data fetched');
        res.status(200).json(data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
router.delete('/:id', async (req, res) => {
    try {
        const personId = req.params.id;
        const deletedData = await Person.findByIdAndDelete(personId);
        if (!deletedData) {
            return res.status(404).json({ error: "Person not found" });
        }
        res.status(200).json(deletedData);
        console.log("data deleted");
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
module.exports = router;