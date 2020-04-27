const express = require('express');
const router = express.Router();
const keys = require('../config/keys');

// Load models
const Product = require('../models/Product');
const User = require('../models/User');
const Purchase = require('../models/Purchase');

async function predict([userPurchases], [allPurchases]) {
    //  TODO:
    //  1. Remove from the all purchases list, all the uids that didnt bought the same products as the relevant uid.
    //  2. Find the uids that bought the same proudcts as the relevant uid and in overall bought more products.
    //  3. If find uid in (2), return the next product of the found uid as the prediction.
    //  4. If uid is not found in (2), retry (2) again with 2 products, if found returns as a prediction the next product, if not, return "no prediciton"
    console.log("user purchases: " + userPurchases)
    console.log("all purchases: " + allPurchases)
}

router.post('/', async (req, res) => {
    const {userId} = req.body;
    try {
        allPurchases = await Purchase.find();
        userPurchases = allPurchases.filter( function(userPurchase){return (userPurchase.userId===userId);} );

        if(!userPurchases){
            return res.status(400).json({"error":"There are no purchases for this user"});
        }
        prediction = predict(userPurchases, allPurchases)
        return res.json(prediction);
    } catch (error) {
        console.log(error);
        res.status(400).json({"error":"Problem getting prediction"})
    }
});

module.exports = router;