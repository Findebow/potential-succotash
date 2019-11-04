
const Publication = require('../data/db').Publication;
const Loan = require('../data/db').Loan;
const mongoose = require('mongoose');


// GET
const getAllPublications = async (cb, errorCb) => {
        await Publication.find({}, function(err, publications) {
            if (err) {errorCb(err); }
            else {
                calculated = [];
                for(i = 0; i < publications.length; i++) {
                    if(publications[i].rating_count > 0) {
                        pub = {
                            // need to add id 
                            editor_first_name: publications[i].editor_first_name,
                            editor_last_name: publications[i].editor_last_name,
                            publication_title: publications[i].publication_title,
                            isbn: publications[i].isbn,
                            type: publications[i].type,
                            jounal: publications[i].jounal,
                            year: publications[i].year,
                            rating:  publications[i].total_rating / publications[i].rating_count
                        }
                        calculated.push(pub);
                    }
                }
                cb(calculated);
            }
        });      
};

const getPublicationsById = async pub_id => {
    try {
        var publicationById = await Publication.findById(pub_id);
        publicationById.Loans = await Loan.find({
            'publicationId': { $in: [
                mongoose.Types.ObjectId(pub_id)
            ]

            }, function (err, docs) {
                console.log(docs);
            }
        })
        return publicationById;
    } catch (err) {
        return err;
    }
};

// POST
function addPublication(publication, auth, successCb, errorCb) {
    if (auth == "admin") {
        if (publication._id == undefined) {
            publication._id = new mongoose.Types.ObjectId();
        }
        Publication.create(publication, function (err, result) {
            if (err) { errorCb(err); } 
            else { successCb(result); }
        });
    }
    else { errorCb(); }
};

//DELETE
function deletePublication(pub_id, auth, successCb, errorCb) {
    if (auth == "admin") {
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
    Publication.updateOne({"_id": pub_id}, pub, function (err, result) {
        if (err) { errorCb(err); } 
        else { successCb(result); }
    });
};

// Loan

//POST
function addLoan(loan, auth, successCb, errorCb) {
    if (auth == "admin") {
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
    if (auth == "admin") {
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
    if (auth == "admin") {
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