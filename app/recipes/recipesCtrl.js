
app.controller("recipesCtrl", function($scope, userSrv, $location, recipeSrv) {

    if (!userSrv.isLoggedIn()) {
        $location.path("/");
        return;
    }

    $scope.user = userSrv.getActiveUser();

    recipeSrv.getActiveUserRecipes().then(function(recipes) {
        $scope.recipes = recipes;
    });
   
    // Handling an event that a new recipe was added => fetching all the recipes
    $scope.$on("recipeAdded", function() {
        recipeSrv.getActiveUserRecipes().then(function(recipes) {
            $scope.recipes = recipes;
        });    
    })

})