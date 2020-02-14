const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const StoreSchema = new Schema({
    storeAdmin: {
        type: String,
        required: true
    },
    Products: [{
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: false
    }],
    city: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    }
});

module.exports = Store = mongoose.model('Store', StoreSchema, "Stores");
