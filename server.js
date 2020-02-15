const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const users = require('./routes/Users');
const products = require('./routes/Products');
const purchases = require('./routes/Purchases');
const stores = require('./routes/Stores');

const app = express();
const port = process.env.PORT || 3000;

// Body parser middleware
app.use(bodyParser.json());

// DB Config
const db = require('./config/keys').mongoURI;
// Connect to mongoDB
mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

app.get('/api/test', (req, res) => {
    res.send({msg: 'hello! Server is up'});
});

//  Use Routes
app.use('/api/users', users)
app.use('/api/products', products)
app.use('/api/purchases', purchases)
app.use('/api/stores', stores)

// Default request catcher
app.all('*', (req, res) => {
    res.status(404).send({msg: 'Not found'});
});

app.listen(port, () => console.log(`Server running on port ${port}`));
