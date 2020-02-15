const express = require('express');
const router = express.Router();
const keys = require('../config/keys');

// Load Product model
const Product = require('../models/Product');

// @route POST api/products/add
// @desc Add product
// @access Public
router.post('/add', async (req, res) => {
    const {name, weightInKilo, price} = req.body;
    const newProduct = new Product ({
        name: name,
        weightInKilo: weightInKilo,
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

//  @route DELETE api/products/:product_id
//  @desc Delete specific product
//  @access Public
router.delete('/', async (req, res) => {
    try {
        result = await Product.findByIdAndRemove({"_id":req.body.product_id});
        products = await Product.find();
        return res.json(products);
    } catch (error){
        console.log(error);
        res.status(400).json({"error":"Problem removing product"})
    }
});

//  @route POST api/products/:product_id
//  @desc Edit specific product
//  @access Public
router.post('/edit', async (req, res) => {
    const {_id, name, weightInKilo, price} = req.body;
    try {
        result = await Product.findByIdAndUpdate(_id,{$set:req.body});
        products = await Product.find();
        return res.json(products);
    } catch (error){
        console.log(error);
        res.status(400).json({"error":"Problem editing product"})
    }
});

module.exports = router;



// User.findOne({<criteria>}).then(theUser => {
//     theUser.property.subpropertyarray.push(<new value>);
//     return theUser.save();
// }