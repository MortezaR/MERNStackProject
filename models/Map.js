const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
    objects: {
        type: Object,
        required: true
    },
    url: {
        type: String,
        // default: 'https://i.imgur.com/iHtlhrb.png',
        default: 'hello.png'
    }
});

const Maps = mongoose.model('maps', MapSchema)
module.exports = Maps

// const objSchema = new Schema({
//     name: {
//         type: String
//     },
//     position: {
//         type: [Number]
//     },
//     status: {
//         type: String
//     }
// })