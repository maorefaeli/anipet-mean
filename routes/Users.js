const express = require('express');
const router = express.Router();
const validators = require('../utils/validators');
const auth = require('../utils/auth');

// Load User model
const User = require('../models/User');

// @route POST api/users/register
// @desc Register user
// @access Public
router.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!validators.isNonEmptyString(username)) {
            return res.status(400).json({"error": "name cannot be empty"});
        }

        if (!validators.isNonEmptyString(password)) {
            return res.status(400).json({"error": "password cannot be empty"});
        }

        let user = await User.findOne({ username });

        if (user) {
            return res.status(400).json({"error": "user already exist"});
        }

        user = new User({
            username,
            password: User.encryptPassword(password)
        });

        await user.save();
        res.json(true);
    } catch (error) {
        console.log(error);
        res.status(400).json({"error": "problem saving user"})
    }
});

// @route POST api/users/update
// @desc Update current user details
// @access Public
router.post('/update', auth.isLoggedIn, async (req, res) => {
    try {
        const { name, city, street, email, phone, postal } = req.body;
        const user = {
            name,
            city,
            street,
            email,
            phone,
            postal
        };
        await User.findByIdAndUpdate(req.user.id, user);
        return res.json(true);
    } catch (error) {
        console.log(error);
        res.status(400).json({"error": "problem updating user details"})
    }
});

// @route POST api/users/details
// @desc Get current user details
// @access Public
router.get('/details', auth.isLoggedIn, async (req, res) => {
    try {
        let user = await User.findById(req.user.id);
        res.json({
            id: user.id,
            username: user.username,
            isAdmin: user.isAdmin,
            name: user.name,
            city: user.city,
            street: user.street,
            email: user.email,
            phone: user.phone,
            postal: user.postal, 
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({"error": "problem getting user details"})
    }
});

module.exports = router;
