const express = require('express');
const router = express.Router();

// Load models
const Product = require('../models/Product');
const Purchase = require('../models/Purchase');

const getMostPopularId = (ids) => {
    // Holds popularity with {id:count} structure
    const popularity = ids.reduce(function(rv, x) {
        rv[x] = (rv[x] || 0) + 1;
        return rv;
    }, {});

    // Find the most popular id
    const popularId = Object.keys(popularity).reduce((a, b) => popularity[a] > popularity[b] ? a : b);

    return popularId;
};

const getProductIdPredictionsWithSVM = (allPurchases, userId) => {
    //  1. Find the uids that bought the same products as the relevant uid and in overall bought more products.
    //  2. If find uid in (1), return the next product of the found uid as the prediction.
    //  3. If uid is not found in (1), retry (1) again with 2 products, if found returns as a prediction the next product, if not, return "no prediction"
    const userIds = new Set(); // Holds the user ids that are not the current user
    const productIds = new Set(); // Holds the products that the current user bought
    const predictions = [];

    us = new Set();
    allPurchases.forEach(purchase => {
        if (purchase.user._id.equals(userId)) {
            productIds.add(purchase.product._id.toString());
        } else {
            userIds.add(purchase.user._id.toString());
        }
    });

    userIds.forEach(uid => {
        let overallCounter = 0;
        let matchCounter = 0;
        const potential = [];

        // Calculate potential predictions and counters
        allPurchases.forEach(purchase => {
            if (purchase.user.equals(uid)) {
                overallCounter++;
                if (productIds.has(purchase.product._id.toString())) {
                    matchCounter++;
                } else {
                    potential.push(purchase.product._id.toString());
                }
            }
        });

        // Check if the potential is valid
        if ((overallCounter > productIds.size) && (matchCounter > 1)) {
            predictions.push(...potential);
        }
    });

    // Return the predictions array which can hold the same id more than once according to how
    // many times it got positive results
    return predictions;
}

router.get('/', async (req, res) => {
    try {
        // Get the connected user id if existing
        const userId = req.user ? req.user.id : '';

        let productIds = [];
        const allPurchases = await Purchase.find();

        // Check if the user had purchases
        // Apply SVM only if there are purchases for the user so the algorithm logic will be meaningful
        if (userId && allPurchases.some(purchase => purchase.user._id.equals(userId))) {
            productIds = getProductIdPredictionsWithSVM(allPurchases, userId);
        }
        
        // If the prediction returned nothing or the user had no purchase,
        // extract all the products that were bought from all the other users
        if (!productIds.length) {
            productIds = allPurchases.map(purchase => purchase.product._id.toString());
        }

        let product;

        // If there are product ids we found, get the most popular among the results
        if (productIds.length) {
            product = await Product.findById(getMostPopularId(productIds));
        }

        // If product was not found or there are no purchases, return the first one as default
        if (!product) {
            console.error("Prediction: Missing product id", predictionProductId);
            product = await Product.findOne();
        }

        // Found a product, return it
        if (product) {
            return res.json(product);
        }

        // If we still haven't found a product, than there are no products on the system
        return res.status(500).json({"error":"There are no products"})
    } catch (error) {
        console.log(error);
        res.status(400).json({"error":"Problem getting prediction"})
    }
});

module.exports = router;
