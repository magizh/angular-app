angular.module('todoApp', [])
   .controller('TodoController', ['$scope', 'TodoService',
      function($scope, TodoService) {
         $scope.todo = "";
         $scope.todos = TodoService.getTodos();

         $scope.addTodo = function () {
            TodoService.addTodo($scope.todo);
            $scope.todo = "";
         };

         $scope.markAsDone = function(todo) {
            todo.status = "done";
         };
      }])

   .service('TodoService', [function(){
      var todos = [{text: "Netflix and chill", status: "new"}];
      return {
         getTodos: getTodos,
         addTodo : addTodo
      }

      function getTodos() {
         return todos;
      }

      function addTodo(todo) {
         if (todo !== "") {
            todos.push({text: todo, status: "new"});
         }
      }
   }])

   .controller('SummaryController', ['TodoService', '$scope',
         function(TodoService, $scope) {
            $scope.todos = TodoService.getTodos();
            $scope.getCompletedCount = function () {
               var count =0;
               $scope.todos.forEach(function(todo){
                  if(todo.status === "done"){
                     count ++;
                  }
               });
               return count;
            };

   }]);
