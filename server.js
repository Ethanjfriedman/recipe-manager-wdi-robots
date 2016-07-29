/* eslint-disable no-console */
/* eslint-disable no-undef */

const PORT = process.env.PORT || 3000;
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongodb = require('mongodb');
const app = express();
const morgan = require('morgan');
const recipesController = require('./recipesController.js');
const MongoClient = mongodb.MongoClient;
const mongoUrl = process.env.MONGODB_URI || 'mongodb://localhost:27017/recipes-db';

// middleware
app.use(cors());
app.use(morgan('combined'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// router
app.use('/api/v1/recipes', recipesController);

// info page
app.get('/', (request, response) => {
  response.json({
    description: 'recipe collection api',
    routes: {
      viewAll: 'GET /api/v1/recipes',
      viewOne: 'GET /api/v1/recipes/:title',
      makeNew: 'POST /api/v1/recipes/new (put new recipe in "recipe" object in request body)',
      editOne: 'PUT /api/v1/recipes/:title (put updated recipe in "recipe" object' +
       ' in request body -- ALL fields must be present, even ones that are not being changed)',
      deleteOne: 'DELETE /api/v1/recipes/:title',
      viewInfo: 'GET /' },
    apiInfo: {
      author: 'ethan friedmam',
      url: 'TBD',
      createdOn: 'July 29, 2016',
      githubRepo: 'TB' },
  });
});

/* tell our app where to listen */
MongoClient.connect(mongoUrl, (err, data) => {
  if (err) {
    console.error.bind(console, 'error connecting to db');
  } else {
    db = data;
    app.listen(PORT, (e) => {
      if (e) {
        console.error.bind(console, 'error starting to listen');
      } else {
        console.error('server is up and listening on port', PORT);
      }
    });
  }
});
