const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        required: false
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: String,
        required: true
    },
    favorite: {
        type: String,
        required: false
    }
});

module.exports = User = mongoose.model('User', UserSchema, 'Users');
