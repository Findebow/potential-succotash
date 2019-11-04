const Schema = require('mongoose').Schema;

module.exports = new Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: false },
    address: {type: String, required: false},
    phone: {type: String, required: true},
    email: {type: String, required: true},
});