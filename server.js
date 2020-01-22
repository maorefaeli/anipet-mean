const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const users = require('./routes/Users');
const products = require('./routes/Products');
const purchases = require('./routes/Purchases');
const stores = require('./routes/Stores');
const foodsources = require('./routes/FoodSources');

const app = express();
const port = process.env.PORT || 5000;

//Body parser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//DB Config
const db = require('./config/keys').mongoURI;
//Connect to mongoDB
mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

//Use Routes
app.use('/users', users)
app.use('/products', products)
app.use('/purchases', purchases)
app.use('/stores', stores)
app.use('/foodsources', foodsources)

app.listen(port, () => console.log(`Server running on port ${port}`));