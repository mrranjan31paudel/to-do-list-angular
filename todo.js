var app = angular.module('todo-app', ['ngRoute'])

  .config(function ($routeProvider) {
    $routeProvider
      .when("/", {
        templateUrl: "Templates/home.html",
        controller: "homeController"
      })
      .when("/completed", {
        templateUrl: "Templates/completed.html",
        controller: "completedController"
      })
      .when("/remaining", {
        templateUrl: "Templates/remaining.html",
        controller: "remainingController"
      })
      .when("/:id", {
        templateUrl: "Templates/details.html",
        controller: "detailsController"
      })
      .otherwise({
        templateUrl: "Templates/home.html"
      });
  })

  .run(function($rootScope){
    $rootScope.todos = [];

    $rootScope.countRemaining = function () {
      var count = 0;
      angular.forEach($rootScope.todos, function (todoItem) {
        count += todoItem.completed ? 0 : 1;
      });
      return count;
    }
  })
  
  .controller('homeController', function($scope, $rootScope) {
    $rootScope.addTodo = function () {
      if ($rootScope.todoTitle) {
        $rootScope.todos = [...$rootScope.todos, {
          id: ($rootScope.todos.length===0? 0: $rootScope.todos[$rootScope.todos.length-1].id+1),
          title: $rootScope.todoTitle,
          completed: false
        }];
        $rootScope.todoTitle = '';
      }
    }

    $rootScope.clearCompleted = function () {
      $rootScope.todos = $rootScope.todos.filter(item => item.completed === false);
    }

    $scope.changeStatus = function (todoItem) {
      todoItem.completed = !todoItem.completed;
    }

    $scope.deleteTask = function (clickedItemId) {
      $rootScope.todos = $rootScope.todos.filter(item => item.id!==clickedItemId);
    }

  })

  .controller('completedController', function($scope, $rootScope){
    $scope.todos = $rootScope.todos.filter(item => item.completed === true);

    $rootScope.addTodo = function () {
      if ($rootScope.todoTitle) {
        $rootScope.todos = [...$rootScope.todos, {
          id: ($rootScope.todos.length===0? 0: $rootScope.todos[$rootScope.todos.length-1].id+1),
          title: $rootScope.todoTitle,
          completed: false
        }];
        $rootScope.todoTitle = '';
      }
    }

    $rootScope.clearCompleted = function () {
      $rootScope.todos = $rootScope.todos.filter(item => item.completed === false);
      $scope.todos = $rootScope.todos.filter(item => item.completed === true);
    }

    $scope.changeStatus = function (todoItem) {
      todoItem.completed = !todoItem.completed;
      $scope.todos = $rootScope.todos.filter(item => item.completed===true);
    }
    
    $scope.deleteTask = function (clickedItemId) {
      $rootScope.todos = $rootScope.todos.filter(item => item.id!==clickedItemId);
      $scope.todos = $rootScope.todos.filter(item => item.completed===true);
    }

    // $scope.funcCompleted = function (){
    //   console.log('this is scope of completed controller');
    // }

  })
  
  .controller('remainingController', function($scope, $rootScope){
    $scope.todos = $rootScope.todos.filter(item => item.completed===false);

    $rootScope.addTodo = function () {
      if ($rootScope.todoTitle) {
        $rootScope.todos = [...$rootScope.todos, {
          id: ($rootScope.todos.length===0? 0: $rootScope.todos[$rootScope.todos.length-1].id+1),
          title: $rootScope.todoTitle,
          completed: false
        }];
        $scope.todos = $rootScope.todos;
        $rootScope.todoTitle = '';
      }
    }

    $rootScope.clearCompleted = function () {
      $rootScope.todos = $rootScope.todos.filter(item => item.completed === false);
      $scope.todos = $rootScope.todos.filter(item => item.completed===false);
    }

    $scope.changeStatus = function (todoItem) {
      todoItem.completed = !todoItem.completed;
      $scope.todos = $rootScope.todos.filter(item => item.completed===false);
    }

    $scope.deleteTask = function (clickedItemId) {
      $rootScope.todos = $rootScope.todos.filter(item => item.id!==clickedItemId);
      $scope.todos = $rootScope.todos.filter(item => item.completed===false);
    }
  })

  .controller('detailsController', function($scope, $routeParams, $rootScope){
    [$scope.data] = $rootScope.todos.filter(item => item.id == $routeParams.id);
  });