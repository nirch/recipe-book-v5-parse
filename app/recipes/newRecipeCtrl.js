
app.controller("newRecipeCtrl", function($scope, recipeSrv, $log) {

    $scope.name = "";
    $scope.desc = "";
    $scope.img = {};

    $scope.addRecipe = function() {
       recipeSrv.addRecipe($scope.name, $scope.desc, $scope.img.src).then(function(newRecipe) {
            $log.info("new recipe added: " + JSON.stringify(newRecipe));
            $("#modelId").modal('hide')
       });
    }

    $scope.cancelNewRecipe = function() {
        $scope.name = "";
        $scope.desc = "";
        $scope.img = {}; 
        $("#modelId").modal('hide')
    }


})