// info object to be returned on GET request to '/'.

module.exports = {
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
    url: 'https://mighty-stream-47210.herokuapp.com',
    createdOn: 'July 29, 2016',
    githubRepo: 'https://github.com/Ethanjfriedman/recipe-manager-wdi-robots.git' },
};
