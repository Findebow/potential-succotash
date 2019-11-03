const publicationService = require('./publicationService');
const Review = require('../data/db').Review;
  

// GET

  const getReviewsByUser = async (user_id, cb, errorCb) => {
    Review.find({"userId" : user_id} , async function(err, reviews) {
      if (err) {errorCb(err); }
      else { cb(reviews); }
    });
  };
  

  const getReviewsByPublicationIdAndUserId = async (user_id, pub_id, cb, errorCb) => {
    Review.find({"userId" : user_id, "publicationId" : pub_id}, async function(err, reviews) {
      if (err) {errorCb(err); }
      else { cb(reviews); }
    });
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

  // POST

  const addReview = async (review, successCb, errorCb) => {
    // update puplication rating
    pub = await publicationService.getPublicationsById(review.publicationId);
    pub.total_rating += review.rating;
    pub.rating_count ++;
    console.log(pub);
    publicationService.updatePublication(review.publicationId, pub, function(updatedPub) {
      console.log(updatedPub);
    }, function (err) {
      errorCb(err);
    });
    // create new review
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
    getAllReviews,
    getReviewsByPublication,
    getReviewsByPublicationIdAndUserId,
    addReview,
    updatePublicationReview,
    updateUserReview,
    deletePublicationReview,
    deleteUserReview
  };

