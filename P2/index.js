const publicationService = require('./service/publicationService');
const recommendationService = require('./service/recommendationService');
const reviewService = require('./service/reviewService');
const userService = require('./service/userService');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');

app.use(bodyParser.json());

// USER ENDPOINTS
// ---------- GET ----------
app.get('/users', function(req, res) {
    userService.getAllUsers(function (users) {
        return res.status(200).json(users);
    }, function(err) {
        return res.status(404).json(err);
    });
});

app.get('/users/:user_id', function(req, res) {
    const userId = req.params.user_id;
    userService.getUserById(userId, function (user) {
        return res.status(200).json(user);
    }, function(err) {
        return res.status(404).json(err);
    });
});

app.get('/users/:user_id/Publications', function(req, res) {
    const userId = req.params.user_id;
    userService.getPublicationByUserId(userId, function (publications) {
        return res.status(200).json(publications);
    }, function(err) {
        return res.status(400).json(err);
    });
});

// ---------- POST ----------
app.post('/users', function(req, res) {
    userService.createUser(req.body, function(user) {
        return res.status(200).json(user);
    }, function(err) {
        return res.status(400).json(err);
    });
});

// ---------- DELETE ----------
app.delete('/users/:user_id', function(req, res) {
    const userId = req.params.user_id;
    userService.deleteUser(userId, function () {
        return res.status(200).send();
    }, function(err) {
        return res.status(404).json(err);
    });
});
// ---------- PUT ----------
app.put('/users/:user_id', function(req, res) {
    const userId = req.params.user_id;
    userService.updateUser(userId, req.body, function (user) {
        return res.status(200).json(user);
    }, function(err) {
        return res.status(404).json(err);
    });
});
// RECOMMENDATION ENDPOINTS

app.get('/users/:user_id/recommendation' , async function (req, res) {
    const user_id = req.params.user_id;
    const result = await recommendationService.getRecommendationByUser(user_id);
    return res.json(result);
});

// PUBLICATION ENDPOINT

// ---------- GET ----------
app.get('/Publications', async function (req, res) {
    await publicationService.getAllPublications(function (publications) {
        return res.status(200).json(publications);
    }, function (err) {
        return res.status(400).json(err);
    });
});

app.get('/Publications/:pub_id', async function (req, res) {
    const pub_id = req.params.pub_id;
    await publicationService.getPublicationsById(pub_id, function (publication) {
        return res.status(200).json(publication);
    }, function(err) {
        return res.status(400).json(err);
    });
});

// ---------- POST ----------
app.post('/Publications', async function (req, res) {
    const publication = req.body;
    const auth = req.query.user_type;
    publicationService.addPublication(publication, auth, function(publication) {
        return res.status(200).json(publication)
    }, function (err) {
        return res.status(400).json(err);
    });
});

// ---------- DELETE ----------
app.delete("/Publications/:pub_id", function(req, res) {
    const pub_id = req.params.pub_id;
    const auth = req.query.user_type;
    publicationService.deletePublication(pub_id, auth,  function() {
        return res.status(204).send();
    }, function(err) {
        return res.status(400).json(err);
    });
 });

 // ---------- PUT ----------
 app.put("/Publications/:pub_id", function(req, res)
{
    const publication_id = req.params.pub_id;
    publicationService.updatePublication(publication_id, req.body, function(result) {
        return res.status(200).json(result);
    }, function(err) {
        return res.status(400).json(err);
    });
});

//Loan
// ---------- POST ----------
app.post('/users/:user_id/publications/:pub_id', async function (req, res) {
    var loan = req.body;
    const auth = req.query.user_type;
    loan.userId = req.params.user_id;
    loan.publicationId = req.params.pub_id;

    //publication._id = mongoose.Types.ObjectId(publication._id);
    publicationService.addLoan(loan, auth, function() {
        return res.status(204).send();
    }, function(err) {
        return res.status(400).json(err);
    });
});

// ---------- DELETE ----------
app.delete("/users/:user_id/publications/:pub_id", function(req, res) {
    const pub_id = req.params.pub_id;
    const user_id = req.params.user_id;
    const auth = req.query.user_type;
    publicationService.deleteLoan(pub_id, user_id, auth,  function() {
        return res.status(204).send();
    }, function(err) {
        return res.status(400).json(err);
    });
 });

// REVIEWS ENDPOINTS

// ---------- GET ----------

app.get('/users/:user_id/reviews', async function(req, res)
{
    const user_id = req.params.user_id;
    await reviewService.getReviewsByUser(user_id, function (reviews) {
        return res.status(200).json(reviews);
    }, function (err) {
        return res.status(400).json(err);
    });
});

app.get('/users/:user_id/reviews/:publication_id', async function(req, res)
{
    const user_id = req.params.user_id;
    const publication_id = req.params.publication_id;
    await reviewService.getReviewsByPublicationIdAndUserId(user_id, publication_id, function(reviews) {
        return res.status(200).json(reviews);
    }, function (err) {
        return res.status(400).json(err);
    });
});

app.get('/Publications/reviews', async function(req,res)
{
    reviewService.getAllReviews(function (reviews) {
        return res.status(200).json(reviews);
    }, function(err) {
        return res.status(400).json(err);
    });
});


app.get('/Publications/:publication_id/reviews', async function(req, res)
{
    const publication_id = req.params.publication_id;
    await reviewService.getReviewsByPublication(publication_id, function (reviews) {
        return res.status(200).json(reviews);
    }, function(err) {
        return res.status(400).json(err);
    });
});

app.get('/Publications/:publication_id/reviews/:user_id', async function(req, res)
{
    const user_id = req.params.user_id;
    const publication_id = req.params.publication_id;
    await reviewService.getReviewsByPublicationIdAndUserId(user_id, publication_id, function(reviews) {
        return res.status(200).json(reviews);
    }, function (err) {
        return res.status(400).json(err);
    });
});


// --------- POST ----------

app.post('/users/:user_id/reviews/:publication_id', function(req, res)
{
    var review = req.body;
    const user_id = req.params.user_id;
    const pub_id = req.params.publication_id;
    review.userId = user_id;
    review.publicationId = pub_id;
    
    reviewService.addReview(review, function(result) {
        return res.status(200).json(result);
    }, function(err) {
        return res.status(400).json(err);
    })

});


// ---------- PUT ----------

app.put("/users/:user_id/reviews/:publication_id", function(req, res)
{
    const pub_id = req.params.publication_id;
    const user_id = req.params.user_id;

    reviewService.updateReview(req.body, user_id, pub_id, function() {
        return res.status(204).send();
    }, function(err) {
        return res.status(400).json(err);
    });
});

app.put("/Publications/:publication_id/reviews/user_id", function(req, res)
{
    const user_id = req.params.user_id;
    const pub_id = req.params.publication_id;

    reviewService.updateReview(req.body, user_id, pub_id, function() {
        return res.status(204).send();
    }, function(err) {
        return res.status(400).json(err);
    });
});

// ---------- DELETE ----------

 app.delete("/users/:user_id/reviews/:publication_id", async function(req, res) {
    const user_id = req.params.user_id;
    const publication_id = req.params.publication_id;
    reviewService.deleteReview(user_id, publication_id, function() {
        return res.status(204).send();
    }, function(err) {
        return res.status(400).json(err);
    });
 });

 app.delete("/Publications/:publication_id/reviews/user_id", function(req, res) {
    const user_id = req.params.user_id;
    const publication_id = req.params.publication_id;
    reviewService.deleteReview(user_id, publication_id, function() {
        return res.status(204).send();
    }, function(err) {
        return res.status(400).json(err);
    });
 });
 




// http://localhost:3000

app.listen(3000, function() {
    console.log('server is listening on http://localhost:3000');
});

module.exports = app;

