
const Publication = require('../data/db').Publication;


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
        const publicationById = await Publication.findById(pub_id);
        return publicationById;
    } catch (err) {
        return err;
    }
};

// POST
function addPublication(publication, successCb, errorCb) {
    Publication.create(publication, function (err, result) {
        if (err) {
            errorCb(err);
        } else {
            successCb(result);
        }
    });
};

//DELETE
function deletePublication(pub_id, successCb, errorCb) {
    Publication.deleteOne({_id: pub_id}, function (err, result) {
        if (err) {
            errorCb(err);
        } else {
            successCb(result);
        }
    });
};

//PUT
function updatePublication(publication, pub_id, successCb, errorCb) {
    Publication.updateOne({_id: pub_id}, publication, function (err, result) {
        if (err) {
            errorCb(err);
        } else {
            successCb(result);
        }
    })
};

module.exports = {
    getAllPublications,
    getPublicationsById,
    addPublication,
    deletePublication,
    updatePublication
}