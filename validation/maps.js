const Validator = require('validator');
const validText = require('./valid-text');

module.exports = function validateMapInput(data) {
    let errors = {};

    data.title = validText(data.title) ? data.title : '';

    if (!Validator.isLength(data.title, { min: 3, max: 100}))  {
        errors.title = "Title must be between 3 and 100 characters"
    }

    if (Validator.isEmpty(data.title)) {
        errors.title = "Title is required!";
    }

    return {
        errors,
        isValid: Object.keys(errors).length === 0
    }
}