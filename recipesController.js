/* eslint-disable no-console */
/* eslint-disable new-cap */
/* eslint-disable no-undef */

const router = require('express').Router();

// get all
router.get('/', (req, res) => {
  const recipesCollection = db.collection('recipes');
  recipesCollection.find().toArray((error, result) => {
    if (error) {
      console.error.bind(console, 'error finding in db');
      res.json({
        status: 'error',
        errorMessage: error });
    } else if (result.length) {
      console.log('recipes found');
      res.json(result);
    } else {
      console.log('no recipes found');
      res.json({
        status: 'error',
        errorMessage: 'no recipes in db' });
    }
  });
});

// get one
router.get('/:title', (req, res) => {
  const title = req.params.title;
  const recipesCollection = db.collection('recipes');
  recipesCollection.find({ title }).toArray((err, recipe) => {
    if (err) {
      console.error.bind(console, 'error finding recipe');
    } else if (recipe.length) {
      res.json(recipe);
    } else {
      res.json({ status: 'error', errorMessage: 'no recipe found' });
    }
  });
});

// make new recipe
router.post('/new', (req, res) => {
  const newRecipe = req.body.recipe;
  const recipesCollection = db.collection('recipes');
  recipesCollection.insert(
    { title: newRecipe.title,
      author: newRecipe.author,
      difficulty: newRecipe.difficulty,
      time: newRecipe.time,
      ingredients: newRecipe.ingredients,
      instructions: newRecipe.instructions },
    (err, result) => {
      if (err) {
        console.error.bind(console, 'error inserting into db');
      } else {
        recipesCollection.find().toArray((e) => {
          if (e) {
            console.error.bind(console, 'error finding recipes');
          } else {
            res.json(result);
          }
        });
      }
    });
});

// modify recipe
router.put('/:title', (req, res) => {
  const data = req.body.recipe;
  const recipesCollection = db.collection('recipes');
  const old = { title: req.params.title };
  const newRecipe = {
    title: data.title,
    author: data.author,
    difficulty: data.difficulty,
    time: data.time,
    ingredients: data.ingredients,
    instructions: data.instructions };
  recipesCollection.update(old, { newRecipe }, (err, result) => {
    if (err) {
      res.json({ error: "couldn't update recipe" });
    } else {
      res.json(result);
    }
  });
});

router.delete('/:title', (req, res) => {
  const recipesCollection = db.collection('recipes');
  const title = req.params.title;
  recipesCollection.remove({ title }, (err) => {
    if (err) {
      console.error.bind(console, 'error deleting');
      res.json({ error: 'error deleting from db' });
    } else {
      res.json({ success: true });
    }
  });
});

module.exports = router;

/*
 delete
app.delete('/unicorns/:name', function(request, response) {
  // response.json({"description":"delete by name"});

  console.log("request.body:", request.body);
  console.log("request.params:", request.params);

  MongoClient.connect(mongoUrl, function (err, db) {
    var unicornsCollection = db.collection('unicorns');
    if (err) {
      console.log('Unable to connect to the mongoDB server. ERROR:', err);
    } else {
      // We are connected!
      console.log('Deleting by name... ');

      /* Delete
      unicornsCollection.remove(request.params, function(err, numOfRemovedDocs) {
        console.log("numOfRemovedDocs:", numOfRemovedDocs);
        if(err) {
          console.log("error!", err);
        } else { // after deletion, retrieve list of all
          unicornsCollection.find().toArray(function (err, result) {
            if (err) {
              console.log("ERROR!", err);
              response.json("error");
            } else if (result.length) {
              console.log('Found:', result);
              response.json(result);
            } else { //
              console.log('No document(s) found with defined "find" criteria');
              response.json("none found");
            }
            db.close(function() {
              console.log( "database CLOSED");
            });
          }); // end find

        } // end else
      }); // end remove

    } // end else
  }); // end mongo connect

}); // end delete

/* update
app.put('/unicorns/:name', function(request, response) {
  // response.json({"description":"update by name"});
  console.log("request.body", request.body);
  console.log("request.params:", request.params);

  var old = {name: request.body.name};
  var updateTo = {name: request.body.newName, tailColor: request.body.newTailColor}

  MongoClient.connect(mongoUrl, function (err, db) {
    var unicornsCollection = db.collection('unicorns');
    if (err) {
      console.log('Unable to connect to the mongoDB server. ERROR:', err);
    } else {
      // We are connected!
      console.log('Updating by name... ');

      /* Update
      unicornsCollection.update(old,updateTo);

      // Wait a sec then fetch the modified doc
      setTimeout(function() {
        unicornsCollection.find(updateTo).toArray(function (err, result) {
          if (err) {
            console.log("ERROR!", err);
            response.json("error");
          } else if (result.length) {
            console.log('Found:', result);
            response.json(result);
          } else { //
            console.log('No document(s) found with defined "find" criteria');
            response.json("none found");
          }
          db.close(function() {
            console.log( "database CLOSED");
          }); // end db close
        }); // end find
      }, 1000);
    } // end else
  }); // end mongo connect
}); // end update
*/
