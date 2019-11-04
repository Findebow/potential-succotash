const Users = require('../data/db').User;
const Loan = require('../data/db').Loan;
const publicationService = require('./publicationService');

const userService = () => {
// GET
    const getAllUsers = (cb, errorCb) => {
        // find all users
        Users.find({}, function(err, users) {
            if (err) { errorCb(err); }
            else { cb(users); }
        });
    };

    const getUserById = (userId, cb, errorCb) => {
        // find user with mathing id
        Users.findById(userId, function(err, user) {
            if (err) { errorCb(err); }
            else { cb(user); }
        });
    };

    const getPublicationByUserId = async (userId, cb, errorCb) => {
        // find all loans with matching user id
        Loan.find({"userId" : userId}, async function(err, loan) {
            if (err) { errorCb(err); }
            else if(loan == "") {errorCb("no loans found for user"); }
            else {
                // find all publications mathcing publication ids
                var publication_list = [];
                for(i = 0; i < loan.length; i++) {
                    // get publication
                    publication = await publicationService.getPublicationsById(loan[i].publicationId, function(found) {
                        publication_list.push(found);
                    }, function(err) { errorCb(err); });
                }
                cb(publication_list);
            }
        });
    };

// POST
    const createUser = (user, cb, errorCb) => {
        // create new user
        Users.create(user, function(err, result) {
            if (err) { errorCb(err); }
            else { cb(result)}
        });
    };

// DELETE
    const deleteUser = async (userId, cb, errorCb) => {
        // error if user still has loan

        // delete user with matching id
        Users.deleteOne( {"_id" : userId}, function(err, result) {
            if (err) { errorCb(err); }
            else { cb(result)}
        });
    };

// PUT
    const updateUser = (userId, user, cb, errorCb) => {
        // update user with matching id
        Users.updateOne({"_id" : userId}, user, function(err, result) {
            if (err) { errorCb(err); }
            else { cb(result)}
        });
    }

    return {
        getAllUsers,
        getUserById,
        createUser,
        deleteUser,
        updateUser,
        getPublicationByUserId
    }
}

module.exports = userService();