angular.module('todoApp', [])
   .controller('TodoController', ['$scope', 'TodoService',
      function($scope, TodoService) {
         $scope.todo = "";
         $scope.todos = TodoService.getTodos();
         $scope.addTodo = function () {
            TodoService.addTodo($scope.todo);
            $scope.todo = "";
         };
      }])

   .service('TodoService', [function(){
      var todos = ["Netflix and chill"];
      return {
         getTodos: getTodos,
         addTodo : addTodo
      }

      function getTodos() {
         return todos;
      }

      function addTodo(todo) {
         if (todo !== "") {
            todos.push(todo);
         }
      }
   }]);
