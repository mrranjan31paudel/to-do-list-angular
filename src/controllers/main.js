angular.module('todo-app')

  .controller('MainController', function ($scope) {
    $scope.todos = [];
    $scope.currentRoute = 'home';

    $scope.changeRoute = function (newRoute) {
      $scope.currentRoute = newRoute;
    }

    $scope.countRemaining = function () {
      var count = 0;
      angular.forEach($scope.todos, function (todoItem) {
        count += todoItem.completed ? 0 : 1;
      });

      return count;
    }

    $scope.checkCompletionOfAll = function () {
      if ($scope.countRemaining() === 0) {
        return true;
      }
      else {
        return false;
      }
    }

    $scope.addTodo = function () {
      if ($scope.todoTitle) {
        $scope.todos = [...$scope.todos, {
          id: ($scope.todos.length === 0 ? 0 : $scope.todos[$scope.todos.length - 1].id + 1),
          title: $scope.todoTitle,
          completed: false
        }];
        $scope.todoTitle = '';

        $scope.broadCastChange();
      }
    }

    $scope.clearCompleted = function () {
      $scope.todos = $scope.todos.filter(item => item.completed === false);

      $scope.broadCastChange();
    }

    $scope.deleteTask = function (clickedItemId) {
      $scope.todos = $scope.todos.filter(item => item.id !== clickedItemId);
    }

    $scope.broadCastChange = function () {
      $scope.$broadcast('stateChanged');
    }
  });