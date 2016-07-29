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
