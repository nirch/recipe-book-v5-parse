
app.controller("newRecipeCtrl", function($scope, recipeSrv, $log, $uibModalInstance) {

    $scope.name = "";
    $scope.desc = "";
    $scope.img = {};

    $scope.addRecipe = function() {
       recipeSrv.addRecipe($scope.name, $scope.desc, $scope.img.src).then(function(newRecipe) {
            $log.info("new recipe added: " + JSON.stringify(newRecipe));

            // Throwing an event for the recipeCtrl that a new recipe was added
            // $scope.$emit("recipeAdded");

            // Closing the modal
            $uibModalInstance.close(newRecipe);
       });
    }

    $scope.cancelNewRecipe = function() {
        $scope.name = "";
        $scope.desc = "";
        $scope.img = {}; 
        $uibModalInstance.dismiss();
    }


})