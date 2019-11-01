
 const mongoose = require('mongoose');
 const reviewSchema = require('../schemas/Review');
 const publicationSchema = require('../schemas/Publication');
 const userSchema = require('../schemas/user');
 const loanSchema = require('../schemas/Loan');
 const recommendationSchema = require('../schemas/Recommendation');

const connection = mongoose.createConnection('mongodb+srv://dbAdmin:Pass.123@mansiondesubastas-mdfwu.mongodb.net/P2', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const Review = connection.model('Review', reviewSchema);
const Publication = connection.model('Publication', publicationSchema);
const User = connection.model('User', userSchema);
const Loan = connection.model('Loan', loanSchema);
const Recommendation = connection.model('Recommendation', recommendationSchema );

module.exports = {
  connection,
  Review,
  Publication,
  User,
  Loan,
  Recommendation
  
};

