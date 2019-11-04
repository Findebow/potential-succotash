
const Publication = require('../data/db').Publication;
const reviewService = require('./reviewService');
const Loan = require('../data/db').Loan;
const mongoose = require('mongoose');


// GET
const getAllPublications = async (cb, errorCb) => {
    // find all publications
    await Publication.find({}, function(err, publications) {
        if (err) {errorCb(err); }
        else if(publications == "") {errorCb("publication not found"); }
        else {
            calculated = [];
            // move publications into view model and calculate rating
            for(i = 0; i < publications.length; i++) {
                // if there is a rating
                if(publications[i].rating_count > 0) {
                    pub = {
                        editor_first_name: publications[i].editor_first_name,
                        editor_last_name: publications[i].editor_last_name,
                        publication_title: publications[i].publication_title,
                        isbn: publications[i].isbn,
                        type: publications[i].type,
                        jounal: publications[i].jounal,
                        year: publications[i].year,
                        rating:  publications[i].total_rating / publications[i].rating_count
                    }
                    calculated.push(pub)
                }
                // if there is no rating
                else {
                    pub = {
                        editor_first_name: publications[i].editor_first_name,
                        editor_last_name: publications[i].editor_last_name,
                        publication_title: publications[i].publication_title,
                        isbn: publications[i].isbn,
                        type: publications[i].type,
                        jounal: publications[i].jounal,
                        year: publications[i].year,
                        rating: "No rating"
                    }
                    calculated.push(pub)
                }
            }
            cb(calculated);
        }
    });      
};

const getPublicationsById = async (pub_id, cb, errorCb) => {
    // find publication with matching id
    await Publication.find({_id : pub_id}, function(err, publication) {
        if (err) { errorCb(err); }
        else if(publication == "") {errorCb("publication not found"); }
        else {
            // if there is a rating
            if(publication[0].rating_count > 0) {
                pub = {
                    editor_first_name: publication[0].editor_first_name,
                    editor_last_name: publication[0].editor_last_name,
                    publication_title: publication[0].publication_title,
                    isbn: publication[0].isbn,
                    type: publication[0].type,
                    jounal: publication[0].jounal,
                    year: publication[0].year,
                    rating:  publication[0].total_rating / publication[0].rating_count
                }
            }
            // if there is no rating
            else {
                pub = {
                    editor_first_name: publication[0].editor_first_name,
                    editor_last_name: publication[0].editor_last_name,
                    publication_title: publication[0].publication_title,
                    isbn: publication[0].isbn,
                    type: publication[0].type,
                    jounal: publication[0].jounal,
                    year: publication[0].year,
                    rating: "No rating"
                }
            }
            cb(pub);
        }
    });
};

// POST
function addPublication(publication, auth, successCb, errorCb) {
    // check if user is authorized
    if (auth == "admin") {
      
        // create new publication
        publication.total_rating = 0;
        publication.rating_count = 0;
        if (publication._id == undefined) {
            publication._id = new mongoose.Types.ObjectId();
        }

        Publication.create(publication, function (err, result) {
            if (err) { errorCb(err); } 
            else { successCb(result); }
        });
    }
    else { errorCb("access denied"); }
};

//DELETE
const deletePublication = async (pub_id, auth, successCb, errorCb) => {
    // check if user is autorized
    if (auth == "admin") {
        // delete reviews for publication
        await reviewService.getReviewsByPublication(pub_id, async function(reviews) {
            for(i = 0; i < reviews.length; i++) {
                await reviewService.deleteReview(reviews[i].userId, reviews[i].publicationId, function() {
                }, function(err) { errorCb(err); })
            }
        }, function(err) { errorCb(err); })
        // delete loans for publication
        Loan.find({"publicationId" : pub_id}, async function(err, loan) {
            if(err) {errorCb(err); }
            else {
                for(i = 0; i < loan.length; i++) {
                    deleteLoan(pub_id, loan[i].userId, "admin", function() {
                    }, function(err) { errorCb(err); });
                }
            }
        });

        // delete publication with matching id
        Publication.deleteOne({_id: pub_id}, function (err, result) {
            if (err) {
                errorCb(err);
            } else {
                successCb(result);
            }
        });    
    } else {
        errorCb("access denied");
    }
    
};

//PUT
const updatePublication = (pub_id, pub, successCb, errorCb) => {
    // update publication with matching id
    Publication.updateOne({"_id": pub_id}, pub, function (err, result) {
        if (err) { errorCb(err); } 
        else { successCb(result); }
    });
};

// Loan

//POST
function addLoan(loan, auth, successCb, errorCb) {
    // check if user is autorized
    if (auth == "admin") {
        // create new loan
        loan._id = new mongoose.Types.ObjectId();
        Loan.create(loan, function (err, result) {
            if (err) { errorCb(err); } 
            else { successCb(result); }
        });
    }
    else {
        errorCb("access denied");
    }
};

//DELETE
function deleteLoan(pub_id, user_id, auth, successCb, errorCb) {
    // check if user is autorized
    if (auth == "admin") {
        // delete loan with matching id
        Loan.deleteOne({publicationId: pub_id, userId: user_id }, function (err, result) {
            if (err) { errorCb(err); } 
            else { successCb(result);}
        });
    }
    else {
        errorCb("access denied");
    }
};

//PUT
function updateLoan(loan, pub_id, auth, successCb, errorCb) {
    // check if user is autorized
    if (auth == "admin") {
        // update loan with matching id
        Loan.updateOne({_id: pub_id, }, loan, function (err, result) {
            if (err) {
                errorCb(err);
            } else {
                successCb(result);
            }
        })
    } else {
        errorCb();
    }

    
};

module.exports = {
    getAllPublications,
    getPublicationsById,
    addPublication,
    deletePublication,
    updatePublication,
    addLoan,
    deleteLoan,
    updateLoan
}