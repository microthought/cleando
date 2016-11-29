angular.module('cleanDo.todos', [])

.controller('TodosController', function($scope, Serve){

  console.log("inside TodosController");

  $scope.tasks;


  $scope.init = function() {
    console.log("scope initializing");
    Serve.getAll()
    .then(function(tasks) {
      console.log("my tasks! ", tasks);
      $scope.tasks = tasks;
    });
  };

  $scope.init();


})