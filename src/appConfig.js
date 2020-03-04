angular.module('todo-app', ['ngRoute'])

  .config(function ($routeProvider) {
    $routeProvider
      .when("/", {
        templateUrl: "./src/views/home.html",
        controller: "homeController"
      })
      .when("/completed", {
        templateUrl: "./src/views/completed.html",
        controller: "completedController"
      })
      .when("/remaining", {
        templateUrl: "./src/views/remaining.html",
        controller: "remainingController"
      })
      .when("/:id", {
        templateUrl: "./src/views/details.html",
        controller: "detailsController"
      })
      .otherwise({
        templateUrl: "./src/views/home.html"
      });
  });