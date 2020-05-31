angular.module('todoApp')

  .controller('MainController', ['$scope', function ($scope) {
    $scope.todos = [];
    const currentUrlHash = window.location.hash.replace('#!/', '');

    $scope.currentRoute = currentUrlHash === '' ? 'home' : currentUrlHash;
    $scope.areAllCompleted = true;
    $scope.areAllRemaining = false;

    $scope.changeRoute = function (newRoute) {
      $scope.currentRoute = newRoute;
    }

    $scope.countCompleted = function () {
      var count = 0;

      angular.forEach($scope.todos, function (todoItem) {
        count += todoItem.completed ? 1 : 0;
      });
      if (count === $scope.todos.length) {
        $scope.areAllCompleted = true;
      }
      else {
        $scope.areAllCompleted = false;
      }
      if (count === 0) {
        $scope.areAllRemaining = true;
      }
      else {
        $scope.areAllRemaining = false;
      }

      return count;
    }

    $scope.markAllAs = function (event) {
      event.preventDefault();

      if (event.target.id === 'mark-all-completed' && !$scope.areAllCompleted) {
        $scope.todos.forEach(task => {
          if (!task.completed) {
            task.completed = true;
          }
        });

        $scope.broadCastChange();
      }
      else if (event.target.id === 'mark-all-remaining' && !$scope.areAllRemaining) {
        $scope.todos.forEach(task => {
          if (task.completed) {
            task.completed = false;
          }
        });

        $scope.broadCastChange();
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
  }]);