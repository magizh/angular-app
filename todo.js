
angular.module('todoApp', ['firebase'])
   .controller('TodoController', ['$scope', 'TodoService',
      function($scope, TodoService) {
         $scope.todo = "";
         $scope.todos = TodoService.getTodos();

         $scope.addTodo = function () {
            TodoService.addTodo($scope.todo);
            $scope.todo = "";
         };

         $scope.markAsDone = function(todo) {
            TodoService.markAsDone(todo);
         };
      }])

   .service('TodoService', ['$firebaseArray', function($firebaseArray) {
      // Substitue URL with your custom firebase url.
      var ref = new Firebase("URL");
      var todos = $firebaseArray(ref);
      return {
         getTodos: getTodos,
         addTodo : addTodo,
         markAsDone: markAsDone
      }

      function getTodos() {
         return todos;
      }

      function markAsDone(todo) {
         var obj = todos.$getRecord(todo.$id);
         obj.status = "done";
         todos.$save(obj).then(function(ref) {
           console.log(ref);
         }, function(error) {
           console.log("Error:", error);
         });

      }

      function addTodo(todo) {
         if (todo !== "") {
            todos.$add({text: todo, status: "new"});
         }
      }
   }])

   .controller('SummaryController', ['TodoService', '$scope',
         function(TodoService, $scope) {
      $scope.todos = TodoService.getTodos();
      $scope.getCompletedCount = function () {
         var count =0;
         $scope.todos.forEach(function(todo){
            if (todo.status === "done") {
               count ++;
            }
         });
         return count;
      };
   }]);
