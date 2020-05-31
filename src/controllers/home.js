angular.module('todoApp')
  .factory('todoService', ['$resource', function ($resource) {
    return $resource('http://localhost:9191/api/todos');
  }])
  .controller('homeController', ['$scope', 'todoService', function ($scope, todoService) {
    var response = todoService.query(function () {
      console.log(response);
    });

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
  }]);
