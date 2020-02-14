const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const FoodSourceSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    pricePerKilo: {
        type: Number,
        required: true
    }
});

module.exports = FoodSource = mongoose.model('FoodSource', FoodSourceSchema, 'FoodSources');
