const express = require('express');
const router = express.Router();
const keys = require('../config/keys');

// Load Product model
const Product = require('../models/Product');

// @route POST api/products/add
// @desc Add product
// @access Public
router.post('/add', async (req, res) => {
    const {name, weight, price} = req.body;
    const newProduct = new Product ({
        name: name,
        weightInKilo: weight,
        price: price
    });
    try {
        product = await newProduct.save();
        res.json(product);
    } catch (error) {
        console.log(error);
        res.status(400).json({"error":"Problem saving product"})
    }
});

// @route GET api/products
// @desc Get all products
// @access Public
router.get('/', async (req, res) => {
    try {
        products = await Product.find();
        if(!products){
            return res.status(400).json({"error":"There are not products"});
        }
        return res.json(products);
    } catch (error) {
        console.log(error);
        res.status(400).json({"error":"Problem getting products"})
    }
});


module.exports = router;
