const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const PurchaseSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    productId: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    date: {
        type: Date,
        required: true
    },
});

module.exports = Purchase = mongoose.model('Purchase', PurchaseSchema, "Purchases");
