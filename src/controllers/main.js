angular.module('todoApp')

  .controller('MainController', ['$scope', '$route', function ($scope, $route) {
    $scope.ellipseClass = {
      NOT_STARTED: 'not-started',
      IN_PROGRESS: 'in-progress',
      COMPLETED: 'completed',
      TOTAL: 'total'
    }
    $scope.ellipseLabel = {
      NOT_STARTED: 'Not Started',
      IN_PROGRESS: 'In Progress',
      COMPLETED: 'Completed',
      TOTAL: 'Total'
    }
    $scope.statusCounts = [
      { status: 'NOT_STARTED', count: 1 },
      { status: 'IN_PROGRESS', count: 2 },
      { status: 'COMPLETED', count: 3 },
      { status: 'TOTAL', count: 6 }
    ]

    $scope.selectOptions = [
      { value: '', label: 'All' },
      { value: 'NOT_STARTED', label: 'Not Started' },
      { value: 'IN_PROGRESS', label: 'In Progress' },
      { value: 'COMPLETED', label: 'Completed' }
    ];
    $scope.selectedStatus = 0;
    $scope.isSelectMenuOpen = false;

    $scope.todos = [];
    var currentUrlHash = window.location.hash.replace('#!/', '');

    $scope.currentRoute = currentUrlHash === '' ? 'home' : currentUrlHash;
    $scope.areAllCompleted = true;
    $scope.areAllRemaining = false;

    $scope.changeRoute = function (newRoute) {
      $scope.currentRoute = newRoute;
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
      $scope.$broadcast('statusChanged');
    }

    $scope.toggelDropdown = function () {
      $scope.isSelectMenuOpen = !$scope.isSelectMenuOpen;
    }

    $scope.handleStatusOptionClick = function (index) {
      $scope.selectedStatus = index;
      var queryParams = $scope.selectOptions[index].value ? { status: $scope.selectOptions[index].value } : '';
      $route.updateParams(queryParams);

      $scope.broadCastChange();
    }
  }]);