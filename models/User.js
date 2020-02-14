const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["system", "admin"],
        required: false
    }
});

module.exports = User = mongoose.model('User', UserSchema, 'Users');
