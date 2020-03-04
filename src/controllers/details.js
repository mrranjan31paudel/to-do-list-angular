angular.module('todo-app')

  .controller('detailsController', function ($scope, $routeParams) {
    [$scope.data] = $scope.$parent.todos.filter(item => item.id == $routeParams.id);
  });