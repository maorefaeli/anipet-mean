const express = require('express');
const router = express.Router();
const auth = require('../utils/auth');

// Load Store model
const Store = require('../models/Store');

// @route GET api/stores
// @desc Get all stores
// @access Public
router.get('/', async (req, res) => {
    try {
        const stores = await Store.find();
        return res.json(stores || []);
    } catch (error) {
        console.log(error);
        res.status(400).json({"error":"Problem getting stores"})
    }
});

// @route POST api/stores/add
// @desc Add store
// @access Public
router.post('/add', auth.isAdminLoggedIn, async (req, res) => {
    const { name, lng, lat } = req.body;
    
    let newStore = new Store ({
        name,
        location: {
            type: "Point",
            coordinates: [lng, lat]
        }
    });
    try {
        newStore = await newStore.save();
        res.json(newStore);
    } catch (error) {
        console.log(error);
        res.status(400).json({"error":"Problem saving store"})
    }
});

//  @route DELETE api/stores/:id
//  @desc Delete specific store
//  @access Public
router.delete('/:id', auth.isAdminLoggedIn, async (req, res) => {
    try {
        await Store.findByIdAndRemove(req.params.id);
        return res.json(true);
    } catch (error){
        console.log(error);
        res.status(400).json({"error":"Problem removing store"})
    }
});

module.exports = router;
