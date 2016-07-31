/* eslint-disable no-console */
/* eslint-disable no-undef */

// GLOBAL VARS
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
const infoObj = require('./info.js');

// middleware
app.use(cors());
app.use(morgan('combined'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// router -- ALL ROUTES STARTING WITH /api/v1/recipes
// get routed to './recipesController' to use!
app.use('/api/v1/recipes', recipesController);

// info page
app.get('/', (request, response) => {
  response.json(infoObj);
});

/* tell our app where to listen */
MongoClient.connect(mongoUrl, (err, data) => {
  if (err) {
    console.error.bind(console, 'error connecting to db');
  } else {
    db = data; // must be a global so it can be accessed in recipesController.js
    app.listen(PORT, e => {
      if (e) {
        console.error.bind(console, 'error starting to listen');
      } else {
        console.error('server is up and listening on port', PORT);
      }
    });
  }
});
