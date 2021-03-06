const crypto = require('../utils/crypto');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const encryptPassword = (password) => crypto.encodeSHA256(password);

// Create Schema
const UserSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: false
    },
    // For shipping orders
    name: {
        type: String,
        required: false
    },
    city: {
        type: String,
        required: false
    },
    street: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: false
    },
    phone: {
        type: String,
        required: false
    },
    postal: {
        type: Number,
        required: false
    }
});

UserSchema.methods.isPasswordValid = function(password) {
    return this.password === encryptPassword(password);
};

UserSchema.statics.encryptPassword = function(password) {
    return encryptPassword(password);
};

UserSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) { delete ret._id }
});

module.exports = User = mongoose.model('User', UserSchema, 'Users');
