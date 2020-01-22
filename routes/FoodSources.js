const express = require('express');
const router = express.Router();
const keys = require('../config/keys');

// Load FoodSource model
const FoodSource = require('../models/FoodSource');

router.get('/test', (req, res) => res.json({"msg": "FoodSources works"}));