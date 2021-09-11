angular.module('todoApp')
  .factory('todoService', ['$resource', function ($resource) {
    return $resource('http://localhost:9191/api/todos');
  }])
  .constant('statusValue', {
    NOT_STARTED: 'Not started',
    IN_PROGRESS: 'In progress',
    COMPLETED: 'Completed'
  })
  .constant('statusColor', {
    NOT_STARTED: 'red',
    IN_PROGRESS: 'orange',
    COMPLETED: 'green'
  })
  .constant('statusNumber', {
    NOT_STARTED: 0,
    IN_PROGRESS: 1,
    COMPLETED: 2
  })
  .controller('homeController',
    ['$scope', '$route', 'todoService', 'statusValue', 'statusColor', 'statusNumber',
      function ($scope, $route, todoService, statusValue, statusColor, statusNumber) {

        $scope.fetchTodos = function (queryParam = {}) {
          var response = todoService.get(queryParam);

          response.$promise
            .then(function (response) {
              $scope.allTodos = response.data;
              $scope.allTodos.forEach(todo => {
                todo.statusStyle = {
                  backgroundColor: statusColor[todo.status],
                  borderRadius: '5px'
                };
                todo.statusValue = statusValue[todo.status];
                todo.statusNumber = statusNumber[todo.status];
              });
            })
            .catch(function (err) {
              console.log(err);
            });
        }

        var currentRouteParam = $route.current.params;

        $scope.fetchTodos(currentRouteParam);

        $scope.changeStatus = function (todoItem) {
          todoItem.completed = !todoItem.completed;
        }

        $scope.deleteAnyTask = function (clickedItemId) {
          $scope.deleteTask(clickedItemId);

          $scope.updateLocalTodo();
        }

        $scope.$on('statusChanged', function (e) {
          var selectedIndex = e.targetScope.selectedStatus;
          var selectedStatus = e.targetScope.selectOptions[selectedIndex].value;
          var queryParam = selectedStatus ? { status: selectedStatus } : {};

          $scope.fetchTodos(queryParam);
        });

        $scope.updateLocalTodo = function () {
        }
      }]);
