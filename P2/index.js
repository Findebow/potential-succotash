const publicationService = require('./service/publicationService');
const recommendationService = require('./service/recommendationService');
const reviewService = require('./service/reviewService');
const userService = require('./service/userService');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

// app.get

// app.post

app.listen(3000, function() {
    console.log('server is listening on port 3000');
})