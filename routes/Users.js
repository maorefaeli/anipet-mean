const express = require('express');
const router = express.Router();
const keys = require('../config/keys');

// Load User model
const User = require('../models/User');

router.get('/test', (req, res) => res.json({"msg": "Users works"}));

// @route POST api/users/register
// @desc Register user
// @access Public

router.post('/register', async (req, res) => {
    let user = await User.findOne({ name: req.body.name });

    if (user) {
        return res.status(400).json({"error": "user already exist"});
    } else {
        user = new User({
            name: req.body.name,
            password: req.body.password,
            isAdmin: req.body.isAdmin
        });

        try {
            user = await user.save();
            res.json(user);
        } catch (error) {
            console.log(error);
            res.status(400).json({"error": "problem saving user"})
        }
    }
});

// @route POST api/users/login
// @desc Login user
// @access Public

router.post('/login', async (req, res) => {
    const name = req.body.name;
    const password = req.body.password;

    // find user by name
    const user = await User.findOne({ name });

    // Check for user
    if (!user) {
        return res.status(400).json({"error": "User not found"});
    }

    if (password !== user.password) {
        return res.status(400).json({"error": "wrong password"});
    }

    return res.status(200);
});

module.exports = router;
