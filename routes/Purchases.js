const express = require('express');
const router = express.Router();
const keys = require('../config/keys');

// Load Purchase model
const Purchase = require('../models/Purchase');

// @route POST api/purchases/add
// @desc Add purchase
// @access Public
router.post('/add', async (req, res) => {
    const {userId, productId} = req.body;
    const newPurchase = new Purchase ({
        userId: userId,
        productId: productId,
        date: new Date()
    });
    try {
        purchase = await newPurchase.save();
        res.json(purchase);
    } catch (error) {
        console.log(error);
        res.status(400).json({"error":"Problem saving purchase"})
    }
});

// @route GET api/purchases
// @desc Get all purchases
// @access Public
router.get('/', async (req, res) => {
    try {
        purchases = await Purchase.find();
        if(!purchases){
            return res.status(400).json({"error":"There are not purchases"});
        }
        return res.json(purchases);
    } catch (error) {
        console.log(error);
        res.status(400).json({"error":"Problem getting purchases"})
    }
});



module.exports = router;
