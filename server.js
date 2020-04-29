const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const express = require('express');
const session = require("express-session");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const MongoStore = require('connect-mongo')(session);

const users = require('./routes/Users');
const products = require('./routes/Products');
const purchases = require('./routes/Purchases');
const stores = require('./routes/Stores');
const stats = require('./routes/Stats');

const app = express();
const port = 3000;

// Load User model
const User = require('./models/User');
const validators = require('./utils/validators');

passport.use(new LocalStrategy(
    function(username, password, done) {
        if (!validators.isNonEmptyString(username)) {
            return done(null, false, { message: 'Username cannot be empty.' });
        }
        if (!validators.isNonEmptyString(password)) {
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

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to mongoDB
mongoose
    .connect(db, {
        useNewUrlParser: true,
        useFindAndModify: false,
        useCreateIndex: true,
        useUnifiedTopology:  true,
    })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

// Body parser middleware
app.use(express.static("public"));
app.use(session({ 
    name: 'anipet.sid',
    secret: 'anipet',
    resave: true,
    saveUninitialized: false,
    cookie: { secure: false },
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
    res.send({msg: 'hello! Server is up'});
});

// Use Routes
app.use('/users', users)
app.use('/products', products)
app.use('/purchases', purchases)
app.use('/stores', stores)
app.use('/stats', stats)

// Handle login
app.post('/login', passport.authenticate('local', { failWithError: true }),
    function(req, res, next) {
        // handle success
        return res.json({ isAdmin: req.user.isAdmin });
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
