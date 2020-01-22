const express = require('express');
const router = express.Router();
const keys = require('../config/keys');

// Load Product model
const Product = require('../models/Product');

router.get('/test', (req, res) => res.json({"msg": "Products works"}));