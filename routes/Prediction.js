const express = require('express');
const router = express.Router();
const keys = require('../config/keys');

// Load models
const Product = require('../models/Product');
const User = require('../models/User');
const Purchase = require('../models/Purchase');

async function predict([userPurchases], [products]) {
    const SVM = await
    require('libsvm-js');
    const svm = new SVM({
        kernel: SVM.KERNEL_TYPES.LINEAR,    // The type of kernel I want to use
        type: SVM.SVM_TYPES.C_SVC,          // The type of SVM I want to run
        gamma: 1,                           // RBF kernel gamma parameter
        cost: 1                             // C_SVC cost parameter
    });

    // This is the xor problem
    //
    //  1  0
    //  0  1
    const features = [["Dog Vegan", "Dog Food"], ["Cat Toy"], ["Dog Toy"], ["Cat Salmon"]];
    const labels = ["Dog Snacks", "Cat Salmon", "Dog Snacks", "Cat Snacks"];
    svm.train(features, labels);  // train the model
    const predictedLabel = svm.predictOne(products);
    console.log(predictedLabel) // 0
}

xor().then(() => console.log('done!'));

// router.post('/predict', async (req, res) => {
//     const {userId} = req.body;
//     try {
//         userPurchases = await Purchase.find();
//         userPurchases = userPurchases.filter( function(userPurchase){return (userPurchase.userId===userId);} );

//         products = await Product.find();
//         if(!products){
//             return res.status(400).json({"error":"There are not products"});
//         }
//         return res.json(products);
//     } catch (error) {
//         console.log(error);
//         res.status(400).json({"error":"Problem getting products"})
//     }
// });

module.exports = router;