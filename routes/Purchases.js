const express = require('express');
const router = express.Router();
const keys = require('../config/keys');

// Load Purchase model
const Purchase = require('../models/Purchase');

router.get('/test', (req, res) => res.json({"msg": "Purchases works"}));

module.exports = router;
