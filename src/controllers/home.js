angular.module('todo-app')

  .controller('homeController', function ($scope) {
    $scope.allTodos = $scope.todos;

    $scope.changeStatus = function (todoItem) {
      todoItem.completed = !todoItem.completed;
    }

    $scope.deleteAnyTask = function (clickedItemId) {
      $scope.deleteTask(clickedItemId);

      $scope.updateLocalTodo();
    }

    $scope.$on('stateChanged', function (e) {
      $scope.updateLocalTodo();
    });

    $scope.updateLocalTodo = function () {
      $scope.allTodos = $scope.todos;
    }

  });