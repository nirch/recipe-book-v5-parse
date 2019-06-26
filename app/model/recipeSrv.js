
app.factory("recipeSrv", function($q, $http, userSrv) {

    // All of these variables are a hack becasue we don't have a server side
    // mianitng all the recipes in the memory
    var recipes = {};   // key is userId and value is an array of the user's recipes
    var nextRecipeId;

    // New ES6 syntax for creating a constructor
    class Recipe {
        constructor(plainRecipe) {
            this.id = plainRecipe.id;
            this.name = plainRecipe.name;
            this.desc = plainRecipe.desc;
            this.img = plainRecipe.img;
        }
    }

    function getActiveUserRecipes() {
        var async = $q.defer();

        var activeUserId = userSrv.getActiveUser().id;

        if (recipes[activeUserId]) {
            async.resolve(recipes[activeUserId]);
        } else {
            recipes[activeUserId] = []; // inserting an empty array to the user key in the object
            $http.get("app/model/data/recipes.json").then(function(res) {

                for (var i = 0; i < res.data.length; i++) {
                    if (res.data[i].userId === activeUserId) {
                        recipes[activeUserId].push(new Recipe(res.data[i]));
                    }
                }

                nextRecipeId = res.data.length;
                async.resolve(recipes[activeUserId]);
            }, function(err) {
                // setting the recipes for the active user to undefined since
                // we got an error and we want the next call to getActiveUserRecipes to try again
                recipes[activeUserId] = undefined;
                async.reject(err);
            });
        }

        return async.promise;
    }

    function addRecipe(name, desc, img) {
        var async = $q.defer();

        var activeUserId = userSrv.getActiveUser().id;

        // Creating an object elelment to pass to the contructor
        var plainRecipe = {
            "id": nextRecipeId,
            "name": name,
            "desc": desc,
            "img": img
        }
        var newRecipe = new Recipe(plainRecipe);
        recipes[activeUserId].push(newRecipe);

        // preparing the id for the next addition
        ++nextRecipeId;

        async.resolve(newRecipe);

        return async.promise;
    }

    return {
        getActiveUserRecipes: getActiveUserRecipes,
        addRecipe: addRecipe
    }



});