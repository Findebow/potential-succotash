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
    // check if review already exists
    rev = await Review.find({"userId" : review.userId, "publicationId" : review.publicationId});
    if (rev != null) {
      //update existing review
      updateReview(review, review.userId, review.publicationId, function() {
        successCb("Updated existing review");
      }, function(err) { errorCb(err); }
      );
    }
    else {
      //update publication rating
      pub = await publicationService.getPublicationsById(review.publicationId);
      pub.total_rating += review.rating;
      pub.rating_count ++;
      publicationService.updatePublication(review.publicationId, pub, function() {
      }, function (err) {
        errorCb(err);
      });
      // create new review
      Review.create(review, function(err, result) {
        if (err) {errorCb(err);}
        else {successCb(result);}
      });
    }
  };

  // PUT

  const updateReview = async (review, user_id, pub_id, successCb, errorCb) => {
    // get review
    rev = await Review.find({"userId" : user_id, "publicationId" : pub_id});

    // get publication
    pub = await publicationService.getPublicationsById(pub_id);

    // minus rating
    pub.total_rating -= rev[0].rating;

    // add new rating
    pub.total_rating += review.rating;
    
    // update publication
    publicationService.updatePublication(pub_id, pub, function(placeholder) {
      successCb(placeholder)
    }, function (err) {
      errorCb(err);
    });

    // update review
    Review.updateOne({"userId" : user_id, "publicationId" : pub_id}, review, function(err, result) {
      if (err) { errorCb(err); }
      else { successCb(result); }
    });
  };

  // DELETE

  const deleteReview = async (user_id, pub_id, successCb, errorCb) => {
    // get publication
    pub = await publicationService.getPublicationsById(pub_id);

    // get review
    rev = await Review.find({"userId" : user_id, "publicationId" : pub_id});

    // minus rating 
    pub.total_rating -= rev[0].rating;
    
    // lower rating count
    pub.rating_count --;

    // update publication
    publicationService.updatePublication(pub_id, pub, function(placeholder) {
      successCb(placeholder)
    }, function (err) {
      errorCb(err);
    });

    // remove review
    Review.deleteOne({"userId" : user_id, "publicationId" : pub_id}, function(err, result) {
      if (err) { errorCb(err); }
      else { successCb(result); }
    });
  };

  module.exports = {
    getReviewsByUser,
    getAllReviews,
    getReviewsByPublication,
    getReviewsByPublicationIdAndUserId,
    addReview,
    updateReview,
    deleteReview
  };

