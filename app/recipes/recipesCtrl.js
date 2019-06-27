
app.controller("recipesCtrl", function($scope, userSrv, $location, recipeSrv, $uibModal) {

    if (!userSrv.isLoggedIn()) {
        $location.path("/");
        return;
    }

    $scope.user = userSrv.getActiveUser();

    recipeSrv.getActiveUserRecipes().then(function(recipes) {
        $scope.recipes = recipes;
    });
   
    // Handling an event that a new recipe was added => fetching all the recipes
    // $scope.$on("recipeAdded", function() {
    //     recipeSrv.getActiveUserRecipes().then(function(recipes) {
    //         $scope.recipes = recipes;
    //     });    
    // });

    // function for opening the modal using UI Bootstrap
    $scope.openNewRecipeModal = function() {
        var modalInstance = $uibModal.open({
            templateUrl: "app/recipes/newRecipe.html",
            controller: "newRecipeCtrl"
        });

        modalInstance.result.then(function(newRecipe) {
            // this will wake in case the user added a new recipe
            $scope.recipes.push(newRecipe);
        }, function() {
            // this will wake up in case the user canceled the new recipe
            console.log("user canceled new recipe");
        })
    }

})