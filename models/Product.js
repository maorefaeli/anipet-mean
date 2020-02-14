const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ProductSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    foodSourceId: {
        type: Schema.Types.ObjectId,
        ref: "FoodSource",
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

module.exports = Product = mongoose.model('Product', ProductSchema, 'Products');
