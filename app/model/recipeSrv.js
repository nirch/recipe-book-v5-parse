
app.factory("recipeSrv", function($q, $http, userSrv) {

    // All of these variables are a hack becasue we don't have a server side
    // mianitng all the recipes in the memory
    var recipes = {};   // key is userId and value is an array of the user's recipes
    var nextRecipeId;

    // New ES6 syntax for creating a constructor
    class Recipe {
        constructor(parseRecipe) {
            this.id = parseRecipe.id;
            this.name = parseRecipe.get("name");
            this.desc = parseRecipe.get("desc");
            this.img = parseRecipe.get("image")._url;
        }
    }

    function getActiveUserRecipes() {
        var async = $q.defer();

        var recipes = [];

        // Building a query
        var RecipeParse = Parse.Object.extend('Recipe');
        var query = new Parse.Query(RecipeParse);
        query.equalTo("userId", Parse.User.current());

        // Executing the query
        query.find().then((results) => {
          console.log('Recipe found', results);
          for (let index = 0; index < results.length; index++) {
              recipes.push(new Recipe(results[index]));
          }
          async.resolve(recipes);
        }, (error) => {
          console.error('Error while fetching Recipe', error);
          async.reject(error);
        });

        return async.promise;
    }

    function addRecipe(name, desc, img) {
        var async = $q.defer();

        // Preparing the new parse recipe object to save
        var RecipeParse = Parse.Object.extend('Recipe');
        var newRecipe = new RecipeParse();
        newRecipe.set('name', name);
        newRecipe.set('desc', desc);
        newRecipe.set('image', new Parse.File(name + ".jpg", { base64: img }));
        newRecipe.set('userId', Parse.User.current());

        // Actual saving the new recipe in Parse
        newRecipe.save().then(
          function (result) {
            console.log('Recipe created', result);
            async.resolve(new Recipe(result));
          },
          function (error) {
            console.error('Error while creating Recipe: ', error);
            async.reject(error);
          }
        );

        // var activeUserId = userSrv.getActiveUser().id;

        // // Creating an object elelment to pass to the contructor
        // var plainRecipe = {
        //     "id": nextRecipeId,
        //     "name": name,
        //     "desc": desc,
        //     "img": img
        // }
        // var newRecipe = new Recipe(plainRecipe);
        // recipes[activeUserId].push(newRecipe);

        // // preparing the id for the next addition
        // ++nextRecipeId;

        // async.resolve(newRecipe);

        return async.promise;
    }

    return {
        getActiveUserRecipes: getActiveUserRecipes,
        addRecipe: addRecipe
    }



});