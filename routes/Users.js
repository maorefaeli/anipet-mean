const express = require('express');
const router = express.Router();
const keys = require('../config/keys');
const validators = require('../utils/validators');
const crypto = require('../utils/crypto');

// Load User model
const User = require('../models/User');

// @route POST api/users/register
// @desc Register user
// @access Public

router.post('/register', async (req, res) => {
    const { name, password } = req.body;

    if (!validators.isStringWithValue(name)) {
        return res.status(400).json({"error": "name cannot be empty"});
    }

    if (!validators.isStringWithValue(password)) {
        return res.status(400).json({"error": "password cannot be empty"});
    }

    let user = await User.findOne({ name: name });

    if (user) {
        return res.status(400).json({"error": "user already exist"});
    }

    user = new User({
        name: name,
        password: crypto.encodeSHA256(password)
    });

    try {
        user = await user.save();
        res.json(user);
    } catch (error) {
        console.log(error);
        res.status(400).json({"error": "problem saving user"})
    }
});

// @route POST api/users/login
// @desc Login user
// @access Public

router.post('/login', async (req, res) => {
    const { name, password } = req.body;
    
    if (!validators.isStringWithValue(name)) {
        return res.status(400).json({"error": "name cannot be empty"})
    }

    if (!validators.isStringWithValue(password)) {
        return res.status(400).json({"error": "password cannot be empty"})
    }

    // find user by name
    const user = await User.findOne({ name });

    // Check for user
    if (!user) {
        return res.status(400).json({"error": "User not found"});
    }

    if (crypto.encodeSHA256(password) !== user.password) {
        return res.status(400).json({"error": "wrong password"});
    }

    return res.json();
});

module.exports = router;
