angular.module('cleanDo.services', [])

.factory('Serve', function($http){

  var getAll = function(){
    return $http({
      method: 'GET',
      url: '/api/tasks'
    })
    .then(function(results){
      return results.data;
    });
  };

  var addTask = function(taskText){
    return $http({
      method: 'POST',
      url: '/task',
      headers: {
        'Content-Type': 'application/json'
      },
      data: JSON.stringify({task: taskText})

    })
    .then(function(result){
      return result;
    });
  };

  var setDone = function(id, doneStatus){
    return $http({
      method: 'POST',
      url: '/task/update',
      headers: {
        'Content-Type': 'application/json'
      },
      data: JSON.stringify({id: id, done: doneStatus, purpose: "done"})

    })
    .then(function(result){
      return result;
    });
  };

  var deleteTask = function(id){
    return $http({
      method: 'POST',
      url: '/task/delete',
      headers: {
        'Content-Type': 'application/json'
      },
      data: JSON.stringify({id: id, secret: "I'm not a hacker"})

    })
    .then(function(result){
      return result;
    });
  };

    var updateSubTasks = function(id, subTasks){

      console.log("in services subTasks: ", subTasks);



    return $http({
      method: 'POST',
      url: '/task/update',
      headers: {
        'Content-Type': 'application/json'
      },
      data: JSON.stringify({id: id, subTasks: subTasks, purpose: "subTasks"})

    })
    .then(function(result){
      return result;
    });
  };





  return {
    getAll: getAll,
    addTask: addTask,
    setDone: setDone,
    deleteTask: deleteTask,
    updateSubTasks: updateSubTasks
  }

})