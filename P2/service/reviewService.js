
const Review = require('../data/db').Review;
  

// GET

  const getReviewsByUser = async user_id => {
    try {
      const review = await Review.findById(user_id);
      return review;
    } catch(err) {
      return err;
    }
  };
  

  const getReviewsOnPublicationsByUser = async (user_id, publication_id) => {
    try {
      const review = await Review.findById(user_id, publication_id);
      return review;
    } catch(err) {
      return err;
    }
  };


  const getAllReviews = async () => {
    const reviews = await Review.find({});
    return reviews;
  };
  

  const getReviewsByPublication = async (pub_id, cb, errorCb) => {
    Review.find({"publicationId": pub_id}, async function(err, reviews) {
      if (err) {errorCb(err); }
      else { cb(reviews); }
      });
  };


  const getUsersReviewOnPublication = async (publication_id, user_id) => {
    try {
      const review = await Review.findById(publication_id, user_id);
      return review;
    } catch(err) {
      return err;
    }
  };

  // POST

  function addReview(review, successCb, errorCb) {
    Review.create(review, function(err, result) {
      if (err) {errorCb(err);}
      else {successCb(result);}
    });
  };

  // PUT

  function updatePublicationReview(review, user_id, publication_id, successCb, errorCb) {
    Review.updateOne({_user_id: user_id}, {_publication_id: publication_id}, review, function(err, result) {
      if (err) {
        errorCb(err);
      }
      else {
        successCb();
      }
    });
  };

  function updateUserReview(review, publication_id, user_id, successCb, errorCb) {
    Review.updateOne({_publication_id: publication_id}, {_user_id: user_id}, review, function(err, result) {
      if(err)
      {
        errorCb(err);
      }
      else {
        successCb();
      }
    });
  };
  

  // DELETE

  function deletePublicationReview(user_id, publication_id, successCb, errorCb)
  {
    Review.deleteOne({_user_id: user_id}, {_publication_id: publication_id}, function(err, result) {
      if (err)
      {
        errorCb(err);
      }
      else {
        successCb();
      }
    });
  };

  function deleteUserReview(publication_id, user_id, successCb, errorCb)
  {
    Review.deleteOne({_publication_id: publication_id}, {_user_id:user_id}, function(err, result) {
      if(err) {
        errorCb(err);
      }
      else {
        successCb();
      }
    });
  };

  module.exports = {
    getReviewsByUser,
    getReviewsOnPublicationsByUser,
    getAllReviews,
    getReviewsByPublication,
    getUsersReviewOnPublication,
    addReview,
    updatePublicationReview,
    updateUserReview,
    deletePublicationReview,
    deleteUserReview
  };

