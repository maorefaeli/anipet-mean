const express = require('express');
const router = express.Router();
const keys = require('../config/keys');

// Load Store model
const Store = require('../models/Store');

router.get('/test', (req, res) => res.json({"msg": "Stores works"}));

module.exports = router;
