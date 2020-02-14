const express = require('express');
const router = express.Router();
const keys = require('../config/keys');

// Load User model
const User = require('../models/User');

router.get('/test', (req, res) => res.json({"msg": "Users works"}));

// @route POST api/users/register
// @desc Register user
// @access Public

router.post('/register', (req, res) => {
    User.findOne({ name: req.body.name })
        .then(user => {
            if (user) {
                return res.status(400).json({"error":"user already exist"});
            } else {
                const newUser = new User({
                    name: req.body.name,
                    password: req.body.password
                });
                newUser.save()
                    .then(user => res.json(user))
                    .catch(err => console.log(err))
            }
        });
});


module.exports = router;
