const express = require('express');
const router = express.Router();
const auth = require('../utils/auth');
const validators = require('../utils/validators');
const facebookApi = require('../utils/facebookApi');

// Load Product model
const Product = require('../models/Product');

const isProductContainErrors = (product) => {
    if (!validators.isNonEmptyString(product.name)) return 'Name cannot be empty';
    if (!validators.isPositiveNumber(product.weight)) return 'Weight must be positive';
    if (!validators.isPositiveNumber(product.price)) return 'Price must be positive';
    return '';
};

// @route GET api/products
// @desc Search products
// @access Public
router.get('/', auth.isLoggedIn, async (req, res) => {
    const { name, minWeight, maxWeight, minPrice, maxPrice } = req.query;
    
    const query = {};
    if (name) {
        query.name = { $regex : `.*${name}.*`, $options: 'i' };
    }
    if (minWeight) {
        query.weight = { $gte: Number(minWeight) };
    }
    if (maxWeight) {
        query.weight = { ...query.weight, $lte: Number(maxWeight) };
    }
    if (minPrice) {
        query.price = { $gte: Number(minPrice) };
    }
    if (maxPrice) {
        query.price = { ...query.price, $lte: Number(maxPrice) };
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
    let newProduct = new Product ({
        name,
        weight,
        price
    });

    let error = isProductContainErrors(newProduct);
    if (error) {
        return res.status(400).json({ error });
    }

    try {
        newProduct = await newProduct.save();
        res.json(newProduct);
        facebookApi.postFacebookMessage(`We have a new product called "${name}".\nCheck it out!`);
    } catch (e) {
        console.log(e);
        error = 'Problem saving product';
        if (e.errmsg && /duplicate key error/i.test(e.errmsg)) {
            error = 'Name already exists';
        }
        res.status(400).json({ error });
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
    };

    const error = isProductContainErrors(product);
    if (error) {
        return res.status(400).json({ error });
    }

    try {
        const newProduct = await Product.findByIdAndUpdate(req.params.id, product, { new: true });
        return res.json(newProduct);
    } catch (error){
        console.log(error);
        res.status(400).json({"error":"Problem editing product"})
    }
});

module.exports = router;
