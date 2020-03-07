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

StoreSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) { delete ret._id }
});

module.exports = Store = mongoose.model('Store', StoreSchema, "Stores");
