angular.module('todo-app')

  .controller('remainingController', function ($scope) {
    $scope.remainingTodos = $scope.$parent.todos.filter(item => item.completed === false);

    $scope.changeStatus = function (todoItem) {
      todoItem.completed = !todoItem.completed;

      $scope.updateLocalTodo();
    }

    $scope.deleteRemainingTask = function (clickedItemId) {
      $scope.deleteTask(clickedItemId);

      $scope.updateLocalTodo();
    }

    $scope.$on('stateChanged', function (e) {
      $scope.updateLocalTodo();
    });

    $scope.updateLocalTodo = function () {
      $scope.remainingTodos = $scope.todos.filter(item => item.completed === false);
    }
  });