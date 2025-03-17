const express = require('express');
const Menu = require('../models/menu');
const router = express.Router();
router.post('/', async (req, res) => {
    try {
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ error: "Invalid or empty JSON body" });
        }

        const menuData = new Menu(req.body); // ✅ Corrected model name
        const response = await menuData.save();
        console.log(response);
        res.status(201).json(response);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// ✅ GET: Fetch All Menu Items
router.get('/', async (req, res) => {
    try {
        const data = await Menu.find();
        console.log('Menu data fetched');
        res.status(200).json(data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
router.get('/:tasteType' , async(req , res )=>{
       try {
            const tasteType = req.params.tasteType.toLowerCase(); // Case insensitive match
            const response  = await Menu.find({taste: tasteType});
            console.log('Menu data fetched');
            res.status(200).json(response);
       }
       catch(err){
           console.error(err);
           res.status(500).json({error:"Internal Server Error"});
       }
});
module.exports = router;