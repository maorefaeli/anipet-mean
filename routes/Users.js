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
                    password: req.body.password,
                    isAdmin: req.body.isadmin
                });
                newUser.save()
                    .then(user => res.json(user))
                    .catch(err => console.log(err))
            }
        });
});

// @route POST api/users/login
// @desc Login user
// @access Public

router.post('/login', (req, res) => {
    const name = req.body.name;
    const password = req.body.password;
    //find user by name
    User.findOne({ name })
        .then(user => {
            //Check for user
            if(!user) {
                return res.status(404).json({"error":"user not found"});
            }
            if (password == user.password) {
                return res.status(200).json({"success":"User found"})
            } else {
                return res.status(400).json({"error":"wrong password"})
            }
        });
});

module.exports = router;
