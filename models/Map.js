const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const objSchema = new Schema({
    name: {
        type: String
    },
    position: {
        type: [Number]
    },
    status: {
        type: String
    }
})

const MapSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    title: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    objects: [objSchema]
});

const Maps = mongoose.model('maps', MapSchema)
module.exports = Maps