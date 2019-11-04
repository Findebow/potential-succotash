const Review = require('../data/db').Review;
const Publication = require('../data/db').Publication;

const reviewService = () => {
// GET
  const getReviewsByUser = async (user_id, cb, errorCb) => {
    // find all reviews with matching user id
    Review.find({"userId" : user_id} , async function(err, reviews) {
      if (err) {errorCb(err); }
      else { cb(reviews); }
    });
  };
  

  const getReviewsByPublicationIdAndUserId = async (user_id, pub_id, cb, errorCb) => {
    // find all revews with matching publication and user ids
    Review.find({"userId" : user_id, "publicationId" : pub_id}, async function(err, reviews) {
      if (err) {errorCb(err); }
      else { cb(reviews); }
    });
  };


  const getAllReviews = (cb, errorCb) => {
    // find all reviews
    Review.find({}, function(reviews) {
      if (err) {errorCb(err); }
      else { cb(reviews); }
    });
  };
  

  const getReviewsByPublication = async (pub_id, cb, errorCb) => {
    // find all reviews with matching publication id
    Review.find({"publicationId": pub_id}, async function(err, reviews) {
      if (err) {errorCb(err); }
      else { cb(reviews); }
      });
  };

  // POST

  const addReview = async (review, successCb, errorCb) => {
    // check if review already exists
    rev = await Review.find({"userId" : review.userId, "publicationId" : review.publicationId});
    if (rev != "") {
      //update existing review
      updateReview(review, review.userId, review.publicationId, function() {
        successCb("Updated existing review");
      }, function(err) { errorCb(err); }
      );
    }
    else {
      // get publication
      pub = await Publication.find({"_id": review.publicationId});

      // edit publication
      pub[0].total_rating += review.rating;
      pub[0].rating_count ++;

      // update publication
      await Publication.updateOne({"_id": review.publicationId}, pub[0], function (err, result) {
        if (err) { errorCb(err); } 
        else { }
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
    pub = await Publication.find({"_id": pub_id});

    // edit publication
    pub[0].total_rating -= rev[0].rating;
    pub[0].total_rating += review.rating;

    // update publication
    await Publication.updateOne({"_id": pub_id}, pub[0], function (err, result) {
      if (err) { errorCb(err); } 
      else { }
    });
    

    // update review
    Review.updateOne({"userId" : user_id, "publicationId" : pub_id}, review, function(err, result) {
      if (err) { errorCb(err); }
      else { successCb(result); }
    });
  };

  // DELETE

  const deleteReview = async (user_id, pub_id, successCb, errorCb) => {
    // get review
    rev = await Review.find({"userId" : user_id, "publicationId" : pub_id});

    // get publication
    pub = await Publication.find({"_id": pub_id});

    // edit publication
    pub[0].total_rating -= rev[0].rating;
    pub[0].rating_count --;

    // update publication
    await Publication.updateOne({"_id": pub_id}, pub[0], function (err, result) {
      if (err) { errorCb(err); } 
      else { }
    });

    // remove review
    Review.deleteOne({"userId" : user_id, "publicationId" : pub_id}, function(err, result) {
      if (err) { errorCb(err); }
      else { successCb(result); }
    });
  };

  return {
    getReviewsByUser,
    getAllReviews,
    getReviewsByPublication,
    getReviewsByPublicationIdAndUserId,
    addReview,
    updateReview,
    deleteReview
  }
}

module.exports = reviewService();

