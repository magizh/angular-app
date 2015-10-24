angular.module('todoApp', [])
    .controller('TodoController', ['$scope', function($scope) {
      $scope.todo = "";
        $scope.todos = ["eat well", "have a beer"];
        $scope.addTodo = function () {
          $scope.todos.push($scope.todo);
          $scope.todo = "";
        };
    }]);
