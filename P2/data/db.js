
 const mongoose = require('mongoose');
 const reviewSchema = require('../schemas/review');
 const publicationSchema = require('../schemas/Publication');
 const loanSchema = require('../schemas/Loan');

// const connection = mongoose.createConnection('mongodb+srv://honnunogsmidi:honnunogsmidi@cluster0-oy581.mongodb.net/test?retryWrites=true&w=majority', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// });

const connection = mongoose.createConnection('mongodb+srv://dbAdmin:Pass.123@mansiondesubastas-mdfwu.mongodb.net/P2', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const Review = connection.model('Review', reviewSchema);
const Publication = connection.model('Publication', publicationSchema);
const Loan = connection.model('Loan', loanSchema);

module.exports = {
  connection,
  Review,
  Publication,
  Loan
  
};

