const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const StoreSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    location: {
        type: {
          type: String,
          enum: ['Point'], // 'location.type' must be 'Point'
          required: true
        },
        coordinates: {
          type: [Number], // longitude, latitude
          required: true
        }
    }
});

module.exports = Store = mongoose.model('Store', StoreSchema, "Stores");
