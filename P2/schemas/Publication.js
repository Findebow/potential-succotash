const Schema = require('mongoose').Schema;

module.exports = new Schema({
    _id: { type: Schema.Types.ObjectId },
    editor_first_name: {type: String, required: true},
    editor_last_name: {type: String, required: false},
    publication_title: {type: String, required: true},
    isbn: {type: String, required: true},
    type: {type: String, required: false},
    journal: {type: String, required: true},
    year: {type: Number, required: false},
    rating_count: {type: Number, required: true},
    total_rating: {type: Number, required: true}
  });