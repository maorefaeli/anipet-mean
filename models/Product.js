const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ProductSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    weightInKilo: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: false
    }
});

ProductSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) { delete ret._id }
});

module.exports = Product = mongoose.model('Product', ProductSchema, 'Products');
