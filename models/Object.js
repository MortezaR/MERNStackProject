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

const Object = mongoose.model('objects', objSchema);
module.exports = Object
