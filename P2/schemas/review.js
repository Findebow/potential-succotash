const Schema = require('mongoose').Schema;

module.exports = new Schema({
  rating: {type: Number, required: true},
  userId: {type: Schema.Types.ObjectId, required: true},
  publicationId: {type: Schema.Types.ObjectId, required: true},
});