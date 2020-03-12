const express = require('express');
const router = express.Router();
const validators = require('../utils/validators');

// Load User model
const User = require('../models/User');

// @route POST api/users/register
// @desc Register user
// @access Public

router.post('/register', async (req, res) => {
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

    try {
        await user.save();
        res.json();
    } catch (error) {
        console.log(error);
        res.status(400).json({"error": "problem saving user"})
    }
});

module.exports = router;
