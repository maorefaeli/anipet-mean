const express = require('express');
const router = express.Router();
const auth = require('../utils/auth');

// Load Product model
const Product = require('../models/Product');

// @route GET api/products
// @desc Search products
// @access Public
router.get('/', auth.isLoggedIn, async (req, res) => {
    const { name, maxWeight, maxPrice } = req.query;
    
    const query = {};
    if (name) {
        query.name = { $regex : `.*${name}.*`, $options: 'i' };
    }
    if (maxWeight) {
        query.weight = { $lte: Number(maxWeight) };
    }
    if (maxPrice) {
        query.price = { $lte: Number(maxPrice) };
    }

    try {
        const products = await Product.find(query);
        return res.json(products || []); 
    } catch (error) {
        console.log(error);
        res.status(400).json({"error":"Problem searching products"})
    }
});

// @route POST api/products/add
// @desc Add product
// @access Public
router.post('/add', auth.isAdminLoggedIn, async (req, res) => {
    const { name, weight, price } = req.body;
    const newProduct = new Product ({
        name,
        weight,
        price
    });
    try {
        newProduct = await newProduct.save();
        res.json(newProduct);
    } catch (error) {
        console.log(error);
        res.status(400).json({"error":"Problem saving product"});
    }
});

//  @route DELETE api/products/:id
//  @desc Delete specific product
//  @access Public
router.delete('/:id', auth.isAdminLoggedIn, async (req, res) => {
    try {
        await Product.findByIdAndRemove(req.params.id);
        return res.json(true);
    } catch (error){
        console.log(error);
        res.status(400).json({"error":"Problem removing product"})
    }
});

//  @route POST api/products/:id
//  @desc Edit specific product
//  @access Public
router.post('/:id', auth.isAdminLoggedIn, async (req, res) => {
    const { name, weight, price } = req.body;
    const product = {
        name,
        weight,
        price
    }

    try {
        await Product.findByIdAndUpdate(req.params.id, product);
        return res.json(true);
    } catch (error){
        console.log(error);
        res.status(400).json({"error":"Problem editing product"})
    }
});

module.exports = router;
