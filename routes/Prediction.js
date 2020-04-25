const express = require('express');
const router = express.Router();
const keys = require('../config/keys');

// Load models
const Product = require('../models/Product');
const User = require('../models/User');
const Purchase = require('../models/Purchase');

async function predict([userPurchases], [products]) {
    var svm = require('node-svm');

    var xor = [
        [[0, 0], 0],
        [[0, 1], 1],
        [[1, 0], 1],
        [[1, 1], 0]
    ];

    var clf = new svm.CSVC();
    clf.train(xor).done(function () {
        // predict things
        xor.forEach(function(ex){
            var prediction = clf.predictSync(ex[0]);
            console.log('%d XOR %d => %d', ex[0][0], ex[0][1], prediction);
        });
    });
    //const predictedLabel = svm.predictOne(products);
    //console.log(predictedLabel) // 0
}

router.post('/predict', async (req, res) => {
    const {userId} = req.body;
    try {
        userPurchases = await Purchase.find();
        userPurchases = userPurchases.filter( function(userPurchase){return (userPurchase.userId===userId);} );

        products = await Product.find();
        if(!products){
            return res.status(400).json({"error":"There are not products"});
        }
        //return res.json(products);
        prediction = await predict(userPurchases, products);
        return res.json(prediction);
    } catch (error) {
        console.log(error);
        res.status(400).json({"error":"Problem getting products"})
    }
});

module.exports = router;