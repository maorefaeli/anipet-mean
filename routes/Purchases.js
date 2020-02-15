const express = require('express');
const router = express.Router();
const auth = require('../utils/auth');

// Load Purchase model
const Purchase = require('../models/Purchase');

// @route POST api/purchases/add
// @desc Add purchase
// @access Public
router.post('/add', auth.isLoggedIn, async (req, res) => {
    const { productId } = req.body;
    let newPurchase = new Purchase ({
        userId: req.user.id,
        productId: productId,
        date: new Date()
    });
    try {
        newPurchase = await newPurchase.save();
        res.json(newPurchase);
    } catch (error) {
        console.log(error);
        res.status(400).json({"error":"Problem saving purchase"})
    }
});

// @route GET api/purchases
// @desc Get all purchases
// @access Public
router.get('/', auth.isLoggedIn, async (req, res) => {
    try {
        // Admin see all the purchases
        const query = req.user.isAdmin ? undefined : { userId: req.user.id }
        const purchases = await Purchase.find(query);
        return res.json(purchases || []);
    } catch (error) {
        console.log(error);
        res.status(400).json({"error":"Problem getting purchases"})
    }
});

module.exports = router;
