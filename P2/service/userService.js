const Users = require('../data/db').User;

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
    };
    
    return {
        getAllUsers,
        getUserById,
        createUser,
        deleteUser,
        updateUser
    }
}

module.exports = userService();