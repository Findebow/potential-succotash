const Schema = require('mongoose').Schema;

module.exports = new Schema({
    _id: { type: Schema.Types.ObjectId },
    userId: {type: Schema.Types.ObjectId, required: true, ref: 'user'},
    publicationId: {type: Schema.Types.ObjectId, required: true, ref: 'Publication'},
    borrowDate: {type: Date, default: Date.now},
    returnDate: {type: Date, default: Date.now}
  });