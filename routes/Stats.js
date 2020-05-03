const express = require('express');
const router = express.Router();
const auth = require('../utils/auth');
const validators = require('../utils/validators');

// Load Purchase model
const Purchase = require('../models/Purchase');
const Product = require('../models/Product');

const getDateBeforeXDays = (days) => new Date(Date.now() - (days * 24 * 60 * 60 * 1000));

const getIntOrDefault = (value, defaultValue) => {
    parsedValue = parseInt(value);
    return validators.isInteger(parsedValue) ? parsedValue : defaultValue;
};

const DEFAULT_DAYS = 7;

// @route POST api/stats/orders
// @desc Get orders count grouped by dates
// @access Admin
router.get('/orders', auth.isAdminLoggedIn, async (req, res) => {
    try {
        let { days } = req.query;

        const orders = await Purchase.aggregate([
            // Filter purchases from the last x days
            { $match: { date: { $gte: getDateBeforeXDays(getIntOrDefault(days, DEFAULT_DAYS)) } } },

            // Parse timestamp to contain only date part (without time) of format yyyy-MM-dd
            { $project: { date: { $dateToString: { format: "%Y-%m-%d", date: "$date" } } } },

            // Group purchases by date and count
            { $group: { _id: '$date', y: { $sum: 1 } } },

            // Sort the results ascending
            { $sort: { _id: 1 } },

            // Map fields
            { $project: { x: '$_id', y: true, _id: false } }
        ])
    
        res.json(orders || []);
    } catch (error) {
        console.log(error);
        res.status(400).json({"error":"Problem getting orders statistics"})
    }
});

// @route GET api/stats/products
// @desc Get most profitable products according to purchases
// @access Admin
router.get('/products', auth.isAdminLoggedIn, async (req, res) => {
    try {
        let { days } = req.query;

        const productsCount = await Purchase.aggregate([
            // Filter purchases from the last x days
            { $match: { date: { $gte: getDateBeforeXDays(getIntOrDefault(days, DEFAULT_DAYS)) } } },

            // Group purchases by product id and count
            { $group: { _id: '$product', count: { $sum: 1 } }}
        ]);

        // Join with Products collection
        const products = await Product.populate(productsCount, { path: '_id', select: 'name' });
        
        // Filter products that were not matched in the join and format the results
        const results = products.filter((p) => p._id).map((p) => ({
            x: p._id.name,
            y: p.count
        }));

        res.json(results || []);
    } catch (error) {
        console.log(error);
        res.status(400).json({"error":"Problem getting products statistics"})
    }
});

module.exports = router;
