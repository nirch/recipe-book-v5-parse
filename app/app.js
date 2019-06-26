
var app = angular.module("recipeBookApp", ["ngRoute", "ngImageInputWithPreview"]);

app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl: "app/home/home.html"
    }).when("/login", {
        templateUrl: "app/login/login.html",
        controller: "loginCtrl"
    }).when("/signup", {
        
    }).when("/recipes", {
        templateUrl: "app/recipes/recipes.html",
        controller: "recipesCtrl"        
    }).when("/new", {
        
    })
})