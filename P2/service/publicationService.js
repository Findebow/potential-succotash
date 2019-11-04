
const Publication = require('../data/db').Publication;
const Loan = require('../data/db').Loan;
const mongoose = require('mongoose');


// GET
const getAllPublications = async (cb, errorCb) => {
    // find all publications
    await Publication.find({}, function(err, publications) {
        if (err) {errorCb(err); }
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
    await Publication.find({"_id" : pub_id}, function(err, publication) {
        if (err) { errorCb(err); }
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
        publication._id = new mongoose.Types.ObjectId();
        Publication.create(publication, function (err, result) {
            if (err) { errorCb(err); } 
            else { successCb(result); }
        });
    }
    else { errorCb(); }
};

//DELETE
function deletePublication(pub_id, auth, successCb, errorCb) {
    // check if user is autorized
    if (auth == "admin") {
        // delete publication with matching id
        Publication.deleteOne({_id: pub_id}, function (err, result) {
            if (err) {
                errorCb(err);
            } else {
                successCb(result);
            }
        });    
    } else {
        errorCb();
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
            if (err) {
                errorCb(err);
            } else {
                successCb(result);
            }
        });
    }
    else {
        errorCb();
    }
};

//DELETE
function deleteLoan(pub_id, user_id, auth, successCb, errorCb) {
    // check if user is autorized
    if (auth == "admin") {
        // delete loan with matching id
        Loan.deleteOne({publicationId: pub_id, userId: user_id }, function (err, result) {
            if (err) {
                errorCb(err);
            } else {
                successCb(result);
            }
        });
    }
    else {
        errorCb();
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