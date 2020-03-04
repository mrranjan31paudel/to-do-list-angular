angular.module('todo-app')

  .controller('completedController', function ($scope) {
    $scope.completedTodos = $scope.todos.filter(item => item.completed === true);

    $scope.changeStatus = function (todoItem) {
      todoItem.completed = !todoItem.completed;

      $scope.updateLocalTodo();
    }

    $scope.deleteCompletedTask = function (clickedItemId) {
      $scope.deleteTask(clickedItemId);

      $scope.updateLocalTodo();
    }

    $scope.$on('stateChanged', function (e) {
      $scope.updateLocalTodo();
    });

    $scope.updateLocalTodo = function () {
      $scope.completedTodos = $scope.todos.filter(item => item.completed === true);
    }
  });