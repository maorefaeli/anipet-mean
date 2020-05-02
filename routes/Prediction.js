const express = require('express');
const router = express.Router();
const keys = require('../config/keys');
const auth = require('../utils/auth');

// Load models
const Product = require('../models/Product');
const User = require('../models/User');
const Purchase = require('../models/Purchase');

async function predict(userPurchases, allPurchases, userId) {
    //  TODO:
    //  1. Find the uids that bought the same proudcts as the relevant uid and in overall bought more products.
    //  2. If find uid in (1), return the next product of the found uid as the prediction.
    //  3. If uid is not found in (1), retry (1) again with 2 products, if found returns as a prediction the next product, if not, return "no prediciton"
    var users = [];
    var products = [];
    var overallCounter = 0;
    var matchCounter = 0;
    var potential = [];
    allPurchases.forEach(pur => {
        if (!(users.includes(pur.user.generationTime)) && !(pur.user.generationTime == userPurchases[0].user.generationTime)) {
            users.push(pur.user.generationTime);
            console.log(userPurchases[0].user.generationTime)
        }
        if (!(products.includes(pur.product.generationTime)) && (pur.user.generationTime == userPurchases[0].user.generationTime)) 
            products.push(pur.product.generationTime);
    });
    users.forEach(uid => {
        allPurchases.forEach(purchase => {
            if (purchase.user.generationTime == uid) {
                overallCounter++;
                if (products.includes(purchase.product.generationTime)) {  matchCounter++; }
                else { potential.push(purchase.product.generationTime); }
            }
        });
        if ((overallCounter > products.length) && (matchCounter > 1)) {
            return potential;
        } else {    matchCounter = overallCounter = 0; potential = [];  }
    });
    return potential;
}

router.post('/', auth.isLoggedIn, async (req, res) => {
    const {userId} = req.body;
    console.log("userId: " + userId)
    try {
        allPurchases = await Purchase.find();
        userPurchases = await Purchase.find({user: userId})
        allProducts = await Product.find();
        if(!userPurchases){
            return res.status(400).json({"error":"There are no purchases for this user"});
        }
        prediction = await predict(userPurchases, allPurchases, userId)
        allProducts.forEach(product => {
            if (product._id.generationTime == prediction[0]) { predictProduct = product; }
        });
        return res.json(predictProduct);
    } catch (error) {
        console.log(error);
        res.status(400).json({"error":"Problem getting prediction"})
    }
});

module.exports = router;