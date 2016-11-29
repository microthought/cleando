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
    .then(function(results){
      return results.data;
    });
  };





  return {
    getAll: getAll,
    addTask: addTask
  }

})