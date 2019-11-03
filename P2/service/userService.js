const Users = require('../data/db').User;
const Loan = require('../data/db').Loan;
const publicationService = require('./publicationService');

const userService = () => {
    const getAllUsers = (cb, errorCb) => {
        Users.find({}, function(err, users) {
            if (err) { errorCb(err); }
            else { cb(users); }
        });
    };

    const getUserById = (userId, cb, errorCb) => {
        Users.findById(userId, function(err, user) {
            if (err) { errorCb(err); }
            else { cb(user); }
        });
    };

    const createUser = (user, cb, errorCb) => {
        Users.create(user, function(err, result) {
            if (err) { errorCb(err); }
            else { cb(result)}
        });
    };

    const deleteUser = (userId, cb, errorCb) => {
        Users.deleteOne( {"_id" : userId}, function(err, result) {
            if (err) { errorCb(err); }
            else { cb(result)}
        });
    };

    const updateUser = (userId, user, cb, errorCb) => {
        Users.updateOne({"_id" : userId}, user, function(err, result) {
            if (err) { errorCb(err); }
            else { cb(result)}
        });
    }

    const getPublicationByUserId = async (userId, cb, errorCb) => {
        Loan.find({"userId" : userId}, async function(err, loan) {
            if (err) { errorCb(err); }
            else {
                var publication_list = []
                for(i = 0; i < loan.length; i++) {
                    publication = await publicationService.getPublicationsById(loan[i].publicationId);
                    publication_list.push(publication);
                }
                cb(publication_list);
            }
        });
    };
    
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