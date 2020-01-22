const express = require('express');
const router = express.Router();
const keys = require('../config/keys');

// Load User model
const User = require('../models/User');

router.get('/test', (req, res) => res.json({"msg": "Users works"}));

module.exports = router;
