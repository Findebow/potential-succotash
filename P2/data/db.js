
 const mongoose = require('mongoose');
 const reviewSchema = require('../schemas/review');

const connection = mongoose.createConnection('mongodb+srv://honnunogsmidi:honnunogsmidi@cluster0-oy581.mongodb.net/test?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const Review = connection.model('Review', reviewSchema);

module.exports = {
  connection,
  Review
  
};

