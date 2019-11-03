const mongoose = require('mongoose');

// Create a simple Publication's schema 
const publicationSchema = new mongoose.Schema({
    editor_first_name: {type: String, required: true},
    editor_last_name: {type: String, required: false},
    publication_title: {type: String, required: true},
    isbn: {type: String, required: true},
    type: {type: String, required: false},
    journal: {type: String, required: true},
    year: {type: Number, required: false},
    rating_count: {type: Number, required: false},
    total_rating: {type: Number, required: false},
    average_rating: {type: Number, required: false}
});

const publicationModel = new mongoose.model('Publication', publicationSchema);


module.exports = publicationModel