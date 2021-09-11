angular.module('todoApp', ['ngRoute', 'ngResource'])

  .config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .when("/", {
        templateUrl: "./src/views/home.html",
        controller: "homeController"
      })
      .when("/:id", {
        templateUrl: "./src/views/details.html",
        controller: "detailsController"
      })
      .otherwise({
        templateUrl: "./src/views/home.html"
      });

    $locationProvider
      .html5Mode(true)
      .hashPrefix('*');
  });
