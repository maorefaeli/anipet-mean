const express = require('express');
const router = express.Router();
const keys = require('../config/keys');
const validators = require('../utils/validators');

// Load User model
const User = require('../models/User');

router.get('/test', (req, res) => res.json({"msg": "Users works"}));

// @route POST api/users/register
// @desc Register user
// @access Public

router.post('/register', async (req, res) => {
    const { name, password, isAdmin } = req.body;

    if (!validators.isStringWithValue(name)) {
        return res.status(400).json({"error": "name cannot be empty"});
    }

    if (!validators.isStringWithValue(password)) {
        return res.status(400).json({"error": "password cannot be empty"});
    }

    if (validators.isDefined(isAdmin) && !validators.isBoolean(isAdmin)) {
        return res.status(400).json({"error": "isAdmin must be boolean"});
    }

    let user = await User.findOne({ name: name });

    if (user) {
        return res.status(400).json({"error": "user already exist"});
    }

    user = new User({
        name: name,
        password: password
    });

    if (isAdmin) {
        user.role = "admin";
    }

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

    if (password !== user.password) {
        return res.status(400).json({"error": "wrong password"});
    }

    return res.json();
});

module.exports = router;
