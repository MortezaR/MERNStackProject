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
<<<<<<< HEAD
        // default: 'https://i.imgur.com/iHtlhrb.png',
        default: 'hello.png'
=======
        default: 'default.png'
>>>>>>> 577c89a17d9a64db7be31b582c201cbcde20d9fe
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