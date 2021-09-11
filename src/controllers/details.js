angular.module('todoApp')
  .factory('todoService', ['$resource', function ($resource) {
    return $resource('http://localhost:9191/api/todos/:id');
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
  .controller('detailsController',
    ['$scope', '$routeParams', 'todoService', 'statusValue', 'statusColor',
      function ($scope, $routeParams, todoService, statusValue, statusColor) {
        var response = todoService.get({ id: $routeParams.id });
        $scope.data = {};
        response.$promise
          .then(function (response) {
            var { data } = response;
            var [_C, monthC, dayC, yearC, timeC] = new Date(data.createdAt).toString().split(' ');
            var [_U, monthU, dayU, yearU, timeU] = new Date(data.updatedAt).toString().split(' ');

            $scope.data = {
              id: data.id,
              title: data.title,
              description: data.description,
              status: {
                value: statusValue[data.status],
                color: {
                  color: statusColor[data.status]
                }
              },
              createdAt: monthC + ' ' + dayC + ', ' + yearC + ' at ' + timeC.slice(0, 5),
              updatedAt: monthU + ' ' + dayU + ', ' + yearU + ' at ' + timeU.slice(0, 5)
            }
          })
          .catch(function (err) {
            console.log(err);
          });
      }]);