
const Recommendation = require('../data/db').Publication;
  

// GET

const getRecommendationByUser = async user_id => {
  try {
    const recommendation = await Recommendation.find({});
    var recommendedBooks = [];

    for ( i = 0; i < recommendation.length; i++) {
      if (recommendation[i].total_rating >= 4) {
        recommendedBooks.push(recommendation[i]);
      }
      
      
    }
    recommendedBooks.sort(function (a, b) {
      return b.total_rating - a.total_rating;
    })
    return recommendedBooks;
  } catch(err) {
    return err;
  }
};

  
  module.exports = {
    getRecommendationByUser
  };