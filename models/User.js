const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    wins: {
        type: Number,
        default: 0
    }
});

const User = mongoose.model('users', UserSchema)
module.exports = User;