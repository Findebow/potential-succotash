const mongoose = require('mongoose');

// Create a simple Publication's schema 
const publicationSchema = new mongoose.Schema({
    editor_first_name: {type: String, required: true},
    editor_last_name: {type: String, required: true},
    publication_title: {type: String, required: true},
    isbn: {type: String, required: true},
    type: {type: String, required: true},
    jounal: {type: String, required: true},
    year: {type: Number, required: true}
});

const publicationModel = new mongoose.model('Publication', publicationSchema);


module.exports = publicationModel