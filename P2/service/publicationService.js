
const Publication = require('../data/db').Publication;
const Loan = require('../data/db').Loan;
const mongoose = require('mongoose');


// GET
const getAllPublications = async () => {
    try {
        const publications = await Publication.find({});
        return publications;            
    } catch (error) {
        return error;
    }
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
        publication._id = new mongoose.Types.ObjectId();
        Publication.create(publication, function (err, result) {
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
function updatePublication(publication, pub_id, auth, successCb, errorCb) {
    if (auth == "admin") {
        Publication.updateOne({_id: pub_id}, publication, function (err, result) {
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