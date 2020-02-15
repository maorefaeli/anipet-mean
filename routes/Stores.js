const express = require('express');
const router = express.Router();
const keys = require('../config/keys');

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
router.post('/add', async (req, res) => {
    const {name, lon, lat} = req.body;
    const newStore = new Store ({
        name: name,
        location: {
            type: "Point",
            coordinates: [lon, lat]
        }
    });
    try {
        store = await newStore.save();
        res.json(store);
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
        stores = await Store.find();
        if(!stores){
            return res.status(400).json({"error":"There are not stores"});
        }
        return res.json(stores);
    } catch (error) {
        console.log(error);
        res.status(400).json({"error":"Problem getting stores"})
    }
});

module.exports = router;
