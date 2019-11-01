const Schema = require('mongoose').Schema;

module.exports = new Schema({
    _id: { type: Schema.Types.ObjectId },
    userId: {type: Schema.Types.ObjectId, required: true},
    publicationId: {type: Schema.Types.ObjectId, required: true},
    loanDate: {type: Date, default: Date.now}
  });