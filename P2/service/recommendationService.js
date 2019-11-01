
const Recommendation = require('../data/db').Recommendation;
  

// GET

const getRecommendationByUser = async user_id => {
  try {
    const recommendation = await Recommendation.findById(user_id);
    return recommendation;
  } catch(err) {
    return err;
  }
};

  
  module.exports = {
    getRecommendationByUser
  };