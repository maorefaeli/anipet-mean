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
                errors.name = 'User not found';
                return res.status(404).json({"error":"user not found"});
            }
            //Check password
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (isMatch) {
                        //User matched
                        const payload = { id: user.id, name: user.name, avatar: user.avatar}; //Create JWT Payload
                        //Sign Token
                        jwt.sign(
                            payload,
                            keys.secretOrKey,
                            { expiresIn: 3600 }, 
                            (err, token) => {
                                res.json({
                                    success: true,
                                    token: 'Bearer ' + token
                                });
                            });
                    } else {
                        errors.passowrd = 'Password incorrect';
                        return res.status(400).json(errors);
                    }
                });
        });
});
module.exports = router;
