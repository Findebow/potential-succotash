const publicationService = require('./service/publicationService');
const recommendationService = require('./service/recommendationService');
const reviewService = require('./service/reviewService');
const userService = require('./service/userService');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

// USER ENDPOINTS

// RECOMMENDATION ENDPOINTS

// PUBLICATION ENDPOINT

// ---------- GET ----------
app.get('Publications', async function (req, res) {
    const result = await publicationService.getAllPublications();
    return res.json(result);
});

app.get('Publications/:pub_id', async function (req, res) {
    const pub_id = req.params.pub_id;
    const result = await publicationService.getPublicationsById(pub_id);
    return res.json(result);
});

// ---------- POST ----------
app.get('Publications', async function (req, res) {
    const result = await publicationService.addPublication();
    return res.json(result);
});

// ---------- DELETE ----------
app.delete("Publications/:pub_id", function(req, res) {
    const pub_id = req.params.pub_id;
    publicationService.deletePublication(pub_id,  function() {
        return res.status(204).send();
    }, function(err) {
        return res.status(400).json(err);
    });
 });

 // ---------- PUT ----------
 app.put("Publications/:pub_id", function(req, res)
{
    const publication_id = req.params.publication_id;
    const body = req.body;

    publicationService.updatePublication(body, publication_id, function() {
        return res.status(204).send();
    }, function(err) {
        return res.status(400).json(err);
    });
});


// REVIEWS ENDPOINTS

// ---------- GET ----------

app.get('users/:user_id/reviews', async function(req, res)
{
    const user_id = req.params.user_id;
    const result = await reviewService.getReviewsByUser(user_id);
    return res.json(result);
});

app.get('users/:user_id/reviews/:publication_id', async function(req, res)
{
    const user_id = req.params.user_id;
    const publication_id = req.params.publication_id;
    const result = await reviewService.getReviewsOnPublicationsByUser(user_id, publication_id);
    return res.json(result);
});

app.get('Publications/reviews', async function(req,res)
{
    const result = await reviewService.getAllReviews();
    return res.json(result);
});

app.get('Publications/:publication_id/reviews', async function(req, res)
{
    const publication_id = req.params.publication_id;
    const result = await reviewService.getReviewsByPublication(publication_id);
    return res.json(result);
});

app.get('Publications/:publication_id/reviews/user_id', async function(req, res)
{
    const publication_id = req.params.publication_id;
    const user_id = req.params.user_id;
    const result = await reviewService.getUsersReviewOnPublication(publication_id, user_id);
    return res.json(result);
});


// --------- POST ----------

app.post('users/:user_id/reviews/:publication_id', function(req, res)
{
    const publication_id = req.params.publication_id;
    const user_id = req.params.user_id;

    const review = req.body;
    review.publication_id = publication_id;
    review.user_id = user_id;
    
    reviewService.addReview(publication_id, user_id, review, (err) => {
        if (err)
        {
            return res.status(404).end();
        }
        return res.status(201).end();
    }, (status) => {
        return res.status(status).end();
    });

});


// ---------- PUT ----------

app.put("users/:user_id/reviews/:publication_id", function(req, res)
{
    const publication_id = req.params.publication_id;
    const body = req.body;

    reviewService.updatePublicationReview(body, publication_id, function() {
        return res.status(204).send();
    }, function(err) {
        return res.status(400).json(err);
    });
});

app.put("Publications/:publication_id/reviews/user_id", function(req, res)
{
    const user_id = req.params.user_id;
    const body = req.body;

    reviewService.updateUserReview(body, user_id, function() {
        return res.status(204).send();
    }, function(err) {
        return res.status(400).json(err);
    });
});

// ---------- DELETE ----------

 app.delete("users/:user_id/reviews/:publication_id", function(req, res) {
    const user_id = req.params.user_id;
    const publication_id = req.params.publication_id;
    reviewService.deletePublicationReview(user_id, publication_id, function() {
        return res.status(204).send();
    }, function(err) {
        return res.status(400).json(err);
    });
 });

 app.delete("Publications/:publication_id/reviews/user_id", function(req, res) {
    const user_id = req.params.user_id;
    const publication_id = req.params.publication_id;
    reviewService.deleteUserReview(publication_id, user_id, function() {
        return res.status(204).send();
    }, function(err) {
        return res.status(400).json(err);
    });
 });
 




// http://localhost:3000

app.listen(3000, function() {
    console.log('server is listening on http://localhost:3000');
})