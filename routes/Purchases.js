const express = require('express');
const router = express.Router();
const auth = require('../utils/auth');

// Load Purchase model
const Purchase = require('../models/Purchase');

// @route POST api/purchases/add
// @desc Add purchase
// @access Public
router.post('/add', auth.isLoggedIn, async (req, res) => {
    try {
        const { productId } = req.body;
        if (req.user.isAdmin) {
            return res.status(401).json({"error":"Admin can't add purchase"});
        }
        let newPurchase = new Purchase ({
            user: req.user.id,
            product: productId,
            date: new Date()
        });
        await newPurchase.save();
        res.json(true);
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
        const query = req.user.isAdmin ? undefined : { user: req.user.id }
        const purchases = await Purchase.find(query)
            .populate('user', 'username')
            .populate('product')
            .sort({ date: 'desc' });
        return res.json(purchases || []);
    } catch (error) {
        console.log(error);
        res.status(400).json({"error":"Problem getting purchases"})
    }
});

module.exports = router;
