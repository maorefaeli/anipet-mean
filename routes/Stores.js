const express = require('express');
const router = express.Router();
const keys = require('../config/keys');

// Load Store model
const Store = require('../models/Store');

router.get('/test', (req, res) => res.json({"msg": "Stores works"}));

// @route POST api/stores/add
// @desc Add store
// @access Public
router.post('/add', (req, res) => {
    const newStore = new Store ({
        storeAdmin: req.body.storeAdmin,
        city: req.body.city,
        address: req.body.address
    });
    try {
        store = await newStore.save()
        res.json(store);
    } catch (error) {
        console.log(error);
        res.status(400).json({"error":"Problem saving store"})
    }
    newStore.save()
        .then(store => res.json(store))
        .catch(err => console.log(err))
});

module.exports = router;
