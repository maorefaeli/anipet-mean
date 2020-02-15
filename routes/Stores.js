const express = require('express');
const router = express.Router();
const auth = require('../utils/auth');

// Load Store model
const Store = require('../models/Store');

/* location example
{
  "type" : "Point",
  "coordinates" : [
    -122.5,
    37.7
  ]
}
*/

// @route POST api/stores/add
// @desc Add store
// @access Public
router.post('/add', auth.isAdminLoggedIn, async (req, res) => {
    const { name, lon, lat } = req.body;
    let newStore = new Store ({
        name: name,
        location: {
            type: "Point",
            coordinates: [lon, lat]
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

module.exports = router;
