const Validator = require('validator');
const validText = require('./valid-text');

module.exports = function validateRegisterInput(data) {
    let errors = {};

    data.username = validText(data.username) ? data.username : ''
    data.password = validText(data.password) ? data.password : ''
    data.password2 = validText(data.password2) ? data.password2 : ''

    if (!Validator.isLength(data.username, { min: 2, max: 30})) {
        errors.username = "username must be between 2 and 30 characters";
    }

    if (Validator.isEmpty(data.username)) {
        errors.username = "username field is required";
    }

    if (Validator.isEmpty(data.password)) {
        errors.password = "password is required";
    }

    if (!Validator.isLength(data.password, { min: 6, max: 15})) {
        errors.password = "password must be between 6 and 15 characters";
    }

    if (!Validator.equals(data.password, data.password2)) {
        errors.password2 = "passwords must match"
    }

    return {
        errors,
        isValid: Object.keys(errors).length === 0
    }
}