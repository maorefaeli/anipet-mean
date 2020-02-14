const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const PurchaseSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    productId: {
        type: String,
        required: true
    },
    storeId: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
});

module.exports = Purchase = mongoose.model('Purchase', PurchaseSchema, "Purchases");
