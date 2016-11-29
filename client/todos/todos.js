angular.module('cleanDo.todos', [])

.controller('TodosController', function($scope, Serve){


  $scope.init = function() {
    Serve.getAll()
    .then(function(tasks) {
      console.log("my tasks! ", tasks);
      $scope.tasks = tasks;
    });
  };


})