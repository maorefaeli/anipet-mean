const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const express = require('express');
const session = require("express-session");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const users = require('./routes/Users');
const products = require('./routes/Products');
const purchases = require('./routes/Purchases');
const stores = require('./routes/Stores');

const app = express();
const port = 3000;

// Load User model
const User = require('./models/User');
const validators = require('./utils/validators');

passport.use(new LocalStrategy(
    function(username, password, done) {
        if (!validators.isStringWithValue(username)) {
            return done(null, false, { message: 'Username cannot be empty.' });
        }
        if (!validators.isStringWithValue(password)) {
            return done(null, false, { message: 'Password cannot be empty.' });
        }

        User.findOne({ username }).then((user) => {
            if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
            }
            if (!user.isPasswordValid(password)) {
                return done(null, false, { message: 'Incorrect password.' });
            }
            return done(null, user);
        });
    }
));

passport.serializeUser(function(user, done) {
    if (user) done(null, user.id);
});
  
passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});

// Body parser middleware
app.use(express.static("public"));
app.use(session({ 
    name: 'anipet.sid',
    secret: 'anipet',
    resave: true,
    saveUninitialized: false,
    cookie: { secure: false }
}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to mongoDB
mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

app.get('/', (req, res) => {
    res.send({msg: 'hello! Server is up'});
});

// Use Routes
app.use('/users', users)
app.use('/products', products)
app.use('/purchases', purchases)
app.use('/stores', stores)

// Handle login
app.post('/login', passport.authenticate('local', { failWithError: true }),
    function(req, res, next) {
        // handle success
        return res.redirect('/');
    },
    function(err, req, res, next) {
        // handle error
        return res.json(err);
    }
);

// Handle logout
app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
});

// Default request catcher
app.all('*', (req, res) => {
    res.status(404).send({msg: 'Not found'});
});

app.listen(port, () => console.log(`Server running on port ${port}`));
