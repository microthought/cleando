angular.module('cleanDo.todos', [])

.controller('TodosController', function($scope, Serve){

  console.log("inside TodosController");

  $scope.tasks;



  $scope.delete = function(taskObj){
    Serve.deleteTask(taskObj.id);

    $scope.tasks = $scope.tasks.filter((task)=>task.id!==taskObj.id);
  };

  $scope.addSubTask = function(taskObj, taskText){ //$scepe.newSubTaskVal

    console.log("$scope subtask", taskText);
    console.log("current task obj: ", taskObj)

    var newSubTask = {
      task: taskText,
      done: false,
    };

    taskObj.subTasks.push(newSubTask);
    $scope.newSubTaskVal = '';
    Serve.updateSubTasks(taskObj.id, taskObj.subTasks);
    taskObj.showInput = false;

  };




  $scope.toggleDone = function(taskObj){
    //console.log(taskObj);

    taskObj.done = taskObj.done ? false : true;
    Serve.setDone(taskObj.id, taskObj.done);

  };



  $scope.addTask = function(){
    //console.log($scope.newTaskVal);

    Serve.addTask($scope.newTaskVal)
    .then(function(){
      //$scope.taskForm.$setPristine();
      $scope.newTaskVal = '';
      $scope.init();
    })
  };

  $scope.toggleSubInput = function(taskObj){
    console.log("show the input box dude!");
    console.log("before: ", taskObj)

    taskObj.showInput = taskObj.showInput ? false : true;


    console.log("after: ", taskObj);
  };


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