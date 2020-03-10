const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const PurchaseSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    date: {
        type: Date,
        required: true
    },
});

PurchaseSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) { delete ret._id }
});

module.exports = Purchase = mongoose.model('Purchase', PurchaseSchema, "Purchases");
